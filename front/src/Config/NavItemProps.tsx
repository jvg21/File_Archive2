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
    { id: "author", label: "Author", logo: IoPerson, click: true },
    { id: "book", label: "Book", logo: FaBook, click: true },
    { id: "file", label: "Files", logo: FaFileArchive, click: true },
    { id: "comic", label: "Comic", logo: FaBookOpen, click: true },
    { id: "notes", label: "Notes", logo: GiNotebook, click: true },
    { id: "image", label: "Image", logo: FaImage, click: true },
];

