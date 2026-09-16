import { useEffect, useMemo, useState } from "react";
import { Table, type TableActions, } from "../../UI/Components/Table/table.component"
import pageStyle from '../../UI/Styles/pages.module.css'
import { AiFillEdit } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import { ModalFrame } from "../../UI/Components/Global/modal.component";
import type { ModalFlow } from "../../Data/Types/modalFlow";
import { useNotification } from "../../Data/Context/notification.context";
import type { BookEntity } from "../../Data/Types/Entity/book.entity";
import { BookColumns } from "./book.columns";
import { createBook, deleteBook, generateEmptyBook, getBookData, importInsertBookSheet, updateBook } from "./book.functions";
import { BookForm } from "./book.form";
import { Config } from "../../Config/config";


type Entity = BookEntity;
const TableColumns = BookColumns;
const generateEmpty = generateEmptyBook;

export const BookPage = () => {
    /**Hooks**/
    const { showNotification } = useNotification()

    /* table data*/
    const [tableData, setTableData] = useState<Entity[] | null>(null);
    const [selectedEntity, SetSelectedEntity] = useState<Entity>(generateEmpty())

    const [importData, setImportData] = useState<Entity[] | undefined>();

    /**PageStates */
    const [isLoading, setLoading] = useState<boolean>(true);
    const [formModal, setFormModal] = useState<boolean>(false);
    const [modalPage, setModalPage] = useState<ModalFlow>('edit');
    const [importModal, setImportModal] = useState<boolean>(false);


    // console.log(importSheet)
    useEffect(() => {
        getBookData(setTableData, showNotification);
        setLoading(false);

    }, [])

    async function handleImportData(file: File) {
        const importData = await importInsertBookSheet(file, showNotification);
        setImportData(importData);
        setImportModal(true);
    }

    async function handleSubmit() {
        if (modalPage === 'create') await createBook(selectedEntity, showNotification)
        if (modalPage === 'edit') await updateBook(selectedEntity, showNotification)
        if (modalPage === 'delete') await deleteBook(selectedEntity.id, showNotification)

        getBookData(setTableData, showNotification);
        setFormModal(false);
        SetSelectedEntity(generateEmpty());
    }

    const TableActions: TableActions<Entity>[] = [
        { key: 'update', header: "Update", action: (row) => { SetSelectedEntity(row); setModalPage('edit'); setFormModal(true) }, icon: AiFillEdit },
        { key: 'delete', header: "Delete", action: (row) => { SetSelectedEntity(row); setModalPage('delete'); setFormModal(true) }, icon: FaRegTrashAlt }
    ]

    const TableMemo = useMemo(() =>
        <Table
            tableColumn={TableColumns}
            actions={TableActions}
            tableData={tableData ?? []}
            onRowClick={SetSelectedEntity}
            keyExtractor={(row) => row.id}
            initialPageSize={Config.defaultTableDataSize}
            loading={isLoading}
        />, [tableData])

    const ImportTableMemo = useMemo(() =>
        <Table
            tableColumn={TableColumns}
            tableData={importData ?? []}
            hideColumns={['id']}
            initialPageSize={importData?.length || 0}
            onRowClick={() => { }}
        />, [importData])

    return (
        <div className={pageStyle.main}>

            <button type="button" className={pageStyle.button} onClick={() => { setModalPage('create'); SetSelectedEntity(generateEmpty()); setFormModal(true) }}>Add +</button>

            <input type="file" multiple={false} id="input" onChange={(e) => {
                e.target.files ?
                    (
                        handleImportData(e.target.files[0])
                    )
                    : undefined
            }} />

            {/* /***LOAD THE TABLE COMPONENT* */}
            {TableMemo}

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
                    {ImportTableMemo}

                </ModalFrame>
            }

        </div>
    )
}
