/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useCallback, useState } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { createWMSLayer, mapOptions, setupMapLayers } from '../../utils/mapUtils';

const center = { lat: 51.5074, lng: -0.1278 }; // London Example

const Map = ({ setMapInstance, selectedLayers, noiseOpacity }) => {
  // eslint-disable-next-line no-unused-vars
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ['places']
  });
  const mapRef = useRef(null);
  const infoWindowRef = useRef(null);
  const mapLayersRef = useRef({
    overlayWMS: null,
    agglomerationLayer: null,
    roadIALayer: null,
    railIALayer: null,
    aqmaLayer: null
  });

  // This function will run when the map instance is ready
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
    setMapInstance(map);
    setIsMapLoaded(true);
    // Initialize info window for feature clicks
    infoWindowRef.current = new window.google.maps.InfoWindow({ content: "" });
    const baseURL = "http://wms.extrium.co.uk/geoserver/NoiseE/wms?";
    // Create supporting WMS layers
    mapLayersRef.current.agglomerationLayer = createWMSLayer(map,
      baseURL,
      "england_agglomerations",
      "Agglomeration",
      7,
      [["Agglomeration Name", "Name"]]
    );
    mapLayersRef.current.roadIALayer = createWMSLayer(map,
      baseURL,
      "england_ias_roads",
      "Noise Action Plan Important Area (Road)",
      10,
      [
        ["Noise Important Area ID", "Name"],
        ["Noise Source Asset Owner", "assetowner"],
        ["Round 3 Type", "round3type"],
        ["Investigation Stage Completed", "Status"],
        ["Investigation Outcome", "Outcome"],
        ["Investigation Date", "Date"],
        ["Noise Receiving Authority (Round 2)", "R2_NRA"]
      ]
    );
    mapLayersRef.current.railIALayer = createWMSLayer(map,
      baseURL,
      "england_ias_railways",
      "Noise Action Plan Important Area (Rail)",
      9,
      [
        ["Noise Important Area ID", "Name"],
        ["Noise Source Asset Owner", "assetowner"],
        ["Round 3 Type", "round3type"],
        ["Investigation Stage Completed", "Status"],
        ["Investigation Outcome", "Date"],
        ["Investigation Date", "Outcome"],
        ["Noise Receiving Authority (Round 2)", "R2_NRA"]
      ]
    );
    mapLayersRef.current.aqmaLayer = createWMSLayer(map,
      baseURL,
      "uk_aqma_January2020_Final_Eng",
      "Air Quality Management Area",
      8,
      [
        ["AQMA Ref", "AQMA_Ref"],
        ["Local Authority", "LOCAL_AUTH"],
        ["AQMA Title", "TITLE"],
        ["NO<sub>2</sub> Limit Value", "NO2_LV"],
        ["PM10 Limit Value", "PM10_LV"],
        ["SO<sub>2</sub> Limit Value", "SO2_LV"],
        ["Benzene Limit Value", "BENZENE_LV"],
        ["AQMA ID", "AQMA_ID"]
      ]
    );
    // Setup initial noise layer (Road Lden)
    setupMapLayers(map, 0, baseURL, noiseOpacity);

    // Setup street view options
    const panoramaOptions = {
      addressControl: true,
      addressControlOptions: { position: 3 },
      panControl: true,
      panControlOptions: { position: 7 },
      zoomControl: true,
      zoomControlOptions: { position: 7 },
      enableCloseButton: true,
      linksControl: true,
      fullscreenControl: false,
      visible: false
    };

    map.getStreetView().setOptions(panoramaOptions);
  }, [setMapInstance, noiseOpacity]);

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current;
      const layerIndex = getSelectedNoiseLayerIndex();

      if (layerIndex >= 0) {
        const baseURL = "http://wms.extrium.co.uk/geoserver/NoiseE/wms?";
        setupMapLayers(map, layerIndex, baseURL, noiseOpacity);
      } else {
        // Remove noise layer if none selected
        map.overlayMapTypes.setAt(1, null);
      }

      // Update supporting layers
      updateSupportingLayer(mapLayersRef.current.agglomerationLayer, selectedLayers.agglomerations);
      updateSupportingLayer(mapLayersRef.current.roadIALayer, selectedLayers.importantAreasRoads);
      updateSupportingLayer(mapLayersRef.current.railIALayer, selectedLayers.importantAreasRailways);
      updateSupportingLayer(mapLayersRef.current.aqmaLayer, selectedLayers.aqmas);
    }
  }, [selectedLayers, noiseOpacity]);

  // Get the index of the selected noise layer (for the WMS service)
  const getSelectedNoiseLayerIndex = () => {
    if (selectedLayers.roadLden) return 0;
    if (selectedLayers.roadLAeq) return 1;
    if (selectedLayers.roadLnight) return 2;
    if (selectedLayers.railLden) return 3;
    if (selectedLayers.railLAeq) return 4;
    if (selectedLayers.railLnight) return 5;
    return -1;
  };

  // Update a supporting layer (toggle visibility)
  const updateSupportingLayer = (layer, isVisible) => {
    if (!layer) return;

    if (isVisible) {
      layer.visible = true;
      const layersOfInterest = [
        mapLayersRef.current.agglomerationLayer,
        mapLayersRef.current.roadIALayer,
        mapLayersRef.current.railIALayer,
        mapLayersRef.current.aqmaLayer
      ]
        .filter(l => l && l.visible)
        .sort((a, b) => a.drawOrder > b.drawOrder ? 1 : -1);

      layersOfInterest.forEach(layer => {
        removeSupportingLayer(layer);
      });

      layersOfInterest.forEach(layer => {
        addSupportingLayer(layer);
      });
    } else {
      removeSupportingLayer(layer);
    }
  };

  // Remove a supporting layer from the map
  const removeSupportingLayer = (layer) => {
    if (!layer || !mapRef.current) return;

    const map = mapRef.current;
    const layerIndex = map.overlayMapTypes.indexOf(layer);
    if (layerIndex !== -1) {
      map.overlayMapTypes.removeAt(layerIndex);
      layer.visible = false;
    }
  };

  // Add a supporting layer to the map
  const addSupportingLayer = (layer) => {
    if (!layer || !mapRef.current) return;

    const map = mapRef.current;
    const layerIndex = map.overlayMapTypes.indexOf(layer);
    if (layerIndex === -1) {
      map.overlayMapTypes.push(layer);
      layer.visible = true;
    }
  };


  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);


  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }
  return (
    <div id="mapHolder" style={{ width: '100%', height: '100%' }}>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={center}
        zoom={6}
        onLoad={onMapLoad}
        onUnmount={onUnmount}
        options={mapOptions}
      >
      </GoogleMap>
    </div>
  );
};

export default Map;