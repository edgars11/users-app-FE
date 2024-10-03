import { Navigate, Routes, Route } from "react-router-dom"
import { NavBar } from "../components/layout/NavBar";
import { UsersPage } from "../pages/UsersPage";
import { RegisterPage } from "../pages/RegisterPage";
import { useAuth } from "../auth/hooks/useAuth";

export const UserRoutes = () => {

    const { login } = useAuth();
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="users" element={
                    <UsersPage />} />
                <Route path="users/page/:page" element={
                    <UsersPage />} />
                {
                    !login.isAdmin || <>
                        <Route path="users/register" element={
                            <RegisterPage />} />

                        <Route path="users/edit/:id" element={
                            <RegisterPage />} />
                    </>
                }

                <Route path="/" element={<Navigate to="/users" />} />
            </Routes>
        </>
    );
}