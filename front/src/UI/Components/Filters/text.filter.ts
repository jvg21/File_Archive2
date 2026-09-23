
export function TextFilter<T, Keys extends keyof T>(filterString: string, fields: Keys[], data: T[]): T[] {

    if (!filterString || filterString === "") return data;
    const lowerCaseFilter = filterString.toLocaleLowerCase()

    const filteredData = data.filter((entity) => {
        console.log(entity)
        for (const field of fields) {
            console.log(field, entity[field], String(entity[field]).includes(filterString))
            if (String(entity[field]).toLocaleLowerCase().includes(lowerCaseFilter)) return true

        }
    })

    return filteredData;
}