import DOMPurify from "dompurify";
import { useCMS } from "@/hooks/useCMS";
import CommonTitle from "../common/CommonTitle";

const OurMissionVision = () => {
    const { CmsData } = useCMS();
    const missionTitle = CmsData?.about_mission?.title || "Our Story";
    const visionTitle = CmsData?.about_vision?.title || "Our Vision";

    // Sanitize descriptions
    const missionDescription = DOMPurify.sanitize(CmsData?.about_mission?.description ||
        `Our mission is to improve noise pollution awareness and management in London by providing accessible, data-driven insights to: 
        <ul>
            <li>Highlight the impact of noise pollution on public health and quality of life</li>
            <li>Support urban planners in designing quieter, more sustainable city spaces</li>
            <li>Enable residents and businesses to make informed decisions about noise exposure</li>
        </ul>`);

    const visionDescription = DOMPurify.sanitize(CmsData?.about_vision?.description ||
        `We envision a future where London is not just a vibrant city, but also a quieter and healthier place to live. 
        Our goal is to become a leading platform for noise pollution analysis, shaping policies and strategies that help 
        reduce urban noise and improve well-being.`);

    return (
        <div className="w-full flex gap-3 sm:gap-10 lg:gap-12 lg:flex-row flex-col justify-between items-start">
            {/* Mission Section */}
            <div className="w-full flex flex-col gap-3">
                <CommonTitle title={missionTitle} />
                <p className="text-sm 2xs:text-base text-light-gray 2xs:leading-6"
                    dangerouslySetInnerHTML={{ __html: missionDescription }} />
            </div>

            {/* Vision Section */}
            <div className="w-full flex flex-col gap-3">
                <CommonTitle title={visionTitle} />
                <p className="text-sm 2xs:text-base text-light-gray 2xs:leading-6"
                    dangerouslySetInnerHTML={{ __html: visionDescription }} />
            </div>
        </div>
    );
};

export default OurMissionVision;
