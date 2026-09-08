import type { AuthorEntity } from "./author.entity";


export interface UrlEntity {
    id: number,
    name: string,
    content: string,
    author?: AuthorEntity

}