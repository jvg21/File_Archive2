import { useState, type ReactNode } from "react"
import style from '../../Styles/modal.module.css'


interface ModalFrame {
    children: ReactNode,
    closeModal: (modal: boolean) => void
}

export const ModalFrame = ({ children, closeModal }: ModalFrame) => {
    const [clickTimeout, SetClickTimeout] = useState<ReturnType<typeof setTimeout> | null>(null)

    const handleCloseClick = () => {

        if (clickTimeout !== null) {
            clearTimeout(clickTimeout);
            SetClickTimeout(null);
            closeModal(false)
        }


        SetClickTimeout(setTimeout(() => {
            SetClickTimeout(null)
        }, 1000))

    }
    return (
        <div className={style.modalBackground} onClick={handleCloseClick}>
            <div className={style.modal} onClick={(e) => e.stopPropagation()}>
                <header className={style.header}>

                    <button onClick={() => closeModal(false)}> X </button>
                </header>
                {children}
            </div>

        </div>
    )
}