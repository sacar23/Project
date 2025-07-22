import CommonInputWrapper from "@/components/common/CommonInputWrapper"
import CommonPageWrapper from "@/components/common/CommonPageWrapper"
import CommonSubmitBtn from "@/components/common/CommonSubmitBtn"
import CommonTitle from "@/components/common/CommonTitle"
import { useForm } from "react-hook-form"
import { MdOutlineMail } from "react-icons/md";
import { FaPhoneVolume } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { useMutation } from "@tanstack/react-query"
import useAxiosPublic from "@/hooks/useAxiosPublic"
import toast from "react-hot-toast"
import { useCMS } from "@/hooks/useCMS"
const ContactUs = () => {
    const { register, reset, formState: { errors }, handleSubmit } = useForm()
    const { CmsData } = useCMS()
    const axiosPublic = useAxiosPublic()
    const contactMutation = useMutation({
        mutationFn: async (data) => {
            const response = await axiosPublic.post("/contact", data);
            return response?.data;
        },
        onSuccess: (response) => {
            toast.success(response?.message || "Email sent successfully")
            reset();
        },
        onError: (error) => {
            toast.error(error?.message || "Failed to send email")
        },
    });
    const onSubmit = (data) => {
        contactMutation.mutate(data)
    }
    //  
    return (
        <CommonPageWrapper>
            <div className="w-full flex lg:flex-row flex-col justify-between items-start gap-6 xl:gap-32">
                <div className="xl:w-[500px] xl:min-w-[500px] w-full flex flex-col justify-start gap-3.5 md:gap-6">
                    <CommonTitle title="Contact Us" />
                    <div className="w-full flex flex-col gap-2.5 md:gap-4 justify-start items-start">
                        {/** email */}
                        <div className="w-full flex gap-6 items-center justify-center">
                            <div className="w-10 h-10 rounded-full shrink-0 bg-[#F6F8F8 size={18}] text-dark-gray flex justify-center items-center">
                                <MdOutlineMail size={24} />
                            </div>
                            <div className="w-full flex flex-col">
                                <p className=" text-base md:text-xl font-bold text-dark-gray">Email:</p>
                                <a className=" text-sm md:text-base" href={`mailto:${CmsData?.settings?.email}`}>{CmsData?.settings?.email || "nosiy@gov.co.uk"}</a>
                            </div>
                        </div>
                        {/** phone */}
                        <div className="w-full flex gap-6 items-center justify-center">
                            <div className="w-10 h-10 rounded-full shrink-0 bg-[#F6F8F8 size={18}] text-dark-gray flex justify-center items-center">
                                <FaPhoneVolume size={24} />
                            </div>
                            <div className="w-full flex flex-col">
                                <p className=" text-base md:text-xl font-bold text-dark-gray">Phone:</p>
                                <a className=" text-sm md:text-base" href={`tel:${CmsData?.settings?.phone}`}>{CmsData?.settings?.email || "07495169560"}</a>
                            </div>
                        </div>
                        {/** address */}
                        <div className="w-full flex gap-6 items-center justify-center">
                            <div className="w-10 h-10 rounded-full shrink-0 bg-[#F6F8F8 size={18}] text-dark-gray flex justify-center items-center">
                                <FaLocationDot size={24} />
                            </div>
                            <div className="w-full flex flex-col">
                                <p className=" text-base md:text-xl font-bold text-dark-gray">Address: Brunel, London</p>
                                <a
                                    href={`https://www.google.com/maps/search/?q=${CmsData?.settings?.address}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {CmsData?.settings?.address}
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="w-full flex flex-col justify-start items-start gap-3.5 md:gap-6">
                    <CommonTitle title="Send Message" />
                    <form className="w-full flex flex-col gap-3 sm:gap-4 justify-start items-start" onSubmit={handleSubmit(onSubmit)} >
                        {/** Name */}
                        <CommonInputWrapper
                            label="Full Name"
                            name="name"
                            type="text"
                            placeholder="adam smith"
                            register={register}
                            errors={errors}
                            register_as="name"
                            validationRules={{
                                required: "Full name is required",
                            }}
                        />
                        {/** email */}
                        <CommonInputWrapper
                            label="Email address"
                            name="email"
                            type="email"
                            placeholder="Your email address"
                            register={register}
                            errors={errors}
                            register_as="email"
                            validationRules={{
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: "Enter a valid email address",
                                },
                            }}
                        />
                        {/** phone */}
                        <CommonInputWrapper
                            label="Phone Number"
                            name="phone"
                            type="tel"
                            placeholder="+44 7340955413"
                            register={register}
                            errors={errors}
                            register_as="phone"
                            validationRules={{
                                required: "Phone is required",

                            }}
                        />
                        {/** message */}
                        <CommonInputWrapper
                            label="Message"
                            name="text"
                            type="textarea"
                            placeholder="Your message..."
                            register={register}
                            errors={errors}
                            register_as="text"
                            validationRules={{
                                required: "Message is required",
                            }}
                        />
                        <CommonSubmitBtn isLoading={contactMutation.isPending} className=" transition-all duration-500 ease-in-out hover:shadow-2xl ">Send</CommonSubmitBtn>
                    </form>
                </div>
            </div>
        </CommonPageWrapper>
    )
}

export default ContactUs