<template>
  <v-app-bar
    id="app-bar"      
    dark fixed
    app 
    elevation="4"      
    height="75"
    elevate-on-scroll
      scroll-target="#scrolling-techniques-7" 
    class="text_google"     

  >
    <v-btn
      class="mr-3"
      min-width="1"
      text
      @click="setDrawer(!drawer)"
    >
      <v-icon v-if="value">
        mdi-view-quilt
      </v-icon>

      <v-icon v-else>
        mdi-dots-vertical
      </v-icon>
    </v-btn>

    <v-toolbar-title
      class="hidden-sm-and-down font-light"
      v-text="$route.name"
      color="white"
    />

    <v-spacer />

    <div class="mx-3" />
<v-toolbar-title><v-avatar
          :tile="false"
          :size="50"
          color="grey lighten-4"
        ><img src="https://www.bloggang.com/data/b/bigstory/picture/1449748275.gif"></v-avatar> ระบบบริหารงานบุคคล สอศ.</v-toolbar-title>
    <v-btn
      class="ml-2"
      min-width="0"
      text
      to="/"
    >
      <v-icon>mdi-view-dashboard</v-icon>
    </v-btn>

    <v-menu
      bottom
      left
      offset-y
      origin="top right"
      transition="scale-transition"
    >
      <template v-slot:activator="{ attrs, on }">
        <v-btn
          class="ml-2"
          min-width="0"
          text
          v-bind="attrs"
          v-on="on"
        >
          <v-badge
            color="red"
            overlap
            bordered
          >
            <template v-slot:badge>
              <span>5</span>
            </template>

            <v-icon>mdi-bell</v-icon>
          </v-badge>
        </v-btn>
      </template>

      <v-list
        :tile="false"
        nav
      >
        <div>
          <app-bar-item
            v-for="(n, i) in notifications"
            :key="`item-${i}`"
          >
            <v-list-item-title v-text="n" />
          </app-bar-item>
        </div>
      </v-list>
    </v-menu>    
  </v-app-bar> 
</template>

<script>
  // Components
  import { VHover, VListItem } from 'vuetify/lib'

  // Utilities
  import { mapState, mapMutations } from 'vuex'

  export default {
   
    name: 'DashboardCoreAppBar',

    components: {
      AppBarItem: {
        render (h) {
          return h(VHover, {
            scopedSlots: {
              default: ({ hover }) => {
                return h(VListItem, {
                  attrs: this.$attrs,
                  class: {
                    'black--text': !hover,
                    'white--text secondary elevation-12': hover,
                  },
                  props: {
                    activeClass: '',
                    dark: hover,
                    link: true,
                    ...this.$attrs,
                  },
                }, this.$slots.default)
              },
            },
          })
        },
      },
    },

    props: {
      value: {
        type: Boolean,
        default: false,
      },
    },

    data: () => ({
      notifications: [
        'Mike John Responded to your email',
        'You have 5 new tasks',
        'You\'re now friends with Andrew',
        'Another Notification',
        'Another one',
      ],
    }),

    computed: {
      ...mapState(['drawer']),
    },

    methods: {
      ...mapMutations({
        setDrawer: 'SET_DRAWER',
      }),
    },
  }
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Prompt');
:root {
  --sicc-orange: #F89C27;
  --sicc-blue: #0054A6;
  --vec_red: #850000;
  --vec_orange: #EC8E00;
}

  #app-bar{
    background-color: var(--vec_red);
    border-bottom: 3px solid var(--vec_orange);
  }
 
</style>