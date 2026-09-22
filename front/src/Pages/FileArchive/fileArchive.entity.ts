import type { AuthorEntity } from "../Author/author.entity";
import type { BookEntity } from "../Book/book.entity";


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