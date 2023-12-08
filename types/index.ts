declare module "@pestoverse/types" {
    interface Guild {
        id: string;
        name: string;
        icon: string;
        // There are more stuff here but we don't need them :derp:
    }

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
