import { UserForm } from "./UserForm";
import { useUsers } from "../hooks/useUsers";

export const UserModalForm = () => {

    const { userSelected, handleCloseForm } = useUsers();

    return (
        <div className="abrir-modal animacion fadeIn">
            <div className="modal" tabIndex="-1" style={{ display: "block" }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                {userSelected.id > 0 ? 'Editar' : 'Crear'} Modal Usuario
                            </h5>
                        </div>
                        <div className="modal-body">
                            <UserForm
                                userSelected={userSelected}
                                handleCloseForm={handleCloseForm}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}