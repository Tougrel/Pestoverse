import type { LatLngExpression } from "leaflet";

export type MarkerProps = {
    name: string;
    coords: LatLngExpression;
    images: string[];
};
