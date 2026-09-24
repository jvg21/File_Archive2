
export function SelectFilter<T, Key extends keyof T>(filter: string, key: Key, data: T[]): T[] {
    console.log(filter,data)
    if (!filter || filter === '' || data.length <= 0) return data;

    const type = typeof data[0]?.[key]

    if (type !== 'string' && type !== 'number') throw new Error()

    return data.filter((entity) => {
        if (String(entity[key]) === filter) return true;
    })
}

export function SelectOptions<T, Key extends keyof T>(key: Key, data: T[]): string[] {
    const type = typeof data[0]?.[key]
    if (type !== 'string' && type !== 'number') return []

    const distinctValues: string[] = []

    data.forEach((entity) => {
        if (!distinctValues.includes(String(entity[key]))) distinctValues.push(String(entity[key]))
    })

    return distinctValues;
}

interface SelectFilterProps<T, Key extends keyof T> {
    field: Key;
    data: T[];
    value: string;
    onChangeFunc: (value: string) => void;
    defaultString?: string,
}

export function SelectFilterComponent<T, Key extends keyof T>({ field, data, value, onChangeFunc, defaultString = "Selecione uma opção" }: SelectFilterProps<T, Key>): React.ReactNode {
    // console.log(SelectOptions(field, data))
    return (
        <select
            value={value}
            onChange={(e) => onChangeFunc(e.target.value)}
        >
            <option key={-1} value={""} >{defaultString}</option>

            {
                SelectOptions(field, data).map((option, index) =>
                    <option key={index} value={option}>{option} </option>
                )
            }


        </select >
    )
}