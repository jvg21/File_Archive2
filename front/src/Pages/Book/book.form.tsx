import type { ModalFlow } from "../../Data/Types/modalFlow"
import style from '../../UI/Styles/modal.module.css'
import { UrlForms } from "../../UI/Components/Forms/url.forms";
import type { BookEntity } from "../../Data/Types/Entity/book.entity";
import { getAllWritingStatus } from "../../Data/Enums/writingStatus.enum";
import { getAllReadingStatus } from "../../Data/Enums/readingStatus.enum";
import { useEffect, useState } from "react";
import type { AuthorEntity } from "../../Data/Types/Entity/author.entity";
import { getAuthorData } from "../Author/author.functions";
import type { ShowNotificationType } from "../../Data/Context/notification.context";


interface BookFormProps {

    flow: ModalFlow,
    entity: BookEntity,
    showNotification: ShowNotificationType,
    setEntity: React.Dispatch<React.SetStateAction<BookEntity>>,
    onSubmit: () => void,
}

export const BookForm = (props: BookFormProps) => {

    const { flow, onSubmit, entity, setEntity, showNotification } = props;

    const [authors, SetAuthors] = useState<AuthorEntity[] | null>(null);
    const [authorField, setAuthorField] = useState<AuthorEntity>();

    const canEdit = flow !== 'delete';

    function HandleAddAuthor() {
        if(!authorField || !authorField.id){
            showNotification("Please select a author.", "failure");
            return;
        }

        const authors = entity.authors || [];

        authors.push(authorField);
        setEntity((prev)=>({...prev,authors}))
        
        return;
    }

    function HandleRemoveAuthor(author: Partial<AuthorEntity>) {
        return;
    }


    useEffect(() => {
        getAuthorData(SetAuthors, showNotification)
    })

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
                        disabled={!canEdit}
                        onChange={(e) => { setEntity((prev) => ({ ...prev, title: e.target.value })) }}
                    />
                </div>

                <div className={style.field}>
                    <label>Summary: </label>
                    <input type='text' value={entity?.summary ?? ""}
                        disabled={!canEdit}
                        onChange={(e) => { setEntity((prev) => ({ ...prev, summary: e.target.value })) }}
                    />
                </div>

                {flow !== 'delete' &&
                    <>
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



                        <div className={style.field}>
                            <label>Authors: </label>

                            <select value={authorField?.id ?? -1}
                                onChange={(e) => {
                                    setAuthorField(authors?.find((author) => author.id === Number(e.target.value)))
                                }}
                            >
                                <option value="" disabled selected>Authors.....</option>
                                {
                                    authors && authors.map((author) =>
                                        <option key={author.id} value={author.id}>
                                            {author.name}
                                        </option>
                                    )
                                }
                            </select>
                        </div>
                        <button className={style.fieldButton} disabled={!authorField} type="button" onClick={() => { HandleAddAuthor(); }}>Add Author</button>

                        {
                            entity.authors && entity.authors.length > 0 &&
                            entity.authors.map((author) =>
                                <div key={author.id} className={style.itemRow}>
                                    <span>{author.name ?? ""}</span>
                                    <button type="button" onClick={() => HandleRemoveAuthor(author)}> X </button>
                                </div>
                            )
                        }


                        <UrlForms
                            entity={entity}
                            setEntity={setEntity}
                            flow={flow}
                        />
                    </>
                }
                <button type="button" className={style.fieldButton} onClick={() => onSubmit()}>Submit</button>

            </form >
        </>
    )



}