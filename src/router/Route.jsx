import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import CreateNoticePage from "../Pages/CreateNoticePage";

// import NoticeListPage from "../Pages/NoticeListPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'create',
                element: <CreateNoticePage />
            },
            // {
            //     path: 'notices',
            //     element: <NoticeListPage />
            // }
        ]
    }
]);