import type { AuthorEntity } from "../Author/author.entity";


export interface UrlEntity {
    id: number,
    name?: string,
    content: string,
    author?: AuthorEntity

}