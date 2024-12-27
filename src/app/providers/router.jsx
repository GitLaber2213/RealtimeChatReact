import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { LoginPage, SignUpPage, ChatsPage } from "../../pages";
import { RouteConstants } from "../../shared/constants/constants";
import { useAuth } from "../../shared";

const AuthLoader = () => {
    const { auth } = useAuth();
    return auth ? <Navigate to={RouteConstants.CHATS} replace /> : <Navigate to={RouteConstants.LOGIN} replace />;
}

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Outlet />,
        children: [
            {
                index: true,
                element: <AuthLoader />
            },
            {
                path: RouteConstants.LOGIN,
                element: <LoginPage />
            },
            {
                path: RouteConstants.SIGN_UP,
                element: <SignUpPage />
            },
            {
                path: RouteConstants.CHATS,
                element: <ChatsPage />
            },
            {
                path: `${RouteConstants.CHATS}:id`,
                element: <ChatsPage />
            }
        ]
    }
]);
