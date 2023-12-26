export default defineAppConfig({
    nuxtIcon: {
        size: "1em",
    },

    ui: {
        popover: {
            background: "bg-white dark:bg-navigation",
        },

        avatar: {
            background: "bg-primary-700 dark:bg-primary-500",
            placeholder: "font-medium leading-none text-gray-300 dark:text-white truncate",
            icon: {
                base: "text-white dark:text-white flex-shrink-0",
            },
        },

        dropdown: {
            background: "bg-white dark:bg-navigation",
            ring: "ring-1 ring-slate-500 dark:ring-slate-700",
            item: {
                active: "bg-gray-300 dark:bg-background text-black dark:text-white",
                icon: {
                    active: "text-primary-500 dark:text-primary-400",
                },
            },
        },

        card: {
            background: "bg-white dark:bg-navigation",
            divide: "divide-y divide-slate-500 dark:divide-slate-700",
            ring: "ring-1 ring-slate-500 dark:ring-slate-700",
        },

        slideover: {
            background: "bg-white dark:bg-background",
            overlay: {
                background: "bg-black/60",
            },
            ring: "ring-1 ring-navigation dark:ring-gray-600",
        },

        input: {
            color: {
                gray: {
                    outline: "shadow-sm bg-gray-50 dark:bg-navigation text-gray-900 dark:text-white ring-1 ring-inset ring-slate-500 dark:ring-slate-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400",
                },
            },
        },

        alert: {
            color: {
                white: {
                    solid: "text-gray-900 dark:text-white bg-white dark:bg-navigation ring-1 ring-slate-500 dark:ring-slate-700",
                },
            },
        },

        badge: {
            color: {
                gray: {
                    solid: "ring-1 ring-inset ring-slate-300 dark:ring-slate-700 text-gray-700 dark:text-gray-200 bg-white dark:bg-navigation",
                }
            },
        },
    },
});
