import { type ShowNotificationType } from "../../Data/Context/notification.context";
import { AuthorDataStore } from "../../Data/Datastore/author.datastore";
import type { AuthorEntity } from "../../Data/Types/Entity/author.entity";
import type { RequestReturn } from "../../Data/Types/requestReturn";



type Entity = AuthorEntity;
const DataStore = new AuthorDataStore();

/**GET FUNCIOTIONS */
export async function getAuthorData(setTableData: React.Dispatch<React.SetStateAction<Entity[] | null>>, showNotification: ShowNotificationType): Promise<void> {

    const request: RequestReturn = await DataStore.getAll();

    if (request.status !== 200) {
        showNotification(request.message, 'failure')
        return
    }
    setTableData(request.data as Entity[])
};

export async function getAuthorMiniData(setTableData: React.Dispatch<React.SetStateAction<Entity[] | null>>, showNotification: ShowNotificationType): Promise<void> {

    const request: RequestReturn = await DataStore.getAllMini();

    if (request.status !== 200) {
        showNotification(request.message, 'failure')
        return
    }
    setTableData(request.data as Entity[])
};


/******SUBMIT FUNCIOTIONS ***********/
export async function createAuthor(entity: Entity, showNotification: ShowNotificationType): Promise<void> {
    if (!entity || !entity.name) return;

    const request = await DataStore.create(entity);

    if (request.status !== 201) {
        showNotification(request.message, 'failure')
        return
    }
    showNotification(request.message, 'success')
}


export async function updateAuthor(entity: Entity, showNotification: ShowNotificationType): Promise<void> {

    if (!entity || !entity.id) return;

    const payload = {
        ...entity,
        urls: entity.urls?.filter((url) => !url.id)
    };

    const request = await DataStore.update(payload);

    if (request.status !== 200) {
        showNotification(request.message, 'failure')
        return
    }
    showNotification(request.message, 'success')
}

export async function deleteAuthor(id: number, showNotification: ShowNotificationType): Promise<void> {

    if (!id) return;

    const request = await DataStore.delete(id);

    if (request.status !== 200) {
        showNotification(request.message, 'failure')
        return
    }
    showNotification(request.message, 'success')
}

export function generateEmptyAuthor(): Entity {
    return {
        id: -1,
        name: "",
        urls: [],
    }
}