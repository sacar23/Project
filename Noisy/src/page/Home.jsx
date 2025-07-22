/* eslint-disable no-unused-vars */
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { useState, useRef } from "react";
import SideBar from "@/components/home/SideBar";
import Map from "@/components/home/Map";
const Home = () => {
    const [play, setPlay] = useState(true);
    const [noiseLevel, setNoiseLevel] = useState(55);
    const [show, setShow] = useState(false);
    const [noiseOpacity, setNoiseOpacity] = useState(0.6);
    const [map, setMap] = useState(null);
    const [selectedLayers, setSelectedLayers] = useState({
        roadLden: true,
        roadLAeq: false,
        roadLnight: false,
        railLden: false,
        railLAeq: false,
        railLnight: false,
        importantAreasRoads: false,
        importantAreasRailways: false,
        aqmas: false,
        agglomerations: false
    });

    const handleLayerChange = (layerKey) => {
        const newSelectedLayers = { ...selectedLayers };

        // If this is a noise layer (road or rail), deselect all other noise layers
        if (layerKey.includes('road') || layerKey.includes('rail')) {
            Object.keys(newSelectedLayers).forEach(key => {
                if ((key.includes('road') || key.includes('rail')) && !key.includes('importantAreas')) {
                    newSelectedLayers[key] = false;
                }
            });
        }

        newSelectedLayers[layerKey] = !newSelectedLayers[layerKey];
        setSelectedLayers(newSelectedLayers);
    };
    const handleOpacityChange = (value) => {
        setNoiseOpacity(value);
    };
    // Play sound of noise
    const handlePlay = () => setPlay((prev) => !prev);

    // Show/Hide sidebar
    const handleShow = () => setShow((prev) => !prev);

    const mapAreaRef = useRef(null);
    return (
        <div className="w-full h-[calc(100vh-72px)] relative" id="wrap">
            <div className="w-full h-full" >
                <Map
                    setMapInstance={setMap}
                    selectedLayers={selectedLayers}
                    noiseOpacity={noiseOpacity}
                />
            </div>
            {/* Sidebar toggler */}
            <button
                onClick={handleShow}
                className="absolute w-12 h-12 lg:hidden rounded-full bg-white flex justify-center items-center shadow-2xl top-2.5 left-3 cursor-pointer"
            >
                {show ? <FaXmark size={22} /> : <FaBarsStaggered size={22} />}
            </button>

            {/* Sidebar */}
            <SideBar
                selectedLayers={selectedLayers}
                onLayerChange={handleLayerChange}
                show={show}
                map={map}
                controls={{
                    handlePlay,
                    play,
                    noiseLevel,
                    noiseOpacity,
                    setNoiseOpacity
                }}
            />
        </div>
    );
};

export default Home;
