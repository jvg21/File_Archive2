import style from '../../Styles/sidebar.module.css'
import { Link } from 'react-router-dom';
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai';
import { NAV_ITEMS, type NavItemProps } from '../../../Config/NavItemProps';
import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';


type SidebarProps = {
    isCollapsed: boolean;
    setIsCollapsed: (value: boolean) => void;
}

export const Sidebar = ({ isCollapsed, setIsCollapsed }: SidebarProps) => {
    const isExpanded = !isCollapsed;

    const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

    function toggleChildren(id: string) {
        setOpenItems((prev) => ({
            ...prev,
            [id]: !prev[id]
        }))
    }

    function renderMenu(item: NavItemProps, isOpen: boolean) {
        return (
            <div className={style.sidebarItem} key={item.id}>

                {item.click ? (
                    <Link to={`/${item.id}`} className={`${style.sidebarButton} ${!isExpanded ? style.colapsed : ''}`}>
                        {item.logo && <item.logo />}
                        <span>{item.label}</span>
                    </Link>
                ) : (
                    <button onClick={() => toggleChildren(item.id)} className={`${style.sidebarButton} ${!isExpanded ? style.colapsed : ''}`}>
                        {item.logo && <item.logo />}
                        <span>{item.label}</span>

                        {isExpanded && item.children && 
                            (isOpen
                                ? <FaChevronUp className={style.childrenArrow} />
                                : <FaChevronDown className={style.childrenArrow} />
                            )
                        }
                    </button>
                )}

                {/*  Tooltips */}
                {!isOpen && 
                    <span
                        className={`${style.sidebarToolkit} ${!isExpanded ? style.colapsed : ''}`} >
                        {item.label}
                    </span>}


                {item.children && item.children.length > 0 && (
                    <div
                        className={`${style.sidebarChildren} ${!isExpanded ? style.colapsed : ''
                            } ${isOpen ? style.show : ''
                            }`}
                    >
                        {item.children.map((itemChild) => (
                            <div
                                key={itemChild.id}
                                className={style.childItem}
                            >
                                <Link to={`/${itemChild.id}`} className={style.sidebarButton}>
                                    {itemChild.logo && <itemChild.logo />}
                                    <span>{itemChild.label}</span>
                                </Link>


                            </div>
                        ))}
                    </div>
                )}

            </div>
        );
    }

    return (
        <div className={`${style.sidebar} ${isExpanded ? style.active : ''}`}>
            <div className={`${style.sidebarHeader}`}>
                <div className={style.sidebarColapseButton}>
                    <button onClick={() => setIsCollapsed(!isCollapsed)}>{
                        isCollapsed ?
                            <AiOutlineMenuUnfold /> :
                            <AiOutlineMenuFold />
                    }
                    </button>
                </div>


            </div>
            {NAV_ITEMS.map((item) => {
                const isOpen = !!openItems[item.id];

                return renderMenu(item, isOpen)
            })}

        </div>
    )
}