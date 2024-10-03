import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { findAllPages, remove, save, update } from "../services/userService";
import { useDispatch, useSelector } from "react-redux";
import { initialUserForm, addUser, loadingUsers, removeUser, updateUser, onUserSelectedForm, onOpenForm, onCloseForm, loadingError } from "../store/slices/users/usersSlice";
import { useAuth } from "../auth/hooks/useAuth";

export const useUsers = () => {

    const { users, userSelected, visibleForm, errors , isLoading, paginator} = useSelector(state => state.users);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    
    const { login, handlerLogout } = useAuth();

    const getUsers = async (page = 0) => {
        try {
            const result = await findAllPages(page);
            dispatch(loadingUsers(result.data));
        } catch (error) {
            if (error.response?.status == 401) {
                handlerLogout();
            }
        }
    }

    const handlerAddUser = async (user) => {
        // console.log(user);
        if (!login.isAdmin) return;

        let response;
        try {


            if (user.id === 0) {
                response = await save(user);
                dispatch(addUser(response.data));
            } else {
                response = await update(user);
                dispatch(updateUser(response.data));
            }

            Swal.fire({
                title: user.id === 0 ?
                    "Usuario Creado" :
                    'Usuario Actualizado',
                text: user.id === 0 ?
                    "El usuario se creó correctamente!" :
                    'El usuario de actualizó correctamente!',
                icon: "success"
            });

            handleCloseForm();
            navigate("/users");
        } catch (error) {
            if (error.response && error.response.status === 400) {
                dispatch(loadingError(error.response.data));
            } else if (error.response && error.response.status === 500
                && error.response.data?.message?.includes('constraint')) {

                if (error.response.data?.message?.includes('UK_username')) {
                    dispatch(loadingError({ username: 'El username ingresado ya existe!' }));
                }
                if (error.response.data?.message?.includes('UK_email')) {
                    dispatch(loadingError({ email: 'El email ingresado ya existe!' }));
                }

            } else if (error.response?.status == 401) {
                handlerLogout();
            } else {
                throw error;
            }
        }
    }

    const handlerRemove = (id) => {

        if (!login.isAdmin) return;

        Swal.fire({
            title: "Desea eliminar el cliente seleccionado?",
            text: "No se podrá revertir el cambio!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await remove(id);
                    dispatch(removeUser(id));
                    Swal.fire({
                        title: "Eliminado!",
                        text: "El cliente a sido eliminado correctamente!",
                        icon: "success"
                    });
                } catch (error) {
                    if (error.response?.status == 401) {
                        handlerLogout();
                    }
                }
            }
        });

    }

    const handleUserSelectedForm = (user) => {
        dispatch(onUserSelectedForm({ ...user }));
    }
    const handleOpenForm = () => {
        dispatch(onOpenForm());
    }
    const handleCloseForm = () => {
        dispatch(onCloseForm());
        dispatch(loadingError({}));
    }

    return {
        users,
        userSelected,
        initialUserForm,
        visibleForm,
        errors,
        isLoading,
        paginator,
        handlerAddUser,
        handlerRemove,
        handleUserSelectedForm,
        handleOpenForm,
        handleCloseForm,
        getUsers
    }

}