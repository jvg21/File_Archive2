import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/auth.context";

export function PublicRoute() {
    const { isAuthenticated, isLoading } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated && !isLoading) {
            navigate('/')
        }
    }, [isAuthenticated, isLoading, navigate])


    if (isLoading) return <p>loading ....</p>

    return <Outlet />
}