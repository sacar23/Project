import { waveform } from 'ldrs'
waveform.register()
const LoaderV2 = ({ size = 25, stroke = 4, color = "#feaa65", speed = 1 }) => {
    return (
        <l-waveform
            size={size}
            stroke={stroke}
            speed={speed}
            color={color}
        ></l-waveform>
    );
};

export default LoaderV2;
