
const CommonTitle = ({ title = "", className }) => {
    return (
        <h2 className={` text-xl sm:text-2xl md:text-4xl text-dark-gray font-bold md:leading-12 ${className}`}>{title}</h2>
    )
}

export default CommonTitle