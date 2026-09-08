import type { UrlEntity } from "./url.entity";

export interface AuthorEntity  {
    id:number,
    name:string,
    urls?: Partial<UrlEntity>[],
    removeUrls?: number[],
    // books?:Partial<BookEntity>[]
}