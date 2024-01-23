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

declare module "@pestoverse/dashboard" {
    interface Settings {
        awards: AwardsSettings;
        toggles: Record<string, Toggle>;
        kv_items: KVItemSettings[];
    }

    interface AwardsSettings {
        nominations_start: string;
        nominations_end: string;
        voting_start: string;
        voting_end: string;
    }

    interface Toggle {
        name: string;
        value: boolean;
    }

    interface KVItemSettings {
        key: string,
        expiry: string
    }

}
