export type WritingStatusId = 0 | 1 | 2 | 3;

export const WritingStatusEnum: Record<WritingStatusId, { name: string }> = {
    0: { name: "In Progress" },
    1: { name: "Hiatus" },
    2: { name: "Finished" },
    3: { name: "Abandoned" },

}

export function getWritingStatusEnum(id: WritingStatusId) {
    return WritingStatusEnum[id]
}

export function IsValidWritingStatus(id: WritingStatusId) {
    return id in WritingStatusEnum
}

export function getAllWritingStatus(): { id: number, name: string }[] {
    
    return Object.entries(WritingStatusEnum).map(([id, { name }]) =>
    ({
        id: Number(id) as WritingStatusId,
        name
    })
    )
}