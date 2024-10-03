import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { loginService } from "../services/authServices";
import { useDispatch, useSelector } from "react-redux";
import { onLogin, onLogout, onInitLogin } from "../../store/slices/Auth/authSlice";

export const useAuth = () => {

    const dispatch = useDispatch();
    const { user, isAdmin, isAuth } = useSelector(state => state.auth);

    // const [login, dispatch] = useReducer(loginReducer, initialLogin);
    const navigate = useNavigate();

    const handlerLogin = async ({ username, password }) => {
        // Implementación del Login
        try {

            dispatch(onInitLogin());

            const response = await loginService({ username, password });
            const token = response.data.token;
            const claims = JSON.parse(window.atob(token.split(".")[1]));
            console.log(claims);
            const user = { username: claims.username }
            dispatch(onLogin({ user, isAdmin: claims.isAdmin }));
            sessionStorage.setItem('login', JSON.stringify({
                isAuth: true,
                isAdmin: claims.isAdmin,
                user
            }))
            sessionStorage.setItem('token', `Bearer ${token}`);
            navigate("/users");

        } catch (error) {
            dispatch(onLogout());
            if (error.response?.status == 401) {
                Swal.fire('Error de validación', 'Username o password son incorrectos!', 'error');
            } else if (error.response?.status == 403) {
                Swal.fire('Error de validación', 'No tiene permisos o accesos al recurso!', 'error');
            } else {
                throw error;
            }
        }
    }

    const handlerLogout = () => {
        dispatch(onLogout());
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('login');
        sessionStorage.clear();
    }

    return {
        login: {
            user,
            isAdmin,
            isAuth
        },
        handlerLogin,
        handlerLogout
    };

}