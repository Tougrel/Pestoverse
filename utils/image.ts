const getUrl = (category: string, image: string) => {
    const {
        public: { cdnBase },
    } = useRuntimeConfig();
    return `${cdnBase}/${category}/${image}`;
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
