export function urlNameGenerator(urlContent: string): string {

    if(urlContent.includes("stackoverflow.com")) return "Stack Overflow";
    if(urlContent.includes("instagram.com")) return "Instagram";
    if(urlContent.includes("facebook.com")) return "Facebook";
    if(urlContent.includes("github.com")) return "GitHub";
    if(urlContent.includes("tiktok.com")) return "TikTok";
    if(urlContent.includes("wattpad.com")) return "Wattpad";
    if(urlContent.includes("wikipedia.org")) return "Wikipedia";
    if(urlContent.includes("wiktionary.org")) return "Wiktionary";
    if(urlContent.includes("youtube.com") || urlContent.includes("youtu.be")) return "YouTube";
    if(urlContent.includes("gitlab.com")) return "GitLab";
    if(urlContent.includes("https://archive.org")) return "Internet Archive";
    if(urlContent.includes("reddit.com")) return "Reddit";
    if(urlContent.includes("twitter.com") || urlContent.includes("x.com")) return "X";
    if(urlContent.includes("archiveofourown.org")) return "AO3";
    if(urlContent.includes("medium.com")) return "Medium";
    if(urlContent.includes("fanfiction.net")) return "FFN";
    if(urlContent.includes("imdb.com")) return "IMDb";
    if(urlContent.includes("amazon.com")) return "Amazon";
    if(urlContent.includes("goodreads.com")) return "Goodreads";

    return urlContent;
}