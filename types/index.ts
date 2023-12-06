declare module "@types/pestoverse" {
    type MarkerImageData = {
        url: string;
        width: number;
        height: number;
    };

    type MarkerProps = {
        name: string;
        coords: [number, number];
        images: MarkerImageData[];
    };
}
