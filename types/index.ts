import type { Coordinate } from "ol/coordinate";
import type { LangNames } from "~/utils/i18n";

export type Loading = {
    website: boolean;
    lang: boolean;
}

export type CreditUser = {
    name: string;
    description: LangNames;
    icon_path: string;
}

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
