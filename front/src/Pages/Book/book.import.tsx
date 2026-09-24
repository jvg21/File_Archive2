import { useMemo, useState } from "react";
import type { ShowNotificationType } from "../../Data/Context/notification.context";
import type { BookEntity } from "./book.entity";
import type { ImportFlow } from "../../Data/Types/modalFlow";
import { createBookArray, importInsertBookSheet } from "./book.functions";
import { BookColumns } from "./book.columns";
import { Table } from "../../UI/Components/Table/table.component";
import pageStyle from '../../UI/Styles/pages.module.css'
import type { EntitiesResult } from "../../Data/Types/entitiesResult";
import { Config } from "../../Config/config";


type Entity = BookEntity;
interface ImportFormProps {
    // entities: BookEntity[],
    showNotification: ShowNotificationType,
    // setEntities: React.Dispatch<React.SetStateAction<BookEntity[]>>,
    // onSubmit: () => void,
}

export const ImportModal = (props: ImportFormProps) => {

    const { showNotification } = props

    const [importData, setImportData] = useState<Entity[]>();
    const [resultData, setResultData] = useState<EntitiesResult<Entity>>();


    const [modalPage, setModalPage] = useState<ImportFlow>('import');

    async function handleImportData(file: File) {
        const importData = await importInsertBookSheet(file, { showNotification });
        setImportData(importData);
    }


    async function handleImportDataSubmit() {
        await createBookArray({ entities: importData || [], showNotification, setEntityResults: setResultData });
        setModalPage('success')
    }


    const ImportTableMemo = useMemo(() =>
        <>
            <Table
                tableColumn={BookColumns}
                tableData={importData ?? []}
                onRowClick={() => { }}
                options={{
                    hideColumns: ['id'],
                    initialPageSize: importData?.length || Config.defaultTableDataSize
                }}
            />
            <button type="button" className={pageStyle.button} onClick={handleImportDataSubmit}>Import Books</button>
        </>
        , [importData])


    return (
        <div>
            {modalPage === 'import' &&
                <>
                    <input type="file" multiple={false} id="input" onChange={(e) => {
                        e.target.files ?
                            (
                                handleImportData(e.target.files[0])
                            )
                            : undefined
                    }} />

                    {
                        importData && importData?.length > 0 && ImportTableMemo
                    }
                </>
            }
            {modalPage !== 'import' &&
                <div style={{ width: '100%' }}>
                    <button onClick={() => setModalPage('success')}> Success</button>
                    <button onClick={() => setModalPage('failed')}> Failed</button>
                </div>
            }

            {
                modalPage === 'success' &&

                <Table
                    tableColumn={BookColumns}
                    tableData={resultData?.success as BookEntity[] ?? []}
                    onRowClick={() => { }}

                    options={{
                        hideColumns: ['currentChapter', 'totalChapters', 'summary', 'readingStatus', 'writingStatus'],
                        initialPageSize: importData?.length || Config.defaultTableDataSize
                    }}
                />

            }
            {
                modalPage === 'failed' &&
                <Table
                    tableColumn={BookColumns}
                    tableData={resultData?.failed.map((data) => data.entry) as BookEntity[] ?? []}
                    onRowClick={() => { }}
                    options={{
                        initialPageSize: importData?.length || Config.defaultTableDataSize
                    }}
                />

            }



        </div>

    )

}