export function urlNameGenerator(urlContent: string): string {

    if(urlContent.includes("archiveofourown.org")) return "AO3";
    if(urlContent.includes("fanfiction.net")) return "FFN";
    if(urlContent.includes("wattpad.com")) return "Wattpad";

    return urlContent;
}