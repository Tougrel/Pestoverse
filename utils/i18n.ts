import s from "assets/i18n/strings.json";
import { Loading } from "~/types";

export type LangIDs = keyof typeof s;
export type LangNames = keyof (typeof s)["en-us"];
export type Lang = Map<LangIDs, Map<LangNames, string>>;

export const LangData = {
    "en-us": {
        id: "en-us",
        name: "English",
        flag: "twemoji:flag-united-kingdom",
    },
    // "el-gr": {
    //     id: "el-gr",
    //     name: "Greek",
    //     flag: "twemoji:flag-greece",
    // },
    de: {
        id: "de",
        name: "German",
        flag: "twemoji:flag-germany",
    },
};

export const changeLangID = (langID: string) => {
    const id = useState<LangIDs>("lang_id");
    localStorage.setItem("lang-id", langID);
    id.value = langID as LangIDs;
};

export const generateLanguageMap = () => {
    const lang = useState("lang");
    const loading = useState<Loading>("loading");
    const languages = useState<LangIDs[]>("languages", () => []);
    const map: Lang = new Map();

    for (const key of Object.keys(s)) {
        languages.value.push(key as LangIDs);
        map.set(<LangIDs>key, new Map(<[LangNames, string][]>Object.entries(s[<LangIDs>key])));
    }

    lang.value = map;
    loading.value.lang = false;
};
