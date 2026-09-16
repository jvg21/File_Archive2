
export type ReadingStatusId = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
export const ReadingStatusEnum = {
    0: { name: "Maybe Read" },
    1: { name: "To Read" },
    2: { name: "Reading" },
    3: { name: "Re Reading" },
    4: { name: "On Hold" },
    5: { name: "Waiting Completion" },
    6: { name: "Finished" },
    7: { name: "Abandoned" }

};


export function getReadingStatusEnum(id: ReadingStatusId) {
    return ReadingStatusEnum[id]
}

export function getReadingStatusByName(name: string) {
    const readingStatus = getAllReadingStatus().find((status) => status.name.toLowerCase()===name.toLowerCase())
    return readingStatus ? readingStatus.id : undefined

}

export function IsValidReadingStatus(id: ReadingStatusId) {
    return id in ReadingStatusEnum
}

export function IsValidReadingStatusName(name: string): boolean {
    const isValidReadingStatus = getAllReadingStatus().some((status) => status.name.toLowerCase()===name.toLowerCase())
    return isValidReadingStatus
}

export function getAllReadingStatus(): { id: number, name: string }[] {
    return Object.entries(ReadingStatusEnum).map(([id, { name }]) =>
    ({
        id: Number(id) as ReadingStatusId,
        name
    })
    )
}