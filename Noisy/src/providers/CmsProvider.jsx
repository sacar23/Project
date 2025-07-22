import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { CmsContext } from "@/context";
const CmsProvider = ({ children }) => {
    const axiosPublic = useAxiosPublic();
    const { data: CmsData, isLoading: CmsDataLoading, error: CmsDataError } = useQuery({
        queryKey: ["CMS"],
        queryFn: async () => {
            const response = await axiosPublic.get(`/page/about`);
            return response?.data?.data;
        },
    });
    return (
        <CmsContext.Provider value={{ CmsData, CmsDataLoading, CmsDataError }}>
            {children}
        </CmsContext.Provider>
    );
};

export default CmsProvider;
