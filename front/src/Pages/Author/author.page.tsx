import { useEffect, useMemo, useState } from "react";
import { Table, type TableActions, } from "../../UI/Components/Table/table.component"
import pageStyle from '../../UI/Styles/pages.module.css'
import { AiFillEdit } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import { ModalFrame } from "../../UI/Components/Global/modal.component";
import type { ModalFlow } from "../../Data/Types/modalFlow";
import { AuthorColumns } from "./author.columns";
import type { AuthorEntity } from "../../Data/Types/Entity/author.entity";
import { createAuthor, deleteAuthor, generateEmptyAuthor, getAuthorData, updateAuthor } from "./author.functions";
import { AuthorForm } from "./author.form";
import { useNotification } from "../../Data/Context/notification.context";
import { Config } from "../../Config/config";


type Entity = AuthorEntity;
const TableColumns = AuthorColumns;
const generateEmpty = generateEmptyAuthor;

export const AuthorPage = () => {
    /**Hooks */
    const { showNotification } = useNotification();

    /* table data*/
    const [tableData, setTableData] = useState<Entity[] | null>(null);
    const [selectedEntity, SetSelectedEntity] = useState<Entity>(generateEmpty())

    /**PageStates */
    const [formModal, setFormModal] = useState<boolean>(false);
    const [modalPage, setModalPage] = useState<ModalFlow>('edit');


    useEffect(() => {
        getAuthorData(setTableData, showNotification);

    }, [])

    async function handleSubmit() {
        if (modalPage === 'create') await createAuthor(selectedEntity, showNotification)
        if (modalPage === 'edit') await updateAuthor(selectedEntity, showNotification)
        if (modalPage === 'delete') await deleteAuthor(selectedEntity.id, showNotification)

        getAuthorData(setTableData, showNotification);
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
