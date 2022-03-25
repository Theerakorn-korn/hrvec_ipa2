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
    <v-container fluid>
      <base-material-card
        icon="mdi-clipboard-text"
        title="รายละเอียดผู้ยืนย้าย (ประมวลผลแบบที่ 1)"
      >
        <v-card class="pa-2">
          <v-row>
            <v-col cols="12" md="4" class="text-right">
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="ค้นหา ระบุคำ หรือ ส่วนข้อความเกี่ยวข้อง"
                filled
                class="mb-2"
              />
            </v-col>
            <v-col cols="12" md="2">
              <v-select
                filled
                v-model="times_select"
                :items="time_ss"
                item-value="time_ss"
                label="ครั้งที่ :"
              ></v-select>
            </v-col>
            <v-col cols="12" md="2">
              <v-select
                filled
                v-model="years_select"
                :items="year_ss"
                item-value="year_ss"
                label="ปีที่ :"
              ></v-select>
            </v-col>
            <v-col cols="12" md="2">
              <v-btn
                rounded
                large
                block
                color="success"
                @click="searchTimeYear()"
                >ค้นหา</v-btn
              >
            </v-col>
            <v-col cols="12" md="2">
              <v-btn
                rounded
                large
                block
                color="warning"
                @click="search_not_confirm_submit()"
                >ไม่ได้บันทึกรายการ</v-btn
              >
            </v-col>
            <v-col cols="12" md="2">
              <v-btn
                rounded
                large
                block
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
                >พิมพ์รายงาน แบบที่ 1</v-btn
              >
            </v-col>
            <v-col cols="12" md="2">
              <v-btn
                rounded
                large
                block
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
                >พิมพ์รายงาน แบบที่ 2</v-btn
              >
            </v-col>
            <v-col cols="12" md="2">
              <v-btn
                rounded
                large
                block
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
                >พิมพ์รายงาน แบบที่ 3</v-btn
              >
            </v-col>
            <v-col cols="6" md="6">
              <v-select
                v-model="selectedHeaders"
                :items="headers"
                label="เลือกคอลัมน์ที่ต้องการแสดง"
                multiple
                outlined
                return-object
              >
                <template v-slot:selection="{ item, index }">
                  <v-chip v-if="index < 6">
                    <span>{{ item.text }}</span>
                  </v-chip>
                  <span v-if="index === 6" class="grey--text caption"
                    >(+{{ selectedHeaders.length - 6 }} คอลัมน์)</span
                  >
                </template>
              </v-select>
            </v-col>
          </v-row>
        </v-card>
        <v-data-table
          :loading="loading"
          :headers="showHeaders"
          :items="transference_locations"
          :search="search"
        >
       

                 <template v-slot:[`item.select_item`]="{ item }">
            <v-checkbox
                  v-model="search"
                  :value="item.new_college_code"
                ></v-checkbox>
          </template>
          <template v-slot:[`item.status_position`]="{ item }">
            <v-chip v-if="item.status_position == null" color="red" dark>
              <v-icon>mdi-close</v-icon>
            </v-chip>
            <v-chip v-else color="green" dark>
              <span style="font-size:16px;">{{ item.status_position }}</span>
            </v-chip>
          </template>
          <template v-slot:[`item.comment_dr`]="{ item }">
            <v-chip
              class="ma-1"
              v-if="item.comment_dr === 'approp'"
              color="green"
              dark
            >
              <h2>เห็นควร</h2>
            </v-chip>
            <v-chip
              class="ma-1"
              v-else-if="item.comment_dr === 'inapprop'"
              color="warning"
              dark
            >
              <h2>ไม่เห็นควร</h2>
            </v-chip>
            <v-chip v-else-if="item.comment_dr === 'suspend'" color="red" dark
              >ระงับย้าย</v-chip
            >
            <v-chip class="ma-1" v-else color="info" dark>
              <h2>ยังไม่ได้บันทึกข้อมูล</h2>
            </v-chip>

            <v-chip
              v-if="item.status_document === 'complete'"
              color="green"
              @click.stop="comment_idPosition(item.tid_ref)"
              dark
              >ถูกต้องสมบูรณ์</v-chip
            >
            <v-chip
              v-else-if="item.status_document === 'incomplete'"
              color="warning"
              dark
              @click.stop="comment_idPosition(item.tid_ref)"
              >ไม่สมบูรณ์</v-chip
            >
            <v-chip
              v-else-if="item.status_document === 'do_not'"
              color="red"
              dark
              @click.stop="comment_idPosition(item.tid_ref)"
              >ไม่จัดส่ง</v-chip
            >
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
 headers: [],
      selectedHeaders: [],
      headersMap: [
        /*  { text: "อ้างอิง", align: "center", value: "id_ref" }, */
        { text: "เลือก", align: "center", value: "select_item" },       
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
        { text: "อายุงาน", align: "center", value: "age_app_time" },
        
        { text: "รหัสสาขา", align: "center", value: "id_branch_tran" },
        { text: "สาขา", align: "center", value: "name_branch" },
        { text: "รหัสบัตร", align: "center", value: "id_cards" },
        { text: "ผู้ขอย้าย", align: "center", value: "frist_lastname" },
        {
          text: "ปัจจุบันดำรงตำแหน่ง",
          align: "center",
          value: "position_name"
        },
        { text: "เลขที่ตำแหน่ง", align: "center", value: "id_postion" },
        { text: "สังกัด", align: "center", value: "old_college" },
        { text: "เหตุผล", align: "center", value: "reason" },

        { text: "ความคิดเห็น ผอ.", align: "center", value: "comment_dr" },
        { text: "เนื่องจาก.", align: "center", value: "detail_comment" },
         { text: "แห่งใหม่ ส.", align: "center", value: "succ_college" },

        {
          text: "วิทยาลัยแห่งใหม่",
          align: "center",
          value: "college_name_suss"
        },
        { text: "เลขที่", align: "center", value: "id_position_new" }
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
  async created() {
    this.headers = Object.values(this.headersMap);
    this.selectedHeaders = this.headers;
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
    },
    showHeaders() {
      return this.headers.filter(s => this.selectedHeaders.includes(s));
    }
  }
};
</script>
