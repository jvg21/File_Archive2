import type { ModalFlow } from "../../Data/Types/modalFlow"
import style from '../../UI/Styles/modal.module.css'
import { UrlForms } from "../../UI/Components/Forms/url.forms";
import type { BookEntity } from "../../Data/Types/Entity/book.entity";
import { getAllWritingStatus } from "../../Data/Enums/writingStatus.enum";
import { getAllReadingStatus } from "../../Data/Enums/readingStatus.enum";


interface BookFormProps {

    flow: ModalFlow,
    entity: BookEntity,
    setEntity: React.Dispatch<React.SetStateAction<BookEntity>>,
    onSubmit: () => void,
}

export const BookForm = (props: BookFormProps) => {

    const { flow, onSubmit, entity, setEntity } = props;

    return (
        <>
            <h3>
                Book
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
                    <input type='text' value={entity?.title ?? ""}
                        onChange={(e) => { setEntity((prev) => ({ ...prev, title: e.target.value })) }}
                    />
                </div>

                <div className={style.field}>
                    <label>Summary: </label>
                    <input type='text' value={entity?.summary ?? ""}
                        onChange={(e) => { setEntity((prev) => ({ ...prev, summary: e.target.value })) }}
                    />
                </div>

                <div className={style.field}>
                    <label>Current Chapter: </label>
                    <input type='number' value={entity?.currentChapter ?? ""}
                        onChange={(e) => { setEntity((prev) => ({ ...prev, currentChapter: Number(e.target.value) })) }}
                    />
                </div>

                <div className={style.field}>
                    <label>Total Chapters: </label>
                    <input type='number' value={entity?.totalChapters ?? 0}
                        onChange={(e) => { setEntity((prev) => ({ ...prev, totalChapters: Number(e.target.value) })) }}
                    />
                </div>

                <div className={style.field}>
                    <label>Writing Status: </label>

                    <select value={entity?.writingStatus ?? 0}
                        onChange={(e) => {
                            setEntity((prev) => ({ ...prev, writingStatus: Number(e.target.value) }))
                        }}
                    >
                        <option value="" disabled>Writing Status.....</option>
                        {
                            getAllWritingStatus().map((status) =>
                                <option key={status.id} value={status.id}>
                                    {status.name}
                                </option>
                            )
                        }
                    </select>
                </div>

                <div className={style.field}>
                    <label>Reading Status: </label>
                    <select value={entity?.readingStatus ?? 0}
                        onChange={(e) => {
                            setEntity((prev) => ({ ...prev, readingStatus: Number(e.target.value) }))
                        }}
                    >
                        <option value="" disabled>Writing Status.....</option>
                        {
                            getAllReadingStatus().map((status) =>
                                <option key={status.id} value={status.id}>
                                    {status.name}
                                </option>
                            )
                        }
                    </select>
                </div>

                <div className={style.field}>
                    <label>Words: </label>
                    <input type='number' value={entity?.words ?? 0}
                        onChange={(e) => {
                            setEntity((prev) => ({ ...prev, words: Number(e.target.value) }))
                        }}
                    />
                </div>

                <div className={style.field}>
                    <label>Rating: </label>
                    <input type='number' value={entity?.rating ?? 0}
                        onChange={(e) => { setEntity((prev) => ({ ...prev, rating: Number(e.target.value) })) }}
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