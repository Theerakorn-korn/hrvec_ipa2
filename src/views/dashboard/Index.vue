<template>
  <v-app>
    <dashboard-Core-App-Bar />
    <dashboard-core-drawer  :elevation="hover ? 24 : 6" />
    <dashboard-core-view />
    <dashboard-core-settings />
  </v-app>
</template>

<script>
export default {
  name: "DashboardIndex",
  components: {
    DashboardCoreAppBar: () => import("./components/core/AppBar"),
    DashboardCoreDrawer: () => import("./components/core/Drawer"), 
    DashboardCoreSettings: () => import("./components/core/Settings"),
    DashboardCoreView: () => import("./components/core/View"),
  },
  data: () => ({    
    expandOnHover: false,
  }),
   mounted() {
    let user = JSON.parse(sessionStorage.getItem("user")) || 0;
    if (user.user_status != "B") this.$router.push("/");   
  },
   methods: {
    home() {
      this.$router.push("/Home");
    },
    logout() {
      sessionStorage.clear();
      this.$router.push("/");
    },
  },

};
</script>
