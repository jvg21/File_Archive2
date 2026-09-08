import style from '../../Styles/table.module.css'

type TablePaginationProps = {
    currentPage: number,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
    currentPageSize: number,
    setPageSize: React.Dispatch<React.SetStateAction<number>>,
    totalPages: number
}

export function TablePagination({ currentPage, setCurrentPage, totalPages, currentPageSize, setPageSize }: TablePaginationProps) {

    function handlePageInput(e: React.ChangeEvent<HTMLInputElement>) {
        const raw = e.target.value

        if (raw === '') {
            setCurrentPage(1)
            return
        }

        const value = Number(raw)

        if (Number.isNaN(value)) return

        const clamped = Math.min(Math.max(value, 1), totalPages)
        setCurrentPage(clamped)
    }

    return (
        <div className={style.pagination}>


            <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
            >
                Previous
            </button>

            <span className={style.paginationInfo}>
                <input
                    type='number'
                    className={style.paginationInput}
                    value={currentPage}
                    min={1}
                    max={totalPages}
                    onChange={handlePageInput}
                />
                of {totalPages}
            </span>

            <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
            >
                Next
            </button>

            <select
                className={style.paginationSelect}
                value={currentPageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
            >

                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={500}>500</option>
                
            </select>
        </div>
    )
}