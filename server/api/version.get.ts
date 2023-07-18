import pkg from "../../package.json";

export default defineEventHandler(() => {
    return {
        version: pkg.version,
    };
});
