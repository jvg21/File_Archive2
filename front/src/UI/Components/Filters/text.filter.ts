import { normalizeText } from "../../../Utils/normalizeText";

interface KeyType<T> {
    key: keyof T,
    childKeys?: string[]
}


export function TextFilter<T>(filterString: string, data: T[], fields: KeyType<T>[]): T[] {

    if (!filterString || filterString === "") return data;
    
    const normalizedText = normalizeText(filterString)

    const filteredData = data.filter((entity) => {
        for (const field of fields) {

            const attributeValue = entity[field.key];
            if (attributeValue == null) continue;
            const attributeType = typeof attributeValue;

            if (attributeType === 'string' && normalizeText(String(attributeValue)).includes(normalizedText)) return true
            if (attributeType === 'number' && normalizeText(String(attributeValue)).includes(normalizedText)) return true



            if (Array.isArray(attributeValue) && field.childKeys && field.childKeys?.length > 0) {

                const hasMatch = attributeValue.some((child) => {

                    if (!child || typeof child !== "object") {
                        return false;
                    }

                    return field.childKeys!.some((childKey) => {

                        const childValue = (child as Record<string, unknown>)[childKey];

                        if (childValue == null) return false;

                        return normalizeText(String(childValue)).includes(normalizedText);
                    });
                });

                if (hasMatch) return true;
            }


        }


    })

    return filteredData;
}