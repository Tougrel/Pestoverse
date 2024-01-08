import { authOptions } from "~/server/api/auth/[...]";
import { getServerSession } from "#auth";

import { H3Event } from "h3";

export const getLoggedInSession = async (event: H3Event) => {
    const session = await getServerSession(event, authOptions);
    if (!session) {
        throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
    }
    return session;
};
