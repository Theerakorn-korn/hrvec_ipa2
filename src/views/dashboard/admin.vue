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
    DashboardCoreAppBar: () => import("./components/admin/AppBar"),
    DashboardCoreDrawer: () => import("./components/admin/Drawer"), 
    DashboardCoreSettings: () => import("./components/admin/Settings"),
    DashboardCoreView: () => import("./components/admin/View"),
  },
  data: () => ({   
    loginuser: JSON.parse(sessionStorage.getItem('user')) || 0
  }),
    mounted() {
      let user = JSON.parse(sessionStorage.getItem('user')) || 0
      if (user.user_status != 'A')
        this.$router.push('/')
    },
        methods: {
      home() {
        this.$router.push('admin')
      },
      logout() {
        sessionStorage.clear()
        this.$router.push('/')
      }
    }
};
</script>
