using System.Text.RegularExpressions;
using static System.Net.WebRequestMethods;

namespace API.Utils.UrlManipulation
{
    public class UrlManipulation
    {
        public static Regex UrlDomainRegex = new Regex("/^(?:https?:\\/\\/)?(?:www\\.)?([^\\/?#]+)/") ;


        public static string GenerateUrlName(string name)
        {
            if (name.Contains("stackoverflow.com")) return "Stack Overflow";
            if (name.Contains("instagram.com")) return "Instagram";
            if (name.Contains("facebook.com")) return "Facebook";
            if (name.Contains("github.com")) return "GitHub";
            if (name.Contains("tiktok.com")) return "TikTok";
            if (name.Contains("wattpad.com")) return "Wattpad";
            if (name.Contains("wikipedia.org")) return "Wikipedia";
            if (name.Contains("wiktionary.org")) return "Wiktionary";
            if (name.Contains("youtube.com") || name.Contains("youtu.be")) return "YouTube";
            if (name.Contains("gitlab.com")) return "GitLab";
            if (name.Contains("https://archive.org")) return "Internet Archive";
            if (name.Contains("reddit.com")) return "Reddit";
            if (name.Contains("twitter.com") || name.Contains("x.com")) return "X";
            if (name.Contains("archiveofourown.org")) return "AO3";
            if (name.Contains("medium.com")) return "Medium";
            if (name.Contains("fanfiction.net")) return "FFN";
            if (name.Contains("imdb.com")) return "IMDb";
            if (name.Contains("amazon.com")) return "Amazon";
            if (name.Contains("goodreads.com")) return "Goodreads";

            return name;
        }
} 

}