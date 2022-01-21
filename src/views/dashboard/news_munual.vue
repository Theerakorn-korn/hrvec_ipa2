<template>
  <v-container
    id="alerts"
    fluid
    tag="section"
  >
   
    <v-row>
      <v-col
        cols="12"
        md="8"
      >
        <v-card>
          <v-card-text>
            <base-subheading subheading="ข่าวประชาสัมพันธ์ ข้อกำหนด เกณฑ์" />          

            
            <base-material-alert
              color="info"
              dark              
              icon="mdi-bell"
              v-for=" item in news_ss"
             :key="item.id_new"
              ref="item.link_file"
              
            >
            <span style="font-size: 18px;"> {{ item.topic_s }}</span>
             <v-divider
        class="my-4 info"
        style="opacity: 0.22"
      ></v-divider>
            <span style="font-size: 16px;"> {{ item.detail_s }}</span>
             <h5> {{ item.date_times }}</h5>
<div class="text-right">
 <a :href="'http://localhost:8080/HRvecfiles/' + item.link_file" target="_blank" id="a"> OPEN </a>
 <!-- <a :href="'/HRvecfiles/' + item.link_file" target="_blank" id="a"> OPEN </a> -->
    </div>          
            </base-material-alert>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col
        cols="12"
        md="4"
      >
        <v-card>
          <v-card-text>
            <base-subheading subheading="คู่มือการใช้งาน" />
            <base-material-alert
             v-for=" item in manual_ss"
             :key="item.id_manual"    
              dark   
              color="primary"                         
            >           
                <span style="font-size: 18px;"                
                > {{ item.topic_s }}</span>
             <v-divider
        class="my-4 info"
        style="opacity: 0.22"
      ></v-divider>
            <span style="font-size: 16px;"> {{ item.detail_s }}</span>
             <h5> {{ item.date_times }}</h5>
<div class="text-right">
 <a :href="'http://localhost:8080/HRvecfiles/' + item.link_file" target="_blank" id="a"> OPEN </a>
 <!-- <a :href="'/HRvecfiles/' + item.link_file" target="_blank" id="a"> OPEN </a> -->
    </div>        
   
            </base-material-alert>           
          </v-card-text>
        </v-card>
      </v-col>     
    </v-row>   
  </v-container>
</template>

<script>
  export default {
    name: 'DashboardNotifications',

    data: () => ({
       ApiKey: 'HRvec2021',  
      color: 'info',
      news_ss: [],
      manual_ss: [],
      colors: [
        'info',
        'success',
        'warning',
        'error',
      ],
      dialog: false,
      dialog2: false,
      dialog3: false,
      direction: 'top center',
      directions: [
        'top left',
        'top center',
        'top right',
        'bottom left',
        'bottom center',
        'bottom right',
      ],
      snackbar: false,
    }),

    computed: {
      parsedDirection () {
        return this.direction.split(' ')
      },
    },
  async mounted(){
        this.news_sQueryAll()
    },

    methods: {
       async news_sQueryAll() {
          this.loading = true
        let result = await this.$http.post('news_s.php', {
          ApiKey: this.ApiKey
        }).finally(() => this.loading = false)
        this.news_ss = result.data
      },

 async news_sQueryAll() {
          this.loading = true
        let result = await this.$http.post('manual_s.php', {
          ApiKey: this.ApiKey
        }).finally(() => this.loading = false)
        this.manual_ss = result.data
      },

      randomColor () {
        this.color = this.colors[Math.floor(Math.random() * this.colors.length)]
      },
    },
  }
</script>
<style>
a{
   outline: none;
  text-decoration: none;
  padding: 2px 1px 0;
}
a:link {
  color: #265301;
}
a:visited {
  color: #437A16;
}

a:focus {
  border-bottom: 1px solid;
  background: #BAE498;
}

#a:hover {
  border-bottom: 1px solid;
  background: #CDFEAA;
  border-radius: 5px;
}

a:active {
  background: #265301;
  color: #CDFEAA;
}
</style>