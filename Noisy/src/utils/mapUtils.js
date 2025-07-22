export const srsConversion = (latLng) => {
  if ((Math.abs(latLng.lng) > 180 || Math.abs(latLng.lat) > 90))
    return;

  const num = latLng.lng * 0.017453292519943295;
  const x = 6378137.0 * num;
  const a = latLng.lat * 0.017453292519943295;

  return { lng: x, lat: 3189068.5 * Math.log((1.0 + Math.sin(a)) / (1.0 - Math.sin(a))) };
};

// Create a WMS layer for the map
export const createWMSLayer = (map, baseURL, layerName, popupTitle, drawOrder, propertyMap) => {
  const layerNamespace = "NoiseE";

  const result = new window.google.maps.ImageMapType({
    getTileUrl: function (coord, zoom) {
      const proj = map.getProjection();
      const zfactor = Math.pow(2, zoom);
      // get Long Lat coordinates
      const top = proj.fromPointToLatLng(new window.google.maps.Point(coord.x * 256 / zfactor, coord.y * 256 / zfactor));
      const bot = proj.fromPointToLatLng(new window.google.maps.Point((coord.x + 1) * 256 / zfactor, (coord.y + 1) * 256 / zfactor));

      // Note: With @react-google-maps/api, the LatLng objects have .lat and .lng as properties, not methods
      // Convert them to a format compatible with our conversion function
      const topForConversion = {
        lat: top.lat(),
        lng: top.lng()
      };
      const botForConversion = {
        lat: bot.lat(),
        lng: bot.lng()
      };

      const topConverted = srsConversion(topForConversion);
      const botConverted = srsConversion(botForConversion);

      //create the Bounding box string
      const bbox = topConverted.lng + "," + botConverted.lat + "," + botConverted.lng + "," + topConverted.lat;

      //base WMS URL
      let url = baseURL;
      url += "&REQUEST=GetMap"; //WMS operation
      url += "&SERVICE=WMS";    //WMS service
      url += "&VERSION=1.1.1";  //WMS version  
      url += "&LAYERS=" + layerNamespace + ":" + layerName; //WMS layers
      url += "&FORMAT=image/png"; //WMS format
      url += "&TRANSPARENT=TRUE";
      url += "&SRS=EPSG:3857";     //set WGS84 
      url += "&BBOX=" + bbox;      // set bounding box
      url += "&WIDTH=256";         //tile size in google
      url += "&HEIGHT=256";
      url += "&TILED=true";
      return url;                 // return URL for the tile
    },
    tileSize: new window.google.maps.Size(256, 256),
    isPng: true
  });

  result.layerName = layerName;
  result.propertyMap = propertyMap;
  result.popupTitle = popupTitle;
  result.drawOrder = drawOrder;
  result.visible = false;

  return result;
};

// Set up the noise layers on the map
export const setupMapLayers = (map, layerIndex, baseURL, noiseOpacity) => {
  const arrayLayers = [
    "LAYERS=NoiseE%3ARD_LDEN_R3",
    "LAYERS=NoiseE%3ARD_LQ16_R3",
    "LAYERS=NoiseE%3ARD_LNGT_R3",
    "LAYERS=NoiseE%3ARL_LDEN",
    "LAYERS=NoiseE%3ARL_LQ16",
    "LAYERS=NoiseE%3ARL_LNGT"
  ];

  const wmsParams = [
    "SERVICE=WMS",
    "VERSION=1.3",
    "FORMAT=image%2Fpng",
    "TRANSPARENT=true",
    "SRS=EPSG:3857",
    "STYLES=",
    "REQUEST=GetMap",
    "WIDTH=256",
    "HEIGHT=256"
  ];

  const isPng = true;
  const minZoomLevel = 3;
  const maxZoomLevel = 28;

  map.overlayMapTypes.setAt(1, null);

  const overlayOptions = {
    getTileUrl: function (coord, zoom) {
      const proj = map.getProjection();
      const zfactor = Math.pow(2, zoom);
      // get Long Lat coordinates
      const top = proj.fromPointToLatLng(new window.google.maps.Point(coord.x * 256 / zfactor, coord.y * 256 / zfactor));
      const bot = proj.fromPointToLatLng(new window.google.maps.Point((coord.x + 1) * 256 / zfactor, (coord.y + 1) * 256 / zfactor));

      // Convert to the format expected by srsConversion
      const topForConversion = {
        lat: top.lat(),
        lng: top.lng()
      };
      const botForConversion = {
        lat: bot.lat(),
        lng: bot.lng()
      };

      //convert from LatLng(4326) to metres (3857)
      const topConverted = srsConversion(topForConversion);
      const botConverted = srsConversion(botForConversion);
      //create the Bounding box string
      const bbox = topConverted.lng + "," + botConverted.lat + "," + botConverted.lng + "," + topConverted.lat;

      const urlResult = baseURL + wmsParams.join("&") + "&" + arrayLayers[layerIndex] + "&bbox=" + bbox;
      return urlResult;
    },
    tileSize: new window.google.maps.Size(256, 256),
    minZoom: minZoomLevel,
    maxZoom: maxZoomLevel,
    opacity: noiseOpacity,
    isPng: isPng
  };

  const overlayWMS = new window.google.maps.ImageMapType(overlayOptions);
  map.overlayMapTypes.setAt(1, overlayWMS);
};


export const mapOptions = {
  tilt: 0,
  disableDefaultUI: true,
  zoomControl: true,
  zoomControlOptions: { position: 7 },
  mapTypeControl: true,
  mapTypeControlOptions: {
    position: 3,
    style: 2,
    mapTypeIds: ['roadmap', 'hybrid', 'satellite']
  },
  scaleControl: false,
  streetViewControl: true,
  streetViewControlOptions: { position: 7 },
  rotateControl: true,
  rotateControlOptions: { position: 7 },
  fullscreenControl: false,
  styles: [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e0e0e0"  // Light gray background
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"  // Hides map icons for a cleaner look
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#000000"  // Dark text for labels
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#ffffff"  // White text shadow for better visibility
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#d0d0d0"  // Light gray for administrative boundaries
        }
      ]
    },
    {
      "featureType": "landscape",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f5f5"  // Soft light gray for land areas
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#bdbdbd"  // Slightly darker gray for roads
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#81c3d7"  // Calm, soft blue for water areas
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#c8e6c9"  // Light green for points of interest (parks, buildings)
        }
      ]
    }
  ],
};