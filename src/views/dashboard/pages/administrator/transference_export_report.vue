<template>
  <div>
    <v-bottom-navigation color="info" horizontal :background-color="color" dark>
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
      :value="value"
      color="info"
      horizontal
      v-model="value"
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
    </v-bottom-navigation>
    <v-bottom-navigation color="info" horizontal :background-color="color" dark>
      <v-btn to="/admin/conditions_branch">
        <span>ศูนย์กลางส่งออกเอกสาร ประกอบการพิจารณาย้าย </span>
        <v-icon>mdi-printer</v-icon>
      </v-btn>
    </v-bottom-navigation>
    <v-container fluid>
      <base-material-card
        icon="mdi-clipboard-text"
        title="ศูนย์กลางส่งออกเอกสาร ประกอบการพิจารณาย้าย"
      >
        <v-row>
          <v-col cols="12" md="12">
            <v-row class="mb-6" justify="center" no-gutters>
              <v-col md="6">
                <v-card class="pa-2" outlined elevation="2">
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-select
                        filled
                        v-model="times_select"
                        :items="time_ss"
                        item-value="time_ss"
                        label="ครั้งที่ :"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-select
                        filled
                        v-model="years_select"
                        :items="year_ss"
                        item-value="year_ss"
                        label="ปีที่ :"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="12" md="12">
            <v-card class="pa-2">
              <v-row>
                <v-col cols="12" md="4" class="text-left">
                  <v-btn
                  left                  
                    block
                    large
                    outlined
                    color="info"
                    :href="
                      '#/admin/print_report_movement_online/' +
                        times_select +
                        '/' +
                        years_select +
                        '/' +
                        'teach'
                    "
                    target="_blank"
                  >
                    <v-icon class="pa-1">mdi-printer</v-icon> พิมพ์รายงาน แบบที่
                    1 สถานศึกษารับย้ายและผู้ขอย้าย</v-btn
                  >
                </v-col>
                <v-col cols="12" md="4">
                  <v-btn
                    block
                    large
                    outlined
                    color="info"
                    :href="
                      '#/admin/print_report_movement_online_2/' +
                        times_select +
                        '/' +
                        years_select +
                        '/' +
                        'teach'
                    "
                    target="_blank"
                    ><v-icon class="pa-1">mdi-printer</v-icon> พิมพ์รายงาน
                    แบบที่ 2 ผู้ขอย้ายและสถานศึกษา</v-btn
                  >
                </v-col>
                <v-col cols="12" md="4">
                  <v-btn
                    block
                    large
                    outlined
                    color="info"
                    :href="
                      '#/admin/print_report_movement_online_3/' +
                        times_select +
                        '/' +
                        years_select +
                        '/' +
                        'teach'
                    "
                    target="_blank"
                    ><v-icon class="pa-1">mdi-printer</v-icon>พิมพ์รายงาน แบบที่
                    3 สถานศึกษารับย้ายและผู้ขอย้ายพร้อมเหตุผล</v-btn
                  >
                </v-col>
                <v-col cols="12" md="4">
                  <v-btn
                    block
                    large
                    outlined
                    color="warning"
                    :href="
                      '#/admin/print_report_personnel_can/'                
                    "
                    target="_blank"
                    ><v-icon class="pa-1">mdi-printer</v-icon>พิมพ์รายงาน
                    ผู้ขอย้ายไม่ได้บันทึกรายการ</v-btn
                  >
                </v-col>
                 <v-col cols="12" md="4">
                  <v-btn
                    block
                    large
                    outlined
                    color="warning"
                    :href="
                      '#/admin/print_report_movement_online_4/' +
                       '1' +
                        '/' +
                        times_select +
                        '/' +
                        years_select +
                        '/' +
                        'teach'
                    "
                    target="_blank"
                    ><v-icon class="pa-1">mdi-printer</v-icon>พิมพ์รายงาน
                    ผู้ขอย้ายตกค้างพิจารณา</v-btn
                  >
                </v-col>
                <v-col cols="12" md="4">
                  <v-btn
                    block
                    large
                    outlined
                    color="green"
                    :href="
                      '#/admin/print_report_manpower/'                     
                    "
                    target="_blank"
                    ><v-icon class="pa-1">mdi-printer</v-icon>พิมพ์รายงาน
                    ตำแหน่งว่าง</v-btn
                  >
                </v-col>
                 <v-col cols="12" md="4">
                  <v-btn
                    block
                    large
                    outlined
                    color="red"
                    :href="
                      '#/admin/print_report_college_condition/' +
                        times_select +
                        '/' +
                        years_select                    
                    "
                    target="_blank"
                    ><v-icon class="pa-1">mdi-printer</v-icon>พิมพ์รายงาน
                    สถานศึกษาไม่ดำเนินการรายงานเงือนไขสาขาวิชา</v-btn
                  >
                </v-col>
                <v-col cols="12" md="4">
                  <v-btn
                    block
                    large
                    outlined
                    color="green"
                    :href="
                      '#/admin/print_report_movement_filter_salary/' +
                        times_select +
                        '/' +
                        years_select                    
                    "
                    target="_blank"
                    ><v-icon class="pa-1">mdi-printer</v-icon>พิมพ์รายงาน
                    ข้อมูลผู้เสนอย้าย ตารางเงินเดือน</v-btn
                  >
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
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
      loading: true,
      ApiKey: "HRvec2021",

      valid: true,
      times_select: "",
      years_select: "",
      name_position_s: [
        { text: "สายการสอนและสนับสนุนการสอน", value: "ครู" },
        { text: "สายงานบริหารสถานศึกษา", value: "บริหาร" }
      ],
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

      search: "",

      pagination: {},
      singleSelect: false,
      selected: [],
      headers: [
        /*  { text: "อ้างอิง", align: "center", value: "id_ref" }, */
        { text: "เลือก", align: "center", value: "select_item" },
        { text: "#", align: "center", value: "index" },
        { text: "รหัสสถานศึกษา", align: "center", value: "new_college_code" },
        { text: "สถานศึกษาที่ขอย้ายไป", align: "center", value: "new_college" },
        { text: "ตำแหน่งว่าง", align: "center", value: "count_manpower" },
        { text: "สาขาที่เปิดรับ", align: "center", value: "name_branch_all" },
        {
          text: "เลขที่ตำแหน่งว่าง",
          align: "center",
          value: "id_position_all"
        },
        { text: "On/Off.", align: "center", value: "status_position" },
        { text: "ลำดับที่ขอย้าย", align: "center", value: "sequence_n" },
        { text: "รหัสสาขา", align: "center", value: "id_branch_tran" },
        { text: "สาขา", align: "center", value: "name_branch" },
        { text: "ข้าพเจ้า", align: "center", value: "frist_lastname" },
        {
          text: "ปัจจุบันดำรงตำแหน่ง",
          align: "center",
          value: "position_name"
        },
        { text: "เลขที่ตำแหน่ง", align: "center", value: "id_postion" },
        { text: "สังกัด", align: "center", value: "old_college" },
        { text: "เหตุผล", align: "center", value: "reason" },

        { text: "ความคิดเห็น ผอ.", align: "center", value: "comment_dr" },
        { text: "เนื่องจาก.", align: "center", value: "detail_comment" }
      ],

      rowsperpage: [
        25,
        50,
        100,
        {
          text: "All",
          value: -1
        }
      ]
    };
  },
  async mounted() {
    this.transference_locationQueryAll();
  },
  methods: {
    async searchTimeYear() {
      this.loading = true;
      let result = await this.$http
        .post("transference_location_detail.php", {
          ApiKey: this.ApiKey,
          time_s: this.times_select,
          year_s: this.years_select
        })
        .finally(() => (this.loading = false));
      this.transference_locations = result.data;
    },

    async search_not_confirm_submit() {
      this.loading = true;
      let result = await this.$http
        .post("transference_location.php", {
          ApiKey: this.ApiKey,
          not_confirm: "ok"
        })
        .finally(() => (this.loading = false));
      this.transference_locations = result.data;
    },

    async transference_locationQueryAll() {
      this.loading = true;
      let result = await this.$http
        .post("transference_location_detail.php", {
          ApiKey: this.ApiKey
        })
        .finally(() => (this.loading = false));
      this.transference_locations = result.data;
    },

    getColor() {
      return "green";
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
      return "grey darken-1";
    },
    period_years() {
      let yyyy = parseInt(this.periods.period_year) + 543;
      return yyyy;
    }
  }
};
</script>
<style>
v-btn{
  text-align: left;
  padding-left: 0%;
}
</style>
