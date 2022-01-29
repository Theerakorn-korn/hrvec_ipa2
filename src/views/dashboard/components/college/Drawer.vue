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
          <v-img
            src="https://www.bloggang.com/data/b/bigstory/picture/1449748275.gif"
            rounded
          />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ user.user_name }}</v-list-item-title>
          <v-list-item-title
            >{{ user.user_status }}{{ user.user_firstname }}
            {{ user.user_lastname }}</v-list-item-title
          >
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
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="child in item.items"
          :key="child.title"
          :to="child.to"
        >
          <v-list-item-content>
            <v-list-item-title v-text="child.title"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon v-text="child.action"></v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list-group>
    </v-list>
    <v-list> </v-list>
    <v-card>
      <div align="center">
      <!-- <v-img
        width="120"
        src="http://localhost:8080/HRvecfiles/ipa2.jpg"
      ></v-img> -->
       <v-img
        width="120"
        src="/HRvecfiles/ipa2.jpg"
      ></v-img>
      <v-card-title class="text-center">
         Line Group : กจ2
      </v-card-title> 
      </div>
    </v-card>
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
      default: false
    }
  },

  data: () => ({
    user_data: {},
    user: {},
    loginuser: JSON.parse(sessionStorage.getItem("user")) || 0,
    items: [
      {
        action: "mdi-chart-areaspline",
        items: [
          {
            title: "แผงควบคุม",
            action: "mdi-chart-multiple",
            to: "/college/Dashboard",
            active: true
          }
        ],
        title: "ข้อมูลระบบ"
      },
      {
        action: "mdi-account-cog",
        items: [
          {
            title: "ข้อมูลผู้ใช้งานระบบ",
            action: "mdi-account-arrow-right",
            to: "/college/personnel"
          }
        ],
        title: "จัดการผู้ใช้งานระบบ"
      },
      {
        action: "mdi-account-reactivate",
        items: [
          {
            title: "ข้อมูลเกี่ยวกับบุคคล",
            action: "mdi-account",
            to: "/college/personnel_tem"
          },
          {
            title: "ข้อมูลคุณวุฒิการศึกษา",
            action: "mdi-school",
            to: "/college/personnel_education"
          },
          {
            title: "ข้อมูลประสบการณ์",
            action: "mdi-airplane",
            to: "/college/personnel_experience"
          },
          {
            title: "ข้อมูลประวัติการทำงาน",
            action: "mdi-access-point-network",
            to: "/college/personnel_work_history"
          },
          {
            title: "ข้อมูลผลงาน รางวัล",
            action: "mdi-trophy-award",
            to: "/college/personnel_award"
          },
          {
            title: "ข้อมูลโทษ วินัย",
            action: "mdi-alarm-light",
            to: "/college/personnel_discipline"
          }
        ],
        title: "ระบบงานบุคคล"
      },

      {
        action: "mdi-bluetooth-transfer",
        items: [
          {
            title: "สายการสอนและสายสนับสนุน",
            action: "mdi-alarm-light",
            to: "/college/transference_personnel"
          }
          /* { title: "สายงานบริหารสถานศึกษา", action: "mdi-alarm-light", to: "/Dashboard" },
          { title: "การย้ายกรณีพิเศษ", action: "mdi-alarm-light", to: "/Dashboard" }, */
        ],
        title: "ระบบการย้าย"
      },
      {
        action: "mdi-order-bool-descending-variant",
        items: [
          {
            title: "ข้อมูลเงือนไขสาขาวิชาเอก",
            action: "mdi-basket-plus",
            to: "/college/conditions_branch"
          }
          /*   { title: "สถิติเงือนไขสาขาวิชา", action: "mdi-chart-box-outline", to: "/Dashboard" },    */
        ],
        title: "ระบบเงือนไขสาขาวิชาเอก"
      }
      /*  {
        action: "mdi-human",
        items: [
          { title: "ข้อมูลอัตรากำลังสถานศึกษา", action: "mdi-basket-plus", to: "/Dashboard" },        
          { title: "ข้อมูลเชิงปริมาณ", action: "mdi-chart-box-outline", to: "/Dashboard" },        
          { title: "ข้อมูลเชิงปริมาณ", action: "mdi-chart-box-outline", to: "/Dashboard" },        
        ],
        title: "ระบบอัตรากำลัง",
      }, */
      /* {
        action: "mdi-account-supervisor-circle",
        items: [
          { title: "ข้อมูลครูผู้ช่วย", action: "mdi-basket-plus", to: "/Dashboard" },        
          { title: "ประเมินครูผู้ช่วย", action: "mdi-chart-box-outline", to: "/Dashboard" },        
          { title: "รายงาน", action: "mdi-chart-box-outline", to: "/Dashboard" },        
        ],
        title: "ระบบครูผู้ช่วย",
      }, */
    ]
  }),

  computed: {
    ...mapState(["barColor", "barImage"]),
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(val) {
        this.$store.commit("SET_DRAWER", val);
      }
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
        title: ""
      };
    }
  },
  async mounted() {
    let result;
    let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
    result = await this.$http.post("admin.php", {
      user_name: userSession.user_name,
      ApiKey: "HRvec2021"
    });
    this.user = result.data;
  },

  methods: {
    mapItem(item) {
      return {
        ...item,
        children: item.children ? item.children.map(this.mapItem) : undefined,
        title: this.$t(item.title)
      };
    },
    logout() {
      sessionStorage.clear();
      this.$router.push("/");
    }
  }
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
