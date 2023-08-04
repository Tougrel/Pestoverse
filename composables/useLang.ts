import type { Lang, LangIDs } from "~/utils/i18n";

export default () => {
    return useState<Lang>("lang").value.get(useState<LangIDs>("lang_id").value)!;
};
