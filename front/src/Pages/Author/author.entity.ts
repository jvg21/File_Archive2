import type { UrlEntity } from "../Url/url.entity";

export interface AuthorEntity  {
    id:number,
    name:string,
    urls?: Partial<UrlEntity>[],
    removeUrls?: number[],
    isActive?:boolean
    // books?:Partial<BookEntity>[]
}