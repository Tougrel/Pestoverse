import { authOptions } from "~/server/api/auth/[...]";
import { getServerSession } from "#auth";

import { H3Event } from "h3";

export const getLoggedInSession = async (event: H3Event, raise = true) => {
    const session = await getServerSession(event, authOptions);
    if (!session && raise) {
        throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
    }
    return session;
};
