const IMAGE_BASE = import.meta.env.IMAGE_BASE || "https://images.ika.gg";

const getUrl = (category: string, image: string) => {
    return `${IMAGE_BASE}/${category}/${image}`;
}

export const getPlaceholderImage = (image: string) => {
    return getUrl("placeholder", image);
}

export const getResizedImage = (image: string) => {
    return getUrl("resized", image);
}

export const getFullImage = (image: string) => {
    return getUrl("full", image);
}