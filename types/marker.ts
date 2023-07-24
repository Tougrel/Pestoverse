import type { Coordinate } from "ol/coordinate";

export type MarkerImageData  = {
    url: string,
    width: number,
    height: number
}

export type MarkerProps = {
    name: string;
    coords: Coordinate;
    images: MarkerImageData[];
};
