import type { ModalFlow } from "../../Data/Types/modalFlow"
import style from '../../UI/Styles/modal.module.css'
import type { AuthorEntity } from "../../Data/Types/Entity/author.entity";
import { UrlForms } from "../../UI/Components/Forms/url.forms";


interface AuthorFormProps {

    flow: ModalFlow,
    entity: AuthorEntity,
    setEntity: React.Dispatch<React.SetStateAction<AuthorEntity>>,
    onSubmit: () => void,
}

export const AuthorForm = (props: AuthorFormProps) => {

    const { flow, onSubmit, entity, setEntity } = props;

    return (
        <>
            <h3>
                Author
            </h3>
            <form onSubmit={() => onSubmit()} className={style.modalForm}>

                {flow !== 'create' &&
                    <div className={style.field}>
                        <label>Id: </label>
                        <input type='text' value={entity.id ?? -1} disabled />
                    </div>
                }

                <div className={style.field}>
                    <label>Name: </label>
                    <input type='text' value={entity?.name ?? ""}
                        onChange={(e) => { setEntity((prev) => ({ ...prev, name: e.target.value })) }}
                    />
                </div>

                

                <UrlForms
                    entity={entity}
                    setEntity={setEntity}
                    flow={flow}
                />


                <button type="button" onClick={() => onSubmit()}>Submit</button>

            </form >
        </>
    )



}