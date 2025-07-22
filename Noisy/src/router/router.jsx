
import { createBrowserRouter } from "react-router-dom";
import Home from "@/page/Home";
import RootLayout from "@/layout/RootLayout";
import AboutUs from "@/page/AboutUs";
import ContactUs from "@/page/ContactUs";


const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/about-us",
                element: <AboutUs />
            },
            {
                path: "/contact-us",
                element: <ContactUs />
            },
        ]
    },
    {
        path: "*",
        element: () => <h1>Page Not Found</h1>,
    }


]);

export default router;
