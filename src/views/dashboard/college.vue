<template>
  <v-app>     
     <dashboard-Core-App-Bar />
    <dashboard-core-drawer />
    <dashboard-core-view />
    <dashboard-core-settings />
  </v-app>
</template>

<script>
export default {
  name: "DashboardIndex",
  components: {   
    DashboardCoreAppBar: () => import("./components/college/AppBar"),
    DashboardCoreDrawer: () => import("./components/college/Drawer"), 
    DashboardCoreSettings: () => import("./components/college/Settings"),
    DashboardCoreView: () => import("./components/college/View"),
  },
  data: () => ({   
    loginuser: JSON.parse(sessionStorage.getItem('user')) || 0
  }),
    mounted() {
      let user = JSON.parse(sessionStorage.getItem('user')) || 0
      if (user.user_status != 'B')
        this.$router.push('/')
    },
        methods: {
      home() {
        this.$router.push('college')
      },
      logout() {
        sessionStorage.clear()
        this.$router.push('/')
      }
    }
};
</script>
<style>
.text_google {
  font-family: "Kanit", sans-serif;
}
.v-data-table thead th {
  font-size: 16px !important;
}

.table thead th {
  font-size: 16px !important;
}

</style>
