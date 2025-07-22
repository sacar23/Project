import { Link } from "react-router-dom"

const Logo = ({ className }) => {
    return (
        <Link to={'/'} className={` text-xl 2xs:text-[32px] font-semibold text-dark-gray  ${className}`}>
            noisy
        </Link>
    )
}

export default Logo