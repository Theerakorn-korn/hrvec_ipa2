<template>
  <div>
      
    <v-container>
    <base-material-card
        icon="mdi-clipboard-text"
        title="ข้อมูลปีรอบการย้าย"
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
                @click.native="periodAdd()"
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
          :items="periods"
          :search="search"
         
       > 

 <template v-slot:[`item.period_start`]="{ item }">
                 {{ item.period_start| moment("add","543 years") | moment("D MMMM YYYY") }}
          </template>
          <template v-slot:[`item.period_stop`]="{ item }">
                 {{ item.period_stop| moment("add","543 years") | moment("D MMMM YYYY") }}
          </template>
          <template v-slot:[`item.period_cal_end`]="{ item }">
                 {{ item.period_cal_end| moment("add","543 years") | moment("D MMMM YYYY") }}
          </template>
 <template v-slot:[`item.period_enable`]="{ item }">
                <v-icon large color="green darken-2" v-if="item.period_enable === '1'">mdi-alarm-light</v-icon> 
                <v-icon v-if="item.period_enable === '0'">mdi-alarm-light-outline</v-icon> 
          </template>
          
<template v-slot:[`item.period_type`]="{ item }">
  <span v-if="item.period_type==='teacher'">สายการสอนและสายสนับสนุน</span>
  <span v-if="item.period_type==='manage'">สายงานบริหารสถานศึกษา</span>
                   </template>

         <template v-slot:[`item.actions`]="{ item }">
            <v-icon
            large
              color="yellow"              
              @click.stop="periodEdit(item.id_pr)"
            >
              mdi-pencil
            </v-icon>          
          </template>
            <template v-slot:[`item.action_s`]="{ item }">            
            <v-icon
              color="red"
              large
              @click.stop="periodDelete(item.id_pr)"
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

      <!--addperioddialog  -->
      <v-layout row justify-center>
        <v-dialog v-model="addperioddialog" persistent max-width="50%">
          <v-card class="mx-auto pa-5" >
            <base-material-card
              icon="mdi-account-multiple"
              title="เพิ่มข้อมูลปี"
              class="px-5 py-3 text_google"
              
            >
            </base-material-card>

            <v-card-text>
            <v-form ref="addperiodform" lazy-validation>
             <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 md6>
                    <v-select v-model="addperiod.period_year" :items="periodselect" item-text="text" item-value="value" label="เลือกปีการศึกษา"
                      single-line>
                    </v-select>                    
                    <v-spacer></v-spacer>
                  </v-flex>                  
                  <v-flex xs12 md6>
                    <v-text-field type="number" label="ครั้งที่" v-model="addperiod.period_times" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>
                   <v-flex xs12 md6>
                    <v-select :items="period_types" item-value="value" label="ปรเภทการย้าย" v-model="addperiod.period_type" required :rules="[v => !!v || '']"></v-select>
                  </v-flex>
                  
                  <v-flex xs12 md6>
                    <v-text-field type="date" label="วันที่เริ่ม" v-model="addperiod.period_start" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-text-field type="date" label="วันที่สิ้นสุด" v-model="addperiod.period_stop" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-text-field type="date" label="วันที่สิ้นสุดการนับถึง" v-model="addperiod.period_cal_end" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-switch
                      v-model="addperiod.period_enable_sw"
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
                @click.stop="addperioddialog = false"
                rounded
                ><v-icon dark>mdi-close</v-icon> ยกเลิก</v-btn
              >
              <v-btn
                large
                color="success"
                @click.stop="addperiodSubmit()"
                rounded
              >
                <v-icon dark>mdi-content-save</v-icon>&nbsp;&nbsp;บันทึก
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model deleteperioddialog -->
      <v-layout>
        <v-dialog v-model="deleteperioddialog" persistent max-width="40%">
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
            <v-form ref="deleteperiodform" lazy-validation>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    ยืนยันการลบรายการ {{ editperiod.id_pr }} : {{ editperiod.period_year }}
                  </v-flex>                                 
                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>        
        </v-card>
    
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn large @click.stop="deleteperioddialog = false"
                ><v-icon dark>mdi-close</v-icon>ยกเลิก</v-btn
              >
              <v-btn large
                color="red darken-3"
                @click.stop="deleteperiodSubmit()"
                dark
              >
                <v-icon dark>mdi-delete</v-icon>&nbsp;ลบ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model editperioddialog -->
      <v-layout row justify-center>
         <v-dialog v-model="editperioddialog" persistent max-width="80%">
        <v-card class="mx-auto pa-6" >
           <base-material-card
              color="yellow"
              icon="mdi-clipboard-text"
              title="แก้ไขข้อมูลปี"
              class="px-5 py-3 text_google"
              
            ></base-material-card>
          <v-card-text>
            <v-form ref="editperiodform" lazy-validation>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 md6>
                    <v-select v-model="editperiod.period_year" :items="periodselect" item-text="text" item-value="value" label="เลือกปีการศึกษา">
                    </v-select>
                    <v-spacer></v-spacer>
                  </v-flex>
                   <v-flex xs12 md6>
                    <v-text-field type="number" label="ครั้งที่" v-model="editperiod.period_times" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>
                   <v-flex xs12 md6>
                    <v-select :items="period_types" item-value="value" label="ปรเภทการย้าย" v-model="editperiod.period_type" required :rules="[v => !!v || '']"></v-select>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-text-field type="date" label="วันที่เริ่ม" v-model="editperiod.period_start" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-text-field type="date" label="วันที่สิ้นสุด" v-model="editperiod.period_stop" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-text-field type="date" label="วันที่สิ้นสุดการนับถึง" v-model="editperiod.period_cal_end" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-switch
                      v-model="editperiod.period_enable_sw"
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
            <v-btn large  @click.stop="editperioddialog = false" rounded>
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn large color="warning" @click.stop="editperiodSubmit()" rounded>
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
  name: "period",
  data() {
    return {
      VueMoment,
      moment,
       loading: true,
     ApiKey: 'HRvec2021',
      valid: true,
      addperioddialog: false,
      editperioddialog: false,
      deleteperioddialog: false,
      snackbar: {
        show: false,
        color: '',
        timeout: 5000,
        icon: '',
        text: ''
      },
      period_types:[
        { text: 'สายงานบริหารสถานศึกษา', value: 'manage'},
        { text: 'สายการสอนและสายสนับสนุนการสอน', value: 'teacher'},
      ],
      periods: [],
      addperiod: {},
      editperiod: {},
      search: '',
      pagination: {},      
      headers: [     
               
        { text: "ครั้งที่", align: "center", value: "period_times" }, 
        { text: "ปี", align: "center", value: "period_yearbd" },                  
        { text: "เริ่มวันที่", align: "center", value: "period_start" },        
        { text: "สิ้นสุดวันที่", align: "center", value: "period_stop" },        
        { text: "วันที่นับถึง", align: "center", value: "period_cal_end" },        
        { text: "เกี่ยวข้องกับ", align: "center", value: "period_type" },        
        { text: "สถานะ", align: "center", value: "period_enable" }, 
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
    periodselect: [
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
           this.periodQueryAll()
    },
    methods: {
      async periodQueryAll() {
          this.loading = true
        let result = await this.$http.post('period.php', {
          ApiKey: this.ApiKey
        }).finally(() => this.loading = false)
        this.periods = result.data
      },
       async periodAdd() {
         this.addperiod={};
        this.addperiod.period_year = new Date().getFullYear().toString()
        this.addperiod.period_start = new Date().toISOString().substr(0, 10)
        this.addperiod.period_stop = new Date().toISOString().substr(0, 10)
        this.addperiod.period_enable_sw = false

        this.adddialog = true
      this.addperioddialog = true;
    },
      async addperiodSubmit() {
        if(this.addperiod.period_enable_sw == true)
          this.addperiod.period_enable = '1'
        else
          this.addperiod.period_enable = '0'
        this.addperiod.ApiKey = this.ApiKey
        let result = await this.$http.post('period.insert.php', this.addperiod)
       
         if (result.data.status == true) {           
            this.period = result.data
            this.snackbar.icon = 'mdi-font-awesome'
            this.snackbar.color = 'success'
            this.snackbar.text = 'บันทึกข้อมูลเรียบร้อย'
            this.snackbar.show = true
            this.periodQueryAll()
          } else {
           
            this.snackbar.icon = 'mdi-close-network'
            this.snackbar.color = 'red'
            this.snackbar.text = 'บันทึกข้อมูลผิดพลาด'
            this.snackbar.show = true   
              this.periodQueryAll()         
          }
          this.addperioddialog = false        
      },
      async periodEdit(id_pr) {
        let result = await this.$http.post('period.php', {
          ApiKey: this.ApiKey,
          id_pr: id_pr
        })
        this.editperiod = result.data
        if(this.editperiod.period_enable == 1)
          this.editperiod.period_enable_sw = true
        else
          this.editperiod.period_enable_sw = false
        this.editperioddialog = true
      },
      async editperiodSubmit() {
        if(this.editperiod.period_enable_sw == true)
          this.editperiod.period_enable = '1'
        else
          this.editperiod.period_enable = '0'
        this.editperiod.ApiKey = this.ApiKey
        let result = await this.$http.post('period.update.php', this.editperiod)
          if (result.data.status == true) {
            this.period = result.data
            this.snackbar.icon = 'mdi-font-awesome'
            this.snackbar.color = 'success'
            this.snackbar.text = 'แก้ไขข้อมูลเรียบร้อย'
            this.snackbar.show = true
            this.periodQueryAll()
          } else {
            this.snackbar.icon = 'mdi-close-network'
            this.snackbar.color = 'red'
            this.snackbar.text = 'แก้ไขข้อมูลผิดพลาด'
            this.snackbar.show = true
          }
          this.editperioddialog = false        
      },
      async periodDelete(id_pr) {
        let result = await this.$http.post('period.php', {
          ApiKey: this.ApiKey,
          id_pr: id_pr
        })
        this.editperiod = result.data
        this.deleteperioddialog = true
      },
      async deleteperiodSubmit() {
        if (this.$refs.deleteperiodform.validate()) {
          this.editperiod.ApiKey = this.ApiKey;          
          let result = await this.$http.post('period.delete.php', this.editperiod)
          
          if (result.data.status == true) {
            this.period = result.data
            this.snackbar.icon = 'mdi-font-awesome'
            this.snackbar.color = 'success'
            this.snackbar.text = 'ลบข้อมูลเรียบร้อย'
            this.snackbar.show = true
            this.periodQueryAll()
          } else {
            this.snackbar.icon = 'mdi-close-network'
            this.snackbar.color = 'red'
            this.snackbar.text = 'ลบข้อมูลผิดพลาด'
            this.snackbar.show = true
          }
          this.deleteperioddialog = false
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
