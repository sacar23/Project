export const loadGoogleMapsAPI = (callback) => {
  if (window.google && window.google.maps) {
    callback();
    return;
  }

  if (document.querySelector('script[data-google-maps]')) {
    return;
  }

  // Define global callback
  window.initGoogleMaps = () => {
    if (callback) callback();
    delete window.initGoogleMaps; // Cleanup
  };

  // Load script only if not already loading
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&v=3.37&libraries=places&callback=initGoogleMaps`;
  script.async = true;
  script.defer = true;
  script.setAttribute("data-google-maps", "true"); // Mark script to avoid duplicate loading
  document.body.appendChild(script);
};
