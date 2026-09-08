import { useEffect, useMemo, useState } from "react";
import { Table, type TableActions, } from "../../UI/Components/Table/table.component"
import pageStyle from '../../UI/Styles/pages.module.css'
import { AiFillEdit } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import { ModalFrame } from "../../UI/Components/Global/modal.component";
import type { ModalFlow } from "../../Data/Types/modalFlow";
import { useNotification } from "../../Data/Context/notification.context";
import { AuthorColumns } from "./author.columns";
import type { AuthorEntity } from "../../Data/Types/Entity/author.entity";
import { generateEmptyAuthor } from "./author.functions";
import type { RequestReturn } from "../../Data/Types/requestReturn";
import { AuthorDataStore } from "../../Data/Datastore/author.datastore";
import { AuthorForm } from "./author.form";


type Entity = AuthorEntity;
const TableColumns = AuthorColumns;
const generateEmpty = generateEmptyAuthor;

export const AuthorPage = () => {
    /**Hooks**/
    const { showNotification } = useNotification()

    /*****DataStore****/
    const DataStore = new AuthorDataStore();

    /* table data*/
    const [tableData, setTableData] = useState<Entity[] | null>(null);
    const [selectedEntity, SetSelectedEntity] = useState<Entity>(generateEmpty())

    /**PageStates */
    const [formModal, setFormModal] = useState<boolean>(false);
    const [modalPage, setModalPage] = useState<ModalFlow>('edit');

    /**GET FUNCIOTIONS */
    async function getAuthorData(): Promise<void> {

        const request: RequestReturn = await DataStore.getAll();

        if (request.status !== 200) {
            showNotification(request.message, 'failure')
            return
        }
        setTableData(request.data as Entity[])
    };

    useEffect(() => {
        getAuthorData();

    }, [])

    /******SUBMIT FUNCIOTIONS ***********/
    async function createAuthor(): Promise<void> {
        if (!selectedEntity || !selectedEntity.name) return;

        const request = await DataStore.create(selectedEntity);

        if (request.status !== 201) {
            showNotification(request.message, 'failure')
            return
        }
        showNotification(request.message, 'success')
    }


    async function updateAuthor(): Promise<void> {

        if (!selectedEntity || !selectedEntity.name || !selectedEntity.id) return;

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

    async function deleteAuthor(): Promise<void> {

        if (!selectedEntity || !selectedEntity.id) return;

        const request = await DataStore.delete(selectedEntity.id);

        if (request.status !== 200) {
            showNotification(request.message, 'failure')
            return
        }
        showNotification(request.message, 'success')
    }



    async function handleSubmit() {
        if (modalPage === 'create') await createAuthor()
        if (modalPage === 'edit') await updateAuthor()
        if (modalPage === 'delete') await deleteAuthor()

        getAuthorData();
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
                    <AuthorForm
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
