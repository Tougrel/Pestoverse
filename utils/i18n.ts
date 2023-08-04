import s from "assets/i18n/strings.json";
import { Loading } from "~/types";

export type LangIDs = keyof typeof s;
export type LangNames = keyof (typeof s)["en-us"];
export type Lang = Map<LangIDs, Map<LangNames, string>>;

export const changeLangID = (langID: string) => {
    const id = useState("lang_id");
    id.value = langID;
};

export const generateLanguageMap = () => {
    const lang = useState("lang");
    const loading = useState<Loading>("loading");
    const map: Lang = new Map();

    for (const key of Object.keys(s)) map.set(<LangIDs>key, new Map(<[LangNames, string][]>Object.entries(s[<LangIDs>key])));

    lang.value = map;
    loading.value.lang = false;
};
