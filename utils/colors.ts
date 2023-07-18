import colors from "tailwindcss/colors";

const ignoredDefault = [
    "slate",
    "gray",
    "zinc",
    "neutral",
    "stone",
    "lightBlue",
    "warmGray",
    "trueGray",
    "coolGray",
    "blueGray",
];

export const COLORS = Object.fromEntries(
    Object.entries(colors)
        .filter((c) => c[1] === Object(c[1]) && !ignoredDefault.includes(c[0]))
);