import { accentsRegex } from "./Regex/accents.regex";

export const normalizeText = (text: string) => {
    return text
        .normalize("NFD")
        .replace(accentsRegex, "")
        .toLocaleLowerCase();
}