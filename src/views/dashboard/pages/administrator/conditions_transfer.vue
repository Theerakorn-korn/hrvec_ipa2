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
          :items="conditions_transfers"
          :search="search"
       > 
          
              
          <v-alert
            slot="no-results"
            :value="true"
            color="error"
            icon="mdi-alert"
          >ไม่พบผลลัพธ์ "{{ search }}" ที่คุณกำลังค้นหา.</v-alert>
        </v-data-table>
      </base-material-card>
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
      editconditions_transferdialog: false,
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
      conditions_transfers: [],    
      editconditions_transfer: {},
      search: '',
      pagination: {},      
      headers: [
        { text: "อ้างอิง", align: "center", value: "id_ref" },                
        { text: "สถานศึกษา", align: "center", value: "college_name" },
        { text: "รหัส", align: "center", value: "id_branch" },
        { text: "สาขาวิชา", align: "left", value: "name_branch" },
        { text: "วุฒิการศึกษา", align: "left", value: "educational_level" },
        { text: "ครั้งที่", align: "center", value: "time_s" },         
        { text: "ปีที่", align: "center", value: "year_s" },  
        { text: "วันที่ทำรายการ", align: "center", value: "date_time" },          
        { text: "ผลการพิจารณา", align: "center", value: "actions", icon: "mdi-file-document-edit" },       
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
  conditions_transferstatus:[],   
   userstatus:{},     
    };
  },
async mounted() {      
     await this.conditions_transferQueryAll()      
    },
    methods: {
      async searchTimeYear(){
             this.loading = true
        let result = await this.$http.post('conditions_transfer.php', {
          ApiKey: this.ApiKey,
          time_s: this.times_select,
          year_s: this.years_select
        }).finally(() => this.loading = false)
        this.conditions_transfers = result.data
      
        },

      async conditions_transferQueryAll() {
          this.loading = true
        let result = await this.$http.post('conditions_transfer.php', {
          ApiKey: this.ApiKey,        
        }).finally(() => this.loading = false)
        this.conditions_transfers = result.data      
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
