
const CommonText = ({ text = "", className }) => {
    return (
        <p className={`  text-light-gray text-base leading-6 ${className}`}>{text}</p>
    )
}

export default CommonText