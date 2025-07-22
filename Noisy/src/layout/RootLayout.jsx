/* eslint-disable no-unused-vars */
import Header from "@/shared/Header"
import Footer from "@/shared/Footer"
import { Outlet, ScrollRestoration } from "react-router-dom"
import { useCMS } from "@/hooks/useCMS"
import ScreenLoading from "@/components/common/ScreenLoading"

const RootLayout = () => {
    const { CmsDataLoading } = useCMS()
    return (
        <div className="w-full">
            {/**
             * 
             * {
                CmsDataLoading && <ScreenLoading />
            }
             * 
             */}
            <Header />
            <Outlet />
            <Footer />
            <ScrollRestoration />
        </div>
    )
}

export default RootLayout