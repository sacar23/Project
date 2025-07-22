import CommonTitle from "../common/CommonTitle";
import CommonText from "../common/CommonText";
import { useCMS } from "@/hooks/useCMS";
import banner from "@/assets/images/city.png"
const AboutBanner = () => {
    const { CmsData } = useCMS();
    const commonCard = "w-full flex flex-col justify-start items-start";
    const commonTitle = "font-bold text-lg sm:text-xl md:text-[28px] md:leading-10 text-dark-gray";
    const commonText = "text-sm sm:text-base text-light-gray";
    const commonWrapper = "w-full flex xs:flex-row flex-col justify-between items-center gap-3 2xs:gap-5 xs:gap-14";

    const bannerImage = CmsData?.about_banner?.image || banner;
    const bannerTitle = CmsData?.about_banner?.title || "We merge technology and data to tackle urban noise pollution in London";
    const bannerDescription = CmsData?.about_banner?.description || "Noise pollution is a growing concern in London, impacting millions daily. Noisy provides data-driven insights using AI-powered analysis and collected noise data, helping residents, researchers, and policymakers better understand and address urban noise challenges.";

    const aboutBanners = CmsData?.about_banners || [];

    return (
        <div className="w-full flex flex-col gap-3 lg:gap-12 justify-start items-start">
            {/* Banner Image */}
            <div className="w-full h-44 sm:h-80 md:h-[460px] rounded-2xl overflow-hidden">
                <img className="w-full h-full object-cover" src={bannerImage} alt="banner" />
            </div>

            <div className="w-full flex lg:flex-row flex-col justify-between items-start gap-6 xl:gap-20">
                {/* Banner Title & Description */}
                <div className="w-full 2xl:w-[740px] 2xl:min-w-[740px] flex flex-col gap-3.5">
                    <CommonTitle title={bannerTitle} />
                    <CommonText text={bannerDescription} />
                </div>

                {/* About Banners (Rendered in Pairs) */}
                <div className="w-full flex flex-col gap-3 2xs:gap-5 sm:gap-8 justify-start items-start">
                    {aboutBanners.map((banner, index) => {
                        if (index % 2 === 0) {
                            return (
                                <div key={index} className={commonWrapper}>
                                    <div className={commonCard}>
                                        <h3 className={commonTitle}>{banner.title || "Default Title"}</h3>
                                        <p className={commonText}>{banner.description || "Default description for missing content."}</p>
                                    </div>
                                    <span className="h-7 sm:block hidden border"></span>
                                    {aboutBanners[index + 1] && (
                                        <div className={commonCard}>
                                            <h3 className={commonTitle}>{aboutBanners[index + 1]?.title || "Default Title"}</h3>
                                            <p className={commonText}>{aboutBanners[index + 1]?.description || "Default description for missing content."}</p>
                                        </div>
                                    )}
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
            </div>
        </div>
    );
};

export default AboutBanner;
