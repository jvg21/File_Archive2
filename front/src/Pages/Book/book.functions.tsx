import type { BookEntity } from "../../Data/Types/Entity/book.entity";


type Entity = BookEntity;

export function generateEmptyBook(): Entity {
    return {
        id: -1,
        title: "",
        summary: "",
        urls: [],
    }
}