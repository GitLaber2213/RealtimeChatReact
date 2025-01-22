import { createBrowserRouter, Navigate, Outlet, useParams } from "react-router-dom";
import { LoginPage, SignUpPage, ChatsPage } from "../../pages";
import { RouteConstants } from "../../shared/constants/constants";
import { useAuth } from "../../shared";

const AuthLoader = () => {
    const { user } = useAuth()
    const { id } = useParams()

    if (user) {
        return (
            <>
                <ChatsPage />
                <Navigate to={id ? `${RouteConstants.CHATS}${id}` : RouteConstants.CHATS} replace={true} />
            </>
        )
    } else {
        return (
            <>
                <LoginPage />
                <Navigate to={RouteConstants.LOGIN} replace={true} />
            </>
        )
    }
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
                element: <AuthLoader />
            },
            {
                path: `${RouteConstants.CHATS}:id?`,
                element: <AuthLoader />
            }
        ]
    }
])
