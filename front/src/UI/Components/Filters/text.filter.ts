
interface KeyType<T> {
    key: keyof T,
    childKeys?: string[]
}


export function TextFilter<T>(filterString: string, data: T[], fields: KeyType<T>[]): T[] {

    if (!filterString || filterString === "") return data;
    const lowerCaseFilter = filterString.toLocaleLowerCase()

    const filteredData = data.filter((entity) => {
        for (const field of fields) {

            const attributeValue = entity[field.key];
            if (attributeValue == null) continue;
            const attributeType = typeof attributeValue;

            if (attributeType === 'string' && String(attributeValue).toLocaleLowerCase().includes(lowerCaseFilter)) return true
            if (attributeType === 'number' && String(attributeValue).includes(lowerCaseFilter)) return true



            if (Array.isArray(attributeValue) && field.childKeys && field.childKeys?.length > 0) {

                const hasMatch = attributeValue.some((child) => {

                    if (!child || typeof child !== "object") {
                        return false;
                    }

                    return field.childKeys!.some((childKey) => {

                        const childValue = (child as Record<string, unknown>)[childKey];

                        if (childValue == null) return false;

                        return String(childValue).toLocaleLowerCase().includes(lowerCaseFilter);
                    });
                });

                if (hasMatch) return true;
            }


        }


    })

    return filteredData;
}