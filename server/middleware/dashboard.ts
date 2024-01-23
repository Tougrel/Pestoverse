export default defineEventHandler(async (event) => {
    if (!event.node.req.url?.startsWith("/api/dashboard")) return;
    const session = await getLoggedInSession(event, false);
    const runtimeConfig = useRuntimeConfig(event);
    const discordId = session?.profile.id || "";

    if (runtimeConfig.public.dev_ids.indexOf(discordId) == -1) throw createError({ status: 403, statusMessage: "Forbidden" });
});
