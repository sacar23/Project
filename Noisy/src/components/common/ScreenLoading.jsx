import LoaderV2 from "./LoaderV2"

const ScreenLoading = () => {
    return (
        <div className="w-full h-screen fixed inset-0 backdrop-blur-lg z-[1100000] bg-black/50 bg-opacity-40  flex justify-center items-center">
            <LoaderV2 color="#485aff" stroke={9} size={58} />
        </div>
    )
}

export default ScreenLoading