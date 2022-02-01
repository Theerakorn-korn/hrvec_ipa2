<template>
  <div>
      
    <v-container>
    <base-material-card
        icon="mdi-clipboard-text"
        title="ข้อมูลสถานศึกษา"
        class="px-5 py-3"
        
      >
        <v-card class="mb-4 pa-2">
          <v-row>
            <v-col cols="12" lg="6" class="text-right">
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="ค้นหา ระบุคำ หรือ ส่วนข้อความเกี่ยวข้อง"
                single-line
                hide-details
                
                dense
                filled
                class="mb-2"
              />
            </v-col>
            <v-col cols="12" lg="6" class="text-right">
              <v-btn
                
                large
                right
                depressed
                color="primary"
                @click.native="collegeinfoAdd()"
              >
                <v-icon>mdi-plus-circle-outline</v-icon>เพิ่มรายการ
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
        <v-data-table
          color="success"
          :loading="loading"
          :headers="headers"
          :items="collegeinfos"
          :search="search"          
       > 

         <template v-slot:[`item.actions`]="{ item }">
            <v-icon
              color="yellow"
              
              @click.stop="collegeinfoEdit(item.college_ID)"
            >
              mdi-pencil
            </v-icon>          
          </template>
           <!--  <template v-slot:[`item.action_s`]="{ item }">            
            <v-icon
              color="red"
              
              @click.stop="collegeinfoDelete(item.college_ID)"
            >
              mdi-delete
            </v-icon>
          </template> -->
          <v-alert
            slot="no-results"
            :value="true"
            color="error"
            icon="mdi-alert"
          >ไม่พบผลลัพธ์ "{{ search }}" ที่คุณกำลังค้นหา.</v-alert>
        </v-data-table>
      </base-material-card>

      <!--addcollegeinfodialog  -->
      <v-layout row justify-center>
        <v-dialog v-model="addcollegeinfodialog" persistent max-width="50%">
          <v-card class="mx-auto pa-5" >
            <base-material-card
              icon="mdi-account-multiple"
              title="เพิ่มข้อมูลสถานศึกษา"
              class="px-5 py-3 text_google"
              
            >
            </base-material-card>

            <v-card-text>
             <v-form ref="addcollegeinfoform" lazy-validation>
              <v-container grid-list-md>
                <v-layout wrap>                
                   <v-flex md12>
                    <v-text-field label="ชื่อสถานศึกษา" v-model="addcollegeinfo.collegeinfo_name" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>
                   <v-flex md12>
                    <v-text-field label="ผู้อำนวยการ" v-model="addcollegeinfo.collegeinfo_director" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>                  
                      <v-flex md12>
                    <v-text-field label="เบอร์โทร" v-model="addcollegeinfo.collegeinfo_directorphone" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>  
                    <v-flex md12>
                        <input type="file" ref="file2" id="file2">
                    <!-- <v-text-field label="ภาพถ่าย" v-model="addcollegeinfo.collegeinfo_directorpic" required :rules="[v => !!v || '']"></v-text-field> -->
                  </v-flex>  
                    <v-flex md12>
                    <v-text-field label="ที่อยู่" v-model="addcollegeinfo.collegeinfo_address" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>  
                    <v-flex md12>
                    <v-text-field label="เบอร์โทรติดต่อ" v-model="addcollegeinfo.collegeinfo_phone" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>  
                    <v-flex md12>
                    <v-text-field label="ชื่อสถานศึกษา" v-model="addcollegeinfo.collegeinfo_fax" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>  
                    <v-flex md12>
                    <v-text-field label="ชื่อสถานศึกษา" v-model="addcollegeinfo.collegeinfo_email" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>              
                </v-layout>
              </v-container>
              <small>* จำเป็น</small>
            </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="warning"
                large
                @click.stop="addcollegeinfodialog = false"
                rounded
                ><v-icon dark>mdi-close</v-icon> ยกเลิก</v-btn
              >
              <v-btn
                large
                color="success"
                @click.stop="addcollegeinfoSubmit()"
                rounded
              >
                <v-icon dark>mdi-content-save</v-icon>&nbsp;&nbsp;บันทึก
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model deletecollegeinfodialog -->
      <v-layout>
        <v-dialog v-model="deletecollegeinfodialog" persistent max-width="40%">
          <v-card class="mx-auto pa-5" >                     
             <base-material-card
              color="error"
              icon="mdi-delete"
              title="ลบข้อมูลสถานศึกษา"
              class="px-5 py-3 text_google"
              
             
            >
            </base-material-card>

            <v-card-text class="text_google">
              
        <v-card>        
          <v-card-text>
            <v-form ref="deletecollegeinfoform" lazy-validation>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    ยืนยันการลบข้อมูล <br>
                    {{ editcollegeinfo.collegeinfo_name }}
                  </v-flex>                                
                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>        
        </v-card>
    
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn large  @click.stop="deletecollegeinfodialog = false"
                ><v-icon dark>mdi-close</v-icon>ยกเลิก</v-btn
              >
              <v-btn large
                color="red darken-3"
                @click.stop="deletecollegeinfoSubmit()"
                dark
              >
                <v-icon dark>mdi-delete</v-icon>&nbsp;ลบ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model editcollegeinfodialog -->
      <v-layout row justify-center>
         <v-dialog v-model="editcollegeinfodialog" persistent max-width="80%">
        <v-card class="mx-auto pa-6" >
           <base-material-card
              color="yellow"
              icon="mdi-clipboard-text"
              title="แก้ไขข้อมูลผู้ใช้งานระบบ"
              class="px-5 py-3 text_google"
              
            ></base-material-card>
          <v-card-text>
            <v-form ref="editcollegeinfoform" lazy-validation>
              <v-container grid-list-md>
                <v-layout wrap>               
                                       <v-flex md12>
                    <v-text-field label="รหัสสถานศึกษา" v-model="editcollegeinfo.collegeinfo_code" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>
                   <v-flex md12>
                    <v-text-field label="ชื่อสถานศึกษา" v-model="editcollegeinfo.collegeinfo_name" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>                  
                        <v-flex md6>
                    <v-autocomplete label="อำเภอ"  v-model="editcollegeinfo.prefecture_ID" :items="prefectures" item-text="prefecture_name" item-value="prefecture_ID" required :rules="[v => !!v || '']"></v-autocomplete>
             
                 </v-flex>
                   <v-flex md6>
                    <v-autocomplete label="จังหวัด"  v-model="editcollegeinfo.province_ID" :items="provinces" item-text="province_name" item-value="province_ID" required :rules="[v => !!v || '']"></v-autocomplete>
               
                  </v-flex>
                   <v-flex md6>
                    <v-autocomplete label="ประเภท"  v-model="editcollegeinfo.collegeinfotype_ID" :items="collegeinfotypes" item-text="collegeinfotype_name" item-value="collegeinfotype_ID" required :rules="[v => !!v || '']"></v-autocomplete>
                 
                  </v-flex>                     
                </v-layout>
              </v-container>
              <small>* จำเป็น</small>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn large  @click.stop="editcollegeinfodialog = false" rounded>
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn large color="warning" @click.stop="editcollegeinfoSubmit()" rounded>
                <v-icon dark>mdi-pencil</v-icon>&nbsp;บันทึก
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
       loading: true,       
     ApiKey: 'HRvec2021',
      valid: true,
      addcollegeinfodialog: false,
      editcollegeinfodialog: false,
      deletecollegeinfodialog: false,
      snackbar: {
        show: false,
        color: '',
        timeout: 5000,
        icon: '',
        text: ''
      },
      collegeinfos: [],
      addcollegeinfo: {},
      editcollegeinfo: {},
      collegeinfos: [],
      userstatus: [],
      search: '',
      pagination: {},      
      headers: [       
        { text: "ชื่อสถานศึกษา", align: "left", value: "collegeinfo_name" }, 
        { text: "ผู้อำนวยการ", align: "left", value: "collegeinfo_director" }, 
        { text: "เบอร์โทร", align: "left", value: "collegeinfo_directorphone" },        
        { text: "ที่อยู่", align: "left", value: "collegeinfo_address" },       
        { text: "เบอร์โทรสถานศึกษา", align: "left", value: "collegeinfo_phone" },       
        { text: "FAX", align: "left", value: "collegeinfo_fax" },       
        { text: "E-mail", align: "left", value: "collegeinfo_email" }, 
        { text: "แก้ไข", align: "center", value: "actions", icon: "mdi-file-document-edit" },
      /*   { text: "ลบ", align: "center", value: "action_s" , icon: "mdi-delete-forever" }, */
      ],
      rowsperpage: [
        25,
        50,
        100,
        {
          text: "All",
          value: -1,
        },
      ],    
     
    collegeinfo: {},
      provinces: [],
      prefectures: [],  
      collegeinfotypes: [],    
     collgegs: [],
     collegeinfostatus:[],
      regions: [],
      region_ena: true
    };
  },
async mounted() {
    await this.collegeinfoQueryAll()

    let result_prefec = await this.$http.post('prefecture.php', {
          ApiKey: this.ApiKey
        })
    this.prefectures = result_prefec.data

        
    let result_provin = await this.$http.post('province.php', {
        ApiKey: this.ApiKey
      })
      this.provinces = result_provin.data     
            
     let result_collegeinfoty = await this.$http.post('collegeinfo.php', {
        ApiKey: this.ApiKey
      })
      this.collegeinfotypes = result_collegeinfoty.data

     let result_region = await this.$http.post('region.php', {
        ApiKey: this.ApiKey
      })
      this.regions = result_region.data  

       let user_status_result     
      user_status_result = await this.$http.post('crud_user_status.php?crud=read', {
        ApiKey: this.ApiKey
      })
        this.userstatus = user_status_result.data   
    },



    methods: {
      async collegeinfoQueryAll() {
          this.loading = true
        let result = await this.$http.post('collegeinfo.php', {
          ApiKey: this.ApiKey
        }).finally(() => this.loading = false)
        this.collegeinfos = result.data
      },

       async collegeinfoAdd() {
      this.addcollegeinfo = {};
      this.addcollegeinfodialog = true;
    },
      async addcollegeinfoSubmit() {
        if (this.$refs.addcollegeinfoform.validate()) {         
          this.addcollegeinfo.ApiKey = this.ApiKey;
          let result = await this.$http.post('collegeinfo.insert.php', this.addcollegeinfo)        
          if (result.data.status == true) {
            this.collegeinfos = result.data
            this.snackbar.icon = 'mdi-font-awesome'
            this.snackbar.color = 'success'
            this.snackbar.text = 'บันทึกข้อมูลเรียบร้อย'
            this.snackbar.show = true
            this.collegeinfoQueryAll()
          } else {
            this.snackbar.icon = 'mdi-close-network'
            this.snackbar.color = 'red'
            this.snackbar.text = 'บันทึกข้อมูลผิดพลาด'
            this.snackbar.show = true
             this.collegeinfoQueryAll()
          }
          this.addcollegeinfodialog = false
        }
      },

      async collegeinfoEdit(college_ID) {
        let result = await this.$http.post('collegeinfo.php', {
          ApiKey: this.ApiKey,
          college_ID: college_ID
        })
        this.editcollegeinfo = result.data       
        this.editcollegeinfodialog = true
       
       
      },
     
        async editcollegeinfoSubmit(upload) {
        let result = ''
        let uploaded = null

        if (this.$refs.file.files[0]) {
          if (this.$refs.file.files[0].type == 'image/jpeg') {
            let formData = new FormData()
            let filename = this.editcollegeinfo.college_ID + '.' + this.editcollegeinfo.period_year +
              '.orgchart.jpg'
            formData.append('file', this.$refs.file.files[0])
            formData.append('filename', '../vesarfiles/'+filename)
            formData.append('ApiKey', this.ApiKey)
            result = await this.$http.post('uploadfile.php', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
            if (result.data.status == true){
              this.collegeinfo.collegeinfo_orgchart = ''
              this.editcollegeinfo.collegeinfo_orgchart = filename
            }
            uploaded = true
          } else {
            uploaded = false
          }
        } else if (this.$refs.file2.files[0]) {
          if (this.$refs.file2.files[0].type == 'image/jpeg') {
            let formData = new FormData()
            let filename = this.editcollegeinfo.college_ID + '.' + this.editcollegeinfo.period_year +
              '.directorpic.jpg'
            formData.append('file', this.$refs.file2.files[0])
            formData.append('filename', '../vesarfiles/'+filename)
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
          this.snackbar.icon = 'check_circle'
          this.snackbar.color = 'success'
          this.snackbar.text = 'บันทึกข้อมูลเรียบร้อย'
          this.snackbar.show = true
        } else {
          if (!uploaded && upload) {
            this.snackbar.icon = 'error'
            this.snackbar.color = 'red'
            this.snackbar.text = 'ไฟล์ที่แนบไม่ถูกต้อง กรุณาแนบไฟล์เป็น jpg หรือ jpeg เท่านั้น'
            this.snackbar.show = true
          } else {
            this.snackbar.icon = 'error'
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


      async collegeinfoDelete(college_ID) {
        let result = await this.$http.post('collegeinfo.php', {
          ApiKey: this.ApiKey,
          college_ID: college_ID
        })
        this.editcollegeinfo = result.data
        this.deletecollegeinfodialog = true
      },
      async deletecollegeinfoSubmit() {
        if (this.$refs.deletecollegeinfoform.validate()) {
          this.editcollegeinfo.ApiKey = this.ApiKey;          
          let result = await this.$http.post('collegeinfo.delete.php', this.editcollegeinfo)
          if (result.data.status == true) {
            this.collegeinfo = result.data
            this.snackbar.icon = 'mdi-font-awesome'
            this.snackbar.color = 'success'
            this.snackbar.text = 'ลบข้อมูลเรียบร้อย'
            this.snackbar.show = true
            this.collegeinfoQueryAll()
          } else {
            this.snackbar.icon = 'mdi-close-network'
            this.snackbar.color = 'red'
            this.snackbar.text = 'ลบข้อมูลผิดพลาด'
            this.snackbar.show = true
          }
          this.deletecollegeinfodialog = false
        }
      },     
    },
    computed: {
      pages() {
        if (this.pagination.rowsPerPage == null ||
          this.pagination.totalItems == null
        ) return 0

        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      }
    },

  

 

  
}
</script>
