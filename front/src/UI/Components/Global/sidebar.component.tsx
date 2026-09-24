import style from '../../Styles/sidebar.module.css'
import { Link, NavLink } from 'react-router-dom';
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai';
import { NAV_ITEMS, type NavItemProps } from '../../../Config/NavItemProps';
import { useEffect, useRef, useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import type { ScrollStyle } from './layout.component';

type SidebarProps = {
    isCollapsed: boolean;
    setIsCollapsed: (value: boolean) => void;
}

export const Sidebar = ({ isCollapsed, setIsCollapsed }: SidebarProps) => {
    const isExpanded = !isCollapsed;

    const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
    const [mobileSidebarScroll, setMobileSidebarScrool] = useState<ScrollStyle>('top');
    const sidebarRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        let lastScrollY = window.scrollY;

        function handleScroll() {
            const currentScrollY = window.scrollY;
            const difference = currentScrollY - lastScrollY;

            if (Math.abs(difference) < 10) return;

            if (currentScrollY <= 0) {
                setMobileSidebarScrool('top');
            } else if (difference > 0) {
                // Scroll para baixo
                setMobileSidebarScrool('hidden');
            } else {
                // Scroll para cima
                setMobileSidebarScrool('showing');
            }

            lastScrollY = currentScrollY;
        }

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        function handleClicksOutside(event: MouseEvent) {
            // const teste = event.target as ReactNode;
            // console.log(teste?.toString())
            if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) setOpenItems({})
        }

        document.addEventListener('mousedown', handleClicksOutside);
        return () => {
            document.removeEventListener('mousedown', handleClicksOutside);
        };
    })

    function toggleChildren(id: string, value: boolean) {

        setOpenItems({
            [id]: value
        })
    }


    function renderMenu(item: NavItemProps, isOpen: boolean) {
        return (
            <div className={`${style.sidebarItem} `} key={item.id}>

                {item.click ? (
                    <NavLink to={`/${item.id}`} aria-label={item.label}
                        onClick={() => setOpenItems({})}
                        className={({ isActive }) => `${style.sidebarButton}  ${!isExpanded ? style.colapsed : ''} ${isActive ? style.open : ''}`}
                    >
                        {item.logo && <item.logo />}
                        <span>{item.label}</span>
                    </NavLink>
                ) : (
                    <button onClick={(e) => { e.stopPropagation(); toggleChildren(item.id, !openItems[item.id]) }

                    }
                        className={`${style.sidebarButton} setOpenItems ${!isExpanded ? style.colapsed : ''}`}>
                        {item.logo && <item.logo />}
                        <span>{item.label}</span>

                        {isExpanded && item.children &&
                            (isOpen
                                ? <FaChevronUp className={style.childrenArrow} />
                                : <FaChevronDown className={style.childrenArrow} />
                            )
                        }
                    </button>
                )
                }

                {/*  Tooltips */}
                {
                    !isOpen &&
                    <span
                        className={`${style.sidebarToolkit} ${!isExpanded ? style.colapsed : ''}`} >
                        {item.label}
                    </span>
                }


                {
                    item.children && item.children.length > 0 && (
                        <div
                            className={`${style.sidebarChildren} ${!isExpanded ? style.colapsed : ''
                                } ${isOpen ? style.show : ''
                                } ischild`}
                        >
                            {item.children.map((itemChild) => (
                                <div
                                    key={itemChild.id}
                                    className={style.childItem}
                                >
                                    <Link to={`/${itemChild.id}`} className={style.sidebarButton} onClick={()=>setOpenItems({})}>
                                        {itemChild.logo && <itemChild.logo />}
                                        <span>{itemChild.label}</span>
                                    </Link>


                                </div>
                            ))}
                        </div>
                    )
                }

            </div >
        );
    }

    return (
        <div ref={sidebarRef} className={`${style.sidebar} ${isExpanded ? style.active : ''} ${style[mobileSidebarScroll]}`} >
            <div className={`${style.sidebarHeader}`}>
                <div className={style.sidebarColapseButton}>
                    <button onClick={() =>{setOpenItems({}); setIsCollapsed(!isCollapsed)}}>{
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
