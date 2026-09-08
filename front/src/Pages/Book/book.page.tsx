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
import { BookDataStore } from "../../Data/Datastore/book.datastore";
import type { RequestReturn } from "../../Data/Types/requestReturn";
import { generateEmptyBook } from "./book.functions";
import { BookForm } from "./book.form";


type Entity = BookEntity;
const TableColumns = BookColumns;
const generateEmpty = generateEmptyBook;

export const BookPage = () => {
    /**Hooks**/
    const { showNotification } = useNotification()

    /*****DataStore****/
    const DataStore = new BookDataStore();

    /* table data*/
    const [tableData, setTableData] = useState<Entity[] | null>(null);
    const [selectedEntity, SetSelectedEntity] = useState<Entity>(generateEmpty())

    /**PageStates */
    const [formModal, setFormModal] = useState<boolean>(false);
    const [modalPage, setModalPage] = useState<ModalFlow>('edit');

    /**GET FUNCIOTIONS */
    async function getBookData(): Promise<void> {

        const request: RequestReturn = await DataStore.getAll();

        if (request.status !== 200) {
            showNotification(request.message, 'failure')
            return
        }
        setTableData(request.data as Entity[])
    };

    useEffect(() => {
        getBookData();

    }, [])

    /******SUBMIT FUNCIOTIONS ***********/
    async function createBook(): Promise<void> {
        if (!selectedEntity || !selectedEntity.title) return;

        const request = await DataStore.create(selectedEntity);

        if (request.status !== 201) {
            showNotification(request.message, 'failure')
            return
        }
        showNotification(request.message, 'success')
    }


    async function updateBook(): Promise<void> {

        if (!selectedEntity || !selectedEntity.title || !selectedEntity.id) return;

        const payload = {
            ...selectedEntity,
            urls: selectedEntity.urls?.filter((url) => !url.id)
        };

        const request = await DataStore.update(payload);

        if (request.status !== 200) {
            showNotification(request.message, 'failure')
            return
        }
        showNotification(request.message, 'success')
    }

    async function deleteBook(): Promise<void> {

        if (!selectedEntity || !selectedEntity.id) return;

        const request = await DataStore.delete(selectedEntity.id);

        if (request.status !== 200) {
            showNotification(request.message, 'failure')
            return
        }
        showNotification(request.message, 'success')
    }



    async function handleSubmit() {
        if (modalPage === 'create') await createBook()
        if (modalPage === 'edit') await updateBook()
        if (modalPage === 'delete') await deleteBook()

        getBookData();
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
            initialPageSize={15}
        />, [tableData])

    return (
        <div className={pageStyle.main}>

            <button type="button" className={pageStyle.button} onClick={() => { setModalPage('create'); SetSelectedEntity(generateEmpty()); setFormModal(true) }}>Add +</button>

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
                        flow={modalPage}
                        onSubmit={handleSubmit}

                    />
                </ModalFrame>
            }

        </div>
    )
}
