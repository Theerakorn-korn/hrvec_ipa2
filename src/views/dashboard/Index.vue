<template>
  <v-app>    
    <dashboard-Core-App-Bar/>
    <dashboard-core-drawer/>
    <dashboard-core-view/>
    <dashboard-core-settings/>    
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

};
</script>
<style>
.text_google {
  font-family: "Kanit", sans-serif;
}
.v-data-table thead th {
  font-size: 16px !important;
}

</style>

