import type { IconType } from "react-icons";
import {
    FaBook,
    FaBookOpen,
    FaFileArchive,
    FaImage,

} from 'react-icons/fa';
import { GiNotebook } from "react-icons/gi";
import { IoPerson } from "react-icons/io5";


export type NavItemProps = {
    id: string;
    label: string;
    logo?: IconType;
    click: boolean;
    children?: NavItemProps[];
};


export const NAV_ITEMS: NavItemProps[] = [
    { id: "author", label: "Author", logo: IoPerson, click: false },
    { id: "book", label: "Book", logo: FaBook, click: false },
    { id: "file", label: "Files", logo: FaFileArchive, click: false },
    { id: "comic", label: "Comic", logo: FaBookOpen, click: false },
    { id: "notes", label: "Notes", logo: GiNotebook, click: false },
    { id: "image", label: "Image", logo: FaImage, click: false },
];

