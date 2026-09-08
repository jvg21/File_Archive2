import { useEffect, useState, type ReactNode } from 'react'
import style from '../../Styles/table.module.css'
import { TablePagination } from './pagination.component'
import type { IconType } from 'react-icons'

export type TableColumns<T> = {
    key: keyof T,
    header: string,
    render?: (value: T[keyof T], row: T) => ReactNode
    className?: string
}

export type TableActions<T> = {
    key: string,
    header: string,
    icon?: IconType,
    action: (row: T) => void
}

export type TableProps<T> = {
    tableData: T[],
    tableColumn: TableColumns<T>[],
    emptyMessage?: string,
    keyExtractor?: (row: T) => string | number,
    initialPageSize: number,
    onRowClick: (row: T) => void
    // resetFuncition: () => void,
    actions?: TableActions<T>[],
    pagination?: boolean
}

export function Table<T extends Object>({
    tableData,
    tableColumn,
    actions = [],
    keyExtractor,
    onRowClick,
    emptyMessage = "No Data",
    initialPageSize = 25,
    pagination = true,

}: TableProps<T>) {


    //***PAGINATION*** */
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [pageSize, setPageSize] = useState(pagination ? initialPageSize : tableData.length)

    const startIndex = (currentPage - 1) * pageSize
    const totalPages = Math.ceil(tableData.length / pageSize)

    const paginatedData = tableData.slice(startIndex, startIndex + pageSize)

    useEffect(() => {
        setCurrentPage(1)
    }, [tableData])


    {/**NO DATA*/ }
    if (tableData.length <= 0) return <div className={style.empty}>{emptyMessage}</div>

    return (
        <div className={style.tableWrapper}>
            {/******TABLE***** */}
            <table className={style.table}>
                <thead >
                    <tr>
                        {tableColumn.map((col, index) =>
                            <th key={index} className={col.className ? style[col.className] : ''}>{col.header}</th>
                        )}

                        {
                            actions && actions.length > 0 &&
                            <th key={'actions'}>Actions</th>
                        }
                    </tr>


                </thead>
                <tbody>
                    {
                        paginatedData.map((row, index) =>
                            <tr onClick={()=>{onRowClick(row)}} key={
                                keyExtractor ? keyExtractor(row) : index

                            }>
                                {
                                    tableColumn.map((col) =>

                                        <td key={String(col.key)} className={col.className ? style[col.className] : ''}>
                                            {
                                                col.render ?
                                                    col.render(row[col.key], row)
                                                    :
                                                    String(row[col.key] ?? '-')
                                            }

                                        </td>
                                    )
                                }

                                <td key="actionFunctions" className={style.actionsCell}>
                                    <div className={style.actionsContainer}>
                                        {actions.map((action) => {
                                            const Icon = action.icon

                                            return (
                                                <button
                                                    key={action.key}
                                                    className={style.actionButton}
                                                    onClick={() => action.action(row)}
                                                    title={action.header}
                                                >
                                                    {Icon ? <Icon /> : action.header}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </td>



                            </tr>
                        )
                    }
                </tbody>

            </table>

            { /***PAGINATION**** */}
            {pagination && <TablePagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                currentPageSize={pageSize}
                setPageSize={setPageSize}

            />}
        </div>
    )
}