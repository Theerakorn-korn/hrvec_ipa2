<template>
 <div>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="4">
        <base-material-card
          class="v-card-profile"
          avatar="https://www.vec.go.th/portals/0/ovec.jpg"         
        >
          <v-card-text class="text-center">
            <h3 class="font-weight-light mb-1 grey--text">{{ user.id_card }}</h3>
            <h3 class="font-weight-light mb-1 grey--text">{{ user.title_s }}{{ user.frist_name }}  {{ user.last_name }}</h3>
            <h4 class="font-weight-light mb-3 black--text">{{ user.college_name }}</h4>
            <p class="font-weight-light grey--text"></p>
            <!-- <v-btn color="success" rounded class="mr-0">แก้ไข</v-btn> -->
          </v-card-text>
        </base-material-card>
      </v-col>
      <v-col cols="12" md="8">    

        <base-material-card class="text_google">
          <template v-slot:heading>
            <div class="font-weight-light text_google">              
              <h2 class="h1 font-weight-light text_google"><v-icon large left>mdi-account</v-icon> ข้อมูลส่วนบุคคล</h2>
            </div>
          </template>

          <v-form>
            <v-container class="pa-1 ma-1">
              <v-row>
                <v-col cols="12" md="6">
                  <v-icon large>mdi-menu-right</v-icon> สังกัด : {{ user.college_name }} 
                </v-col>
                <v-col cols="12" md="6">
                 <v-icon large left>mdi-menu-right</v-icon> รหัสบัตรประชาชน : {{ user.id_card }}             
                </v-col>               
                <v-col cols="12" md="6">
                   <v-icon large left>mdi-menu-right</v-icon> ตำแหน่ง : {{ user.position_name }}  
                </v-col>
                <v-col cols="12" md="6">                 
                   <v-icon large left>mdi-menu-right</v-icon> เลขที่ตำแหน่ง : {{ user.id_position }}  
                </v-col>
                <v-col cols="12" md="6">                 
                   <v-icon large left>mdi-menu-right</v-icon> วิทยฐานะ : {{ user.rang_name }}  
                </v-col>
                <v-col cols="12" md="6">                 
                   <v-icon large left>mdi-menu-right</v-icon> ระดับ : {{ user.rang_level }} 
                </v-col>                
                <v-col cols="12" md="6">                 
                   <v-icon large left>mdi-menu-right</v-icon> คุณวุฒิ : {{ user.ed_abb }}  
                </v-col>
                <v-col cols="12" md="6">                  
                   <v-icon large left>mdi-menu-right</v-icon> สาขาวิชาเอก : {{ user.ed_name }} 
                </v-col>
                <v-col cols="12" md="6">                  
                   <v-icon large left>mdi-menu-right</v-icon> วันเดือนปี เกิด : {{ user.brith_day }}/{{ user.brith_month }}/{{ user.brith_year }}   
                </v-col>               
                <v-col cols="12" md="6">                 
                   <v-icon large left>mdi-menu-right</v-icon> วันเดือนปี บรรจุ : {{ user.appoin_day }}/{{ user.appoin_month }}/{{ user.appoin_year }} 
                </v-col>               
                <v-col cols="12" md="6">                
                   <v-icon large left>mdi-menu-right</v-icon> เกษียณ : {{ user.retrire_year }}
                </v-col>
                 <v-col cols="12" md="6">                
                   <v-icon large left>mdi-menu-right</v-icon> เบอร์โทรติดต่อ : {{ user.tel_p }}
                </v-col>
                 <v-col cols="12" md="12">                
                   <v-icon large left>mdi-menu-right</v-icon> E-mail : {{ user.e_mail }}
                </v-col>
                 <v-col cols="12" md="12">                
                   <v-icon large left>mdi-menu-right</v-icon> สถานภาพสมรส : {{ user.marital_status }}
                </v-col>
                 <v-col cols="12" md="12">                
                    * ข้อมูลข้าราชการครูและบุคลากรทางการศึกษา บางส่วนหากประสงค์แก้ไขให้ติดต่องานบุคลกรของสถานศึกษา
                </v-col>
                <v-col cols="12" class="text-right">
                  <v-btn elevation="2" x-large color="warning" class="mr-0"  @click.native="personnelUpdate()"> <v-icon>mdi-pencil</v-icon> แก้ไขข้อมูลเบื้องต้น</v-btn>
                </v-col>
              </v-row>              
            </v-container>
          </v-form>
        </base-material-card>
      </v-col>
    </v-row>
    
      <!-- V-model userdialog -->
      <v-layout row justify-center>
         <v-dialog v-model="addpersonneldialog" persistent max-width="80%">
        <v-card class="mx-auto pa-6" elevation="2">
           <base-material-card
              color="yellow"
              icon="mdi-clipboard-text"
              title="แก้ไขข้อมูลเบื้องต้น"
              class="px-5 py-3 text_google"
              elevation="2"
            >            
            </base-material-card>
          <v-card-text>
            <v-form ref="personnelform" lazy-validation>
              <v-container grid-list-md>
                <v-layout wrap> 
                    <v-flex md12>
                   {{ user.id_card }} {{ user.title_s }}{{ user.frist_name }} {{ user.last_name }} 
                  </v-flex>
                   <v-flex md6>                    
                    <v-select outlined label="สถานภาพสมรส" :items="user_marital_status" item-text="title" item-value="value" v-model="user.marital_status"></v-select>
                  </v-flex>
                    <v-flex md6 v-if="user.marital_status == 'married' || user.marital_status =='separate'">
                  <v-text-field outlined label="รหัสบัตรประชาชนคู่สมรส :" v-model="user.id_card_m" required :rules="[v => !!v || '']"></v-text-field>                            
                  </v-flex> 
                   <v-flex md2 v-if="user.marital_status == 'married' || user.marital_status =='separate'">
                  <v-text-field outlined label="คำนำหน้าชื่อ :" v-model="user.title_sm" required :rules="[v => !!v || '']"></v-text-field>                            
                  </v-flex> 
                    <v-flex md5 v-if="user.marital_status == 'married' || user.marital_status =='separate'">
                  <v-text-field outlined label="ชื่อ :" v-model="user.frist_namem" required :rules="[v => !!v || '']"></v-text-field>                            
                  </v-flex> 
                   <v-flex md5 v-if="user.marital_status == 'married' || user.marital_status =='separate'">
                  <v-text-field outlined label="นามสกุล :" v-model="user.last_namem" required :rules="[v => !!v || '']"></v-text-field>                            
                  </v-flex>  
                   <v-flex md6 v-if="user.marital_status == 'married' || user.marital_status =='separate'">
                  <v-text-field outlined label="อาชีพ :" v-model="user.occupation_sm" required :rules="[v => !!v || '']"></v-text-field>                            
                  </v-flex>  
                   <v-flex md6 v-if="user.marital_status == 'married' || user.marital_status =='separate'">
                  <v-text-field outlined label="สถานที่ทำงาน :" v-model="user.work_placem" required :rules="[v => !!v || '']"></v-text-field>                            
                  </v-flex>   
                   <v-flex md6 v-if="user.marital_status == 'married' || user.marital_status =='separate'">
                   <v-autocomplete :items="provices_sh" item-text="province_name" item-value="province_ID" label="ภูมิลำเนาของคู่สมรส จังหวัด : " required :rules="[v => !!v || '']" v-model="user.province_IDm"></v-autocomplete>
                   </v-flex> 
                  <v-flex md6>
                    <v-text-field outlined label="เบอร์โทรติดต่อ :" v-model="user.tel_p"></v-text-field>
                  </v-flex>
                  <v-flex md6>
                    <v-text-field outlined label="E-mail :" v-model="user.e_mail"></v-text-field>
                  </v-flex>                             
                  <v-flex md6>
                    <v-text-field outlined label="Password" v-model="user.p_word" type="password"></v-text-field>
                  </v-flex>
                  <v-flex md6>
                 <v-text-field outlined ref=""label="Confirm Password" v-model="user.user_confirmpassword" type="password"  required :rules="[v => v==user.p_word]"></v-text-field>             
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
            <v-btn large @click.stop="addpersonneldialog = false" rounded>
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn large color="warning" @click.stop="personnelSubmit()" rounded>
                <v-icon dark>mdi-pencil</v-icon>&nbsp;แก้ไข
              </v-btn>

          </v-card-actions>
        </v-card>
      </v-dialog>
      </v-layout>

  </v-container>
 
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
  </div>
</template>

<script>
export default {
  data() {
    return {
       ApiKey: 'HRvec2021',
      addpersonneldialog: false,
      valid: true,
      user: {},    
      personnel: {},      
        snackbar: {
        show: false,
        color: '',
        timeout: 5000,
        icon: '',
        text: ''
      },
      provices_sh: [],
      user_marital_status: [
        { title: "โสด", value: "single" },
        { title: "สมรส", value: "married" },
        { title: "หม้าย", value: "widow" },
        { title: "หย่า", value: "divorce" },
        { title: "แยกกันอยู่", value: "separate" },
        ],

    };
  },
  async mounted() {
      let result
      let userSession = JSON.parse(sessionStorage.getItem('user')) || 0
      result = await this.$http.post('personnel_temporary.php', {
          ApiKey: this.ApiKey,     
        id_card: userSession.id_card       
      })
      this.user = result.data  

       let result_provice
    result_provice = await this.$http.post('province_sh.php', {
      ApiKey: this.ApiKey
    })
    this.provices_sh = result_provice.data
    },    

  methods: { 
    
    async personnelQuery(){
       let result    
      result = await this.$http.post('personnel_temporary.php', {
          ApiKey: this.ApiKey,     
        id_card: this.user.id_card       
      })
      this.user = result.data  
    },    
    async personnelUpdate() {   
        this.addpersonneldialog = true
      }, 

      async personnelSubmit(){
if (this.$refs.personnelform.validate()) {
          this.user.ApiKey = this.ApiKey;              
          let result = await this.$http.post('personnel_temporary.update.php', this.user)
          let result_m = await this.$http.post("personnel_marriage.insert.php",this.user)
          if (result.data.status == true && result_m.data.status == true) {
            this.user = result.data
            this.snackbar.icon = 'mdi-font-awesome'
            this.snackbar.color = 'success'
            this.snackbar.text = 'แก้ไขข้อมูลเรียบร้อย'
            this.snackbar.show = true
            this.personnelQuery()
          } else {
            this.snackbar.icon = 'mdi-close-network'
            this.snackbar.color = 'red'
            this.snackbar.text = 'แก้ไขข้อมูลผิดพลาด'
            this.snackbar.show = true
          }
          this.addpersonneldialog = false
        }
      },
  },
};
</script>
