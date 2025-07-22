import AboutBanner from "@/components/about_us/AboutBanner"
import OurMissionVision from "@/components/about_us/OurMissionVision"
import OurStory from "@/components/about_us/OurStory"
import CommonPageWrapper from "@/components/common/CommonPageWrapper"

const AboutUs = () => {
    return (
        <CommonPageWrapper>
            <div className="w-full flex flex-col gap-3 xs:gap-6 sm:gap-10 lg:gap-20 justify-start items-start ">
                <AboutBanner />
                <OurStory />
                <OurMissionVision />
                
            </div>
        </CommonPageWrapper>
    )
}

export default AboutUs