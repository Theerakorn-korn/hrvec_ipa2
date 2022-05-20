<template>
  <div>
      
    <v-container>
    <base-material-card
        icon="mdi-clipboard-text"
        title="System Log"
        class="px-5 py-3"
        
      >
        <v-card class="mb-4 pa-2">
          <v-row>
            <v-col cols="12" md="6" class="text-right">
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
          </v-row>
        </v-card>
        <v-data-table
          color="success"
          :loading="loading"
          :headers="headers"
          :items="data_syslogs"
          :search="search"          
       > 
         <template v-slot:[`item.status_booking`]="{ item }">
           <v-chip dark color="warning" v-if="item.status_booking">
               {{ item.status_booking }}
           </v-chip>
           <v-chip dark color="green" v-else>
             ว่าง
           </v-chip>
          </template>

         <template v-slot:[`item.actions`]="{ item }">
            <v-icon
              color="yellow"
              
              @click.stop="data_syslogEdit(item.id_m)"
            >
              mdi-pencil
            </v-icon>          
          </template>
            <template v-slot:[`item.action_s`]="{ item }">            
            <v-icon
              color="red"
              
              @click.stop="data_syslogDelete(item.id_m)"
            >
              mdi-delete
            </v-icon>
          </template>
          <v-alert
            slot="no-results"
            :value="true"
            color="error"
            icon="mdi-alert"
          >ไม่พบผลลัพธ์ "{{ search }}" ที่คุณกำลังค้นหา.</v-alert>
        </v-data-table>
      </base-material-card>

      <!--adddata_syslogdialog  -->
      <v-layout row justify-center>
        <v-dialog v-model="adddata_syslogdialog" persistent max-width="50%">
          <v-card class="mx-auto pa-5" >
            <base-material-card
              icon="mdi-account-multiple"
              title="เพิ่มข้อมูลประเภทสถานศึกษา"
              class="px-5 py-3 text_google"
              
            >
            </base-material-card>

            <v-card-text>
             <v-form ref="adddata_syslogform" lazy-validation>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex md12>
                       <v-autocomplete :items="colleges" item-text="college_name" item-value="college_code" v-model="adddata_syslog.college_code" label="สถานศึกษา"
                      required :rules="[v => !!v || '']">                      
                      </v-autocomplete>                  
                  </v-flex>
                   <v-flex md12>
                    <v-text-field label="เลขที่ตำแหน่ง" v-model="adddata_syslog.id_position" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>
                   <v-flex md12>
                        <v-flex md6>
                    <v-autocomplete  v-model="adddata_syslog.position" :items="userstatus" item-text="user_status_name" item-value="user_status_name" label="ตำแหน่ง" required :rules="[v => !!v || '']"></v-autocomplete>
                  </v-flex>                   
                  </v-flex>
                   <v-flex md12>
                    <v-text-field label="กรณี" v-model="adddata_syslog.case_vacancy" required :rules="[v => !!v || '']"></v-text-field>
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
                @click.stop="adddata_syslogdialog = false"
                rounded
                ><v-icon dark>mdi-close</v-icon> ยกเลิก</v-btn
              >
              <v-btn
                large
                color="success"
                @click.stop="adddata_syslogSubmit()"
                rounded
              >
                <v-icon dark>mdi-content-save</v-icon>&nbsp;&nbsp;บันทึก
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model deletedata_syslogdialog -->
      <v-layout>
        <v-dialog v-model="deletedata_syslogdialog" persistent max-width="40%">
          <v-card class="mx-auto pa-5" >                     
             <base-material-card
              color="error"
              icon="mdi-delete"
              title="ลบข้อมูลประเภทสถานศึกษา"
              class="px-5 py-3 text_google"
              
             
            >
            </base-material-card>

            <v-card-text class="text_google">
              
        <v-card>        
          <v-card-text>
            <v-form ref="deletedata_syslogform" lazy-validation>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    ยืนยันการลบข้อมูล <br>
                    {{ editdata_syslog.college_name + ' : ' + editdata_syslog.id_position }}
                  </v-flex>                                
                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>        
        </v-card>
    
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn large  @click.stop="deletedata_syslogdialog = false"
                ><v-icon dark>mdi-close</v-icon>ยกเลิก</v-btn
              >
              <v-btn large
                color="red darken-3"
                @click.stop="deletedata_syslogSubmit()"
                dark
              >
                <v-icon dark>mdi-delete</v-icon>&nbsp;ลบ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model editdata_syslogdialog -->
      <v-layout row justify-center>
         <v-dialog v-model="editdata_syslogdialog" persistent max-width="80%">
        <v-card class="mx-auto pa-6" >
           <base-material-card
              color="yellow"
              icon="mdi-clipboard-text"
              title="แก้ไขข้อมูลผู้ใช้งานระบบ"
              class="px-5 py-3 text_google"
              
            ></base-material-card>
          <v-card-text>
            <v-form ref="editdata_syslogform" lazy-validation>
              <v-container grid-list-md>
                <v-layout wrap>                
                   <v-flex md12>
                       <v-autocomplete :items="colleges" item-text="college_name" item-value="college_code" v-model="editdata_syslog.college_code" label="สถานศึกษา"
                      required :rules="[v => !!v || '']">                      
                      </v-autocomplete>                  
                  </v-flex>
                   <v-flex md12>
                    <v-text-field label="เลขที่ตำแหน่ง" v-model="editdata_syslog.id_position" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>
                   <v-flex md12>
                        <v-flex md6>
                    <v-autocomplete  v-model="editdata_syslog.position" :items="userstatus" item-text="user_status_name" item-value="user_status_name" label="ตำแหน่ง" required :rules="[v => !!v || '']"></v-autocomplete>
                  </v-flex>                   
                  </v-flex>
                   <v-flex md12>
                    <v-text-field label="กรณี" v-model="editdata_syslog.case_vacancy" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
              <small>* จำเป็น</small>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn large  @click.stop="editdata_syslogdialog = false" rounded>
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn large color="warning" @click.stop="editdata_syslogSubmit()" rounded>
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
      adddata_syslogdialog: false,
      editdata_syslogdialog: false,
      deletedata_syslogdialog: false,
      snackbar: {
        show: false,
        color: '',
        timeout: 5000,
        icon: '',
        text: ''
      },
      data_syslogs: [],
      adddata_syslog: {},
      editdata_syslog: {},
      colleges: [],
      userstatus: [],
      search: '',
      pagination: {},      
      headers: [       
        { text: "Id_log", align: "left", value: "id_log" }, 
        { text: "User_ID", align: "left", value: "user_account" }, 
        { text: "Event", align: "left", value: "event_log" }, 
        { text: "Page", align: "left", value: "page_log" }, 
        { text: "Table Action", align: "left", value: "table_log" }, 
        { text: "Datail", align: "left", value: "detail_log" },       
        { text: "Date & Time", align: "left", value: "date_times" },       
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
     
    college: {},
      provinces: [],
      prefectures: [],      
     collgegs: [],
     data_syslogstatus:[],
      regions: [],
      region_ena: true
    };
  },
async mounted() {
    await this.data_syslogQueryAll()
      
      let result
      result = await this.$http.post('college.php', {
        ApiKey: this.ApiKey
      })
      
      this.colleges = result.data
      result = await this.$http.post('province.php', {
        ApiKey: this.ApiKey
      })
      this.provinces = result.data
      
      result = await this.$http.post('region.php', {
        ApiKey: this.ApiKey
      })
      this.regions = result.data  

       let user_status_result     
      user_status_result = await this.$http.post('crud_user_status.php?crud=read', {
        ApiKey: this.ApiKey
      })
        this.userstatus = user_status_result.data   
    },



    methods: {
      async data_syslogQueryAll() {
          this.loading = true
        let result = await this.$http.post('data_syslog.php', {
          ApiKey: this.ApiKey
        }).finally(() => this.loading = false)
        this.data_syslogs = result.data
      },
       async data_syslogAdd() {
      this.adddata_syslog = {};
      this.adddata_syslogdialog = true;
    },
      async adddata_syslogSubmit() {
        if (this.$refs.adddata_syslogform.validate()) {         
          this.adddata_syslog.ApiKey = this.ApiKey;
          let result = await this.$http.post('data_syslog.insert.php', this.adddata_syslog)        
          if (result.data.status == true) {
            this.data_syslog = result.data
            this.snackbar.icon = 'mdi-font-awesome'
            this.snackbar.color = 'success'
            this.snackbar.text = 'บันทึกข้อมูลเรียบร้อย'
            this.snackbar.show = true
            this.data_syslogQueryAll()
          } else {
            this.snackbar.icon = 'mdi-close-network'
            this.snackbar.color = 'red'
            this.snackbar.text = 'บันทึกข้อมูลผิดพลาด'
            this.snackbar.show = true
             this.data_syslogQueryAll()
          }
          this.adddata_syslogdialog = false
        }
      },

      async data_syslogEdit(id_m) {
        let result = await this.$http.post('data_syslog.php', {
          ApiKey: this.ApiKey,
          id_m: id_m
        })
        this.editdata_syslog = result.data       
        this.editdata_syslogdialog = true
       
       
      },
      async editdata_syslogSubmit() {
        if (this.$refs.editdata_syslogform.validate()) {
          this.editdata_syslog.ApiKey = this.ApiKey;         
          let result = await this.$http.post('data_syslog.update.php', this.editdata_syslog)
          if (result.data.status == true) {
            this.data_syslog = result.data
            this.snackbar.icon = 'mdi-font-awesome'
            this.snackbar.color = 'success'
            this.snackbar.text = 'แก้ไขข้อมูลเรียบร้อย'
            this.snackbar.show = true
            this.data_syslogQueryAll()
          } else {
            this.snackbar.icon = 'mdi-close-network'
            this.snackbar.color = 'red'
            this.snackbar.text = 'แก้ไขข้อมูลผิดพลาด'
            this.snackbar.show = true
          }
          this.editdata_syslogdialog = false
        }
      },
      async data_syslogDelete(id_m) {
        let result = await this.$http.post('data_syslog.php', {
          ApiKey: this.ApiKey,
          id_m: id_m
        })
        this.editdata_syslog = result.data
        this.deletedata_syslogdialog = true
      },
      async deletedata_syslogSubmit() {
        if (this.$refs.deletedata_syslogform.validate()) {
          this.editdata_syslog.ApiKey = this.ApiKey;          
          let result = await this.$http.post('data_syslog.delete.php', this.editdata_syslog)
          if (result.data.status == true) {
            this.data_syslog = result.data
            this.snackbar.icon = 'mdi-font-awesome'
            this.snackbar.color = 'success'
            this.snackbar.text = 'ลบข้อมูลเรียบร้อย'
            this.snackbar.show = true
            this.data_syslogQueryAll()
          } else {
            this.snackbar.icon = 'mdi-close-network'
            this.snackbar.color = 'red'
            this.snackbar.text = 'ลบข้อมูลผิดพลาด'
            this.snackbar.show = true
          }
          this.deletedata_syslogdialog = false
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
