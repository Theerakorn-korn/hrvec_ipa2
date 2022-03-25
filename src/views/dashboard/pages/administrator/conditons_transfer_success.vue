<template>
  <div>
    <v-bottom-navigation    
      color="info"
      horizontal    
      :background-color="color"
      dark
    >
      <v-btn to="/admin/conditions_branch">
        <span>รายละเอียดเงือนไขสาขาวิชา </span>
        <v-icon>mdi-source-branch</v-icon>
      </v-btn>

      <v-btn to="/admin/conditions_transfer">
        <span>รายการเงือนไขสาขาวิชา</span>
        <v-icon>mdi-source-branch</v-icon>
      </v-btn>
    </v-bottom-navigation>
    <v-bottom-navigation     
      color="info"
      horizontal    
      :background-color="color"
      dark
    >
      <v-btn to="/admin/transference_location_detail">
        <span>รายละเอียดผู้ยืนย้าย ประกอบพิจารณา </span>
        <v-icon>mdi-details</v-icon>
      </v-btn>
      <v-btn to="/admin/transference_location">
        <span>รายละเอียดผู้ยืนย้าย </span>
        <v-icon>mdi-details</v-icon>
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
      <v-btn to="/admin/Order_appoint">
        <span>รายงาน</span>
        <v-icon>mdi-printer</v-icon>
      </v-btn>
    </v-bottom-navigation>
    <v-container fluid>
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
          <template v-slot:[`item.college_name_old`]="{ item }">
            <v-chip color="grey" dark>
              <span style="font-size:16px;"> {{ item.college_name_old }}</span>
            </v-chip>
          </template>

          <template v-slot:[`item.college_name_new`]="{ item }">
            <v-chip color="green" dark>
              <span style="font-size:16px;"> {{ item.college_name_new }}</span>
            </v-chip>
          </template>

          <template v-slot:[`item.service_status`]="{ item }">
            <v-chip v-if="item.service_status === 'service'" color="yellow">
              <span style="font-size:16px;"> <v-icon>mdi-check</v-icon></span>
            </v-chip>
          </template>

          <template v-slot:[`item.demand_college`]="{ item }">
            <v-chip v-if="item.status_select === 'demand'" color="yellow">
              <span style="font-size:16px;"> <v-icon>mdi-check</v-icon></span>
            </v-chip>
          </template>

          <template v-slot:[`item.status_select`]="{ item }">
            <v-chip color="green" dark>
              <span
                style="font-size:16px;"
                v-if="item.status_select === 'demand'"
              >
                ว.ประสงค์รับ</span
              >
              <span
                style="font-size:16px;"
                v-if="item.status_select === 'agree'"
              >
                ปกติ</span
              >
              <span
                style="font-size:16px;"
                v-if="item.status_select === 'sw_normal'"
              >
                สับเปลี่ยน</span
              >
              <span
                style="font-size:16px;"
                v-if="item.status_select === 'sw_agree'"
              >
                (แลกเปลี่ยน)</span
              >
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
      i:0,
      value: 6,
      loading: true,
      ApiKey: "HRvec2021",
      branch_s: [],
      tid_ref: [],
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
        text: ""
      },
      time_ss: [1, 2],
      year_ss: [2565, 2566, 2567, 2568, 2569, 2570],
      name_position_s: [
        { text: "สายการสอนและสนับสนุนการสอน", value: "ครู" },
        { text: "สายงานบริหารสถานศึกษา", value: "บริหาร" }
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
        { text: "สังกัด", align: "left", value: "college_name_new" },
        { text: "เลขที่", align: "center", value: "id_position" },
        { text: "ตำแหน่ง", align: "center", value: "name_position" },
        { text: "รหัสสาขา", align: "center", value: "id_branch" },
        { text: "เงื่อนไข", align: "center", value: "branch_name" },
        { text: "รหัสบัตรประชาชน", align: "center", value: "id_card" },
        { text: "คำนำหน้าชื่อ", align: "center", value: "title_s" },
        { text: "ชื่อ", align: "center", value: "frist_name" },
        { text: "นามสกุล", align: "center", value: "last_name" },
         { text: "ตำแหน่ง", align: "center", value: "name_position" },
        { text: "เลขที่", align: "left", value: "id_postion_old" },
        { text: "สังกัดเดิม", align: "left", value: "college_name_old" },
        {
          text: "จำนวนผู้ขอย้ายรวม",
          align: "left",
          value: "personnel_num_all"
        },
        { text: "วุฒิตรง(อันดับ)", align: "left", value: "personnel_num_ed" },
        {
          text: "จำนวนผู้ขอย้ายในสาขาเดียวกัน",
          align: "left",
          value: "personnel_num_branch"
        },
        { text: "ลำดับที่ขอย้าย", align: "left", value: "sequence_n" },
        {
          text: "อายุราชการในสถานศึกษาปัจจุบัน",
          align: "left",
          value: "age_app_cal"
        },
        { text: "อายุราชการตั้งแต่บรรจุ", align: "left", value: "age_app" },
        { text: "ช่วยปฏิบัติราชการ", align: "left", value: "service_status" },
        {
          text: "วิทยาลัยประสงค์รับย้าย",
          align: "left",
          value: "demand_college"
        },
        { text: "สถานะ", align: "left", value: "status_select" }
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
      conditons_transfer_successs: [],
      updatepositions_condition: {},
      transference_locations: []
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
          name_position: this.type_name_position
        })
        .finally(() => (this.loading = false));
      this.conditons_transfer_successs = result.data;     
      console.log(result.data)
      console.log(this.times_select)
      console.log(this.years_select)
      console.log(this.type_name_position)
    },

    async conditons_transfer_successQueryAll() {
      this.loading = true;
      let result = await this.$http
        .post("conditons_transfer_success.php", {
          ApiKey: this.ApiKey
        })
        .finally(() => (this.loading = false));
      this.conditons_transfer_successs = result.data;
    },

    async clear_data() {
      this.clear_dataDialog = true;
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
    color() {
      return "green darken-4";
    },
    date_today_cal() {
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, "0");
      let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      let yyyy = today.getFullYear();

      today = yyyy + "-" + mm + "-" + dd;
      return today;
    }
  }
};
</script>
