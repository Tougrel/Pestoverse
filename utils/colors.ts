import colors from "tailwindcss/colors";

const ignoredDefault = [
    "inherit",
    "current",
    "transparent",
    "black",
    "white",
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
// Had to use this alternative way of excluding keys otherwise Tailwind was printing warnings all the time
export const COLORS = Object.keys(colors)
    .filter(key => !ignoredDefault.includes(key))
    .reduce((obj, key: string) => ({[key]: Object(colors)[key], ...obj}), {}) as typeof colors;