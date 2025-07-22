import { CmsContext } from "@/context";
import { useContext } from "react";

export const useCMS = () => {
    return useContext(CmsContext);
}