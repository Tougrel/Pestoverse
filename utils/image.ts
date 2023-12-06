const getUrl = (category: string, image: string) => {
    const {
        app: { cdnURL },
    } = useRuntimeConfig();
    return `${cdnURL}/${category}/${image}`;
};

export const getPlaceholderImage = (image: string) => {
    return getUrl("placeholder", image);
};

export const getResizedImage = (image: string) => {
    return getUrl("resized", image);
};

export const getFullImage = (image: string) => {
    return getUrl("full", image);
};
