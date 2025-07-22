import ReactSpeedometer from "react-d3-speedometer";
import { FaVolumeXmark } from "react-icons/fa6";
import { FaVolumeHigh } from "react-icons/fa6";;
import { otherLevelsList, railTrafficLevels, roadTrafficLevels } from "@/data/db";
import SearchBox from "./SearchBox";
const SideBar = ({ show, controls, map, selectedLayers, onLayerChange }) => {
    const { handlePlay, play, noiseLevel, noiseOpacity, setNoiseOpacity } = controls;
    return (
        <div className={`w-[280px] lg:w-[400px] h-[88%] lg:h-[95%] bg-white absolute transition-all duration-500 ease-in-out top-16 lg:top-3 flex flex-col justify-start overflow-y-auto items-center p-4 
            ${show ? "left-3" : "-left-full"} lg:left-3`}>
            <div className="w-full hidden flex-col gap-2 justify-center items-center sticky top-0">
                <ReactSpeedometer
                    minValue={55}
                    maxValue={75}
                    value={noiseLevel}
                    width={250}
                    segments={5}
                    segmentColors={['#FF6600', '#FF3333', '#990033', '#AD9AD6', '#0000E0',]}
                    needleHeightRatio={0.5}
                    ringWidth={35}
                    height={160}
                />
                <button onClick={handlePlay} type="button" className="w-12 h-12 min-h-12 flex cursor-pointer rounded-full border border-light-gray justify-center items-center ">
                    {play ? <FaVolumeHigh size={22} /> : <FaVolumeXmark size={22} />}
                </button>
                <p className="font-medium text-sm">Noise Intensity (DB)</p>
            </div>
            <div className="w-full mt-4 pr-2 overflow-y-auto font-medium text-sm flex flex-col justify-start items-center gap-4">
                {/* Search location */}
                <div className="w-full relative flex flex-col gap-2">
                    <label htmlFor="location">Search by Location</label>
                    <SearchBox map={map} />
                </div>
                {/* Road traffic */}
                <div className="w-full flex flex-col gap-2">
                    <p>Road traffic noise levels</p>
                    <hr className="w-full border border-[#E6E6E6]" />
                    <div className="w-full flex flex-col gap-2">
                        {roadTrafficLevels.map((trafficLevel) => (
                            <label key={trafficLevel.id} className="flex gap-1 cursor-pointer justify-start items-center">
                                <input
                                    onChange={() => onLayerChange(trafficLevel.value)}
                                    type="checkbox"
                                    name={trafficLevel.name}
                                    id={trafficLevel.id}
                                    className="w-3 h-3 shrink-0 accent-[#485AFF]"
                                    checked={selectedLayers[trafficLevel.value]}
                                />

                                <span>{trafficLevel.name}</span>
                            </label>
                        ))}
                    </div>
                </div>
                {/* Rail traffic */}
                <div className="w-full flex flex-col gap-2">
                    <p>Rail traffic noise levels</p>
                    <hr className="w-full border border-[#E6E6E6]" />
                    <div className="w-full flex flex-col gap-2">
                        {railTrafficLevels.map((trafficLevel) => (
                            <label key={trafficLevel.id} className="flex gap-1 cursor-pointer justify-start items-center">
                                <input
                                    onChange={() => onLayerChange(trafficLevel.value)}
                                    type="checkbox"
                                    name={trafficLevel.name}
                                    id={trafficLevel.id}
                                    className="w-3 h-3 shrink-0 accent-[#485AFF]"
                                    checked={selectedLayers[trafficLevel.value]}
                                />
                                <span>{trafficLevel.name}</span>
                            </label>
                        ))}
                    </div>
                </div>
                {/* Other levels */}
                <div className="w-full flex flex-col gap-2">
                    <hr className="w-full border border-[#E6E6E6]" />
                    <div className="w-full flex flex-col gap-2">
                        {otherLevelsList.map((level) => (
                            <label key={level.id} className="flex gap-1 cursor-pointer justify-start items-center">
                                <input
                                    onChange={() => onLayerChange(level.value)}
                                    type="checkbox"
                                    name={level.name}
                                    id={level.id}
                                    className="w-3 h-3 shrink-0 accent-[#485AFF]"
                                    checked={selectedLayers[level.value]}
                                />
                                <span>{level.name}</span>
                            </label>
                        ))}
                    </div>
                </div>
                {/* noise slider */}
                <div className="w-full flex flex-col gap-2 mt-2">
                    <p>Rail traffic noise levels</p>
                    <hr className="w-full border border-[#E6E6E6]" />
                    <div className="w-full flex flex-col gap-1.5 justify-start items-start">
                        <div className="w-full flex justify-start items-center gap-1">
                            <span className="w-3.5 h-3.5 shrink-0 bg-[#0000E0]"></span>
                            <span>70.0 and over</span>
                        </div>
                        <div className="w-full flex justify-start items-center gap-1">
                            <span className="w-3.5 h-3.5 shrink-0 bg-[#AD9AD6]"></span>
                            <span>70.0 - 74.9</span>
                        </div>
                        <div className="w-full flex justify-start items-center gap-1">
                            <span className="w-3.5 h-3.5 shrink-0 bg-[#990033]"></span>
                            <span>65.0 - 69.9</span>
                        </div>
                        <div className="w-full flex justify-start items-center gap-1">
                            <span className="w-3.5 h-3.5 shrink-0 bg-[#FF3333]"></span>
                            <span>60.0 - 64.9</span>
                        </div>
                        <div className="w-full flex justify-start items-center gap-1">
                            <span className="w-3.5 h-3.5 shrink-0 bg-[#FF6600]"></span>
                            <span>55.0 - 59.9</span>
                        </div>
                    </div>
                    <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={noiseOpacity} // Ensure it reflects the state
                        onChange={(e) => setNoiseOpacity(parseFloat(e.target.value))} // Parse to float
                    />
                </div>
                <div>

                </div>
            </div>
        </div>

    )
}

export default SideBar