<template>
  <div>
      
    <v-container>
    <base-material-card
        icon="mdi-clipboard-text"
        title="ข้อมูลการย้าย สายการสอนและสายสนับสนุน"
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
            <v-col cols="12" md="2">
                <v-select v-model="times_select" :items="time_ss" item-value="time_ss" :value="1" label="ครั้งที่ :">                    
                </v-select>
                </v-col>      
                   <v-col cols="12" md="2">
                <v-select v-model="years_select" :items="year_ss" item-value="year_ss" :value="2565" label="ปีที่ :">                    
                </v-select>
                </v-col>      
                  <v-col cols="12" md="2">
                      <v-btn large block @click="searchTimeYear()"> ค้นหา</v-btn>               
                </v-col>           
          </v-row>
        </v-card>
        <v-data-table
          color="success"
          :loading="loading"
          :headers="headers"
          :items="transference_personnels"
          :search="search"
       > 
          
        <!--  <template v-slot:[`item.actions`]="{ item }">
            <v-icon
              color="yellow"
              
              @click.stop="transference_personnelEdit(item.id_rc)"
            >
              mdi-pencil
            </v-icon>          
          </template>      -->       
          <v-alert
            slot="no-results"
            :value="true"
            color="error"
            icon="mdi-alert"
          >ไม่พบผลลัพธ์ "{{ search }}" ที่คุณกำลังค้นหา.</v-alert>
        </v-data-table>
      </base-material-card>

   

      <!-- V-model edittransference_personneldialog -->
      <v-layout row justify-center>
         <v-dialog v-model="edittransference_personneldialog" persistent max-width="80%">
        <v-card class="mx-auto pa-6" >
           <base-material-card
              color="yellow"
              icon="mdi-clipboard-text"
              title="แก้ไขข้อมูลผู้ใช้งานระบบ"
              class="px-5 py-3 text_google"
              
            ></base-material-card>
          <v-card-text>
            <v-form ref="edittransference_personnelform" lazy-validation>
              <v-container grid-list-md>
                <v-layout wrap> 
                    <v-flex md6>
                   {{ edittransference_personnel.id_card }}
                  </v-flex>                                
                  <v-flex md6>
                    <v-text-field label="Password" v-model="edittransference_personnel.p_word" type="password"></v-text-field>
                  </v-flex>
                  <v-flex md6>
                    <v-text-field label="Confirm Password" v-model="edittransference_personnel.transference_personnel_confirmpassword" type="password"></v-text-field>
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
            <v-btn large @click.stop="edittransference_personneldialog = false" rounded>
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn large color="warning" @click.stop="edittransference_personnelSubmit()" rounded>
                <v-icon dark>mdi-pencil</v-icon>&nbsp;บันทึก
              </v-btn>

          </v-card-actions>
        </v-card>
      </v-dialog>
      </v-layout>
    </v-container>

    
    <v-container fluid>      

 <v-snackbar v-model="snackbar.show" top  :timeout="snackbar.timeout" :color="snackbar.color">
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
      edittransference_personneldialog: false,
      times_select: '1',
    years_select: '2565',
      snackbar: {
        show: false,
        color: '',
        timeout: 5000,
        icon: '',
        text: ''
      },
      time_ss: [1,2],
      year_ss: [2565,2566,2567,2568,2569,2570],
      transference_personnels: [],    
      edittransference_personnel: {},
      search: '',
      pagination: {},      
      headers: [
        { text: "อ้างอิง", align: "center", value: "tid_ref" },                
        { text: "รหัสบัตรประชาชน", align: "center", value: "id_card" }, 
        { text: "ชื่อ", align: "center", value: "frist_name" },         
        { text: "นามสกุล", align: "center", value: "last_name" },         
        { text: "ครั้งที่", align: "center", value: "time_ss" },         
        { text: "ปีที่", align: "center", value: "year_ss" },         
        { text: "อายุงาน ณ ปัจจุบัน", align: "center", value: "age_app_time" },         
        { text: "วันที่ทำรายการ", align: "center", value: "date_time" },          
       /*  { text: "แก้ไข", align: "center", value: "actions", icon: "mdi-file-document-edit" },        */
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
  transference_personnelstatus:[],   
   userstatus:{},     
    };
  },
async mounted() {      
     await this.transference_personnelQueryAll()      
    },
    methods: {
      async searchTimeYear(){
             this.loading = true
              let userSession = JSON.parse(sessionStorage.getItem('user')) || 0 
        let result = await this.$http.post('transference_personnel.php', {
          ApiKey: this.ApiKey,
          time_s: this.times_select,
          year_s: this.years_select,
          user_name: userSession.user_name 

        }).finally(() => this.loading = false)
        this.transference_personnels = result.data      
        },

      async transference_personnelQueryAll() {
          this.loading = true
            let userSession = JSON.parse(sessionStorage.getItem('user')) || 0 
        let result = await this.$http.post('transference_personnel.php', {
          ApiKey: this.ApiKey,
          user_name: userSession.user_name 
        }).finally(() => this.loading = false)
        this.transference_personnels = result.data
        console.log(result.data)
        console.log(userSession)
      }, 
    },
    computed: {
      pages() {
        if (this.pagination.rowsPerPage == null ||
          this.pagination.totalItems == null
        ) return 0

        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      },     
    },

  

 

  
}
</script>
