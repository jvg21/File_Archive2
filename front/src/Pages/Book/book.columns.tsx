
import style from '../../UI/Styles/table.module.css'

import type { TableColumns } from '../../UI/Components/Table/table.component';

import type { BookEntity } from '../../Data/Types/Entity/book.entity';
import { getReadingStatusEnum, type ReadingStatusId } from '../../Data/Enums/readingStatus.enum';
import { getWritingStatusEnum, type WritingStatusId } from '../../Data/Enums/writingStatus.enum';
import { Link } from 'react-router-dom';


export const BookColumns: TableColumns<BookEntity>[] = [
    { key: 'id', header: 'Id' },
    { key: "title", header: "Title" },
    {
        key: "authors", header: 'Authors',
        render: (value) => {
            const authors = value as BookEntity["authors"];

            return authors && authors.length > 0 &&
                <ul className={style.urls} >
                    {
                        authors.map(author =>
                            <li key={author.id}><Link target="_blank" to={`/author/${author.id}`}>{author.name}</Link></li>
                        )
                    }
                </ul>

        }
    },
    { key: "summary", header: "summary",
        render:(value) =>{
            const summary = value as BookEntity["summary"];
            return summary.slice(0,20)
        }
     },
    {
        key: "currentChapter", header: "Chapters",
        render: (value, row) => {
            return `${value}/${row.totalChapters ?? '??'}`
        }
    },
    { key: "rating", header: "Rating" },
    { key: "words", header: "Words" },
    {
        key: "readingStatus", header: "Reading Status",
        render: (value) => {
            return `${getReadingStatusEnum(value as ReadingStatusId).name}`
        }
    },
    {
        key: "writingStatus", header: "Writing Status",
        render: (value) => {
            return `${getWritingStatusEnum(value as WritingStatusId).name}`
        }
    },

    {
        key: "urls", header: 'Urls',
        render: (value) => {
            const urls = value as BookEntity["urls"];

            return urls && urls.length > 0 &&
                <ul className={style.urls} >
                    {
                        urls.map(url =>
                            <li key={url.id}><a target="_blank" href={url.content}>{url.name}</a></li>
                        )
                    }
                </ul>

        }
    }
]

