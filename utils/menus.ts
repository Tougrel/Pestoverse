import pestoBinoculars from "static/images/emotes/pestoBinoculars.webp";

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
            icon: UI_ICONS.HOME,
            to: "/",
        },
    ],
    [
        {
            label: "Pesto Around the World",
            icon: UI_ICONS.MAP,
            to: "/map",
        },
        {
            label: "Pesto Gallery",
            icon: UI_ICONS.GALLERY,
            to: "/gallery",
        },
        {
            label: "Kudo Boards",
            icon: UI_ICONS.KUDO,
            click: () => {
                const state = useState("kudo-slideover");
                state.value = true;
            },
        },
    ],
    [
        {
            label: "Credits",
            icon: UI_ICONS.CREDITS,
            to: "/credits",
        },
    ],
];

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
