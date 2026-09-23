interface KeyType<T> {
    Key: keyof T;

}


export function TextFilter<T>(filter: string, data: T[], attributes: KeyType<T>[]) {
    if (!filter || filter === "") return data;

    const filterLower = filter.toLocaleLowerCase();

    return data.filter((entity) =>
        attributes.some(attribute =>

            MatchValue(filterLower, entity[attribute.Key] )
        )
    );

}

export function MatchValue<AtributeType>(filter: string, value: AtributeType) {

    const type = typeof value;
    if (type === 'string' && String(value).toLocaleLowerCase().includes(filter)) return true
    if (type === 'number' && String(value).includes(filter)) return true

}

