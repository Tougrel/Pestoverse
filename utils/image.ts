const IMAGE_HOST = import.meta.env.IMAGE_HOST || "images.ika.gg";

const getUrl = (category: string, image: string) => {
    return `https://${IMAGE_HOST}/${category}/${image}`;
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