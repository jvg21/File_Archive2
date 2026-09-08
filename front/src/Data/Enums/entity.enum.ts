export const EntityEnum = {
    1: { name: "Author" },
    2: { name: "Book" },
    3: { name: "Comic" },
    4: { name: "Video" },
    5: { name: "Music" },
    6: { name: "Games" }
} as const;

export type EntityEnum = typeof EntityEnum[keyof typeof EntityEnum];