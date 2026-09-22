import { type ShowNotificationType } from "../../Data/Context/notification.context";
import { AuthorDataStore } from "../../Data/Datastore/author.datastore";
import type { AuthorEntity } from "./author.entity";
import type { RequestReturn } from "../../Data/Types/requestReturn";



type Entity = AuthorEntity;
const DataStore = new AuthorDataStore();

interface AuthorFunctionsProps {

    entity?: Entity,
    entities?: Entity[]
    setEntities?: (author: Entity[]) => void
    showNotification: ShowNotificationType

}

/**GET FUNCIOTIONS */
export async function getAuthorData({ showNotification, setEntities }: AuthorFunctionsProps): Promise<void> {

    if (!showNotification || !setEntities) throw new Error();
    const request: RequestReturn = await DataStore.getAll();

    if (request.status !== 200) {
        showNotification(request.message, 'failure')
        return
    }
    setEntities(request.data as Entity[])
};

export async function getAuthorMiniData({ showNotification, setEntities }: AuthorFunctionsProps): Promise<void> {

    if (!showNotification || !setEntities) throw new Error();
    const request: RequestReturn = await DataStore.getAllMini();

    if (request.status !== 200) {
        showNotification(request.message, 'failure')
        return
    }
    setEntities(request.data as Entity[])
};


/******SUBMIT FUNCIOTIONS ***********/
export async function createAuthor({ entity, showNotification }: AuthorFunctionsProps): Promise<void> {
    if (!entity || !entity.name || !showNotification) return;

    const request = await DataStore.create(entity);

    if (request.status !== 201) {
        showNotification(request.message, 'failure')
        return
    }
    showNotification(request.message, 'success')
}


export async function updateAuthor({ entity, showNotification }: AuthorFunctionsProps): Promise<void> {

    if (!entity || !entity.id || !showNotification) return;

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

export async function deleteAuthor({ entity, showNotification }: AuthorFunctionsProps): Promise<void> {

    if (!entity || !entity.id || !showNotification) return;

    const request = await DataStore.delete(entity.id);

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