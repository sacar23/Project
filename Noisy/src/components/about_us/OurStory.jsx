import our_Story from "@/assets/images/about_us.png"
import CommonTitle from "../common/CommonTitle"
import { useCMS } from "@/hooks/useCMS";
const OurStory = () => {
    const { CmsData } = useCMS();
    const title = CmsData?.about_story?.title || "Our Story";
    const description = CmsData?.about_story?.description || "London’s noise pollution crisis has intensified with rapid urban development, traffic congestion, and increased construction. Recognizing the need for data-driven solutions, we launched Noisy to analysis and map urban noise levels, offering insights into the most affected areas. Our goal is to empower communities with actionable insights, allowing residents, businesses, and city planners to make informed decisions about noise reduction strategies. By leveraging AI data, we aim to create a smarter, quieter, and healthier urban environment."
    const image = CmsData?.about_story?.image || our_Story
    return (
        <div className="w-full flex gap-12 justify-between items-start">
            <div className="w-full flex flex-col gap-3">
                <CommonTitle title={`${title}`} />
                <p className="text-sm 2xs:text-base text-light-gray 2xs:leading-6">
                    {description}
                </p>
            </div>
            <div className="w-full hidden lg:block h-96 xl:h-[520px] rounded-2xl overflow-hidden">
                <img className="w-full h-full object-cover" src={image} alt="story" />
            </div>
        </div>
    )
}

export default OurStory