
import style from '../../UI/Styles/table.module.css'

import type { TableColumns } from '../../UI/Components/Table/table.component';

import type { AuthorEntity } from '../../Data/Types/Entity/author.entity';


export const AuthorColumns: TableColumns<AuthorEntity>[] = [
    { key: 'id', header: 'Id' },
    { key: "name", header: "Name" },
    {
        key: "urls", header: 'Urls',
        render: (value) => {
            const urls = value as AuthorEntity["urls"];

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

