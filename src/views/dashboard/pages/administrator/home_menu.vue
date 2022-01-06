<template>
  <v-container id="home_menu" fluid tag="section">
  <v-alert
      outlined
      color="purple"
       elevation="2"
    >     
    <v-row>
      <v-col cols="12" md="3">
        
      </v-col>
       <v-col cols="12" md="3">
        <div> ผู้ใช้งานระบบ : {{ user.user_ID }}  </div>
       <div> ชื่อผู้ใช้งาน : {{ user.user_firstname }}  {{ user.user_lastname || '' }}</div>
         สถานะ : {{ user.user_status_name }}
      </v-col>
        <v-col cols="12" md="3">
       <v-btn rounded
      color="primary"
      dark
      @click.native="userUpdate()"
      >
         Update Password
       </v-btn>
      </v-col>
        <v-col cols="12" md="3">       
      </v-col>
    </v-row>
        
         </v-alert>
    <v-row>
      <v-col cols="12" md="6">
        <v-card class="pa-2">
          <v-card-title>ผู้ใช้งานระบบ</v-card-title>
          <v-alert
            border="left"
            colored-border
            type="error"
            elevation="2"
            icon="mdi-account-cog"
            class="ma-4"
          >
            <v-list>
              <v-list-item-group>
                <v-list-item v-for="(item, i) in user_system_items" :key="i" :to="item.to">
                  <v-list-item-icon>
                    <v-icon v-text="item.icon"></v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.text"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-alert>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="pa-2">
          <v-card-title>ข้อมูลงานบุคคล</v-card-title>
          <v-alert
            border="left"
            colored-border
            color="deep-purple accent-4"
            elevation="2"
            icon="mdi-account-details"
            class="ma-4"
          >
            <v-list>
              <v-list-item-group >
                <v-list-item v-for="(item, i) in user_items" :key="i" :to="item.to">
                  <v-list-item-icon>
                    <v-icon v-text="item.icon"></v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.text"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-alert>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="pa-2">
          <v-card-title>ระบบการย้าย</v-card-title>
          <v-alert
            border="left"
            colored-border
            type="info"
            elevation="2"
            icon="mdi-account-convert"
            class="ma-4"
          >
            <v-list>
              <v-list-item-group >
                <v-list-item v-for="(item, i) in movement_items" :key="i" :to="item.to">
                  <v-list-item-icon>
                    <v-icon v-text="item.icon"></v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.text"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-alert>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="pa-2">
          <v-card-title>เงือนไขสาขาวิชา</v-card-title>
          <v-alert
            border="left"
            colored-border
            color="green darken-4"
            elevation="2"
            icon="mdi-source-branch"
            class="ma-4"
          >
            <v-list>
              <v-list-item-group >
                <v-list-item v-for="(item, i) in condition_items" :key="i" :to="item.to">
                  <v-list-item-icon>
                    <v-icon v-text="item.icon"></v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.text"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-alert>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="pa-2">
          <v-card-title>ระบบอัตรากำลัง</v-card-title>
          <v-alert
            border="left"
            colored-border
             color="orange darken-4"
            elevation="2"
            icon="mdi-human"
            class="ma-4"
          >
            <v-list>
              <v-list-item-group >
                <v-list-item v-for="(item, i) in human_items" :key="i" :to="item.to">
                  <v-list-item-icon>
                    <v-icon v-text="item.icon"></v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.text"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-alert>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="pa-2">
          <v-card-title>ระบบครูผู้ช่วย</v-card-title>
          <v-alert
            border="left"
            colored-border
           color="yellow accent-4"
            elevation="2"
            icon="mdi-human-male-male"
            class="ma-4"
          >
            <v-list>
              <v-list-item-group >
                <v-list-item v-for="(item, i) in prepare_items" :key="i" :to="item.to">
                  <v-list-item-icon>
                    <v-icon v-text="item.icon"></v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.text"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-alert>
        </v-card>
      </v-col>
    </v-row>
     <!-- V-model userdialog -->
      <v-layout row justify-center>
         <v-dialog v-model="adduserdialog" persistent max-width="80%">
        <v-card class="mx-auto pa-6" elevation="2">
           <base-material-card
              color="yellow"
              icon="mdi-clipboard-text"
              title="เปลี่ยนรหัสผ่าน"
              class="px-5 py-3 text_google"
              elevation="2"
            >            
            </base-material-card>
          <v-card-text>
            <v-form ref="userform" lazy-validation>
              <v-container grid-list-md>
                <v-layout wrap> 
                    <v-flex md12>
                   {{ user.user_name }} {{ user.user_firstname }}{{ user.user_lastname }}
                  </v-flex>                                        
                  <v-flex md6>
                    <v-text-field outlined label="Password" v-model="user.user_password" type="password"></v-text-field>
                  </v-flex>
                  <v-flex md6>
                 <v-text-field outlined label="Confirm Password" v-model="user.user_confirmpassword" type="password"  required :rules="[v => v==user.user_password]"></v-text-field>             
                  </v-flex>
                  <v-flex xs12>
                    <v-divider></v-divider>
                  </v-flex>   
                </v-layout>
              </v-container>
              <small>* จำเป็น</small>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn large @click.stop="adduserdialog = false" rounded>
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn large color="warning" @click.stop="userSubmit()" rounded>
                <v-icon dark>mdi-pencil</v-icon>&nbsp;แก้ไข
              </v-btn>

          </v-card-actions>
        </v-card>
      </v-dialog>
      </v-layout>
       <v-container fluid>      

 <v-snackbar v-model="snackbar.show" top :timeout="snackbar.timeout" :color="snackbar.color">
      <v-icon large>{{snackbar.icon}}</v-icon>
      <v-card-text>
        {{snackbar.text}}
      </v-card-text>
     
      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackbar.show = false">Close</v-btn>
      </template>
    </v-snackbar>


    </v-container>
  </v-container>
</template>

<script>
export default {
  data() {
    return { 
      ApiKey: "HRvec2021",   
      user: {}, 
      users: [],
      adduserdialog: false,
  snackbar: {
        show: false,
        color: '',
        timeout: 5000,
        icon: '',
        text: ''
      },
        user_system_items: [ 
          { text: "ข้อมูลผู้ใช้งานระบบ ข้าราชการครูและบุคลาการทางการศึกษา", icon: "mdi-account-arrow-right", to: "/admin/user" },
          { text: "ข้อมูลผู้ใช้งานระบบ วิทยาลัย อศจ สถานบัน กจ2 Admin", icon: "mdi-account-arrow-right", to: "/admin/user" },
          { text: "สถานะผู้ใช้งานระบบ", icon: "mdi-account-cog", to: "/admin/user_status" },
          { text: "ข้อมูลประเภทสถานศึกษา", icon: "mdi-office-building", to: "/admin/collegetype" },
          { text: "ข้อมูลรอบปี", icon: "mdi-calendar", to: "/admin/period" },
        ],

          user_items: [ 
         { text: "ข้อมูลเกี่ยวกับบุคคล", icon: "mdi-account", to: "/admin/user_tem" },
          { text: "ข้อมูลคุณวุฒิการศึกษา", icon: "mdi-school", to: "/admin/user_education" },
          { text: "ข้อมูลประสบการณ์", icon: "mdi-bag-carry-on", to: "/admin/user_experience" },
          { text: "ข้อมูลประวัติการทำงาน", icon: "mdi-access-point-network", to: "/admin/user_work_history" },
          { text: "ข้อมูลผลงาน รางวัล", icon: "mdi-trophy-award", to: "/admin/user_award" },
          { text: "ข้อมูลโทษ วินัย", icon: "mdi-alarm-light", to: "/admin/user_discipline" },
        ],
      movement_items: [
          { text: "สายการสอนและสายสนับสนุน", icon: "mdi-alarm-light", to: "/Dashboard" },
          { text: "สายงานบริหารสถานศึกษา", icon: "mdi-alarm-light", to: "/Dashboard" },
          { text: "การย้ายกรณีพิเศษ", icon: "mdi-alarm-light", to: "/Dashboard" },
        
        ],
     
       condition_items: [
          { text: "สาขาวิชาเอก", icon: "mdi-basket-plus", to: "/admin/branch" },        
          { text: "ข้อมูลเงือนไขสาขาวิชาเอก", icon: "mdi-basket-plus", to: "/Dashboard" },        
          { text: "สถิติเงือนไขสาขาวิชา", icon: "mdi-chart-box-outline", to: "/Dashboard" },        
        ],

          human_items: [
          { text: "ข้อมูลอัตรากำลังสถานศึกษา", icon: "mdi-basket-plus", to: "/Dashboard" },        
          { text: "ข้อมูลเชิงปริมาณ", icon: "mdi-chart-box-outline", to: "/Dashboard" },        
          { text: "ข้อมูลเชิงปริมาณ", icon: "mdi-chart-box-outline", to: "/Dashboard" },        
        ],

         prepare_items: [
          { text: "ข้อมูลครูผู้ช่วย", icon: "mdi-basket-plus", to: "/Dashboard" },        
          { text: "ประเมินครูผู้ช่วย", icon: "mdi-chart-box-outline", to: "/Dashboard" },        
          { text: "รายงาน", icon: "mdi-chart-box-outline", to: "/Dashboard" },        
        ],
    };
  },

 async mounted() {
     let result
      let userSession = JSON.parse(sessionStorage.getItem('user')) || 0
      result = await this.$http.post('user.php', {
          ApiKey: this.ApiKey,     
        user_ID: userSession.user_ID       
      })
      this.user = result.data 
  },

  methods: {
      async userUpdate() {   
        this.adduserdialog = true
      }, 
       async userSubmit(){
          if (this.$refs.userform.validate()) {
          this.user.ApiKey = this.ApiKey;        
          let result      
          result = await this.$http.post('user.update_password.php', this.user);     
          if (result.status == '200') {
            this.users = result.data
            this.snackbar.icon = 'mdi-font-awesome'
            this.snackbar.color = 'success'
            this.snackbar.text = 'แก้ไขข้อมูลเรียบร้อย'
            this.snackbar.show = true           
          } else {
            this.snackbar.icon = 'mdi-close-network'
            this.snackbar.color = 'red'
            this.snackbar.text = 'แก้ไขข้อมูลผิดพลาด'
            this.snackbar.show = true
            console.log('2')
          }
          this.adduserdialog = false
        }
      },

  },
};
</script>

<style lang="scss" scoped>
</style>