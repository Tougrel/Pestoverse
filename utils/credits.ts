import yuniiho from "static/images/credits/yuniiho.webp";
import tougrel from "static/images/credits/tougrel.webp";
import ikanexus from "static/images/credits/ikanexus.webp";
import bootfighter from "static/images/credits/bootfighter.webp";
import dhoru from "static/images/credits/dhoru.webp";
import yoclesh from "static/images/credits/yoclesh.webp";
import vihilsta from "static/images/credits/vihilsta.webp";
import phantasma from "static/images/credits/phantasma.webp";
import { CreditUser } from "~/types";

export const CREDIT_USERS: CreditUser[] = [
    {
        name: "Yuniiho",
        description: "credits.emotes",
        icon_path: yuniiho,
    },
    {
        name: "Tougrel",
        description: "credits.ideas.maintain",
        icon_path: tougrel,
    },
    {
        name: "Ikanexus",
        description: "credits.ideas.code",
        icon_path: ikanexus,
    },
    {
        name: "Bootfighter",
        description: "credits.emotes",
        icon_path: bootfighter,
    },
    {
        name: "Dhoru",
        description: "credits.emotes",
        icon_path: dhoru,
    },
    {
        name: "Yoclesh",
        description: "credits.emotes",
        icon_path: yoclesh,
    },
    {
        name: "Vihilsta",
        description: "credits.ideas",
        icon_path: vihilsta,
    },
    {
        name: "Phantasma",
        description: "credits.gallery",
        icon_path: phantasma,
    },
];
