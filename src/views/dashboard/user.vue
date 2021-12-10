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
    DashboardCoreAppBar: () => import("./components/user/AppBar"),
    DashboardCoreDrawer: () => import("./components/user/Drawer"), 
    DashboardCoreSettings: () => import("./components/user/Settings"),
    DashboardCoreView: () => import("./components/user/View"),
  },
  data: () => ({   
    loginuser: JSON.parse(sessionStorage.getItem('user')) || 0
  }),
    mounted() {
      let user = JSON.parse(sessionStorage.getItem('user')) || 0
      if (user.user_status != 'u')
        this.$router.push('/')
    },
        methods: {
      home() {
        this.$router.push('user')
      },
      logout() {
        sessionStorage.clear()
        this.$router.push('/')
      }
    }
};
</script>
