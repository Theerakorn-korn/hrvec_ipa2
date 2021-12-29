<template>
  <v-content>
    <router-view />
    <v-spacer />
    <dashboard-core-footer/>
  </v-content>
</template>

<script>
  export default {
    name: 'DashboardCoreView',

    components: {
      DashboardCoreFooter: () => import('./Footer'),
    },
  }
</script>
