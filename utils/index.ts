import pestoBinoculars from "static/images/emotes/pestoBinoculars.webp";

export const ICONS = {
    NAV_MENU: "mdi:menu",
    SYSTEM_THEME: "heroicons:computer-desktop-solid",
    WHITE_THEME: "line-md:sunny-filled-loop",
    DARK_THEME: "line-md:moon-filled-alt-loop",
    HOME: "mdi:home",
    PALETTE: "mdi:palette",
    CAT: "mdi:cat",
    PAW: "mdi:paw",
    GITHUB: "mdi:github",
    COFFEE: "line-md:coffee-half-empty-twotone-loop",
} as const;

export const PAGES = {
    "/": {
        name: "Home",
        icon: ICONS.HOME,
        image: false,
    },
    "/gallery": {
        name: "Look at all the Pesto",
        icon: pestoBinoculars,
        image: true,
    },
    "/credits": {
        name: "Made by these amazing people",
        icon: ICONS.COFFEE,
        image: false,
    },
} as const;

export const NAV_MENU = [
    [
        {
            label: "Home",
            icon: "i-heroicons-home-solid",
            to: "/",
        },
    ],
    [
        {
            label: "Pesto Around the World",
            icon: "i-heroicons-map-solid",
            to: "/map",
        },
        {
            label: "Pesto Gallery",
            icon: "i-heroicons-photo-solid",
            to: "/gallery",
        },
        {
            label: "Kudo Boards",
            icon: "i-heroicons-clipboard-document-list-solid",
            click: () => {
                const state = useState("kudo-slideover");
                state.value = true;
            },
        },
    ],
    [
        {
            label: "Credits",
            icon: "i-mdi-handshake",
            to: "/credits",
        },
    ],
];

export const KUDO_BOARDS = [
    {
        title: "Yunii's Birthday - 2022",
        description: null,
        icon: "heroicons:cake-solid",
        to: "https://www.kudoboard.com/boards/w9JmES7S",
    },
    {
        title: "Yunii's 3 year Anniversary",
        description: null,
        icon: "mdi:party-popper",
        to: "https://www.kudoboard.com/boards/jg4DoxNe",
    },
    {
        title: "Yunii's Birthday - 2023",
        description: null,
        icon: "heroicons:cake-solid",
        to: "https://www.kudoboard.com/boards/ALFEX0yC",
    },
];
