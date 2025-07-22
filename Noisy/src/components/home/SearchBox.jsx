import { useEffect, useRef } from "react";

const SearchBox = ({ map }) => {
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);
  const idleListenerRef = useRef(null);

  useEffect(() => {
    if (!window.google?.maps?.places) {
      console.error("Google Maps API is not loaded.");
      return;
    }

    if (map && inputRef.current && !autocompleteRef.current) {
      autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
        componentRestrictions: { country: "uk" },
      });

      const onPlaceChanged = () => {
        const place = autocompleteRef.current.getPlace();
        if (place?.geometry) {
          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else if (place.geometry.location) {
            map.panTo(place.geometry.location);
            map.setZoom(17);
          }
        }
      };

      autocompleteRef.current.addListener("place_changed", onPlaceChanged);

      // Ensure map bounds update autocomplete bounds
      idleListenerRef.current = map.addListener("idle", () => {
        const bounds = map.getBounds();
        if (bounds && autocompleteRef.current) {
          autocompleteRef.current.setBounds(bounds);
        }
      });
    }

    // Cleanup function
    return () => {
      if (autocompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
      if (idleListenerRef.current) {
        window.google.maps.event.removeListener(idleListenerRef.current);
      }
    };
  }, [map]);

  return (
    <input
      id="searchText"
      type="text"
      className="w-full p-3 text-sm border border-light-gray rounded-sm"
      placeholder="Enter a location"
      ref={inputRef}
    />
  );
};

export default SearchBox;
