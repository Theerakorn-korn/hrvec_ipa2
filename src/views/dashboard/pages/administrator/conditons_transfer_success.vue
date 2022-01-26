<template>
  <div>
    <v-container>
      <base-material-card
        icon="mdi-clipboard-text"
        title="ข้อมูลสรุปผลการประมวลผลการย้าย"
        class="px-5 py-3"
      >
        <v-card class="mb-4 pa-2">
          <v-row>
            <v-col cols="12" md="4" class="text-right">
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
            <v-col cols="12" md="1">
              <v-select
                v-model="times_select"
                :items="time_ss"
                item-value="time_ss"                
                label="ครั้งที่ :"
              ></v-select>
            </v-col>
            <v-col cols="12" md="1">
              <v-select
                v-model="years_select"
                :items="year_ss"
                item-value="year_ss"                
                label="ปีที่ :"
              ></v-select>
            </v-col>
            <v-col cols="12" md="4">
              <v-select
                v-model="type_name_position"
                :items="name_position_s"
                item-value="value"               
                label="ประเภท :"
              ></v-select>
            </v-col>
            <v-col cols="12" md="2">
              <v-btn large block @click="searchTimeYear()">ค้นหา</v-btn>
            </v-col>
          </v-row>
        </v-card>
        <v-data-table
         
          color="success"
          :loading="loading"
          :headers="headers"
          :items="conditons_transfer_successs"
          :search="search"
          
        >      
         <template v-slot:[`item.name_s`]="{ item }">    
           
           {{ item.title_s + item.frist_name }}
    </template>

      <template v-slot:[`item.succ_college`]="{ item }">    
            <v-chip
        :color="getColor(item.succ_college)"
        dark
      >
       <span style="font-size:16px;"> {{ item.succ_college }}</span>
      </v-chip>   
    </template>
          <template v-slot:[`item.actions`]="{ item }">
              <v-icon
              v-if="item.succ_college >= 1"
              color="red"
              large
              @click.stop="deletePosition(item.id_ref)"
            >mdi-box-cutter-off</v-icon>
     <v-icon
          v-else
              color="yellow"
              large
              @click.stop="select_idPosition(item.tid_ref)"
            >mdi-credit-card-plus</v-icon>
          </template>
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
  data() {
    return {
      loading: true,
      ApiKey: "HRvec2021",
       branch_s:[],
       tid_ref:[],
      valid: true,
      canceldialog: false,
      positiondialog: false,
      clear_dataDialog: false,
      times_select: "",
      years_select: "",
      type_name_position: "",
      snackbar: {
        show: false,
        color: "",
        timeout: 5000,
        icon: "",
        text: "",
      },     
      time_ss: [1, 2],
      year_ss: [2565, 2566, 2567, 2568, 2569, 2570],
       name_position_s:[
          { text:"สายการสอนและสนับสนุนการสอน", value:"ครู"},
          { text:"สายงานบริหารสถานศึกษา", value:"บริหาร"},
          ],
      conditons_transfer_successs: [],
      editconditons_transfer_success: {},
      search: "",
      pagination: {},
       singleSelect: false,
        selected: [],
      headers: [        
        { text: "ครั้งที่", align: "left", value: "time_s" },
        { text: "ปีที่", align: "center", value: "year_s" },
        { text: "เลขที่ตำแหน่งเดิม", align: "left", value: "id_postion_old" },     
        { text: "สถานศึกษาเดิม", align: "left", value: "college_name_old" },
        { text: "สถานศึกษาแห่งใหม่", align: "left", value: "college_name_new" },
         { text: "เลขที่ตำแหน่งใหม่", align: "center", value: "id_position" },
        { text: "รหัสสาขา", align: "center", value: "id_branch" },
        { text: "สาขา", align: "center", value: "branch_name" },
        { text: "รหัสบัตรประชาชน", align: "center", value: "id_card" },       
        { text: "ชื่อ-นามสกุล", align: "center", value: "name_s" },       
        { text: "ชื่อตำแหน่ง", align: "center", value: "name_position" }, 
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
      conditons_transfer_successstatus: [],
      conditons_transfer_successs_id_ref: [],
      conditons_transfer_successs: [],
      updatepositions_condition:{},
      transference_locations: [],
      conditons_transfer_success_del: [],
      man_powers:[],
      userstatus: {},
      updatepositions:{},
      man_powerss:[],
      colleges: [],
      data_select:[],
      provinces: [],
      regions: [],
    };
  },
 async mounted() {
           
    this.conditons_transfer_successQueryAll();   
  },
  methods: {
    async searchTimeYear() {
      this.loading = true;
      let result = await this.$http
        .post("conditons_transfer_success.php", {
          ApiKey: this.ApiKey,
          time_s: this.times_select,
          year_s: this.years_select,
          name_position: this.type_name_position,
        })
        .finally(() => (this.loading = false));
      this.conditons_transfer_successs = result.data;
      console.log(this.ApiKey)
      console.log(this.times_select)
      console.log(this.years_select)
      console.log(this.type_name_position)
      console.log(this.conditons_transfer_successs)
    },   
        
    
    async conditons_transfer_successQueryAll() {
      this.loading = true;
      let result = await this.$http
        .post("conditons_transfer_success.php", {
          ApiKey: this.ApiKey,
        })
        .finally(() => (this.loading = false));
      this.conditons_transfer_successs = result.data;
    },

        async clear_data(){
        this.clear_dataDialog = true;
        },
            getColor (calories) {
            /*  if (calories > 400) return 'red'
                else if (calories > 200) return 'orange'
                else return 'green'  */   
                if (calories > 0) return 'green'       
                else return ''  
      },
  },
  computed: {
    pages() {
      if (
        this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      )
        return 0;

      return Math.ceil(
        this.pagination.totalItems / this.pagination.rowsPerPage
      );
    },
  },
};
</script>
