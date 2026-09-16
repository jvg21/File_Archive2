import type { ShowNotificationType } from "../../Data/Context/notification.context";
import { BookDataStore } from "../../Data/Datastore/book.datastore";
import { getReadingStatusByName, IsValidReadingStatusName } from "../../Data/Enums/readingStatus.enum";
import { getWritingStatusByName, IsValidWritingStatusName } from "../../Data/Enums/writingStatus.enum";
import type { BookEntity } from "../../Data/Types/Entity/book.entity";
import type { RequestReturn } from "../../Data/Types/requestReturn";
import * as XLSX from 'xlsx';

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


export async function importInsertBookSheet(file: File, showNotification: ShowNotificationType) {
    // console.log(file.)
    if (!file.name.includes('.xlsx')) showNotification("Invalid File Format, must be .xlsx", 'failure');

    try {

        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData: [][] = XLSX.utils.sheet_to_json(worksheet, {
            header: 1,
            defval: "",
        });

        console.log(jsonData)

        const books: BookEntity[] = []
        jsonData.forEach((bookRow: string[], index) => {
            if (index === 0 || bookRow[0] === "") return;

            const book: BookEntity = {
                id: -1,
                title: bookRow[0],
                summary: bookRow[1],
                notes: bookRow[2],
                rating: bookRow[3] !== "" ? Number(bookRow[3]) : undefined,
                currentChapter: bookRow[4] !== "" ? Number(bookRow[4]) : undefined,
                totalChapters: bookRow[5] !== "" ? Number(bookRow[5]) : undefined,
                words: bookRow[6] !== "" ? Number(bookRow[6]) : undefined,
                readingStatus: IsValidReadingStatusName(bookRow[7]) ? getReadingStatusByName(bookRow[7]) : undefined,
                writingStatus: IsValidWritingStatusName(bookRow[8]) ? getWritingStatusByName(bookRow[8]) : undefined,
                authors: [],
                urls: []
            }
            books.push(book);
        });

        console.log(books)


        // const request = await DataStore.createArray([]);

        // if (request.status !== 200) {
        //     showNotification(request.message, 'failure')
        //     return
        // }
        // showNotification(request.message, 'success')
    }
    catch (e) {
        showNotification(e instanceof Error ? e.message : 'Error Importing', 'failure')
    }
}


export function generateEmptyBook(): Entity {
    return {
        id: -1,
        title: "",
        summary: "",
        urls: [],
    }
}