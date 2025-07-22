import Logo from "@/components/common/Logo"
import { NavLink, useLocation } from "react-router-dom";

const Header = () => {
    const navItems = [
        { title: "Home", path: "/" },
        { title: "About Us", path: "/about-us" },
        { title: "Contact Us", path: "/contact-us" },
    ];
    const location = useLocation()
    return (
        <header className="w-full sticky z-[300] py-3 md:py-5 top-0 bg-white shadow-sm">
            <div className="container flex gap-2.5 sm:gap-5 justify-between items-center">
                <Logo className={"text-dark-gray "} />
                <nav className="flex gap-4 sm:gap-14 justify-end items-center">
                    {navItems.map((item, index) => (
                        <NavLink
                            key={index}
                            to={item.path}
                            className={({ isActive }) =>
                                `relative group  leading-6 text-xs 2xs:text-sm sm:text-base ${isActive ? "text-dark-gray font-bold" : "text-light-gray font-medium"
                                }`
                            }
                        >
                            <span>{item.title}</span>
                            <span
                                className={`absolute bottom-0 left-0 h-[2px] bg-primary-blue transition-all duration-300 ${location.pathname === item.path
                                    ? "w-full"
                                    : "w-0 group-hover:w-full"
                                    }`}
                            ></span>
                        </NavLink>
                    ))}
                </nav>
            </div>
        </header>
    )
}

export default Header