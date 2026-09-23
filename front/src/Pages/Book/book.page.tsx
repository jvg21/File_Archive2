import { useEffect, useMemo, useState } from "react";
import { Table, type TableActions, } from "../../UI/Components/Table/table.component"
import pageStyle from '../../UI/Styles/pages.module.css'
import { AiFillEdit } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import { ModalFrame } from "../../UI/Components/Global/modal.component";
import type { ModalFlow } from "../../Data/Types/modalFlow";
import { useNotification } from "../../Data/Context/notification.context";
import type { BookEntity } from "./book.entity";
import { BookColumns } from "./book.columns";
import { createBook, deleteBook, generateEmptyBook, getBookData, updateBook } from "./book.functions";
import { BookForm } from "./book.form";
import { Config } from "../../Config/config";
import { ImportModal } from "./book.import";
import { TextFilter } from "../../UI/Components/Filters/text.filter";


type Entity = BookEntity;
const TableColumns = BookColumns;
const generateEmpty = generateEmptyBook;

export const BookPage = () => {
    /**Hooks**/
    const { showNotification } = useNotification()

    /* table data*/
    const [tableData, setTableData] = useState<Entity[] | null>(null);
    const [selectedEntity, SetSelectedEntity] = useState<Entity>(generateEmpty())

    /**PageStates */
    const [isLoading, setLoading] = useState<boolean>(true);
    const [formModal, setFormModal] = useState<boolean>(false);
    const [modalPage, setModalPage] = useState<ModalFlow>('edit');
    const [importModal, setImportModal] = useState<boolean>(false);

    /****FILTERS** */
    const [filterString, setFilterString] = useState("");

    useEffect(() => {
        getBookData({ setEntities: setTableData, showNotification });
        setLoading(false);

    }, [])

    const filtredData = useMemo(() => {
        return TextFilter(filterString, ["id", "title", "summary"], tableData || []);
    }, [filterString, tableData])

    async function handleSubmit() {
        if (modalPage === 'create') await createBook({ entity: selectedEntity, showNotification })
        if (modalPage === 'edit') await updateBook({ entity: selectedEntity, showNotification })
        if (modalPage === 'delete') await deleteBook({ entity: selectedEntity, showNotification })

        getBookData({ setEntities: setTableData, showNotification });
        setFormModal(false);
        SetSelectedEntity(generateEmpty());
    }

    const TableActions: TableActions<Entity>[] = [
        { key: 'update', header: "Update", action: (row) => { SetSelectedEntity(row); setModalPage('edit'); setFormModal(true) }, icon: AiFillEdit },
        { key: 'delete', header: "Delete", action: (row) => { SetSelectedEntity(row); setModalPage('delete'); setFormModal(true) }, icon: FaRegTrashAlt }
    ]

    return (
        <div className={pageStyle.main}>

            <button type="button" className={pageStyle.button} onClick={() => { setModalPage('create'); SetSelectedEntity(generateEmpty()); setFormModal(true) }}>Add + </button>
            <button type="button" className={pageStyle.button} onClick={() => { setImportModal(true) }}>Import</button>
            <input type="text"
                onChange={(e) => setFilterString(e.target.value)}
                value={filterString}
            />

            <Table
                tableColumn={TableColumns}
                actions={TableActions}
                tableData={filtredData ?? []}
                onRowClick={SetSelectedEntity}
                keyExtractor={(row) => row.id}
                initialPageSize={Config.defaultTableDataSize}
                loading={isLoading}
            />

            {
                formModal &&
                <ModalFrame
                    closeModal={setFormModal}
                >
                    <BookForm
                        entity={selectedEntity}
                        setEntity={SetSelectedEntity}
                        showNotification={showNotification}
                        flow={modalPage}
                        onSubmit={handleSubmit}
                    />
                </ModalFrame>
            }
            {
                importModal &&
                <ModalFrame
                    closeModal={setImportModal}
                    styleProps="lg"
                >
                    <ImportModal
                        showNotification={showNotification}
                    />

                </ModalFrame>
            }

        </div>
    )
}
