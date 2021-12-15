<template>
  <v-navigation-drawer
    id="core-navigation-drawer"
    v-model="drawer"
    :dark="barColor !== 'rgba(228, 226, 226, 1), rgba(255, 255, 255, 0.7)'"
    :expand-on-hover="expandOnHover"
    :right="$vuetify.rtl"
    :src="barImage"
    mobile-break-point="960"
    app
    width="260"
    v-bind="$attrs"
    class="text_google"
  >
    <template v-slot:img="props">
      <v-img :gradient="`to bottom, ${barColor}`" v-bind="props" />
    </template>

    <v-divider class="mb-1" />

    <v-list dense nav>
      <v-list-item>
        <v-list-item-avatar class="align-self-center" color="white" contain>
          <v-img src="https://www.bloggang.com/data/b/bigstory/picture/1449748275.gif" rounded />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ user.user_name }}</v-list-item-title>
          <v-list-item-title>{{ user.user_status }}{{ user.user_firstname }} {{ user.user_lastname }} </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider class="mb-2" />
  <v-list>
      <v-list-group
        v-for="item in items"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.action"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="child in item.items"
          :key="child.title"
          :item="item"
          :to="child.to"               
        >
          <v-list-item-content>
            <v-list-item-title v-text="child.title" :prepend-icon="item.icon"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
 <v-list>
     <!--  <v-list>    
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
      >
       <template v-for="(item, i) in computedItems">
        <base-item-group v-if="item.children" :key="`group-${i}`" :item="item"></base-item-group>
        <base-item v-else :key="`item-${i}`" :item="item" />
      </template>
      </v-list-item-group>
    </v-list> -->
<!-- 
      <v-list-group       
        prepend-icon="mdi-account-circle"
      >
        <template v-slot:activator>
          <v-list-item-title>ข้อมูลบุคคล</v-list-item-title>
        </template>  
         <template v-for="(item, i) in computedPersonnels">
        <base-item-group v-if="item.children" :key="`group-${i}`" :item="item"></base-item-group>
        <base-item v-else :key="`item-${i}`" :item="item" />
      </template>
       
          
       
      </v-list-group> -->
    </v-list>
   
    <template v-slot:append>
      <base-item
        :item="{
          title: 'ออกจากระบบ',
          icon: 'mdi-package-up',         
        }"
        @click="logout()"
      />
    </template>
  </v-navigation-drawer>
</template>

<script>
// Utilities
import { mapState } from "vuex";

export default {
  name: "DashboarduserDrawer",

  props: {
    expandOnHover: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    user_data: {},
    user: {},
    loginuser: JSON.parse(sessionStorage.getItem("user")) || 0,
    items: [
        {
          action: 'mdi-ticket',
          items: [{ title: 'List Item', icon:'mdi-ticket', to: '/Dashboard' }],
          title: 'Attractions',
        },
        {
          action: 'mdi-silverware-fork-knife',
          active: true,
          items: [
            { title: 'Breakfast & brunch' },
            { title: 'New American' },
            { title: 'Sushi' },
          ],
          title: 'Dining',
        },
        {
          action: 'mdi-school',
          items: [{ title: 'List Item' }],
          title: 'Education',
        },
        {
          action: 'mdi-human-male-female-child',
          items: [{ title: 'List Item' }],
          title: 'Family',
        },
        {
          action: 'mdi-bottle-tonic-plus',
          items: [{ title: 'List Item' }],
          title: 'Health',
        },
        {
          action: 'mdi-briefcase',
          items: [{ title: 'List Item' }],
          title: 'Office',
        },
        {
          action: 'mdi-tag',
          items: [{ title: 'List Item' }],
          title: 'Promotions',
        },
      ],
    /* personnels: [
        { title:'ข้อมูลบุคคล', icon: 'mdi-account-multiple-outline', to: '/personnel'},
        { title:'ข้อมูลประวัติการศึกษา', icon: 'mdi-account-multiple-outline', to: '/Dashboard'},
        { title:'ข้อมูลประสบการณ์', icon: 'mdi-account-multiple-outline', to: '/Dashboard'},
        { title:'ข้อมูลประวัติการทำงาน', icon: 'mdi-account-multiple-outline', to: '/Dashboard'},
        { title:'ข้อมูลโทษวินัย', icon: 'mdi-account-multiple-outline', to: '/Dashboard'},       
      ],
     
    items: [
      { title: "Dashboard", icon: "mdi-account", to: "/Dashboard"},   
    ], */
    
  }),

  computed: {
    ...mapState(["barColor", "barImage"]),
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(val) {
        this.$store.commit("SET_DRAWER", val);
      },
    },
    computedItems() {
      return this.items.map(this.mapItem);      
    },
    computedPersonnels() {
      return this.personnels.map(this.mapItem);      
    },
    profile() {
      return {
        avatar: true,
        title: "",
      };
    },
  },
  async mounted() {
     let result
      let userSession = JSON.parse(sessionStorage.getItem('user')) || 0
      result = await this.$http.post('admin.php', {
        user_name: userSession.user_name,
        ApiKey: 'HRvec2021'
      })
      this.user = result.data
      this.$store.commit('getLoginUser', userSession)
    },

  methods: {    
    mapItem(item) {
      return {
        ...item,
        children: item.children ? item.children.map(this.mapItem) : undefined,
        title: this.$t(item.title),
      };
    },
    logout() {
      sessionStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>

<style lang="sass">
@import '~vuetify/src/styles/tools/_rtl.sass'

#core-navigation-drawer
  .v-list-group__header.v-list-item--active:before
    opacity: .24

    .v-list-item
      &__icon--text,
      &__icon:first-child
        justify-content: center
        text-align: center
        width: 20px

        +ltr()
          margin-right: 24px
          margin-left: 12px !important

        +rtl()
          margin-left: 24px
          margin-right: 12px !important

    .v-list--dense
      .v-list-item
        &__icon--text,
        &__icon:first-child
          margin-top: 10px

    .v-list-group--sub-group
      .v-list-item
        +ltr()
          padding-left: 8px

        +rtl()
          padding-right: 8px

      .v-list-group__header
        +ltr()
          padding-right: 0

        +rtl()
          padding-right: 0

        .v-list-item__icon--text
          margin-top: 19px
          order: 0

        .v-list-group__header__prepend-icon
          order: 2

          +ltr()
            margin-right: 8px

          +rtl()
            margin-left: 8px
</style>
