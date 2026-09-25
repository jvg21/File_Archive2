import type { ShowNotificationType } from "../../Data/Context/notification.context";
import { BookDataStore } from "../../Data/Datastore/book.datastore";
import { getReadingStatusByName, IsValidReadingStatusName } from "../../Data/Enums/readingStatus.enum";
import { getWritingStatusByName, IsValidWritingStatusName } from "../../Data/Enums/writingStatus.enum";
import type { BookEntity } from "./book.entity";
import type { UrlEntity } from "../Url/url.entity";
import type { RequestReturn } from "../../Data/Types/requestReturn";
import * as XLSX from 'xlsx';
import { urlNameGenerator } from "../../Utils/urlNameGenerator";
import { urlDomainRegex } from "../../Utils/Regex/urlDomain.regex";
import type { EntitiesResult } from "../../Data/Types/entitiesResult";
import type { SetStateAction } from "react";

type Entity = BookEntity;
const DataStore = new BookDataStore();

interface BookFunctionsProps {
    entity?: Entity,
    entities?: Entity[]
    setEntities?: (books: Entity[]) => void
    showNotification: ShowNotificationType
    setEntityResults?: React.Dispatch<SetStateAction<EntitiesResult<BookEntity> | undefined>>

}


/**GET FUNCIOTIONS */
export async function getBookData({ showNotification, setEntities }: BookFunctionsProps): Promise<void> {

    if (!setEntities) throw new Error;

    const request: RequestReturn = await DataStore.getAll();

    if (request.status !== 200) {
        showNotification(request.message, 'failure')
        return
    }
    setEntities(request.data as Entity[])
};


/******SUBMIT FUNCIOTIONS ***********/
export async function createBook({ showNotification, entity }: BookFunctionsProps): Promise<void> {
    if (!entity) throw new Error;

    if (!entity || !entity.title) return;

    const request = await DataStore.create(entity);

    if (request.status !== 201) {
        showNotification(request.message, 'failure')
        return
    }
    showNotification(request.message, 'success')
}


export async function createBookArray({ showNotification, entities, setEntityResults }: BookFunctionsProps) {
    if (!entities || entities.length < 0) return;

    const request = await DataStore.createArray(entities);

    if (request.status !== 200) {
        showNotification(request.message, 'failure')
        return
    }
    console.log(request.data[0])
    setEntityResults ? setEntityResults(request.data[0] as EntitiesResult<Entity>) : '';
    showNotification(request.message, 'success')
}



export async function updateBook({ showNotification, entity }: BookFunctionsProps): Promise<void> {
    if (!entity) throw new Error;

    if (!entity || !entity.id) return;

    const payload = {
        ...entity,
        urls: entity.urls?.filter((url) => !url.id),
        authors: entity.authors?.filter((author) => !author.id),
    };

    const request = await DataStore.update(payload);

    if (request.status !== 200) {
        showNotification(request.message, 'failure')
        return
    }
    showNotification(request.message, 'success')
}

export async function deleteBook({ entity, showNotification }: BookFunctionsProps): Promise<void> {
    if (!entity || !entity.id) return;

    const request = await DataStore.delete(entity.id);

    if (request.status !== 200) {
        showNotification(request.message, 'failure')
        return
    }
    showNotification(request.message, 'success')
}



export async function importBookSheet(file: File, { showNotification }: BookFunctionsProps) {
    if (!file.name.includes('.xlsx')) showNotification("Invalid File Format, must be .xlsx", 'failure');

    const request = await DataStore.importSheet(file);

    if (request.status !== 200) {
        showNotification('Error Importing', 'failure')
    }
    showNotification(request.message, 'success')
}

export async function exportBookSheet({ showNotification }: BookFunctionsProps) {

    const request = await DataStore.exportTemplateSheet();
    
    if (request.status !== 200) {
        showNotification('Error Exporting', 'failure')
    }
    
    const url = window.URL.createObjectURL(request.data[0] as Blob)

    const link = document.createElement("a");
    link.href = url;
    link.download = "BookArrayInsertTemplate.xlsx";

    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(url); ""
    link.remove();

   
    showNotification(request.message, 'success')
}


export async function importInsertBookSheet(file: File, { showNotification }: BookFunctionsProps) {
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

        const books: BookEntity[] = []
        jsonData.forEach((bookRow: string[], index) => {
            if (index === 0 || bookRow[0] === "") return;

            const urls: Partial<UrlEntity>[] = []

            for (var i = 9; i <= 11; i++) {
                var name = urlNameGenerator(bookRow[i]);
                if (bookRow[i]) urls.push({ content: bookRow[i], name: name.match(urlDomainRegex)?.[1] })
            }

            const book: BookEntity = {
                id: index * -1,
                title: bookRow[0],
                summary: bookRow[1],
                notes: bookRow[2],
                rating: bookRow[3] !== "" ? Number(bookRow[3]) : undefined,
                currentChapter: bookRow[4] !== "" ? Number(bookRow[4]) : 0,
                totalChapters: bookRow[5] !== "" ? Number(bookRow[5]) : undefined,
                words: bookRow[6] !== "" ? Number(bookRow[6]) : undefined,
                readingStatus: IsValidReadingStatusName(bookRow[7]) === true ? getReadingStatusByName(bookRow[7]) : undefined,
                writingStatus: IsValidWritingStatusName(bookRow[8]) === true ? getWritingStatusByName(bookRow[8]) : undefined,
                authors: [],
                urls: urls
            }
            books.push(book);

        });
        console.log(books)
        return books;

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