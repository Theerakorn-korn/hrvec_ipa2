<template>
  <div>
     <v-bottom-navigation 
     :value="value" color="info" horizontal
      v-model="value"
    :background-color="color"
    dark    
     >
        <v-btn to="/admin/transference_location">
        <span>รายละเอียดผู้ยืนย้าย </span>
        <v-icon>mdi-history</v-icon>        
      </v-btn>

      <v-btn to="/admin/transference_personnel">
        <span>ประมวลผล 1 </span>
        <v-icon>mdi-calculator</v-icon>
      </v-btn>

      <v-btn to="/admin/process_transfer">
        <span>ประมวลผล 2 [ระบบ]</span>
        <v-icon>mdi-calculator</v-icon>
      </v-btn>

       <v-btn to="/admin/process_transfer_switch_normal">
        <span>ประมวลผล 3 [สับเปลี่ยน ปกติ]</span>
        <v-icon>mdi-calculator</v-icon>
      </v-btn>

      <v-btn to="/admin/process_transfer_switch">
        <span>ประมวลผล 4 [สับเปลี่ยน]</span>
        <v-icon>mdi-calculator</v-icon>
      </v-btn>
       <v-btn to="/admin/conditons_transfer_success">
        <span>สรุปผล</span>
        <v-icon>mdi-bookmark-check</v-icon>
       </v-btn>
    </v-bottom-navigation>
    <v-container fluid>
      <base-material-card
        icon="mdi-clipboard-text"
        title="ข้อมูลการย้าย สายการสอนและสายสนับสนุน (ประมวลผลแบบที่ 1)"
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
              <v-select
                v-model="times_select"
                :items="time_ss"
                item-value="time_ss"
                :value="1"
                label="ครั้งที่ :"
              ></v-select>
            </v-col>
            <v-col cols="12" md="2">
              <v-select
                v-model="years_select"
                :items="year_ss"
                item-value="year_ss"
                :value="2565"
                label="ปีที่ :"
              ></v-select>
            </v-col>
            <v-col cols="12" md="2">
              <v-btn rounded large block color="success" @click="searchTimeYear()">ค้นหา</v-btn>
            </v-col>          
          </v-row>
        </v-card>
        <v-data-table
          color="success"
          :loading="loading"
          :headers="headers"
          :items="transference_locations"
          :search="search"
          item-key="tid_ref"
        >
          <template v-slot:footer>
            <!--  <v-btn @click="clear_data()">ยกเลิกรายการ</v-btn>      -->
          </template>

          <template v-slot:[`item.college_name`]="{ item }">
            <v-chip color="">
              <span style="font-size:16px;"> {{ item.college_name }}</span>
            </v-chip>
          </template>


          <template v-slot:[`item.title_s`]="{ item }">
            <v-chip color="">
              <span style="font-size:16px;">
                {{ item.title_s }}{{ item.frist_name }}
                {{ item.last_name }}</span
              >
            </v-chip>
          </template>

          <template v-slot:[`item.time_ss`]="{ item }">
            {{ item.time_s + "/" + item.year_s }}
          </template>

          <template v-slot:[`item.succ_college`]="{ item }">
            <v-chip :color="getColor(item.succ_college)" dark>
              <span style="font-size:16px;"> {{ item.succ_college }}</span>
            </v-chip>
          </template>

          <template v-slot:[`item.college_name_suss`]="{ item }">
            <v-chip v-if="item.college_name_suss === ''"> </v-chip>
            <v-chip
              v-else-if="item.college_name_suss !== ''"
              color="green"
              dark
            >
              <span style="font-size:16px;"> {{ item.college_name_suss }}</span>
            </v-chip>
          </template>


          <v-alert
            slot="no-results"
            :value="true"
            color="error"
            icon="mdi-alert"
            >ไม่พบผลลัพธ์ "{{ search }}" ที่คุณกำลังค้นหา.</v-alert
          >
        </v-data-table>
      </base-material-card>
    </v-container>

    <v-container fluid>
      <v-snackbar
        v-model="snackbar.show"
        top
        :timeout="snackbar.timeout"
        :color="snackbar.color"
      >
        <v-icon large>{{ snackbar.icon }}</v-icon>
        <v-card-text>{{ snackbar.text }}</v-card-text>
        <template v-slot:action="{ attrs }">
          <v-btn color="red" text v-bind="attrs" @click="snackbar.show = false"
            >Close</v-btn
          >
        </template>
      </v-snackbar>
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {   
     value: "1",     
      loading: true,
      ApiKey: "HRvec2021",
      branch_s: [],
      tid_ref: [],
      valid: true,
      canceldialog: false,
      positiondialog: false,
      clear_dataDialog: false,
      times_select: "1",
      years_select: "2565",
      snackbar: {
        show: false,
        color: "",
        timeout: 5000,
        icon: "",
        text: ""
      },
      time_ss: [1, 2],
      year_ss: [2565, 2566, 2567, 2568, 2569, 2570],
      transference_locations: [],
      edittransference_location: {},
      search: "",
      pagination: {},
      singleSelect: false,
      selected: [],
      headers: [
        /*  { text: "อ้างอิง", align: "center", value: "tid_ref" }, */
        { text: "รหัสบัตรประชาชน", align: "center", value: "id_card" },
        { text: "ชื่อ-นามสกุล", align: "center", value: "title_s" },      
        { text: "ส.ปัจจุบัน", align: "center", value: "college_code_now" },
        { text: "ส.ปัจจุบัน", align: "center", value: "college_name_now" },

        { text: "ส.แห่งใหม่", align: "center", value: "college_code_new" },
        { text: "ส.แห่งใหม่", align: "center", value: "college_name" },        
        { text: "ครั้งที่/ปี", align: "center", value: "time_ss" },
        { text: "อายุงาน", align: "center", value: "age_app_time" },
        { text: "วันที่", align: "center", value: "date_time" },

        { text: "แห่งใหม่ ส.", align: "center", value: "succ_college" },
        { text: "วิทยาลัยแห่งใหม่", align: "left", value: "college_name_suss" },
        { text: "เลขที่", align: "left", value: "id_position_new" },      
      ],
     
      rowsperpage: [
        25,
        50,
        100,
        {
          text: "All",
          value: -1
        }
      ],
      transference_locationstatus: [],
      transference_locations_id_ref: [],
      conditons_transfer_successs: [],
      updatepositions_condition: {},
      transference_locations: [],
      conditons_transfer_success_del: [],
      man_powers: [],
      userstatus: {},
      updatepositions: {},
      man_powerss: [],
      colleges: [],
      data_select: [],
      provinces: [],
      regions: []
    };
  },
  async mounted() {
    let result_branch;
    result_branch = await this.$http.post("branch.php", {
      ApiKey: this.ApiKey
    });
    this.branch_s = result_branch.data;

    let result;
    result = await this.$http.post("collegetype.php", {
      ApiKey: this.ApiKey
    });
    this.collegetypes = result.data;
    result = await this.$http.post("college.php", {
      ApiKey: this.ApiKey
    });

    this.colleges = result.data;
    result = await this.$http.post("province.php", {
      ApiKey: this.ApiKey
    });
    this.provinces = result.data;

    result = await this.$http.post("region.php", {
      ApiKey: this.ApiKey
    });
    this.regions = result.data;

    this.transference_locationQueryAll();
  },
  methods: {
    async searchTimeYear() {
      this.loading = true;
      let result = await this.$http
        .post("transference_location.php", {
          ApiKey: this.ApiKey,
          time_s: this.times_select,
          year_s: this.years_select
        })
        .finally(() => (this.loading = false));
      this.transference_locations = result.data;
    },

    

    async transference_locationQueryAll() {
      this.loading = true;
      let result = await this.$http
        .post("transference_location.php", {
          ApiKey: this.ApiKey
        })
        .finally(() => (this.loading = false));
      this.transference_locations = result.data;
    },

   

    getColor(calories) {
      /*  if (calories > 400) return 'red'
        else if (calories > 200) return 'orange'
        else return 'green'  */

      if (calories > 0) return "green";
      else return "";
    }
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
     color () {
       return 'cyan darken-3'      
      },
  }
};
</script>
