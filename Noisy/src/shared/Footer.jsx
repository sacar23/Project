import Logo from "@/components/common/Logo"
import { Link } from "react-router-dom";

import { useCMS } from "@/hooks/useCMS";
const Footer = () => {
  const { CmsData } = useCMS()
  console.log(CmsData);
  const navItems = [
    { title: "Home", path: "/" },
    { title: "About Us", path: "/about-us" },
    { title: "Contact Us", path: "/contact-us" },
  ];



  return (
    <footer className="w-full flex flex-col text-sm sm:text-base gap-5 sm:gap-10 text-white justify-start items-center pt-5 sm:pt-14 bg-dark-gray">
      <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-14 md:gap-28">
        <div className="w-full flex flex-col gap-2">
          <Logo className={"text-white"} />
          <p>{CmsData?.common[0]?.description}</p>
        </div>

        <div className="w-full flex flex-col gap-2">
          <h2 className=" text-base 2xs:text-lg sm:text-xl font-bold ">Quick links</h2>
          <nav className="w-full gap-3 justify-start items-start flex flex-col">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="relative group  sm:leading-6 text-sm sm:text-base"
              >
                <span>{item.title}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="w-full flex flex-col gap-2">
          <h2 className=" text-base 2xs:text-lg sm:text-xl font-bold ">Follow us on</h2>
          <div className="w-full flex  justify-start items-start gap-3 sm:gap-6">
            {
              CmsData?.social?.map((socialLink) => (
                <a
                  key={socialLink.id}
                  href={socialLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sm:w-10 sm:h-10 w-7 h-7 overflow-hidden rounded-full"
                >
                  <img className="w-full h-full object-contain" src={socialLink.icon} alt="socials" />
                </a>
              ))
            }
          </div>
        </div>

      </div>
      <div className="w-full flex justify-center items-center text-xs sm:text-base py-2.5 sm:py-4 border-t font-bold border-white">
        {CmsData?.settings?.copyright}
      </div>
    </footer>
  )
}

export default Footer