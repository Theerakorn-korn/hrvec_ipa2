<template>
  <div>
    <v-container>
     <base-material-card
        icon="mdi-clipboard-text"
        title="ข้อมูลพื้นฐาน"
        class="px-5 py-3"        
      >       
        <v-flex class="mb-2">
          <v-card class="elevation-6" style="border-radius: 10px; border: solid 2px green">
            <v-card-text>
              <v-layout justify-center align-center>
                <v-flex>
                  <v-card class="elevation-0">                  
                    <v-card-text class="text-xs-left pl-5">
                      <div>ชื่อสถานศึกษา</div>
                      
                      <div class="pl-4 grey--text">{{ collegeinfo.college_ID }} {{ collegeinfo.collegeinfo_name }}</div>
                    </v-card-text>
                    <v-card-text class="text-xs-left pl-5">
                      <div>ที่อยู่</div>
                      <div class="pl-4 grey--text">
                        <span>{{ collegeinfo.collegeinfo_address }}</span>
                      </div>
                    </v-card-text>
                    <v-card-text class="text-xs-left pl-5">
                      <div>โทรศัพท์</div>
                      <div class="pl-4 grey--text">{{ collegeinfo.collegeinfo_phone }}</div>
                    </v-card-text>
                    <v-card-text class="text-xs-left pl-5">
                      <div>โทรสาร</div>
                      <div class="pl-4 grey--text">{{ collegeinfo.collegeinfo_fax }}</div>
                    </v-card-text>
                    <v-card-text class="text-xs-left pl-5">
                      <div>E-mail</div>
                      <div class="pl-4 grey--text">{{ collegeinfo.collegeinfo_email }}</div>
                    </v-card-text>                   
                  </v-card>
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-card-actions class="pr-2 mb-2">
              <v-spacer></v-spacer>
              <v-btn color="yellow darken-3" dark rounded  @click.native="collegeinfoEditmain()">
                <v-icon small dark>mdi-pencil</v-icon>&nbsp;แก้ไข</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>              
      
        <v-flex class="mb-2">
          <v-card class="elevation-6" style="border-radius: 10px; border: solid 2px green">
            <v-card-text>
              <v-layout justify-center align-center>
                <v-flex>
                  <v-card class="elevation-0">                   
                    <v-card-text class="text-xs-left pl-5">
                     <!--  <img :src="'http://localhost:8080/HRvecfiles/'+collegeinfo.collegeinfo_directorpic" height="300" v-if="collegeinfo.collegeinfo_directorpic" style="border-radius: 30px">
                     -->  <img :src="'/HRvecfiles/'+collegeinfo.collegeinfo_directorpic" height="300" v-if="collegeinfo.collegeinfo_directorpic" style="border-radius: 30px">
                      <v-btn @click.stop="deletefiledialog2 = true"
                      color="red darken-3" v-if="collegeinfo.collegeinfo_directorpic" dark icon outlined>
                      <v-icon small>mdi-delete</v-icon>
                    </v-btn>
                    </v-card-text>
                    <v-card-text class="text-xs-left pl-5">
                      <div>ชื่อ - สกุล ผู้อำนวยการ</div>
                      <div class="pl-4 grey--text">
                        <span>{{ collegeinfo.collegeinfo_director }}</span>
                      </div>
                    </v-card-text>
                    <v-card-text class="text-xs-left pl-5">
                      <div>โทรศัพท์</div>
                      <div class="pl-4 grey--text">{{ collegeinfo.collegeinfo_directorphone }}</div>
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-card-actions class="pr-2 mb-2">
              <v-spacer></v-spacer>
              <v-btn color="yellow darken-3" @click.native="collegeinfoEditpic()" dark rounded>
                <v-icon small dark>mdi-pencil</v-icon>&nbsp;แก้ไข</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </base-material-card>
    </v-container>




   <!-- แก้ไขข้อมูล -->
    <v-layout row justify-center>
      <v-dialog v-model="collegeinfodialog1" persistent max-width="80%">         
        <v-card class="mx-auto pa-5" >  
            <base-material-card
              color="yellow"
              icon="mdi-clipboard-text"
              title="แก้ไขข้อมูลพื้นฐาน"
              class="px-5 py-3 text_google"
              
            ></base-material-card>        
          <v-card-text>
            <v-form ref="form1" lazy-validation>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6>
                    <v-text-field label="ชื่อสถานศึกษา" required v-model="editcollegeinfo.collegeinfo_name" :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field label="ที่อยู่" v-model="editcollegeinfo.collegeinfo_address" textarea rows="10"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field label="โทรศัพท์" v-model="editcollegeinfo.collegeinfo_phone"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field label="โทรสาร" v-model="editcollegeinfo.collegeinfo_fax"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field label="E-mail" v-model="editcollegeinfo.collegeinfo_email"></v-text-field>
                  </v-flex>                 
                </v-layout>
              </v-container>
              <small>* จำเป็น</small>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn  @click.stop="collegeinfodialog1 = false" rounded><v-icon dark>mdi-close</v-icon> ยกเลิก</v-btn>
            <v-btn color="success" @click.stop="editcollegeinfoSubmit1()" rounded>
              <v-icon dark>mdi-content-save</v-icon>&nbsp;บันทึก</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
     
  <!-- ข้อมูลผู้อำนวยการ -->
    <v-layout row justify-center>
      <v-dialog v-model="collegeinfodialog5" persistent max-width="80%">
        <v-card class="mx-auto pa-5" >  
            <base-material-card
              color="yellow"
              icon="mdi-clipboard-text"
              title="แก้ไขข้อมูลผู้อำนวยการ"
              class="px-5 py-3 text_google"
              
            ></base-material-card>       
         
          <v-card-text>
            <v-form ref="form5" lazy-validation>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    เลือกไฟล์ภาพผู้อำนวยการ
                    <input type="file" ref="file2" id="file2">
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field label="ชื่อ - สกุล ผู้อำนวยการ" v-model="editcollegeinfo.collegeinfo_director"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field label="เบอร์โทรศัพท์ ผู้อำนวยการ" v-model="editcollegeinfo.collegeinfo_directorphone" ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn  @click.stop="collegeinfodialog5 = false" rounded>ยกเลิก</v-btn>
            <v-btn color="success" @click.stop="editcollegeinfoSubmit(true)" rounded>
              <v-icon dark>mdi-content-save</v-icon>&nbsp;บันทึก</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>

 <!-- ลบรูปภาพ -->
    <v-layout row justify-center>
      <v-dialog v-model="deletefiledialog2" persistent max-width="50%">
        <v-card>
          <v-card-title class="red darken-3 white--text elevation-2">
            <v-icon medium dark>fa-school</v-icon>&nbsp;ลบข้อมูลไฟล์รูปผู้อำนวยการ
          </v-card-title>
          <v-card-text>
            <v-form ref="deletestandardtopicform2" lazy-validation>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 class="text-xs-center red--text">
                    ยืนยันการลบไฟล์รูปผู้อำนวยการ
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn  @click.native="deletefiledialog2 = false" rounded>ยกเลิก</v-btn>
            <v-btn color="red darken-3" @click.native="deletefileSubmit2()" rounded dark>
              <v-icon dark small>mdi-delete</v-icon>&nbsp;ลบ</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
    <v-container fluid>
      <v-snackbar v-model="snackbar.show" top :timeout="snackbar.timeout" :color="snackbar.color">
        <v-icon large>{{snackbar.icon}}</v-icon>
        <v-card-text>{{snackbar.text}}</v-card-text>
        <template v-slot:action="{ attrs }">
          <v-btn color="red" text v-bind="attrs" @click="snackbar.show = false">Close</v-btn>
        </template>
      </v-snackbar>
    </v-container>
  </div>
</template>

<script>
  export default {  
    data: () => ({
      valid: true,
      collegeinfodialog1: false,
      collegeinfodialog2: false,
      collegeinfodialog3: false,
      collegeinfodialog4: false,
      collegeinfodialog5: false,
      deletefiledialog: false,
      deletefiledialog2: false,
      snackbar: {
        show: false,
        color: '',
        timeout: 5000,
        icon: '',
        text: ''
      },    
      ApiKey: "HRvec2021",   
      college: {},
      collegeinfo: {},
      editcollegeinfo: {},     
      period_year: ''
    }),
    async mounted() {
      let result = {}
      let userSession = JSON.parse(sessionStorage.getItem('user')) || 0
      result = await this.$http.post('college.php', {
        college_ID: userSession.college_ID,
        ApiKey: 'HRvec2021'
      })
      this.college = result.data 
      await this.collegeinfoQuery()
    },

    methods: {   
      async collegeinfoQuery() {
        let result = await this.$http.post('collegeinfo.php', {
          ApiKey: this.ApiKey,
          college_ID: this.college.college_ID       
        })
        this.collegeinfo = result.data
      },
      
    async collegeinfoEditmain(){             
        this.editcollegeinfo.college_ID = this.collegeinfo.college_ID  
        this.editcollegeinfo.ApiKey = this.ApiKey 
        this.editcollegeinfo.collegeinfo_name = this.collegeinfo.collegeinfo_name
          this.editcollegeinfo.collegeinfo_address = this.collegeinfo.collegeinfo_address
          this.editcollegeinfo.collegeinfo_phone = this.collegeinfo.collegeinfo_phone
          this.editcollegeinfo.collegeinfo_fax = this.collegeinfo.collegeinfo_fax
          this.editcollegeinfo.collegeinfo_email = this.collegeinfo.collegeinfo_email    
          this.collegeinfodialog1 = true
         
      },
    
    async  collegeinfoEditpic() {      
       this.editcollegeinfo = {}     
        this.editcollegeinfo.college_ID = this.collegeinfo.college_ID  
        this.editcollegeinfo.ApiKey = this.ApiKey
          this.editcollegeinfo.collegeinfo_director = this.collegeinfo.collegeinfo_director
          this.editcollegeinfo.collegeinfo_directorphone = this.collegeinfo.collegeinfo_directorphone
          this.collegeinfodialog5 = true      
      },
      


        async editcollegeinfoSubmit1() {          
          if (this.$refs.form1.validate()) {
          this.editcollegeinfo.ApiKey = this.ApiKey;   
         
          let result = await this.$http.post('collegeinfo.update.php', this.editcollegeinfo)
           if (result.data.status == true) {
            this.editcollegeinfo = result.data
            this.snackbar.icon = 'mdi-font-awesome'
            this.snackbar.color = 'success'
            this.snackbar.text = 'แก้ไขข้อมูลเรียบร้อย'
            this.snackbar.show = true
            this.collegeinfoQuery()
          } else {
            this.snackbar.icon = 'mdi-close-network'
            this.snackbar.color = 'red'
            this.snackbar.text = 'แก้ไขข้อมูลผิดพลาด'
            this.snackbar.show = true
          }
          this.collegeinfodialog1 = false
        }          
      },

      async editcollegeinfoSubmit(upload) {
        let result = ''
        let uploaded = null

     if (this.$refs.file2.files[0]) {
          if (this.$refs.file2.files[0].type == 'image/jpeg') {
            let formData = new FormData()
            let filename = this.editcollegeinfo.college_ID + '.' + this.time_stamp + '.' + this.period_year_bd +
              '.directorpic.jpg'
            formData.append('file', this.$refs.file2.files[0])
            formData.append('filename', '../HRvecfiles/'+filename)
            formData.append('ApiKey', this.ApiKey)
            result = await this.$http.post('uploadfile.php', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
            if (result.data.status == true){
              this.collegeinfo.collegeinfo_directorpic = ''
              this.editcollegeinfo.collegeinfo_directorpic = filename
            }
            uploaded = true
          } else {
            uploaded = false
          }
        } else {
          upload = false
        }

        result = await this.$http.post('collegeinfo.update.php', this.editcollegeinfo)
        if (result.data.status || uploaded) {
          await this.collegeinfoQuery()
          this.snackbar.icon = 'mdi-content-save'
          this.snackbar.color = 'success'
          this.snackbar.text = 'บันทึกข้อมูลเรียบร้อย'
          this.snackbar.show = true
        } else {
          if (!uploaded && upload) {
            this.snackbar.icon = 'mdi-alert'
            this.snackbar.color = 'red'
            this.snackbar.text = 'ไฟล์ที่แนบไม่ถูกต้อง กรุณาแนบไฟล์เป็น jpg หรือ jpeg เท่านั้น'
            this.snackbar.show = true
          } else {
            this.snackbar.icon = 'mdi-alert'
            this.snackbar.color = 'red'
            this.snackbar.text = 'บันทึกข้อมูลผิดพลาด'
            this.snackbar.show = true
          }
        }

        this.collegeinfodialog1 = false
        this.collegeinfodialog2 = false
        this.collegeinfodialog3 = false
        this.collegeinfodialog4 = false
        this.collegeinfodialog5 = false
      },

    
      async deletefileSubmit2(){
        let result = await this.$http.post('deletefile.php', {
          ApiKey: this.ApiKey,
          filename: '../HRvecfiles/'+this.collegeinfo.collegeinfo_directorpic
        })
        if (result.data.status) {
          result = await this.$http.post('collegeinfo.update.php', {
            ApiKey: this.ApiKey,
            collegeinfo_directorpic: '',
            period_year: this.period_year,
            college_ID: this.college.college_ID
          })
          if (result.data.status) {
            this.collegeinfoQuery()
            this.snackbar.icon = 'mdi-content-save'
            this.snackbar.color = 'success'
            this.snackbar.text = 'ลบข้อมูลเรียบร้อย'
            this.snackbar.show = true
          } else {
            this.snackbar.icon = 'mdi-alert'
            this.snackbar.color = 'red'
            this.snackbar.text = 'ลบข้อมูลผิดพลาด'
            this.snackbar.show = true
          }
        }
        this.deletefiledialog2 = false
      },
    },
    computed: {
      period_year_bd() {
          let today = new Date();
          let year = today.getFullYear()+543;
        return year
      },
      time_stamp(){
            const d = new Date();
            let time = d.getTime();
            return time
          },
    },
    watch: {
      async period_year_bd(newVal, oldVal) {        
        await this.collegeinfoQuery()
      }
    }
  }

</script>
