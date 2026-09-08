import type { AuthorEntity } from "../../Data/Types/Entity/author.entity";


type Entity = AuthorEntity;

export function generateEmptyAuthor(): Entity {
    return {
        id: -1,
        name: "",
        urls: [],
    }
}