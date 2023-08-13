export type MarkerImageData = {
    url: string;
    width: number;
    height: number;
};

export type MarkerProps = {
    name: string;
    coords: [number, number];
    images: MarkerImageData[];
};
