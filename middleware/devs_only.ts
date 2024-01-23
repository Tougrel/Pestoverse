export default defineNuxtRouteMiddleware((to) => {
    const { session, status } = useAuth();
    const runtimeConfig = useRuntimeConfig();

    if (status.value !== "authenticated" && to.meta.devs_only) return abortNavigation();

    if (runtimeConfig.public.dev_ids.indexOf(session.value!.profile.id) == -1) return abortNavigation();
});
