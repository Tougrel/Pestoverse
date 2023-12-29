import { getDb } from "~/server/db/database";
import { authOptions } from "~/server/api/auth/[...]";
import { getServerSession } from "#auth";
import { getSubmissions } from "~/server/db/submissions";

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event, authOptions);
    if (!session) {
        throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
    }
    const discordId = session.profile.id;
    const db = getDb(event.context);
    const result = await getSubmissions(db, discordId);
    return result.reduce((obj, item) => Object.assign(obj, { [item.categoryId]: item.submission }), {});
});
