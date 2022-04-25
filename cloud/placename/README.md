# Placename viewer

The viewer is parameterizable so that you can search for place names in all your maps and tileset that you have in the MapTiler Cloud. You will need a MapTiler Cloud API key. Your MapTiler account access key is on your MapTiler [Cloud](https://cloud.maptiler.com/account/keys/) account page or [Get API key for FREE](https://cloud.maptiler.com/start).

## How to center the map on a placename

The parameters supported by the viewer are:

* **q**: place name to be searched for. (ex. London). The "**auto**" value center the map in the geolocation provided by modern browsers
* **type**: type of map you want to load. Valid values are:
  * *maps* (for maps)
  * *tiles* (for tileset)
* **id**: map identifier
* **key**: [Get your API key for FREE](https://cloud.maptiler.com/start)

## Examples of how to use the viewer in an iframe.

### Tileset UK Great Britain, Ordnance Survey one-inch to the mile (1:63.360), "Hills" edition, 1885-1903. centered on London.

> :warning: You must replace **YOUR_API_KEY_HERE** in the URL with your MapTiler API key. If you don't have a MapTiler Cloud account, you can create an [account for FREE](https://cloud.maptiler.com/start).

```html
<iframe src="https://www.maptiler.com/nls/placename/?q=london&type=tiles&id=uk-osgb63k1885&key=YOUR_API_KEY_HERE" width="500" height="300" frameborder="0"></iframe>
```
In the example above:

* q = london
* type = tiles
* id = uk-osgb63k1885

#### [Demo](https://www.maptiler.com/nls/placename/?q=london&type=tiles&id=uk-osgb63k1885&key=YOUR_API_KEY_HERE)


### Winter map with ski slopes centered on Val Thorens

> :warning: You must replace **YOUR_API_KEY_HERE** in the URL with your MapTiler API key. If you don't have a MapTiler Cloud account, you can create an [account for FREE](https://cloud.maptiler.com/start).

```html
<iframe src="https://www.maptiler.com/nls/placename/?q=val%20thorens&type=maps&id=winter&key=YOUR_API_KEY_HERE" width="500" height="300" frameborder="0"></iframe>
```
In the example above:

* q = val thorens
* type = maps
* id = winter

#### [Demo](https://www.maptiler.com/nls/placename/?q=val%20thorens&type=maps&id=winter&key=YOUR_API_KEY_HERE)

### Streets map centered on the geolocation provided by browsers.

> :warning: You must replace **YOUR_API_KEY_HERE** in the URL with your MapTiler API key. If you don't have a MapTiler Cloud account, you can create an [account for FREE](https://cloud.maptiler.com/start).

> :warning: Please read carefully [Feature-Policy: geolocation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy/geolocation) to use the **auto** option in an iframe as it is an **experimental technology**.

```html
<iframe src="https://www.maptiler.com/nls/placename/?q=auto&type=maps&id=streets&key=YOUR_API_KEY_HERE" width="500" height="300" frameborder="0" allow="geolocation"></iframe>
```
In the example above:

* q = auto
* type = maps
* id = streets

#### [Demo](https://www.maptiler.com/nls/placename/?q=auto&type=maps&id=streets&key=YOUR_API_KEY_HERE)


Check out the article [How to center iframe map on a placename](https://documentation.maptiler.com/hc/en-us/articles/4978914787601) for more information.