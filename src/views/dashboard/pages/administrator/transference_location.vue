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
    </v-bottom-navigation>
    <v-container fluid>
      <base-material-card
        icon="mdi-clipboard-text"
        title="รายละเอียดผู้ยืนย้าย (ประมวลผลแบบที่ 1)"
      >
        <v-card class="mb-4 pa-2">
          <v-row>
            <v-col cols="12" md="2" class="text-right">
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
              <v-text-field
                v-model="search_college"
                append-icon="mdi-magnify"
                label="ค้นหา"
                single-line
                hide-details
                dense
                filled
                class="mb-2"
                readonly
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
                color="info"
                @click="search_college_submit()"
                >ค้นหาระบุปลายทาง</v-btn
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
          </v-row>
        </v-card>
        <v-data-table
          :loading="loading"
          :headers="headers"
          :items="transference_locations"
          :search="search"
        >
          <template v-slot:[`item`]="{ item, index }">
            <tr>
              <td class="text-center">
                <v-checkbox
                  v-model="search_college"
                  :value="item.college_code_new"
                ></v-checkbox>
              </td>
              <td class="text-center">{{ index + 1 }}</td>
              <td class="text-center">{{ item.id_card }}</td>
              <td class="text-center">{{ item.title_s }}</td>
              <td class="text-center">{{ item.frist_name }}</td>
              <td class="text-center">{{ item.last_name }}</td>
              <td class="text-center">{{ item.college_code_now }}</td>
              <td class="text-center">{{ item.college_name_now }}</td>
              <td class="text-center">{{ item.college_code_new }}</td>
              <td class="text-center">
                <v-chip
                  v-if="item.status_position == null"
                  color="red"
                  dark
                >
                <v-icon>mdi-close</v-icon>
                </v-chip>
                <v-chip v-else color="green" dark>
                  <span style="font-size:16px;">{{
                    item.status_position
                  }}</span>
                </v-chip>
              </td>
              <td class="text-center">
                <v-chip color="">
                  <span style="font-size:16px;"> {{ item.college_name }}</span>
                </v-chip>
              </td>
              <td class="text-center">
                {{ item.time_ss + "/" + item.year_ss }}
              </td>
              <td class="text-center">{{ item.age_app_time }}</td>
              <td class="text-center">{{ item.date_time }}</td>
              <td class="text-center">
                <v-chip
                  v-if="item.status_select === 'agree'"
                  color="warning"
                  dark
                >
                  <span style="font-size:16px;">ปกติ (2)</span>
                </v-chip>
                <v-chip
                  v-else-if="item.status_select === 'sw_normal'"
                  color="warning"
                  dark
                >
                  <span style="font-size:16px;">สับเปลี่ยน (3)</span>
                </v-chip>
                <v-chip
                  v-else-if="item.status_select === 'sw_agree'"
                  color="warning"
                  dark
                >
                  <span style="font-size:16px;">แลกเปลี่ยน (4)</span>
                </v-chip>
                <v-icon
                  v-else-if="item.succ_college >= 1"
                  color="red"
                  large
                  @click.stop="deletePosition(item.tid_ref)"
                  >mdi-delete-circle</v-icon
                >
                <v-icon
                  v-else
                  color="yellow"
                  large
                  @click.stop="select_idPosition(item.tid_ref, item.id_tfl)"
                  >mdi-credit-card-plus</v-icon
                >
              </td>
              <td class="text-center">
                <v-chip :color="getColor(item.succ_college)" dark>
                  <span style="font-size:16px;"> {{ item.succ_college }}</span>
                </v-chip>
              </td>
              <td class="text-center">
                <v-chip :color="getColor(item.succ_college)" dark>
                  <span style="font-size:16px;">
                    <v-chip v-if="item.college_name_suss === ''"> </v-chip>
                    <v-chip
                      v-else-if="item.college_name_suss !== ''"
                      color="green"
                      dark
                    >
                      <span style="font-size:16px;">
                        {{ item.college_name_suss }}</span
                      >
                    </v-chip>
                  </span>
                </v-chip>
              </td>
              <td class="text-center">{{ item.id_position_new }}</td>
            </tr>
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

      <!-- V-model positiondialog -->
      <v-layout row justify-center>
        <v-dialog v-model="positiondialog" persistent max-width="80%">
          <v-card class="mx-auto pa-6">
            <base-material-card
              color="yellow"
              icon="mdi-clipboard-text"
              title="เลือกตำแหน่ง"
              class="px-5 py-3 text_google"
            ></base-material-card>
            <v-card-text>
              <v-form ref="updatepositionform" lazy-validation>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <h3>
                        รหัสอ้างอิง :
                        {{ transference_personnels_id_ref.tid_ref }}
                      </h3>
                      รหัสบัตรประชาชน :
                      {{ transference_personnels_id_ref.id_card }}
                      <h3>
                        ชื่อ-นามสกุล :
                        {{ transference_personnels_id_ref.title_s
                        }}{{ transference_personnels_id_ref.frist_name }}
                        {{ transference_personnels_id_ref.last_name }}
                        สถานศึกษาปัจจุบัน :
                        {{ transference_personnels_id_ref.college_code }}
                        {{ transference_personnels_id_ref.college_name }}
                        เลขที่ตำแหน่งปัจจุบัน :
                        {{ transference_personnels_id_ref.id_position }}
                      </h3>
                      <h4>
                        ย้ายครั้งที่ : {{ periods.period_times }} ปี :
                        {{
                          periods.period_year
                            | moment("add", "543 years")
                            | moment("YYYY")
                        }}
                      </h4>
                      <h4>
                        รอบการย้าย :
                        {{
                          periods.period_start
                            | moment("add", "543 years")
                            | moment("D MMMM YYYY")
                        }}
                        -
                        {{
                          periods.period_stop
                            | moment("add", "543 years")
                            | moment("D MMMM YYYY")
                        }}
                      </h4>
                      <h4>
                        คำนวณอายุงาน ณ สถานศึกษาปัจจุบัน โดยใช้วันที่ :
                        {{
                          periods.period_cal_end
                            | moment("add", "543 years")
                            | moment("D MMMM YYYY")
                        }}
                      </h4>
                    </v-col>
                    <v-col cols="12" md="12">
                      <v-card elevation="2" class="pa-2">
                        <h2>
                          เหตุผลในการย้าย :
                        </h2>

                        <div
                          v-if="transference_personnels_id_ref.reason_1 === '1'"
                        >
                          <v-alert
                            border="left"
                            colored-border
                            type="info"
                            elevation="2"
                          >
                            <h3>ย้ายเพื่ออยู่ร่วมคู่สมรส</h3>
                            <h4>
                              คู่สมรสชื่อ :
                              {{
                                transference_personnels_id_ref.reason_1_spouse ||
                                  "-"
                              }}
                              คู่สมรสประกอบอาชีพ :
                              {{
                                transference_personnels_id_ref.reason_1_occupation ||
                                  "-"
                              }}
                              สถานที่ประกอบอาชีพของคู่สมรส :
                              {{
                                transference_personnels_id_ref.reason_1_location ||
                                  "-"
                              }}
                              ภูมิลำเนาของคู่สมรส จังหวัด
                              {{ transference_personnels_id_ref.r1_province }}
                            </h4>
                          </v-alert>
                        </div>

                        <div
                          v-if="transference_personnels_id_ref.reason_2 === '1'"
                        >
                          <v-alert
                            border="left"
                            colored-border
                            type="info"
                            elevation="2"
                          >
                            <h3>ย้ายเพื่ออยู่ดูแลบิดา มารดา</h3>
                            <h4>
                              อายุของบิดา :
                              {{
                                transference_personnels_id_ref.reason_2_fyear ||
                                  "-"
                              }}
                              ปี อายุของมารดา :
                              {{
                                transference_personnels_id_ref.reason_2_myear ||
                                  "-"
                              }}
                              ปี ภูมิลำเนาของบิดา มารดา จังหวัด :
                              {{ transference_personnels_id_ref.r2_province }}
                            </h4>
                          </v-alert>
                        </div>
                        <div
                          v-if="transference_personnels_id_ref.reason_3 === '1'"
                        >
                          <v-alert
                            border="left"
                            colored-border
                            type="info"
                            elevation="2"
                          >
                            <h3>ย้ายกลับภูมิลำเนา</h3>

                            <h4>
                              จังหวัด :
                              {{ transference_personnels_id_ref.r3_province }}
                            </h4>
                          </v-alert>
                        </div>
                        <div
                          v-if="transference_personnels_id_ref.reason_4 === '1'"
                        >
                          <v-alert
                            border="left"
                            colored-border
                            type="info"
                            elevation="2"
                          >
                            <h3>
                              เหตุผลอื่น ๆ :
                            </h3>
                            <h4>
                              {{
                                transference_personnels_id_ref.reason_4_detail
                              }}
                            </h4>
                          </v-alert>
                        </div>
                      </v-card>
                    </v-col>
                  </v-row>
                  <v-col cols="12" md="12">
                    <v-card elevation="2" class="pa-2">
                      <v-flex md12>
                        <div class="text-center">
                          <h2>
                            {{ transference_location_s.id_branch_s }}
                            สาขาวิชาเอก :
                            {{ transference_location_s.name_branch }}
                          </h2>

                          <h2>
                            {{ transference_location_s.college_code_new }}
                            {{ transference_location_s.college_name }}
                          </h2>
                        </div>
                      </v-flex>
                    </v-card>
                  </v-col>
                  <v-col cols="12" md="12">
                    <v-card elevation="2" class="pa-2">
                      <v-flex md12>
                        <v-autocomplete
                          prepend-icon="mdi-account-details"
                          :items="man_powers"
                          item-text="college_position_case"
                          item-value="id_position"
                          label="เลขที่ตำแหน่ง"
                          v-model="updatepositions.id_position"
                          outlined
                          required
                          :rules="[v => !!v || '']"
                        ></v-autocomplete>
                      </v-flex>
                    </v-card>
                  </v-col>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn large @click.stop="positiondialog = false" rounded>
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn
                large
                color="green"
                @click.stop="updatepositionSubmit()"
                rounded
              >
                <v-icon dark>mdi-content-save</v-icon>&nbsp;บันทึก
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model canceldialog -->
      <v-layout row justify-center>
        <v-dialog v-model="canceldialog" persistent max-width="80%">
          <v-card class="mx-auto pa-6">
            <base-material-card
              color="yellow"
              icon="mdi-clipboard-text"
              title="ยกเลิกรายการ"
              class="px-5 py-3 text_google"
            >
              <div class="text-right"></div>
            </base-material-card>
            <v-card-text>
              <v-form ref="cancelform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md6>
                      <h3>
                        รหัสอ้างอิง :
                        {{ transference_personnels_id_ref.id_ref }}
                      </h3>

                      <div class="text--center">
                        รหัสบัตรประชาชน :
                        {{ transference_personnels_id_ref.id_card }}
                        <h3>
                          ชื่อ-นามสกุล :
                          {{ transference_personnels_id_ref.title_s
                          }}{{ transference_personnels_id_ref.frist_name }}
                          {{ transference_personnels_id_ref.last_name }}
                        </h3>

                        สถานศึกษาปัจจุบัน :
                        {{ transference_personnels_id_ref.college_name }}
                        เลขที่ตำแหน่งปัจจุบัน :
                        {{ transference_personnels_id_ref.id_position }}
                      </div>
                    </v-flex>
                    <v-flex md6>
                      <h3>
                        รหัสวิทยาลัยปลายทาง :
                        {{ man_powerss.college_code || "สับเปลี่ยนตำแหน่ง" }}
                      </h3>
                      <div>
                        วิทยาลัย :
                        {{ man_powerss.college_name || "สับเปลี่ยนตำแหน่ง" }}
                      </div>
                      เลขที่ตำแหน่ง :
                      {{ man_powerss.id_position || "สับเปลี่ยนตำแหน่ง" }}
                    </v-flex>
                    <v-flex xs12>
                      <v-divider></v-divider>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn large @click.stop="canceldialog = false" rounded>
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn large color="warning" @click.stop="cancelSubmit()" rounded>
                <v-icon dark>mdi-pencil</v-icon>&nbsp;ยืนยัน
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
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
      id_ref: [],
      valid: true,
      canceldialog: false,
      positiondialog: false,
      clear_dataDialog: false,
      times_select: "",
      years_select: "",
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
      search_college: "",
      pagination: {},
      singleSelect: false,
      selected: [],
      headers: [
        /*  { text: "อ้างอิง", align: "center", value: "id_ref" }, */
        { text: "เลือก", align: "left", value: "select_item" },
        { text: "#", align: "center", value: "index" },
        { text: "รหัสบัตรประชาชน", align: "center", value: "id_card" },
        { text: "คำนำหน้า", align: "center", value: "title_s" },
        { text: "ชื่อ", align: "center", value: "frist_name" },
        { text: "นามสกุล", align: "center", value: "last_name" },
        { text: "ส.ปัจจุบัน", align: "center", value: "college_code_now" },
        { text: "ส.ปัจจุบัน", align: "center", value: "college_name_now" },
        { text: "ส.แห่งใหม่", align: "center", value: "college_code_new" },
        { text: "On/Off.", align: "center", value: "status_position" },

        { text: "ส.แห่งใหม่", align: "center", value: "college_name" },
        { text: "ครั้งที่/ปี", align: "center", value: "time_ys" },
        { text: "อายุงาน", align: "center", value: "age_app_time" },
        { text: "วันที่", align: "center", value: "date_time" },
        { text: "ย้ายแบบที่ 1", align: "center", value: "actions" },
        { text: "แห่งใหม่ ส.", align: "center", value: "succ_college" },

        {
          text: "วิทยาลัยแห่งใหม่",
          align: "center",
          value: "college_name_suss"
        },
        { text: "เลขที่", align: "center", value: "id_position_new" }
      ],
      header_trans: [
        { text: "ลำดับ", align: "center", value: "sequence_n" },
        { text: "รหัสอ้างอิง", align: "center", value: "id_ref" },
        { text: "สาขาวิชา", align: "center", value: "name_branch" },
        { text: "วิทยาลัย", align: "center", value: "college_name" }
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
      conditons_transfer_success_del: [],
      man_powers: [],
      userstatus: {},
      updatepositions: {},
      man_powerss: [],
      colleges: [],
      data_select: [],
      provinces: [],
      regions: [],
      transference_personnels_id_ref: [],
      period_times: [],
      periods: [],
      transference_location_s: [],
      periods: [],
      period_enable_process: "1",
      addreturn_man_power: {},
      position: "ครู",
      man_power_cancel: {}
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
    this.periodQuery();
    this.man_powerQuery();
  },
  methods: {
    async periodQuery() {
      let result_period;
      result_period = await this.$http.post("period.php", {
        ApiKey: this.ApiKey,
        period_enable_process: this.period_enable_process
      });
      this.periods = result_period.data;
    },

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

    async search_college_submit() {
      if (
        this.search_college === "" ||
        this.times_select === "" ||
        this.years_select === ""
      ) {
        this.snackbar.icon = "mdi-font-awesome";
        this.snackbar.color = "red";
        this.snackbar.text = "เลือกรายการ กำหนดครั้งที่และปีให้ถูกต้อง";
        this.snackbar.show = true;
      } else {
        this.loading = true;
        let result = await this.$http
          .post("transference_location.php", {
            ApiKey: this.ApiKey,
            time_s: this.times_select,
            year_s: this.years_select,
            college_code: this.search_college
          })
          .finally(() => (this.loading = false));
        this.transference_locations = result.data;
      }
    },


 async search_not_confirm_submit() {
      this.loading = true;
      let result = await this.$http
        .post("transference_location.php", {
          ApiKey: this.ApiKey,
          not_confirm:'ok',
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

    async select_idPosition(tid_ref, id_tfl) {
      let result_con = await this.$http.post("transference_personnel.php", {
        ApiKey: this.ApiKey,
        id_ref: tid_ref
      });
      this.transference_personnels_id_ref = result_con.data;

      let result = await this.$http.post("transference_location.php", {
        ApiKey: this.ApiKey,
        id_tfl: id_tfl
      });
      this.transference_location_s = result.data;

      this.updatepositions = {};
      this.man_powerQuery();
      this.positiondialog = true;
    },

    async man_powerQuery() {
      let man_power_result;
      man_power_result = await this.$http.post("man_power_process.php", {
        ApiKey: this.ApiKey,
        college_code: this.transference_location_s.college_code_new
      });
      this.man_powers = man_power_result.data;
    },

    /// updatepositionSubmit
    async updatepositionSubmit() {
      if (this.$refs.updatepositionform.validate()) {
        this.updatepositions.ApiKey = this.ApiKey;
        this.updatepositions.time_s = this.transference_personnels_id_ref.time_ss;
        this.updatepositions.year_s = this.transference_personnels_id_ref.year_ss;
        this.updatepositions.college_code_old = this.transference_personnels_id_ref.college_code;
        this.updatepositions.id_postion_old = this.transference_personnels_id_ref.id_position;
        this.updatepositions.id_card = this.transference_personnels_id_ref.id_card;
        this.updatepositions.id_ref = this.transference_personnels_id_ref.tid_ref;
        this.updatepositions.name_position = this.position;
        this.updatepositions.college_code = this.transference_location_s.college_code_new;
        this.updatepositions.id_branch = this.transference_location_s.id_branch_s;
        this.updatepositions.status_select = "demand";

        this.updatepositions_condition.ApiKey = this.ApiKey;
        this.updatepositions_condition.id_position = this.updatepositions.id_position;
        this.updatepositions_condition.status_booking = this.transference_personnels_id_ref.id_card;

        this.addreturn_man_power.ApiKey = this.ApiKey;
        this.addreturn_man_power.college_code = this.transference_personnels_id_ref.college_code;
        this.addreturn_man_power.id_position = this.transference_personnels_id_ref.id_position;
        this.addreturn_man_power.position = this.position;
        this.addreturn_man_power.case_vacancy =
          "ย้ายรอบ-" + this.transference_personnels_id_ref.time_ss + "/" + this.transference_personnels_id_ref.year_ss;
        /* console.log(this.updatepositions);
        console.log(this.updatepositions_condition);
        console.log(this.addreturn_man_power); */
        let result_man_return = await this.$http.post(
          "man_power.insert.php",
          this.addreturn_man_power
        );

        if (result_man_return.data.status == true) {
          let result_man = await this.$http.post(
            "man_power.update_process.php",
            this.updatepositions_condition
          );

          let result = await this.$http.post(
            "conditons_transfer_success.insert.php",
            this.updatepositions
          );

          if (result_man.data.status == true && result.data.status == true) {
            this.snackbar.icon = "mdi-font-awesome";
            this.snackbar.color = "success";
            this.snackbar.text = "บันทึกข้อมูลเรียบร้อย";
            this.snackbar.show = true;
            this.transference_locationQueryAll();
          }
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text = "บันทึกข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.positiondialog = false;
      }
    },
    async deletePosition(tid_ref) {
      let result_con = await this.$http.post("transference_personnel.php", {
        ApiKey: this.ApiKey,
        id_ref: tid_ref
      });
      this.transference_personnels_id_ref = result_con.data;

      let result_man = await this.$http.post("man_power.php", {
        ApiKey: this.ApiKey,
        id_card: this.transference_personnels_id_ref.id_card
      });
      this.man_powerss = result_man.data;

      let result_cts = await this.$http.post("conditons_transfer_success.php", {
        ApiKey: this.ApiKey,
        id_ref: tid_ref
      });

      this.conditons_transfer_successs = result_cts.data;
      this.canceldialog = true;
    },

    async cancelSubmit() {
      if (this.$refs.cancelform.validate()) {
        this.man_powerss.ApiKey = this.ApiKey;
        this.man_powerss.status_booking = "";

        this.conditons_transfer_successs.ApiKey = this.ApiKey;

        this.man_power_cancel.ApiKey = this.ApiKey;
        this.man_power_cancel.id_position = this.conditons_transfer_successs.id_postion_old;

        /*  console.log(this.man_powerss)
       console.log(this.conditons_transfer_successs)
       console.log(this.man_power_cancel) */
        let result_man = await this.$http.post(
          "man_power.update_process.php",
          this.man_powerss
        );

        let result_man_delete = await this.$http.post(
          "man_power.delete.php",
          this.man_power_cancel
        );

        let result_cts = await this.$http.post(
          "conditons_transfer_success.delete.php",
          this.conditons_transfer_successs
        );

        if (
          result_man.data.status == true &&
          result_cts.data.status == true &&
          result_man_delete.data.status == true
        ) {
          this.snackbar.icon = "mdi-font-awesome";
          this.snackbar.color = "success";
          this.snackbar.text = "ยกเลิกข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.transference_locationQueryAll();
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text = "ยกเลิกข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.canceldialog = false;
      }
    },

    getColor() {
      /*  if (calories > 400) return 'red'
        else if (calories > 200) return 'orange'
        else return 'green'  */

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
      return "cyan darken-3";
    },
    period_years() {
      let yyyy = parseInt(this.periods.period_year) + 543;
      return yyyy;
    }
  }
};
</script>
