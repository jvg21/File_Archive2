import { useState } from "react";
import type { UrlEntity } from "../../../Data/Types/Entity/url.entity";
import style from '../../Styles/modal.module.css'
import type { ModalFlow } from "../../../Data/Types/modalFlow";


interface UrlFormProps<T extends { urls?: Partial<UrlEntity>[], removedUrls?: number[] }> {
    entity: T;
    setEntity: React.Dispatch<React.SetStateAction<T>>,
    flow: ModalFlow,
}


export const UrlForms = <T extends { urls?: Partial<UrlEntity>[], removedUrls?: number[] },>(props: UrlFormProps<T>) => {

    const { entity, setEntity, flow } = props;
    const [ulrField, setUrlField] = useState<Partial<UrlEntity>>();

    function handdleAddUrl() {
        if (!ulrField?.name || !ulrField.content) return;

        const urls = [...(entity.urls || []), ulrField];
        setEntity((prev) => ({ ...prev, urls }));
    }

    function handleRemoveUrl(removedUrl: Partial<UrlEntity>) {

        if (!removedUrl.id) {
            setEntity((prev) => ({
                ...prev,
                urls: prev.urls?.filter((url) => url.id !== removedUrl.id)
            }));
            return;
        }

        setEntity((prev) => ({
            ...prev,
            urls: prev.urls?.filter((url) => url.id !== removedUrl.id),
            removedUrls: [...(prev.removedUrls || []), removedUrl.id!]
        }));
    }
    return (
        <>

            {flow !== 'delete' && <div className={style.field}>
                <label>Url: </label>
                <input type='text' value={ulrField?.name ?? ""} placeholder="name"

                    onChange={(e) => {
                        setUrlField((prev) => ({ name: e.target.value, content: prev?.content ?? "" }));
                    }}
                />
                <input type='text' value={ulrField?.content ?? ""} placeholder="content"
                    onChange={(e) => {
                        setUrlField((prev) => ({ name: prev?.name ?? "", content: e.target.value }))
                    }}
                />

                <button className={style.fieldButton} type="button" onClick={() => { handdleAddUrl(); setUrlField({ content: "", name: "" }) }}>Add Url</button>
            </div>
            }
            {
                entity.urls && entity.urls.length > 0 &&
                entity.urls.map((url, index) =>
                    <div key={index} className={style.itemRow}>
                        <span>{url.name} - {url.content}</span>
                        {flow !== 'delete' && <button  type="button" onClick={() => handleRemoveUrl(url)}> X </button>}
                    </div>
                )
            }
        </>

    )

}