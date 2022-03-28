# Placename viewer

The viewer is parameterizable so that you can search for place names in all your maps and tileset that you have in the MapTiler Cloud. You will need a MapTiler Cloud API key. Your MapTiler account access key is on your MapTiler [Cloud](https://cloud.maptiler.com/account/keys/) account page or [Get API key for FREE](https://cloud.maptiler.com/account/keys).

## How to center the map on a placename

The parameters supported by the viewer are:

* **q**: place name to be searched for. (ex. London). The "**auto**" value center the map in the geolocation provided by modern browsers
* **type**: type of map you want to load. Valid values are:
  * *maps* (for maps)
  * *tiles* (for tileset)
* **id**: map identifier
* **key**: your API key

## Examples of how to use the viewer in an iframe.

### Tileset UK Great Britain, Ordnance Survey one-inch to the mile (1:63.360), "Hills" edition, 1885-1903. centered on London.

```html
<iframe src="https://labs.maptiler.com/samples/cloud/placename/index.html?q=london&type=tiles&id=uk-osgb63k1885&key=YOUR_API_KEY_HERE" width="500" height="300" frameborder="0"></iframe>
```
In the example above:

* q = london
* type = tiles
* id = uk-osgb63k1885

#### [Demo](https://labs.maptiler.com/samples/cloud/placename/index.html?q=london&type=tiles&id=uk-osgb63k1885&key=0FwjVpfoctS74Le98wMD)


### Winter map with ski slopes centered on Val Thorens

```html
<iframe src="https://labs.maptiler.com/samples/cloud/placename/index.html?q=val%20thorens&type=maps&id=winter&key=YOUR_API_KEY_HERE" width="500" height="300" frameborder="0"></iframe>
```
In the example above:

* q = val thorens
* type = maps
* id = winter

#### [Demo](https://labs.maptiler.com/samples/cloud/placename/index.html?q=val%20thorens&type=maps&id=winter&key=0FwjVpfoctS74Le98wMD)

### Streets map centered on the geolocation provided by browsers.

```html
<iframe src="https://labs.maptiler.com/samples/cloud/placename/index.html?q=auto&type=maps&id=streets&key=YOUR_API_KEY_HERE" width="500" height="300" frameborder="0" allow="geolocation"></iframe>
```
In the example above:

* q = auto
* type = maps
* id = streets

#### [Demo](https://labs.maptiler.com/samples/cloud/placename/index.html?q=auto&type=maps&id=streets&key=0FwjVpfoctS74Le98wMD)

<iframe src="https://labs.maptiler.com/samples/cloud/placename/index.html?q=auto&type=maps&id=streets&key=YOUR_API_KEY_HERE" width="500" height="300" frameborder="0" allow="geolocation"></iframe>