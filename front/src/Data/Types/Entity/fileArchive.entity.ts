import type { AuthorEntity } from "./author.entity";
import type { BookEntity } from "./book.entity";


export interface FileArchive  {
    id: number,
    name: string,
    storageName: string,
    extension: string,
    mimeType: string,
    path: string,
    storageBytes:number
    author?: AuthorEntity,
    book?: BookEntity,
}