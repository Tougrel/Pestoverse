export default defineNuxtRouteMiddleware((to) => {
    return abortNavigation();
    // const { session, status } = useAuth();
    //
    // if (status.value !== "authenticated" && to.meta.devs_only) return abortNavigation();
    //
    // if (["256048990750113793", "769556133215862784"].indexOf(session.value!.profile.id) == -1) return abortNavigation();
});
