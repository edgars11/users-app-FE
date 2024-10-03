import { LoginPage } from "./auth/pages/LoginPage";
import { Routes, Route, Navigate } from "react-router-dom";
import { UserRoutes } from "./routes/UserRoutes";
import { useSelector } from "react-redux";

export const AppRoutes = () => {

    const { isAuth, isLoginLoading } = useSelector(state => state.auth);

    if (isLoginLoading) {
        return (
            <div className="container my-4 text-center">
                <div className="spinner-grow" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    return (

        <Routes>
            {
                isAuth
                    ? (<Route path="/*" element={<UserRoutes />} />)
                    :
                    <>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/*" element={<Navigate to="/login" />} />
                    </>
            }
        </Routes>
    );
}