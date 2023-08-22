import type { Lang, LangIDs } from "~/utils/i18n";
import pestoBinoculars from "static/images/emotes/pestoBinoculars.webp";

interface Pages {
    [key: string]: {
        name?: string;
        icon: string;
        image: boolean;
    }
}

export const PAGES = (lang: Lang, id: LangIDs): Pages => {
    return {
        "/": {
            name: lang.get(id)?.get("nav.home"),
            icon: ICONS.HOME,
            image: false,
        },
        "/gallery": {
            name: lang.get(id)?.get("nav.gallery"),
            icon: pestoBinoculars,
            image: true,
        },
        "/credits": {
            name: lang.get(id)?.get("nav.credits"),
            icon: ICONS.COFFEE,
            image: false,
        },
    }
};

export const NAV_MENU = (lang: Lang, id: LangIDs) => {
    return [
        [
            {
                label: lang.get(id)?.get("nav.home"),
                icon: UI_ICONS.HOME,
                to: "/",
            },
        ],
        [
            {
                label: lang.get(id)?.get("nav.menu.world"),
                icon: UI_ICONS.MAP,
                to: "/map",
            },
            {
                label: lang.get(id)?.get("nav.menu.gallery"),
                icon: UI_ICONS.GALLERY,
                to: "/gallery",
            },
            {
                label: lang.get(id)?.get("nav.menu.kudo"),
                icon: UI_ICONS.KUDO,
                click: () => {
                    const state = useState("kudo-slideover");
                    state.value = true;
                },
            },
        ],
        [
            {
                label: lang.get(id)?.get("nav.menu.credits"),
                icon: UI_ICONS.CREDITS,
                to: "/credits",
            },
        ],
    ];
};

export const KUDO_BOARDS = [
    {
        title: "Yunii's Birthday - 2022",
        description: null,
        icon: ICONS.CAKE,
        to: "https://www.kudoboard.com/boards/w9JmES7S",
    },
    {
        title: "Yunii's 3 year Anniversary",
        description: null,
        icon: ICONS.POPPER,
        to: "https://www.kudoboard.com/boards/jg4DoxNe",
    },
    {
        title: "Yunii's Birthday - 2023",
        description: null,
        icon: ICONS.CAKE,
        to: "https://www.kudoboard.com/boards/ALFEX0yC",
    },
];
