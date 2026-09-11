import type { ShowNotificationType } from "../../Data/Context/notification.context";
import { BookDataStore } from "../../Data/Datastore/book.datastore";
import type { BookEntity } from "../../Data/Types/Entity/book.entity";
import type { RequestReturn } from "../../Data/Types/requestReturn";


type Entity = BookEntity;
const DataStore = new BookDataStore();

/**GET FUNCIOTIONS */
export async function getBookData(setTableData: React.Dispatch<React.SetStateAction<Entity[] | null>>, showNotification: ShowNotificationType): Promise<void> {

    const request: RequestReturn = await DataStore.getAll();

    if (request.status !== 200) {
        showNotification(request.message, 'failure')
        return
    }
    setTableData(request.data as Entity[])
};


/******SUBMIT FUNCIOTIONS ***********/
export async function createBook(entity: Entity, showNotification: ShowNotificationType): Promise<void> {
    if (!entity || !entity.title) return;

    const request = await DataStore.create(entity);

    if (request.status !== 201) {
        showNotification(request.message, 'failure')
        return
    }
    showNotification(request.message, 'success')
}


export async function updateBook(entity: Entity, showNotification: ShowNotificationType): Promise<void> {

    if (!entity || !entity.id) return;

    const payload = {
        ...entity,
        urls: entity.urls?.filter((url) => !url.id),


    };

    const request = await DataStore.update(payload);

    if (request.status !== 200) {
        showNotification(request.message, 'failure')
        return
    }
    showNotification(request.message, 'success')
}

export async function deleteBook(id: number, showNotification: ShowNotificationType): Promise<void> {

    if (!id) return;

    const request = await DataStore.delete(id);

    if (request.status !== 200) {
        showNotification(request.message, 'failure')
        return
    }
    showNotification(request.message, 'success')
}


export function importInsertBookSheet(file: File, showNotification: ShowNotificationType) {
    console.log(file)
    if (!file.name.includes('.xlsx')) showNotification("Invalid File Format, must be .xlsx",'failure');
}


export function generateEmptyBook(): Entity {
    return {
        id: -1,
        title: "",
        summary: "",
        urls: [],
    }
}