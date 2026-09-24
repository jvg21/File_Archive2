import { useEffect, useState, type ReactNode } from 'react'
import style from '../../Styles/table.module.css'
import { TablePagination } from './pagination.component'
import type { IconType } from 'react-icons'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

export type TableColumns<T> = {
    key: keyof T,
    header: string,
    render?: (value: T[keyof T], row: T) => ReactNode,
    className?: string
}

export type TableActions<T> = {
    key: string,
    header: string,
    icon?: IconType,
    action: (row: T) => void
}

interface TableOptions<T> {
    pagination?: boolean
    emptyMessage?: string,
    initialPageSize?: number,
    isColapsable?: boolean,
    hideColumns?: (keyof T)[],
    hideHeader?: boolean
}

export type TableProps<T> = {
    tableData: T[],
    tableColumn: TableColumns<T>[],
    loading?: boolean

    onRowClick?: (row: T) => void,
    keyExtractor?: (row: T) => string | number,
    actions?: TableActions<T>[],
    options?: TableOptions<T>

}


export function Table<T extends Object>({
    tableData,
    tableColumn,
    actions = [],
    keyExtractor,
    onRowClick = () => { },
    loading = false,
    options = {}


}: TableProps<T>) {

    const {
        hideColumns = [],
        isColapsable = false,
        emptyMessage = "No Data",
        initialPageSize = 25,
        pagination = true,
        hideHeader = false
    } = options

    const [colpased, setColapsed] = useState(false);
    //***PAGINATION*** */
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [pageSize, setPageSize] = useState(initialPageSize)

    const requirePagination = pagination && tableData && tableData.length > pageSize;

    const startIndex = (currentPage - 1) * pageSize
    const totalPages = requirePagination ? Math.ceil(tableData.length / pageSize) : 1;

    const paginatedData = requirePagination ? tableData.slice(startIndex, startIndex + pageSize) : tableData


    useEffect(() => {
        setCurrentPage(1)
    }, [tableData])


    {/**NO DATA*/ }
    if (loading) return <div className={style.empty}>loading........</div>
    if (tableData.length <= 0) return <div className={style.empty}>{emptyMessage}</div>

    return (
        <div className={style.tableWrapper}>
            {/******TABLE***** */}
            {isColapsable &&
                <div className={style.tableHeader}>
                    <button onClick={() => setColapsed((prev) => !prev)} className={style.tableButton}>{
                        colpased
                            ? <FaChevronUp className={style.childrenArrow} />
                            : <FaChevronDown className={style.childrenArrow} />
                    }</button>
                </div>
            }
            <table className={style.table}>
                <thead style={{ display: hideHeader ? 'none' : '' }}>
                    <tr>
                        {tableColumn.filter((col) => !hideColumns?.includes(col.key)).map((col, index) =>
                            <th key={index} className={col.className ? style[col.className] : ''}>{col.header}</th>
                        )}

                        {
                            actions && actions.length > 0 &&
                            <th key={'actions'}>Ações</th>
                        }
                    </tr>


                </thead>
                <tbody>
                    {!colpased &&
                        paginatedData.map((row, index) =>
                            <tr onClick={onRowClick ? () => onRowClick(row) : undefined} key={
                                keyExtractor ? keyExtractor(row) : index

                            }>
                                {
                                    tableColumn.filter((col) => !hideColumns?.includes(col.key)).map((col) =>

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
                                {
                                    actions.length > 0 && <td key="actionFunctions" className={style.actionsCell}>
                                        <div className={style.actionsContainer}>
                                            {actions.map((action) => {
                                                const Icon = action.icon

                                                return (
                                                    <button
                                                        key={action.key}
                                                        className={style.actionButton}
                                                        type="button"
                                                        onClick={(event) => {
                                                            event.stopPropagation()
                                                            action.action(row)
                                                        }}
                                                        title={action.header}
                                                        aria-label={action.header}
                                                    >
                                                        {Icon ? <Icon /> : action.header}
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    </td>
                                }

                            </tr>
                        )
                    }
                </tbody>

            </table>

            { /***PAGINATION**** */}
            {requirePagination && !colpased && <TablePagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                currentPageSize={pageSize}
                setPageSize={setPageSize}

            />}
        </div>
    )
}