import { useEffect, useState } from "react";
import { useUsers } from "../hooks/useUsers";


export const UserForm = ({ handleCloseForm, userSelected }) => {

    const { handlerAddUser, initialUserForm, errors } = useUsers();

    const [userForm, setUserForm] = useState(initialUserForm);
    const { id, username, password, email, admin } = userForm;
    const [checked, setChecked] = useState(admin);

    useEffect(() => {
        setUserForm({
            ...userSelected,
            password: ''
        });
    }, [userSelected]);

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setUserForm({
            ...userForm,
            [name]: value
        }
        );
    }

    const onCheckboxChange = () => {
        setChecked(!checked);
        setUserForm(
            { ...userForm, admin: checked }
        );
    }

    const onSubmit = (event) => {
        event.preventDefault();
        // if (!username || (!password && id === 0) || !email) {
        //     Swal.fire({
        //         title: "Error de validación",
        //         text: "Complete todo los campos del formulario",
        //         icon: "error"
        //     });
        //     return;
        // }

        // if(!email.includes('@')){
        //     Swal.fire({
        //         title: "Error de validación Email",
        //         text: "Ingrese un email válido!",
        //         icon: "error"
        //     });
        //     return;
        // }
        // console.log(userForm);
        // Guardar el userForm en el listado de usuarios
        handlerAddUser(userForm);

    }

    const onCloseForm = () => {
        handleCloseForm();
        setUserForm(initialUserForm);
    }

    return (
        <form onSubmit={onSubmit} >
            <input
                className="form-control my-3 w-75"
                placeholder="Username"
                name="username"
                value={username}
                onChange={onInputChange} />
            <p className="text-danger"> {errors?.username}</p>
            {
                id > 0 || <input
                    className="form-control my-3 w-75"
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={onInputChange} />
            }
            <p className="text-danger"> {errors?.password}</p>

            <input
                className="form-control my-3 w-75"
                placeholder="Email"
                name="email"
                value={email}
                onChange={onInputChange} />
            <p className="text-danger"> {errors?.email}</p>

            <div className="my-3 form-check">
                <input type="checkbox"
                    name="admin"
                    checked={admin}
                    className="form-check-input"
                    onChange={onCheckboxChange}
                />
                <label className="form-check-label">Admin</label>
            </div>
            <input
                type="hidden"
                name="id"
                value={id} />
            <button
                className="btn btn-primary"
                type="submit">
                {id > 0 ? 'Editar' : 'Crear'}
            </button>

            {!handleCloseForm ||
                <button
                    className="btn btn-warning mx-2"
                    type="button"
                    onClick={onCloseForm}>
                    Cerrar
                </button>}

        </form>);
}