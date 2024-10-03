import { NavLink } from "react-router-dom"
import { useAuth } from "../../auth/hooks/useAuth";

export const NavBar = () => {

    const { login, handlerLogout } = useAuth();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">UsersApp</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse " id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/users">
                                Usuarios
                            </NavLink>
                        </li>
                        {!login.isAdmin ||
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/users/register">
                                    Registrar Usuario
                                </NavLink>
                            </li>
                        }
                    </ul>
                </div>

                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <span
                        className="nav-item nav-link text-primary mx-3">
                        {login.user?.username}
                    </span>
                    <button
                        className="btn btn-outline-success"
                        onClick={handlerLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );

}