import { useState } from "react";
import type { UrlEntity } from "../../../Data/Types/Entity/url.entity";
import type { ModalFlow } from "../../../Data/Types/modalFlow";
import style from '../../Styles/modal.module.css'
import { urlNameGenerator } from "../../../utils/urlNameGenerator";
import { useNotification } from "../../../Data/Context/notification.context";


interface UrlFormProps<T extends { urls?: Partial<UrlEntity>[], removeUrls?: number[] }> {
    entity: T;
    setEntity: React.Dispatch<React.SetStateAction<T>>,
    flow: ModalFlow,
}


export const UrlForms = <T extends { urls?: Partial<UrlEntity>[], removeUrls?: number[] },>(props: UrlFormProps<T>) => {

    const { entity, setEntity, flow } = props;

    const { showNotification } = useNotification();

    const [ulrField, setUrlField] = useState<Partial<UrlEntity>>();

    function handleAddUrl() {
        if (!ulrField || !ulrField.content) return;

        const urlName = ulrField?.name && ulrField.name !== ""
            ? ulrField.name.trim()
            : urlNameGenerator(ulrField.content);

        if (urlName === "") {
            showNotification("Please provide a name for the url.", "failure");
            return;
        }

        const newUrl: Partial<UrlEntity> = { ...ulrField, name: urlName };

        const urls = [...(entity.urls || []), newUrl];
        setEntity((prev) => ({ ...prev, urls }));

        setUrlField({ content: "", name: "" });
    }

    function handleRemoveUrl(removeUrl: Partial<UrlEntity>) {

        if (!removeUrl.id) {
            setEntity((prev) => ({
                ...prev,
                urls: prev.urls?.filter((url) => url.id !== removeUrl.id)
            }));
            return;
        }

        setEntity((prev) => ({
            ...prev,
            urls: prev.urls?.filter((url) => url.id !== removeUrl.id),
            removeUrls: [...(prev.removeUrls || []), removeUrl.id!]
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

                <button className={style.fieldButton} disabled={!ulrField?.content} type="button" onClick={() => { handleAddUrl(); }}>Add Url</button>
            </div>
            }
            {
                entity.urls && entity.urls.length > 0 &&
                entity.urls.map((url, index) =>
                    <div key={index} className={style.itemRow}>
                        <span>{url.name ?? ""} - {url.content}</span>
                        {flow !== 'delete' && <button type="button" onClick={() => handleRemoveUrl(url)}> X </button>}
                    </div>
                )
            }
        </>

    )

}