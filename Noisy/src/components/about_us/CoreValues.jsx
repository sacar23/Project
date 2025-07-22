import CommonTitle from "../common/CommonTitle"
import { useCMS } from "@/hooks/useCMS"
const CoreValues = () => {
    const { CmsData } = useCMS();
    const coreValues = CmsData?.about_cores || []
    return (
        <div className="w-full flex flex-col gap-3 sm:gap-8 justify-start items-start">
            <CommonTitle title="Core Values" />
            <div className="w-full grid grid-cols-1 3xs:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6 lg:gap-x-28 lg:gap-y-12">
                {
                    coreValues.map((value, index) => {
                        return (
                            <div className="w-full flex flex-col justify-start items-start gap-2" key={value.id}>
                                <div className="w-10 sm:w-16 h-10 sm:h-16 overflow-hidden">
                                    <img className="w-full h-full object-contain" src={value.image} alt={value.title} />
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold leading-8 text-dark-gray">{index + 1}. {value.title}</h3>
                                <p className="text-sm sm:text-base">{value.description}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default CoreValues