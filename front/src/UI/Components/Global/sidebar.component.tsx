import style from '../../Styles/sidebar.module.css'
import { Link } from 'react-router-dom';
import { FaBook, FaBookOpen, FaFileArchive, FaImage, FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';
import { GiNotebook } from 'react-icons/gi';
import { IoPerson } from 'react-icons/io5';

const NAV_ITEMS = [
    { id: "author", label: "Author", logo: <IoPerson/> },
    { id: "book", label: "Book", logo: <FaBook/> },
    { id: "file", label: "Files", logo: <FaFileArchive/> },
    { id: "comic", label: "Comic", logo: <FaBookOpen /> },
    { id: "notes", label: "Notes", logo: <GiNotebook/> },
    { id: "image", label: "Image", logo: <FaImage/> },
];

type SidebarProps = {
    isCollapsed: boolean;
    setIsCollapsed: (value: boolean) => void;
}

export const Sidebar = ({ isCollapsed, setIsCollapsed }: SidebarProps) => {
    const isExpanded = !isCollapsed;

    return (
        <div className={`${style.sidebar} ${isExpanded ? style.active : ''}`}>
            <div className={`${style.sidebarHeader}`}></div>
            {
                NAV_ITEMS.map((item) =>
                    <div className={`${style.sidebarItem}`} key={item.id}>
                        <Link to={`/${item.id}`} className={`${style.sidebarButton} ${!isExpanded ? style.colapsed : ''}`} >
                            {item.logo} <span>{item.label}</span>
                        </Link>
                        <span className={`${style.sidebarToolkit} ${!isExpanded ? style.colapsed : ''}`}>
                            {item.label}
                        </span>
                    </div>
                )
            }
            <div className={style.sidebarFooter}>
                <button onClick={() => setIsCollapsed(!isCollapsed)}>{
                    isCollapsed ?
                        <FaLongArrowAltRight />
                        : <FaLongArrowAltLeft />
                }
                </button>
            </div>
        </div>
    )
}