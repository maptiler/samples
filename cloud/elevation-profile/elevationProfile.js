class ElevationProfile {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.chart = null;
        this.elevationProvider = new ElevationProvider(apiKey);

        this.map = new mapboxgl.Map({
            container: 'map',
            style: `https://api.maptiler.com/maps/outdoor/style.json?key=${this.apiKey}`,
            center: [10.988677069124009, 46.88158715828973],
            zoom: 12
        });

        this.draw = new MapboxDraw({
            displayControlsDefault: false,
            controls: {
                line_string: true,
                trash: true
            },
            defaultMode: 'draw_line_string'
        });
        this.map.addControl(this.draw);

        this.map.on('draw.create', async (e) => {
            const feature = e.features[0];
            await this.showChart(feature);
        });
        this.map.on('draw.delete', () => {
            this.draw.deleteAll();
            this.clearChart();
        });
        this.map.on('draw.update', async () => {
            await this.showChart()
        });
    }

    async showChart(feature) {
        this.clearChart();
        if (feature && feature.geometry) {
            const coordinates = feature.geometry.coordinates;
            if (coordinates) {
                await this.drawElevationProfile(coordinates);
            }
        }
    }

    sampleProfileLine(coordinates) {
        const options = {units: 'meters'};
        const line = turf.lineString(coordinates);
        const lineLength = turf.length(line, options);
        let numSamples = 200;
        let stepSize = lineLength / numSamples;

        const first = coordinates[0];
        const metersPerPx = 156543.03392 * Math.cos(first[1] * Math.PI / 180) / Math.pow(2, 12);
        stepSize = Math.max(metersPerPx, stepSize);
        numSamples = lineLength / stepSize;

        const samples = [];
        for (let i = 0; i <= numSamples; i++) {
            const along = turf.along(line, i * stepSize, options);
            const coords = along.geometry.coordinates;
            samples.push(coords);
        }

        return samples;
    }

    clearChart() {
        if (this.chart) {
            this.chart.detach();
        }
        document.getElementById('chart').innerHTML = "";
    }

    async drawElevationProfile(coordinates) {
        const samples = this.sampleProfileLine(coordinates);
        const elevationProfile = [];
        for (const c of samples) {
            const elevation = await this.elevationProvider.getElevation(c[1], c[0]);
            elevationProfile.push(elevation);
        }

        const minElevation = Math.min(...elevationProfile);

        this.chart = new Chartist.Line('#chart', {
            series: [elevationProfile]
        }, {
            low: minElevation - 100,
            showArea: true,
            showPoint: false,
            fullWidth: true,
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 4,
                fillHoles: false
            })
        });
    }
}

new ElevationProfile('ikPbJwwEEbaMHCvgAxpQ');


