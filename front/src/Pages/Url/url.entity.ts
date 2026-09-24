import type { AuthorEntity } from "../Author/author.entity";
import type { BookEntity } from "../Book/book.entity";


export interface UrlEntity {
    id: number,
    name?: string,
    content: string,
    author?: AuthorEntity
    book?: BookEntity

}