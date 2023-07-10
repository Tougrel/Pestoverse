export const ICONS = {
    NAV_MENU: "mdi:menu",
    SYSTEM_THEME: "heroicons:computer-desktop-solid",
    WHITE_THEME: "line-md:moon-filled-alt-to-sunny-filled-loop-transition",
    DARK_THEME: "line-md:sunny-filled-loop-to-moon-alt-filled-loop-transition",
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
]
