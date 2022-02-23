<template>
  <div>
      
    <v-container>
    <base-material-card
        icon="mdi-clipboard-text"
        title="กำหนดการสถานศึกษา"
        class="px-5 py-3"
        color="info"
        
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
                @click.native="period_collegeAdd()"
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
          :items="period_colleges"
          :search="search"
         
       > 

 <template v-slot:[`item.period_college_start`]="{ item }">
                 {{ item.period_college_start| moment("add","543 years") | moment("D MMMM YYYY") }}
          </template>
          <template v-slot:[`item.period_college_stop`]="{ item }">
                 {{ item.period_college_stop| moment("add","543 years") | moment("D MMMM YYYY") }}
          </template>
          <template v-slot:[`item.period_college_cal_end`]="{ item }">
                 {{ item.period_college_cal_end| moment("add","543 years") | moment("D MMMM YYYY") }}
          </template>
 <template v-slot:[`item.period_college_enable`]="{ item }">
                <v-icon large color="green darken-2" v-if="item.period_college_enable === '1'">mdi-alarm-light</v-icon> 
                <v-icon v-if="item.period_college_enable === '0'">mdi-alarm-light-outline</v-icon> 
          </template>
          
<template v-slot:[`item.period_college_type`]="{ item }">
  <span v-if="item.period_college_type==='movement_college'">เงือนไขการย้าย</span>
  <span v-if="item.period_college_type==='update_college'">ปรับปรุงข้อมูล</span>
                   </template>

         <template v-slot:[`item.actions`]="{ item }">
            <v-icon
            large
              color="yellow"              
              @click.stop="period_collegeEdit(item.id_pr_c)"
            >
              mdi-pencil
            </v-icon>          
          </template>
            <template v-slot:[`item.action_s`]="{ item }">            
            <v-icon
              color="red"
              large
              @click.stop="period_collegeDelete(item.id_pr_c)"
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

      <!--addperiod_collegedialog  -->
      <v-layout row justify-center>
        <v-dialog v-model="addperiod_collegedialog" persistent max-width="50%">
          <v-card class="mx-auto pa-5" >
            <base-material-card
              icon="mdi-account-multiple"
              title="เพิ่มข้อมูลปี"
              class="px-5 py-3 text_google"
              
            >
            </base-material-card>

            <v-card-text>
            <v-form ref="addperiod_collegeform" lazy-validation>
             <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 md6>
                    <v-select v-model="addperiod_college.period_college_year" :items="period_collegeselect" item-text="text" item-value="value" label="เลือกปีการศึกษา"
                      single-line>
                    </v-select>                    
                    <v-spacer></v-spacer>
                  </v-flex>                  
                  <v-flex xs12 md6>
                    <v-text-field type="number" label="ครั้งที่" v-model="addperiod_college.period_college_times" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>
                   <v-flex xs12 md6>
                    <v-select :items="period_college_types" item-value="value" label="ปรเภทการย้าย" v-model="addperiod_college.period_college_type" required :rules="[v => !!v || '']"></v-select>
                  </v-flex>
                  
                  <v-flex xs12 md6>
                    <v-text-field type="date" label="วันที่เริ่ม" v-model="addperiod_college.period_college_start" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-text-field type="date" label="วันที่สิ้นสุด" v-model="addperiod_college.period_college_stop" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>                 
                  <v-flex xs12 md6>
                    <v-switch
                      v-model="addperiod_college.period_college_enable_sw"
                      label="เปิดใช้งาน"
                    ></v-switch>
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
                @click.stop="addperiod_collegedialog = false"
                rounded
                ><v-icon dark>mdi-close</v-icon> ยกเลิก</v-btn
              >
              <v-btn
                large
                color="success"
                @click.stop="addperiod_collegeSubmit()"
                rounded
              >
                <v-icon dark>mdi-content-save</v-icon>&nbsp;&nbsp;บันทึก
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model deleteperiod_collegedialog -->
      <v-layout>
        <v-dialog v-model="deleteperiod_collegedialog" persistent max-width="40%">
          <v-card class="mx-auto pa-5" >                     
             <base-material-card
              color="error"
              icon="mdi-delete"
              title="ลบข้อมูลปี"
              class="px-5 py-3 text_google"
              
             
            >
            </base-material-card>

            <v-card-text class="text_google">
              
        <v-card>        
          <v-card-text>
            <v-form ref="deleteperiod_collegeform" lazy-validation>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    ยืนยันการลบรายการ {{ editperiod_college.id_pr_c }} : {{ editperiod_college.period_college_year }}
                  </v-flex>                                 
                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>        
        </v-card>
    
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn large @click.stop="deleteperiod_collegedialog = false"
                ><v-icon dark>mdi-close</v-icon>ยกเลิก</v-btn
              >
              <v-btn large
                color="red darken-3"
                @click.stop="deleteperiod_collegeSubmit()"
                dark
              >
                <v-icon dark>mdi-delete</v-icon>&nbsp;ลบ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model editperiod_collegedialog -->
      <v-layout row justify-center>
         <v-dialog v-model="editperiod_collegedialog" persistent max-width="80%">
        <v-card class="mx-auto pa-6" >
           <base-material-card
              color="yellow"
              icon="mdi-clipboard-text"
              title="แก้ไขข้อมูลปี"
              class="px-5 py-3 text_google"
              
            ></base-material-card>
          <v-card-text>
            <v-form ref="editperiod_collegeform" lazy-validation>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 md6>
                    <v-select v-model="editperiod_college.period_college_year" :items="period_collegeselect" item-text="text" item-value="value" label="เลือกปีการศึกษา">
                    </v-select>
                    <v-spacer></v-spacer>
                  </v-flex>
                   <v-flex xs12 md6>
                    <v-text-field type="number" label="ครั้งที่" v-model="editperiod_college.period_college_times" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>
                   <v-flex xs12 md6>
                    <v-select :items="period_college_types" item-value="value" label="ปรเภทการย้าย" v-model="editperiod_college.period_college_type" required :rules="[v => !!v || '']"></v-select>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-text-field type="date" label="วันที่เริ่ม" v-model="editperiod_college.period_college_start" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-text-field type="date" label="วันที่สิ้นสุด" v-model="editperiod_college.period_college_stop" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-text-field type="date" label="วันที่สิ้นสุดการนับถึง" v-model="editperiod_college.period_college_cal_end" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-switch
                      v-model="editperiod_college.period_college_enable_sw"
                      label="เปิดใช้งาน"
                    ></v-switch>
                  </v-flex>
                </v-layout>
              </v-container>
              <small>* จำเป็น</small>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn large  @click.stop="editperiod_collegedialog = false" rounded>
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn large color="warning" @click.stop="editperiod_collegeSubmit()" rounded>
                <v-icon dark>mdi-pencil</v-icon>&nbsp;บันทึก
              </v-btn>

          </v-card-actions>
        </v-card>
      </v-dialog>
      </v-layout>
    </v-container>

    
    <v-container fluid>  
      <v-snackbar v-model="snackbar.show" multi-line vertical top auto-height :timeout="snackbar.timeout" :color="snackbar.color">
        <v-icon large>{{snackbar.icon}}</v-icon>
        <br> {{snackbar.text}}
        <v-btn dark  @click="snackbar.show = false">
          Close
        </v-btn>
      </v-snackbar>  
    </v-container>
  </div>
</template>
<script>
import VueMoment from 'vue-moment'
import moment from 'moment-timezone'
export default { 
  name: "period_college",
  data() {
    return {
      VueMoment,
      moment,
       loading: true,
     ApiKey: 'HRvec2021',
      valid: true,
      addperiod_collegedialog: false,
      editperiod_collegedialog: false,
      deleteperiod_collegedialog: false,
      snackbar: {
        show: false,
        color: '',
        timeout: 5000,
        icon: '',
        text: ''
      },
      period_college_types:[
        { text: 'เงือนไขการย้าย', value: 'movement_college'},
        { text: 'ปรับปรุงข้อมูล', value: 'update_college'},
        
      ],
      period_colleges: [],
      addperiod_college: {},
      editperiod_college: {},
      search: '',
      pagination: {},      
      headers: [     
               
        { text: "ครั้งที่", align: "center", value: "period_college_times" }, 
        { text: "ปี", align: "center", value: "period_college_yearbd" },                  
        { text: "เริ่มวันที่", align: "center", value: "period_college_start" },        
        { text: "สิ้นสุดวันที่", align: "center", value: "period_college_stop" },        
       
        { text: "เกี่ยวข้องกับ", align: "center", value: "period_college_type" },        
        { text: "สถานะ", align: "center", value: "period_college_enable" }, 
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
    period_collegeselect: [
        {
          value: "2021",
          text: "2564"
        },
         {
          value: "2022",
          text: "2565"
        },
        {
          value: "2023",
          text: "2566"
        },
        {
          value: "2024",
          text: "2567"
        },
        {
          value: "2025",
          text: "2568"
        },
        {
          value: "2026",
          text: "2569"
        },
        {
          value: "2027",
          text: "2570"
        },
      ],
    };
  },
async mounted() {
           this.period_collegeQueryAll()
    },
    methods: {
      async period_collegeQueryAll() {
          this.loading = true
        let result = await this.$http.post('period_college.php', {
          ApiKey: this.ApiKey
        }).finally(() => this.loading = false)
        this.period_colleges = result.data
      },
       async period_collegeAdd() {
         this.addperiod_college={};
        this.addperiod_college.period_college_year = new Date().getFullYear().toString()
        this.addperiod_college.period_college_start = new Date().toISOString().substr(0, 10)
        this.addperiod_college.period_college_stop = new Date().toISOString().substr(0, 10)
        this.addperiod_college.period_college_enable_sw = false

        this.adddialog = true
      this.addperiod_collegedialog = true;
    },
      async addperiod_collegeSubmit() {
        if(this.addperiod_college.period_college_enable_sw == true)
          this.addperiod_college.period_college_enable = '1'
        else
          this.addperiod_college.period_college_enable = '0'
        this.addperiod_college.ApiKey = this.ApiKey
  
        let result = await this.$http.post('period_college.insert.php', this.addperiod_college)
        console.log(result.data)
        if (result.data.status == true) {   
            this.snackbar.icon = 'mdi-font-awesome'
            this.snackbar.color = 'success'
            this.snackbar.text = 'บันทึกข้อมูลเรียบร้อย'
            this.snackbar.show = true
            this.period_collegeQueryAll()
          } else {
           
            this.snackbar.icon = 'mdi-close-network'
            this.snackbar.color = 'red'
            this.snackbar.text = 'บันทึกข้อมูลผิดพลาด'
            this.snackbar.show = true                    
          }
          this.addperiod_collegedialog = false        
      },
      async period_collegeEdit(id_pr_c) {
        let result = await this.$http.post('period_college.php', {
          ApiKey: this.ApiKey,
          id_pr_c: id_pr_c
        })
        this.editperiod_college = result.data
        if(this.editperiod_college.period_college_enable == 1)
          this.editperiod_college.period_college_enable_sw = true
        else
          this.editperiod_college.period_college_enable_sw = false
        this.editperiod_collegedialog = true
      },
      async editperiod_collegeSubmit() {
        if(this.editperiod_college.period_college_enable_sw == true)
          this.editperiod_college.period_college_enable = '1'
        else
          this.editperiod_college.period_college_enable = '0'
        this.editperiod_college.ApiKey = this.ApiKey
        let result = await this.$http.post('period_college.update.php', this.editperiod_college)
          if (result.data.status == true) {
            this.period_college = result.data
            this.snackbar.icon = 'mdi-font-awesome'
            this.snackbar.color = 'success'
            this.snackbar.text = 'แก้ไขข้อมูลเรียบร้อย'
            this.snackbar.show = true
            this.period_collegeQueryAll()
          } else {
            this.snackbar.icon = 'mdi-close-network'
            this.snackbar.color = 'red'
            this.snackbar.text = 'แก้ไขข้อมูลผิดพลาด'
            this.snackbar.show = true
          }
          this.editperiod_collegedialog = false        
      },
      async period_collegeDelete(id_pr_c) {
        let result = await this.$http.post('period_college.php', {
          ApiKey: this.ApiKey,
          id_pr_c: id_pr_c
        })
        this.editperiod_college = result.data
        this.deleteperiod_collegedialog = true
      },
      async deleteperiod_collegeSubmit() {
        if (this.$refs.deleteperiod_collegeform.validate()) {
          this.editperiod_college.ApiKey = this.ApiKey;          
          let result = await this.$http.post('period_college.delete.php', this.editperiod_college)
          
          if (result.data.status == true) {
            this.period_college = result.data
            this.snackbar.icon = 'mdi-font-awesome'
            this.snackbar.color = 'success'
            this.snackbar.text = 'ลบข้อมูลเรียบร้อย'
            this.snackbar.show = true
            this.period_collegeQueryAll()
          } else {
            this.snackbar.icon = 'mdi-close-network'
            this.snackbar.color = 'red'
            this.snackbar.text = 'ลบข้อมูลผิดพลาด'
            this.snackbar.show = true
          }
          this.deleteperiod_collegedialog = false
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
