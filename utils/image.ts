const getUrl = (category: string, image: string) => {
    const {
        public: { cdnBase },
    } = useRuntimeConfig();
    return `${cdnBase}/${category}/${image}`;
};

export const getPlaceholderImage = (image: string, prefix: string = "") => {
    return getUrl(`${prefix}placeholder`, image);
};

export const getResizedImage = (image: string, prefix: string = "") => {
    return getUrl(`${prefix}resized`, image);
};

export const getFullImage = (image: string, prefix: string = "") => {
    return getUrl(`${prefix}full`, image);
};
