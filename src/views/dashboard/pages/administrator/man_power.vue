<template>
  <div>
      
    <v-container>
    <base-material-card
        icon="mdi-clipboard-text"
        title="ข้อมูลประเภทสถานศึกษา"
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
            <v-col cols="12" md="2"><v-btn
              color="info"   
              :href="
                '#/admin/print_report_manpower'                
              "              target="_blank"
            
            >
              <v-icon   class="pa-1">
                mdi-printer
              </v-icon>
              รายงานตำแหน่งว่างคงเหลือ
            </v-btn></v-col>
            <v-col cols="12" md="4" class="text-right">
              <v-btn
                
                large
                right
                depressed
                color="primary"
                @click.native="man_powerAdd()"
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
          :items="man_powers"
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
              
              @click.stop="man_powerEdit(item.id_m)"
            >
              mdi-pencil
            </v-icon>          
          </template>
            <template v-slot:[`item.action_s`]="{ item }">            
            <v-icon
              color="red"
              
              @click.stop="man_powerDelete(item.id_m)"
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

      <!--addman_powerdialog  -->
      <v-layout row justify-center>
        <v-dialog v-model="addman_powerdialog" persistent max-width="50%">
          <v-card class="mx-auto pa-5" >
            <base-material-card
              icon="mdi-account-multiple"
              title="เพิ่มข้อมูลประเภทสถานศึกษา"
              class="px-5 py-3 text_google"
              
            >
            </base-material-card>

            <v-card-text>
             <v-form ref="addman_powerform" lazy-validation>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex md12>
                       <v-autocomplete :items="colleges" item-text="college_name" item-value="college_code" v-model="addman_power.college_code" label="สถานศึกษา"
                      required :rules="[v => !!v || '']">                      
                      </v-autocomplete>                  
                  </v-flex>
                   <v-flex md12>
                    <v-text-field label="เลขที่ตำแหน่ง" v-model="addman_power.id_position" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>
                   <v-flex md12>
                        <v-flex md6>
                    <v-autocomplete  v-model="addman_power.position" :items="userstatus" item-text="user_status_name" item-value="user_status_name" label="ตำแหน่ง" required :rules="[v => !!v || '']"></v-autocomplete>
                  </v-flex>                   
                  </v-flex>
                   <v-flex md12>
                    <v-text-field label="กรณี" v-model="addman_power.case_vacancy" required :rules="[v => !!v || '']"></v-text-field>
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
                @click.stop="addman_powerdialog = false"
                rounded
                ><v-icon dark>mdi-close</v-icon> ยกเลิก</v-btn
              >
              <v-btn
                large
                color="success"
                @click.stop="addman_powerSubmit()"
                rounded
              >
                <v-icon dark>mdi-content-save</v-icon>&nbsp;&nbsp;บันทึก
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model deleteman_powerdialog -->
      <v-layout>
        <v-dialog v-model="deleteman_powerdialog" persistent max-width="40%">
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
            <v-form ref="deleteman_powerform" lazy-validation>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    ยืนยันการลบข้อมูล <br>
                    {{ editman_power.college_name + ' : ' + editman_power.id_position }}
                  </v-flex>                                
                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>        
        </v-card>
    
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn large  @click.stop="deleteman_powerdialog = false"
                ><v-icon dark>mdi-close</v-icon>ยกเลิก</v-btn
              >
              <v-btn large
                color="red darken-3"
                @click.stop="deleteman_powerSubmit()"
                dark
              >
                <v-icon dark>mdi-delete</v-icon>&nbsp;ลบ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model editman_powerdialog -->
      <v-layout row justify-center>
         <v-dialog v-model="editman_powerdialog" persistent max-width="80%">
        <v-card class="mx-auto pa-6" >
           <base-material-card
              color="yellow"
              icon="mdi-clipboard-text"
              title="แก้ไขข้อมูลผู้ใช้งานระบบ"
              class="px-5 py-3 text_google"
              
            ></base-material-card>
          <v-card-text>
            <v-form ref="editman_powerform" lazy-validation>
              <v-container grid-list-md>
                <v-layout wrap>                
                   <v-flex md12>
                       <v-autocomplete :items="colleges" item-text="college_name" item-value="college_code" v-model="editman_power.college_code" label="สถานศึกษา"
                      required :rules="[v => !!v || '']">                      
                      </v-autocomplete>                  
                  </v-flex>
                   <v-flex md12>
                    <v-text-field label="เลขที่ตำแหน่ง" v-model="editman_power.id_position" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>
                   <v-flex md12>
                        <v-flex md6>
                    <v-autocomplete  v-model="editman_power.position" :items="userstatus" item-text="user_status_name" item-value="user_status_name" label="ตำแหน่ง" required :rules="[v => !!v || '']"></v-autocomplete>
                  </v-flex>                   
                  </v-flex>
                   <v-flex md12>
                    <v-text-field label="กรณี" v-model="editman_power.case_vacancy" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
              <small>* จำเป็น</small>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn large  @click.stop="editman_powerdialog = false" rounded>
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn large color="warning" @click.stop="editman_powerSubmit()" rounded>
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
      addman_powerdialog: false,
      editman_powerdialog: false,
      deleteman_powerdialog: false,
      snackbar: {
        show: false,
        color: '',
        timeout: 5000,
        icon: '',
        text: ''
      },
      man_powers: [],
      addman_power: {},
      editman_power: {},
      colleges: [],
      userstatus: [],
      search: '',
      pagination: {},      
      headers: [       
        { text: "สถานศึกษา", align: "left", value: "college_name" }, 
        { text: "จังหวัด", align: "left", value: "province_name" }, 
        { text: "อัตราว่าง", align: "left", value: "num_position" }, 
        { text: "รหัสตำแหน่ง", align: "left", value: "id_position" }, 
        { text: "ตำแหน่ง", align: "left", value: "position" }, 
        { text: "กรณี", align: "left", value: "case_vacancy" },       
        { text: "จอง", align: "left", value: "status_booking" },       
        { text: "แก้ไข", align: "center", value: "actions", icon: "mdi-file-document-edit" },
        { text: "ลบ", align: "center", value: "action_s" , icon: "mdi-delete-forever" },
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
     man_powerstatus:[],
      regions: [],
      region_ena: true,
      data_syslog:{},
    };
  },
async mounted() {
    await this.man_powerQueryAll()
      
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
      async man_powerQueryAll() {
          this.loading = true
        let result = await this.$http.post('man_power.php', {
          ApiKey: this.ApiKey
        }).finally(() => this.loading = false)
        this.man_powers = result.data
      },
       async man_powerAdd() {
      this.addman_power = {};
      this.addman_powerdialog = true;
    },
      async addman_powerSubmit() {
        if (this.$refs.addman_powerform.validate()) {         
          this.addman_power.ApiKey = this.ApiKey;
          let result = await this.$http.post('man_power.insert.php', this.addman_power)        
          if (result.data.status == true) {
            this.man_power = result.data
            this.snackbar.icon = 'mdi-font-awesome'
            this.snackbar.color = 'success'
            this.snackbar.text = 'บันทึกข้อมูลเรียบร้อย'
            this.snackbar.show = true
              let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
          this.data_syslog.ApiKey = this.ApiKey;
          this.data_syslog.user_account = userSession.user_name;
          this.data_syslog.event_log = "insert";
          this.data_syslog.page_log = "man_power";
          this.data_syslog.table_log = "man_power";
          this.data_syslog.detail_log = this.addman_power.id_position + ":" + this.addman_power.college_code;
          this.data_syslog.date_times = this.date_today_log;
          await this.$http.post("data_syslog.insert.php", this.data_syslog);

            this.man_powerQueryAll()
          } else {
            this.snackbar.icon = 'mdi-close-network'
            this.snackbar.color = 'red'
            this.snackbar.text = 'บันทึกข้อมูลผิดพลาด'
            this.snackbar.show = true
             this.man_powerQueryAll()
          }
          this.addman_powerdialog = false
        }
      },

      async man_powerEdit(id_m) {
        let result = await this.$http.post('man_power.php', {
          ApiKey: this.ApiKey,
          id_m: id_m
        })
        this.editman_power = result.data       
        this.editman_powerdialog = true
       
       
      },
      async editman_powerSubmit() {
        if (this.$refs.editman_powerform.validate()) {
          this.editman_power.ApiKey = this.ApiKey;         
          let result = await this.$http.post('man_power.update.php', this.editman_power)
          if (result.data.status == true) {
            this.man_power = result.data
            this.snackbar.icon = 'mdi-font-awesome'
            this.snackbar.color = 'success'
            this.snackbar.text = 'แก้ไขข้อมูลเรียบร้อย'
            this.snackbar.show = true
            let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
          this.data_syslog.ApiKey = this.ApiKey;
          this.data_syslog.user_account = userSession.user_name;
          this.data_syslog.event_log = "update";
          this.data_syslog.page_log = "man_power";
          this.data_syslog.table_log = "man_power";
          this.data_syslog.detail_log = this.editman_power.id_position + " : " + this.editman_power.college_code + " : " + this.editman_power.case_vacancy;
          this.data_syslog.date_times = this.date_today_log;
          await this.$http.post("data_syslog.insert.php", this.data_syslog);

            this.man_powerQueryAll()
          } else {
            this.snackbar.icon = 'mdi-close-network'
            this.snackbar.color = 'red'
            this.snackbar.text = 'แก้ไขข้อมูลผิดพลาด'
            this.snackbar.show = true
          }
          this.editman_powerdialog = false
        }
      },
      async man_powerDelete(id_m) {
        let result = await this.$http.post('man_power.php', {
          ApiKey: this.ApiKey,
          id_m: id_m
        })
        this.editman_power = result.data
        this.deleteman_powerdialog = true
      },
      async deleteman_powerSubmit() {
        if (this.$refs.deleteman_powerform.validate()) {
          this.editman_power.ApiKey = this.ApiKey;          
          let result = await this.$http.post('man_power.delete.php', this.editman_power)
          if (result.data.status == true) {
            this.man_power = result.data
            this.snackbar.icon = 'mdi-font-awesome'
            this.snackbar.color = 'success'
            this.snackbar.text = 'ลบข้อมูลเรียบร้อย'
            this.snackbar.show = true
             let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
          this.data_syslog.ApiKey = this.ApiKey;
          this.data_syslog.user_account = userSession.user_name;
          this.data_syslog.event_log = "delete";
          this.data_syslog.page_log = "man_power";
          this.data_syslog.table_log = "man_power";
          this.data_syslog.detail_log = this.editman_power.id_position + " : " + this.editman_power.college_code + " : " + this.editman_power.case_vacancy;
          this.data_syslog.date_times = this.date_today_log;
          await this.$http.post("data_syslog.insert.php", this.data_syslog);
            this.man_powerQueryAll()
          } else {
            this.snackbar.icon = 'mdi-close-network'
            this.snackbar.color = 'red'
            this.snackbar.text = 'ลบข้อมูลผิดพลาด'
            this.snackbar.show = true
          }
          this.deleteman_powerdialog = false
        }
      },     
    },
    computed: {
      pages() {
        if (this.pagination.rowsPerPage == null ||
          this.pagination.totalItems == null
        ) return 0

        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      },
      date_today_log() {
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, "0");
      let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      let yyyy = today.getFullYear() + 543;
let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      today = dd + "/" + mm + "/" + yyyy + "/" + time;
      return today;
    },
    },

  

 

  
}
</script>
