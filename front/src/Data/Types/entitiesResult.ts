export interface FailedEntity<T> {
    entry: T,
    errorMessage: string
}

export interface EntitiesResult<T> {
    success: T[],
    failed: FailedEntity<T>[]
}