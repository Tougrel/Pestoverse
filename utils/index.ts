export const ICONS = {
    NAV_MENU: "mdi:menu",
    SYSTEM_THEME: "heroicons:computer-desktop-solid",
    WHITE_THEME: "line-md:moon-filled-alt-to-sunny-filled-loop-transition",
    DARK_THEME: "line-md:sunny-filled-loop-to-moon-alt-filled-loop-transition",
    CAT: "mdi:cat",
    PAW: "mdi:paw",
} as const;

export const NAV_MENU = [
    [
        {
            label: "Home",
            icon: "i-heroicons-home-solid",
            to: "/"
        }
    ],
    [
        {
            label: "Pesto Around the World",
            icon: "i-heroicons-map-solid",
            to: "/map"
        },
        {
            label: "Pesto Gallery",
            icon: "i-heroicons-photo-solid",
            to: "/gallery"
        },
        {
            label: "Kudo Boards",
            icon: "i-heroicons-clipboard-document-list-solid",
            click: () => {
                const state = useState("kudo-slideover");
                state.value = true;
            }
        },
    ],
    [
        {
            label: "Credits",
            icon: "i-mdi-handshake",
            to: "/credits"
        }
    ],
];

export const THEME_MENU = [
    [
        {
            label: "System",
            icon: "i-heroicons-computer-desktop-solid",
            click: () => {
                const color = useColorMode();
                color.preference = "system";
            },
        },
        {
            label: "White",
            icon: "i-heroicons-sun-solid",
            click: () => {
                const color = useColorMode();
                color.preference = "white";
            },
        },
        {
            label: "Dark",
            icon: "i-heroicons-moon-solid",
            click: () => {
                const color = useColorMode();
                color.preference = "dark";
            },
        },
    ]
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
    }
]
