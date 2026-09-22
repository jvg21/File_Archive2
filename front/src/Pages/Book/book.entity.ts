import type { AuthorEntity } from "../Author/author.entity";
import type { UrlEntity } from "../Url/url.entity";


export interface BookEntity {
    id: number;
    title: string;
    summary: string;
    notes?: string;
    currentChapter?: number;
    totalChapters?: number;
    rating?: number;
    words?: number;
    readingStatus?: number;
    writingStatus?: number;

    urls?: Partial<UrlEntity>[];
    removeUrls?: number[],

    authors?: Partial<AuthorEntity>[];
    removeAuthors?: number[];
}

