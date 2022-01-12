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
            <div align="center">             
               <img v-if="user.personnel_temporary_pic"    
                width="350"                   
                    style="border-radius: 8px"
                    :src="'http://localhost:8080/HRvecfiles/' + user.personnel_temporary_pic"                    
                  /> 
                  <img v-else
                   width="200" 
                    src="http://localhost:8080/HRvecfiles/blank-human-image.png"
                    style="border-radius: 30px"
                    />                 
                          
              </div>      
              <div class="text-center">
                <v-btn @click.native="personnelPicDelete()" 
                      color="red darken-3" v-if="user.personnel_temporary_pic" dark icon>
                      <v-icon>mdi-delete-circle-outline</v-icon>
                    </v-btn> 
            </div>              
            <h3 class="font-weight-light mb-1 grey--text">{{ user.id_card }}</h3>
            <h3 class="font-weight-light mb-1 grey--text">{{ user.title_s }}{{ user.frist_name }}  {{ user.last_name }}</h3>
            <h4 class="font-weight-light mb-3 black--text">{{ user.college_name }}</h4>
            <p class="font-weight-light grey--text"></p>
           
             <div class="text-center">
            <v-btn elevation="2" x-large rounded color="warning" class="mr-0"  @click.native="personnelPicUpdate()"> <v-icon>mdi-pencil</v-icon> แก้ไขรูปโปรไฟล์</v-btn>
         </div>  
                  
            
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
  <v-card class="elevation-6" style="border-radius: 10px; border: solid 2px green" width="100%">
          <v-form>
            <v-container>            
              <v-row>
              
                <v-col cols="12" md="12" class="text-right" v-if="periods.period_enable === '1'">                             
              <v-btn rounded color="primary" x-large dark to="/transference_personnel"> <v-icon>mdi-pencil</v-icon> การย้ายสายการสอน</v-btn>
           
                </v-col>                         
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
                   <v-icon large left>mdi-menu-right</v-icon> สถานภาพสมรส : {{ marital_status }}
                </v-col>
                 <v-col cols="12" md="12">                
                   <h2> * ข้อมูลส่วนบุคลคลให้ท่านตรวจสอบ และแก้ไขข้อมูลให้เรียบร้อยก่อนการ เสนอย้าย</h2>
                </v-col>
                <v-col cols="12" class="text-right">                  
            <v-btn elevation="2" x-large  rounded color="warning" class="mr-0"  @click.native="personnelUpdate()"> <v-icon>mdi-pencil</v-icon> แก้ไขข้อมูลเบื้องต้น</v-btn>         
                  </v-col>    
                               
              </v-row>                          
            </v-container>
          </v-form>
          </v-card>   
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
            <div align="right">
               {{ user.id_card }} {{ user.title_s }}{{ user.frist_name }} {{ user.last_name }}     
              </div>     
            
            </base-material-card>
          <v-card-text>
            <v-form ref="personnelform" lazy-validation>
              <v-container grid-list-md>
                <v-layout wrap>                   
                   <!--  <v-flex md6>    
                       <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="date"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
           v-model="user.date_app_now"
            label="เริ่มปฏิบัติหน้าที่ในสถานศึกษาปัจจุบันเมื่อวันที่ :"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
         v-model="user.date_app_now"
          scrollable
          locale="th"
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="modal = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.dialog.save(date)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-dialog>         
                  </v-flex>  -->
                   <v-flex md6>                    
                    <v-select outlinedd label="สถานภาพสมรส" :items="user_marital_status" item-text="title" item-value="value" v-model="user.marital_status"></v-select>
                  </v-flex>
                    <v-flex md6 v-if="user.marital_status == 'married' || user.marital_status =='separate'">
                  <v-text-field outlinedd label="รหัสบัตรประชาชนคู่สมรส :" v-model="user.id_card_m" required :rules="[v => !!v || '']"></v-text-field>                            
                  </v-flex> 
                   <v-flex md2 v-if="user.marital_status == 'married' || user.marital_status =='separate'">
                  <v-text-field outlinedd label="คำนำหน้าชื่อ :" v-model="user.title_sm" required :rules="[v => !!v || '']"></v-text-field>                            
                  </v-flex> 
                    <v-flex md5 v-if="user.marital_status == 'married' || user.marital_status =='separate'">
                  <v-text-field outlinedd label="ชื่อ :" v-model="user.frist_namem" required :rules="[v => !!v || '']"></v-text-field>                            
                  </v-flex> 
                   <v-flex md5 v-if="user.marital_status == 'married' || user.marital_status =='separate'">
                  <v-text-field outlinedd label="นามสกุล :" v-model="user.last_namem" required :rules="[v => !!v || '']"></v-text-field>                            
                  </v-flex>  
                   <v-flex md6 v-if="user.marital_status == 'married' || user.marital_status =='separate'">
                  <v-text-field outlinedd label="อาชีพ :" v-model="user.occupation_sm" required :rules="[v => !!v || '']"></v-text-field>                            
                  </v-flex>  
                   <v-flex md6 v-if="user.marital_status == 'married' || user.marital_status =='separate'">
                  <v-text-field outlinedd label="สถานที่ทำงาน :" v-model="user.work_placem" required :rules="[v => !!v || '']"></v-text-field>                            
                  </v-flex>   
                   <v-flex md6 v-if="user.marital_status == 'married' || user.marital_status =='separate'">
                   <v-autocomplete :items="provices_sh" item-text="province_name" item-value="province_ID" label="ภูมิลำเนาของคู่สมรส จังหวัด : " required :rules="[v => !!v || '']" v-model="user.province_IDm"></v-autocomplete>
                   </v-flex> 
                  <v-flex md6>
                    <v-text-field outlinedd label="เบอร์โทรติดต่อ :" v-model="user.tel_p"></v-text-field>
                  </v-flex>
                  <v-flex md6>
                    <v-text-field outlinedd label="E-mail :" v-model="user.e_mail"></v-text-field>
                  </v-flex>                             
                  <v-flex md6>
                    <v-text-field outlinedd label="Password" v-model="user.p_word" type="password"></v-text-field>
                  </v-flex>
                  <v-flex md6>
                 <v-text-field outlinedd label="Confirm Password" v-model="user.user_confirmpassword" type="password"  required :rules="[v => v==user.p_word]"></v-text-field>             
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
 <v-layout>
      <v-dialog v-model="personnel_temporary_pic_dialog" persistent max-width="50%">
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
            <v-form ref="form5" lazy-validation>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>                   
                    เลือกไฟล์ภาพของท่าน
                    <input type="file" ref="file2" id="file2">
                  </v-flex>                 
                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn large @click.stop="personnel_temporary_pic_dialog = false" rounded>  <v-icon dark>mdi-close</v-icon>ยกเลิก</v-btn>
            <v-btn large color="warning" @click.stop="editpersonnel_temporaryinfoSubmit(true)" rounded>
              <v-icon dark>mdi-pencil</v-icon>&nbsp;แก้ไข</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

       <v-dialog v-model="deletefiledialog" persistent max-width="50%">
        <v-card>
          <v-card-title class="red darken-3 white--text elevation-2">
            <v-icon medium dark>fa-school</v-icon>&nbsp;ลบข้อมูลไฟล์รูป
          </v-card-title>
          <v-card-text>
            <v-form ref="deletestandardtopicform2" lazy-validation>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 class="text-xs-center red--text">
                    ยืนยันการลบไฟล์รูป {{ this.user.personnel_temporary_pic }}
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click.native="deletefiledialog = false" rounded> <v-icon dark>mdi-close</v-icon>ยกเลิก</v-btn>
            <v-btn color="red darken-3" @click.native="deletefileSubmit2()" rounded dark>
               <v-icon dark>mdi-delete</v-icon>&nbsp;ลบ</v-btn>
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
       loading: true,
       ApiKey: 'HRvec2021',
       period_enable: '1',
      addpersonneldialog: false,
      personnel_temporary_pic_dialog: false,     
      deletefiledialog: false,
      valid: true,
      user: {},    
      updateuser:{},
      personnel: {},  
      periods: [],    
        snackbar: {
        show: false,
        color: '',
        timeout: 5000,
        icon: '',
        text: '',        
      },
      provices_sh: [],     
      user_marital_status: [
        { title: "โสด", value: "single" },
        { title: "สมรส", value: "married" },
        { title: "หม้าย", value: "widow" },
        { title: "หย่า", value: "divorce" },
        { title: "แยกกันอยู่", value: "separate" },
        ],
 date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
    };
  },
  async mounted() {
      let result
         this.loading = true
      let userSession = JSON.parse(sessionStorage.getItem('user')) || 0
      result = await this.$http.post('personnel_temporary.php', {
          ApiKey: this.ApiKey,     
        id_card: userSession.id_card       
      }).finally(() => this.loading = false)
      this.user = result.data  

       let result_provice
    result_provice = await this.$http.post('province_sh.php', {
      ApiKey: this.ApiKey
    })
    this.provices_sh = result_provice.data

     let result_period
    result_period = await this.$http.post('period.php', {
      ApiKey: this.ApiKey,
      period_enable: this.period_enable,
    })
    this.periods = result_period.data
    },    

  methods: { 
    
    async personnelQuery(){
       let result 
        this.loading = true   
      result = await this.$http.post('personnel_temporary.php', {
          ApiKey: this.ApiKey,     
        id_card: this.user.id_card       
      }).finally(() => this.loading = false)
      this.user = result.data  
    },    
    async personnelUpdate() {   
        this.addpersonneldialog = true
      }, 

      async personnelPicUpdate() { 
        this.updateuser.id_card = this.user.id_card  
        this.personnel_temporary_pic_dialog = true
      }, 

       async personnelPicDelete() { 
         this.updateuser.personnel_temporary_pic = this.user.personnel_temporary_pic
        this.updateuser.id_card = this.user.id_card  
        this.deletefiledialog = true
      }, 

      async personnelSubmit(){
      if (this.$refs.personnelform.validate()) {
          this.user.ApiKey = this.ApiKey; 
          console.log(this.user)             
          let result = await this.$http.post('personnel_temporary.update.php', this.user)
          let result_m = await this.$http.post("personnel_marriage.insert.php",this.user)
          if (result.data.status == true || result_m.data.status == true) {
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
      async editpersonnel_temporaryinfoSubmit(upload){
           let result = ''
        let uploaded = null
      if (this.$refs.file2.files[0]) {
          if (this.$refs.file2.files[0].type == 'image/jpeg') {
            let formData = new FormData()
            let filename = this.updateuser.id_card + '.' + 'user.jpg'
            formData.append('file', this.$refs.file2.files[0])
            formData.append('filename', '../HRvecfiles/'+filename)
            formData.append('ApiKey', this.ApiKey)
            result = await this.$http.post('uploadfile.php', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
            if (result.data.status == true){   
              this.updateuser.personnel_temporary_pic = filename
            }
            uploaded = true
          } else {
            uploaded = false
          }
        } else {
          upload = false
        }
     
         this.updateuser.ApiKey = this.ApiKey;
        result = await this.$http.post('personnel_temporary.update.php', this.updateuser)
        if (result.data.status || uploaded) {
          await this.personnelQuery()
          this.snackbar.icon = 'mdi-font-awesome'
          this.snackbar.color = 'success'
          this.snackbar.text = 'บันทึกข้อมูลเรียบร้อย'
          this.snackbar.show = true
        } else {
          if (!uploaded && upload) {
            this.snackbar.icon = 'mdi-close-network'
            this.snackbar.color = 'red'
            this.snackbar.text = 'ไฟล์ที่แนบไม่ถูกต้อง กรุณาแนบไฟล์เป็น jpg หรือ jpeg เท่านั้น'
            this.snackbar.show = true
          } else {
            this.snackbar.icon = 'mdi-close-network'
            this.snackbar.color = 'red'
            this.snackbar.text = 'บันทึกข้อมูลผิดพลาด'
            this.snackbar.show = true
          }
        }
        this.personnel_temporary_pic_dialog = false

      },
       async deletefileSubmit2(){
        let result = await this.$http.post('deletefile.php', {
          ApiKey: this.ApiKey,
          filename: '../HRvecfiles/'+this.updateuser.personnel_temporary_pic
        })
        if (result.data.status) {
          result = await this.$http.post('personnel_temporary.update.php', {
            ApiKey: this.ApiKey,
            personnel_temporary_pic: '',         
            id_card: this.updateuser.id_card            
          })        
          if (result.data.status) {
            this.personnelQuery()
            this.snackbar.icon = 'mdi-font-awesome'
            this.snackbar.color = 'success'
            this.snackbar.text = 'ลบข้อมูลเรียบร้อย'
            this.snackbar.show = true
          } else {
            this.snackbar.icon = 'mdi-close-network'
            this.snackbar.color = 'red'
            this.snackbar.text = 'ลบข้อมูลผิดพลาด'
            this.snackbar.show = true
          }
        }
        this.deletefiledialog = false
      },
  },
  computed: {
     marital_status() {
            let marital_status = this.user.marital_status
            let marital_result
            if(marital_status =='single'){
                marital_result = 'โสด'
            }
            else if(marital_status =='married'){
                marital_result = 'สมรส'
            }
             else if(marital_status =='widow'){
                marital_result = 'หม้าย'
            }
            else if(marital_status =='divorce'){
                marital_result = 'หย่า'
            }
            else if(marital_status =='separate'){
                marital_result = 'แยกกันอยู่'
            }
             return marital_result
          },
  },
   watch: {
      async period_year(newVal, oldVal) {       
        await this.personnelQuery()
      }
    }
};
</script>
<style>
  v-img{
   border-radius: 8px;
  }
</style>