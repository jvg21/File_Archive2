import type { AuthorEntity } from "./author.entity";
import type { FileArchive } from "./fileArchive.entity";
import type { UrlEntity } from "./url.entity";


export interface BookEntity {
    id: number;
    name: string;
    summary: string;
    notes?: string;
    currentChapter?: number;
    totalChapters?: number;
    rating?: number;
    words?: number;
    readingStatus?: number;
    writingStatus?: number;
    authors: Partial<AuthorEntity>[];
    files: Partial<FileArchive>[];
    urls?: Partial<UrlEntity>[];
}