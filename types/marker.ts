import type { Coordinate } from "ol/coordinate";

export type MarkerProps = {
    name: string;
    coords: Coordinate;
    images: string[];
};
