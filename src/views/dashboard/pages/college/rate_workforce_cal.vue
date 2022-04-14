<template>
  <div>
    <v-bottom-navigation color="info" horizontal :background-color="color" dark>
      <v-btn to="/college/rate_workforce_g">
        <span>ข้อมูลทั่วไป </span>
        <v-icon>mdi-numeric-1-box</v-icon>
      </v-btn>
      <v-btn to="/college/rate_workforce">
        <span>ข้อมูลนักเรียนนักศึกษา </span>
        <v-icon>mdi-numeric-2-box</v-icon>
      </v-btn>
      <v-btn to="/college/rate_workforce_pro">
        <span>ประมวลผลห้องเรียน </span>
        <v-icon>mdi-numeric-3-box</v-icon>
      </v-btn>
      <v-btn to="/college/rate_workforce_cal">
        <span>ประมวลผลอัตรากำลัง </span>
        <v-icon>mdi-numeric-4-box</v-icon>
      </v-btn>
    </v-bottom-navigation>

    <v-container id="upgrade" fluid tag="section" class="text_google">
      <v-row>
        <v-col cols="12" md="12">
          <base-material-card color="primary">
            <template v-slot:heading>
              <h2 class="h1 font-weight-light text_google">
                <v-icon large left>mdi-file-send</v-icon
                >โปรแกรมคำนวณอัตรากำลังในสถานศึกษา
                สังกัดสำนักงานคณะกรรมการการอาชีวศึกษา :
                {{ user.college_id_code_type_manpower }}
              </h2>
            </template>

            <v-row>
              <v-col cols="12" md="12">
                <v-card class="mx-auto pa-5">
                  <v-row class="mb-10" justify="center" no-gutters>
                    <v-col md="10">
                      <v-card>
                        <v-row class="ma-2">
                          <v-col cols="12" md="2" class="text-center">
                            <h2>
                              ปีการศึกษา :
                            </h2>
                          </v-col>
                          <v-col cols="12" md="10">
                            <h3>
                              <v-select
                                filled
                                v-model="select"
                                :items="items"
                                item-value="state"
                                item-text="state"
                                @change="rate_work_g_search()"
                                label="ปีการศึกษา พ.ศ.  : "
                                :hint="`${select.state}, ${select.abbr}`"
                                persistent-hint
                                return-object
                                single-line
                              >
                              </v-select>
                            </h3>
                          </v-col>
                          <v-col cols="12" md="2" class="text-center"> </v-col>
                          <v-col cols="12" md="5" class="text-center">
                            <h3>รหัสสถานศึกษา :{{ user.user_name }}</h3>
                            <h3>ชื่อสถานศึกษา : {{ user.college_name }}</h3>
                          </v-col>
                          <v-col cols="12" md="5" class="text-center">
                            <h3>ประเภทสถานศึกษา : {{ user.name_ctm }}</h3>
                            <h3
                              v-if="
                                rate_work_g_query.rate_criterion_incomplete_all ===
                                  '0'
                              "
                            >
                              <v-chip
                                class="ma-2"
                                color="warning"
                                text-color="white"
                              >
                                <v-avatar left>
                                  <v-icon>mdi-alert-circle-outline</v-icon>
                                </v-avatar>
                                <h3>ยังไม่ได้บันทึกข้อมูล</h3>
                              </v-chip>
                            </h3>
                            <h3 v-else>
                              <v-chip
                                class="ma-2"
                                color="teal"
                                text-color="white"
                              >
                                <v-avatar left>
                                  <v-icon>mdi-checkbox-marked-circle</v-icon>
                                </v-avatar>
                                <h3>บันทึกข้อมูลเรียบร้อย</h3>
                              </v-chip>
                            </h3>
                          </v-col>
                        </v-row>
                      </v-card>
                    </v-col>
                    <v-col cols="12" md="12">
                      <v-row class="mb-10" justify="center" no-gutters>
                        <v-col md="10">
                          <v-card class="pa-2" outlined elevation="2">
                            <v-form ref="rate_work_g_queryform" lazy-validation>
                              <v-container grid-list-md>
                                <v-layout wrap>
                                  <v-flex md12>
                                    <v-row>
                                      <v-col cols="12" md="12">
                                        <v-simple-table>
                                          <thead>
                                            <tr>
                                              <th
                                                class="text-center"
                                                width="20%"
                                              >
                                                ประเภทอัตรา
                                              </th>
                                              <th
                                                class="text-center"
                                                width="15%"
                                              >
                                                มีจริง
                                              </th>
                                              <th
                                                class="text-center grey lighten-1"
                                                width="15%"
                                              >
                                                จำนวนห้องเรียน
                                              </th>
                                              <th
                                                class="text-center"
                                                width="15%"
                                              >
                                                เกณฑ์
                                              </th>
                                              <th
                                                class="text-center grey lighten-1"
                                                width="15%"
                                              >
                                                อัตรากำลังรวม
                                              </th>
                                              <th
                                                class="text-center"
                                                width="20%"
                                              >
                                                (-ขาด/+เกิน)
                                              </th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <tr>
                                              <td>ผอ.สถานศึกษา</td>
                                              <td class="text-center">
                                                {{
                                                  rate_work_g_query.rate_work_g_dr
                                                }}
                                              </td>
                                              <td
                                                class="text-center grey lighten-1"
                                                rowspan="2"
                                              >
                                                {{
                                                  rate_work_college_cal_room_for_dr.rate_work_cal_room_dr
                                                }}
                                              </td>
                                              <td class="text-center ">
                                                {{ criterion_dr }}
                                              </td>
                                              <td
                                                class="text-center grey lighten-1"
                                                rowspan="2"
                                              >
                                                {{
                                                  Math.round(rate_work_college_cal_room_for_teach.rate_sum_man_all)
                                                }}
                                              </td>
                                              <td class="text-center">
                                                {{ incomplete_dr }}
                                              </td>
                                            </tr>
                                            <tr>
                                              <td>รอง ผอ.สถานศึกษา</td>
                                              <td class="text-center">
                                                {{
                                                  rate_work_g_query.rate_work_g_sedr
                                                }}
                                              </td>
                                              <td class="text-center">
                                                {{ criterion_sec_dr }}
                                              </td>
                                              <td class="text-center">
                                                {{ incomplete_sec_dr }}
                                              </td>
                                            </tr>
                                            <tr>
                                              <td
                                                class="text-center green lighten-1 white--text"
                                              >
                                                ครูผู้สอน (รวม)
                                              </td>
                                              <td
                                                class="text-center green lighten-1 white--text"
                                              >
                                                {{
                                                  rate_work_g_query.sumteach_a
                                                }}
                                              </td>
                                              <td
                                                class="text-center green lighten-1 white--text"
                                              >
                                                {{
                                                  rate_work_g_query.sumteach_b
                                                }}
                                              </td>
                                              <td
                                                class="text-center cyan lighten-2 white--text"
                                              >
                                                {{ criterion_sec_teach }}
                                              </td>
                                              <td
                                                class="text-center cyan lighten-2 white--text"
                                              >
                                                {{ incomplete_rate_teach }}
                                              </td>
                                              <td
                                                class="text-center blue darken-1 white--text"
                                              >
                                                {{
                                                  incomplete_rate_teach_result
                                                }}
                                              </td>
                                            </tr>
                                            <tr>
                                              <td></td>
                                              <td class="text-center">
                                                ข้าราชการ
                                              </td>
                                              <td class="text-center">
                                                พนร./อัตราจ้าง
                                              </td>
                                              <td class="text-center">
                                                ข้าราชการ
                                              </td>
                                              <td class="text-center">
                                                พนร./อัตราจ้าง
                                              </td>
                                              <td class="text-center"></td>
                                            </tr>
                                            <tr>
                                              <td>-ประเภทวิชาสามัญ</td>
                                              <td class="text-center">
                                                {{
                                                  rate_work_g_query.rate_work_g_gs_ta
                                                }}
                                              </td>
                                              <td class="text-center">
                                                {{
                                                  rate_work_g_query.rate_work_g_gs_tb
                                                }}
                                              </td>
                                              <td class="text-center">
                                                {{ official_rate_00 }}
                                              </td>
                                              <td class="text-center">
                                                {{ civil_servant_rate_00 }}
                                              </td>
                                              <td class="text-center">
                                                {{ incomplete_rate_00 }}
                                              </td>
                                            </tr>
                                            <tr>
                                              <td>-ประเภทวิชาอุตสาหกรรม</td>
                                              <td class="text-center">
                                                {{
                                                  rate_work_g_query.rate_work_g_is_ta
                                                }}
                                              </td>
                                              <td class="text-center">
                                                {{
                                                  rate_work_g_query.rate_work_g_is_tb
                                                }}
                                              </td>
                                              <td class="text-center">
                                                {{ official_rate_01 }}
                                              </td>
                                              <td class="text-center">
                                                {{ civil_servant_rate_01 }}
                                              </td>
                                              <td class="text-center">
                                                {{ incomplete_rate_01 }}
                                              </td>
                                            </tr>
                                            <tr>
                                              <td>-ประเภทวิชาพาณิชยกรรม</td>
                                              <td class="text-center">
                                                {{
                                                  rate_work_g_query.rate_work_g_cm_ta
                                                }}
                                              </td>
                                              <td class="text-center">
                                                {{
                                                  rate_work_g_query.rate_work_g_cm_tb
                                                }}
                                              </td>
                                              <td class="text-center">
                                                {{ official_rate_02 }}
                                              </td>
                                              <td class="text-center">
                                                {{ civil_servant_rate_02 }}
                                              </td>
                                              <td class="text-center">
                                                {{ incomplete_rate_02 }}
                                              </td>
                                            </tr>
                                            <tr>
                                              <td>-ประเภทวิชาศิลปกรรม</td>
                                              <td class="text-center">
                                                {{
                                                  rate_work_g_query.rate_work_g_art_ta
                                                }}
                                              </td>
                                              <td class="text-center">
                                                {{
                                                  rate_work_g_query.rate_work_g_art_tb
                                                }}
                                              </td>
                                              <td class="text-center">
                                                {{ official_rate_03 }}
                                              </td>
                                              <td class="text-center">
                                                {{ civil_servant_rate_03 }}
                                              </td>
                                              <td class="text-center">
                                                {{ incomplete_rate_03 }}
                                              </td>
                                            </tr>
                                            <tr>
                                              <td>-ประเภทวิชาคหกรรม</td>
                                              <td class="text-center">
                                                {{
                                                  rate_work_g_query.rate_work_g_em_ta
                                                }}
                                              </td>
                                              <td class="text-center">
                                                {{
                                                  rate_work_g_query.rate_work_g_em_tb
                                                }}
                                              </td>
                                              <td class="text-center">
                                                {{ official_rate_04 }}
                                              </td>
                                              <td class="text-center">
                                                {{ civil_servant_rate_04 }}
                                              </td>
                                              <td class="text-center">
                                                {{ incomplete_rate_04 }}
                                              </td>
                                            </tr>
                                            <tr>
                                              <td>-ประเภทวิชาเกษตรกรรม</td>
                                              <td class="text-center">
                                                {{
                                                  rate_work_g_query.rate_work_g_ag_ta
                                                }}
                                              </td>
                                              <td class="text-center">
                                                {{
                                                  rate_work_g_query.rate_work_g_ag_tb
                                                }}
                                              </td>
                                              <td class="text-center">
                                                {{ official_rate_05 }}
                                              </td>
                                              <td class="text-center">
                                                {{ civil_servant_rate_05 }}
                                              </td>
                                              <td class="text-center">
                                                {{ incomplete_rate_05 }}
                                              </td>
                                            </tr>
                                            <tr>
                                              <td>-ประเภทวิชาประมง</td>
                                              <td class="text-center">
                                                {{
                                                  rate_work_g_query.rate_work_g_fish_ta
                                                }}
                                              </td>
                                              <td class="text-center">
                                                {{
                                                  rate_work_g_query.rate_work_g_fish_tb
                                                }}
                                              </td>
                                              <td class="text-center">
                                                {{ official_rate_06 }}
                                              </td>
                                              <td class="text-center">
                                                {{ civil_servant_rate_06 }}
                                              </td>
                                              <td class="text-center">
                                                {{ incomplete_rate_06 }}
                                              </td>
                                            </tr>
                                            <tr>
                                              <td>
                                                -ประเภทวิชาอุตสาหกรรมการท่องเที่ยว
                                              </td>
                                              <td class="text-center">
                                                {{
                                                  rate_work_g_query.rate_work_g_tour_ta
                                                }}
                                              </td>
                                              <td class="text-center">
                                                {{
                                                  rate_work_g_query.rate_work_g_tour_tb
                                                }}
                                              </td>
                                              <td class="text-center">
                                                {{ official_rate_07 }}
                                              </td>
                                              <td class="text-center">
                                                {{ civil_servant_rate_07 }}
                                              </td>
                                              <td class="text-center">
                                                {{ incomplete_rate_07 }}
                                              </td>
                                            </tr>
                                            <tr>
                                              <td>
                                                -ประเภทวิชาอุตสาหกรรมสิ่งทอ
                                              </td>
                                              <td class="text-center">
                                                {{
                                                  rate_work_g_query.rate_work_g_textile_ta
                                                }}
                                              </td>
                                              <td class="text-center">
                                                {{
                                                  rate_work_g_query.rate_work_g_textile_tb
                                                }}
                                              </td>
                                              <td class="text-center">
                                                {{ official_rate_08 }}
                                              </td>
                                              <td class="text-center">
                                                {{ civil_servant_rate_08 }}
                                              </td>
                                              <td class="text-center">
                                                {{ incomplete_rate_08 }}
                                              </td>
                                            </tr>
                                            <tr>
                                              <td>
                                                -ประเภทวิชาเทคโนโลยีสารสนเทศ
                                              </td>
                                              <td class="text-center">
                                                {{
                                                  rate_work_g_query.rate_work_g_insy_ta
                                                }}
                                              </td>
                                              <td class="text-center">
                                                {{
                                                  rate_work_g_query.rate_work_g_insy_tb
                                                }}
                                              </td>
                                              <td class="text-center">
                                                {{ official_rate_09 }}
                                              </td>
                                              <td class="text-center">
                                                {{ civil_servant_rate_09 }}
                                              </td>
                                              <td class="text-center">
                                                {{ incomplete_rate_09 }}
                                              </td>
                                            </tr>
                                            <tr>
                                              <td>-หลักสูตรระยะสั้น*</td>
                                              <td class="text-center">
                                                {{
                                                  rate_work_g_query.rate_work_g_sc_ta
                                                }}
                                              </td>
                                              <td class="text-center">
                                                {{
                                                  rate_work_g_query.rate_work_g_sc_tb
                                                }}
                                              </td>
                                              <td class="text-center">
                                                {{ official_rate_66 }}
                                              </td>
                                              <td class="text-center">
                                                {{ civil_servant_rate_66 }}
                                              </td>
                                              <td class="text-center">
                                                {{ incomplete_rate_66 }}
                                              </td>
                                            </tr>
                                            <tr>
                                              <td class="bold">
                                                <strong
                                                  >บุคลากรสนับสนุนการสอน</strong
                                                >
                                              </td>
                                              <td class="text-center">
                                                {{
                                                  rate_work_g_query.rate_work_g_sup_ta
                                                }}
                                              </td>
                                              <td class="text-center">
                                                {{
                                                  rate_work_g_query.rate_work_g_sup_tb
                                                }}
                                              </td>
                                              <td class="text-center">
                                                {{ official_rate_sup }}
                                              </td>
                                              <td class="text-center">
                                                {{ civil_servant_rate_sub }}
                                              </td>
                                              <td class="text-center">
                                                {{ incomplete_rate_sup }}
                                              </td>
                                            </tr>
                                            <tr>
                                              <td
                                                class="text-center green lighten-1 white--text"
                                              >
                                                <h3>รวมอัตรา</h3>
                                              </td>
                                              <td
                                                class="text-center green lighten-1 white--text"
                                                colspan="2"
                                              >
                                                <h3>
                                                  {{ rate_work_g_query.sumall }}
                                                </h3>
                                              </td>

                                              <td
                                                class="text-center cyan lighten-2 white--text"
                                              >
                                                {{ rate_work_all_criterion }}
                                              </td>
                                              <td
                                                class="text-center cyan lighten-2 white--text"
                                              ></td>
                                              <td
                                                class="text-center cyan lighten-2 white--text"
                                              >
                                                {{
                                                  incomplete_rate_teach_result_all
                                                }}
                                              </td>
                                            </tr>
                                            <tr>
                                              <td class="bold">
                                                <strong
                                                  >ลูกจ้างประจำ/ชั่วคราว</strong
                                                >
                                              </td>
                                              <td class="text-center">
                                                {{
                                                  rate_work_g_query.rate_work_g_pte_ta
                                                }}
                                              </td>
                                              <td class="text-center">
                                                {{
                                                  rate_work_g_query.rate_work_g_pte_tb
                                                }}
                                              </td>
                                              <td class="text-center"></td>
                                              <td class="text-center"></td>
                                              <td class="text-center"></td>
                                            </tr>
                                          </tbody>
                                        </v-simple-table>
                                      </v-col>
                                    </v-row>
                                  </v-flex>
                                </v-layout>
                                <v-spacer></v-spacer>
                                <v-row>
                                  <v-col cols="12" md="12" class="text-right">
                                    <v-btn
                                      large
                                      color="green"
                                      @click.stop="rate_work_g_querySubmit()"
                                      rounded
                                    >
                                      <v-icon dark class="pa-1"
                                        >mdi-content-save</v-icon
                                      >&nbsp;&nbsp;บันทึก</v-btn
                                    >
                                  </v-col>
                                </v-row>
                              </v-container>
                            </v-form>
                          </v-card>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </base-material-card>
        </v-col>
      </v-row>

      <v-container fluid>
        <v-snackbar
          v-model="snackbar.show"
          top
          :timeout="snackbar.timeout"
          :color="snackbar.color"
        >
          <v-icon large>{{ snackbar.icon }}</v-icon>
          <v-card-text>
            {{ snackbar.text }}
          </v-card-text>

          <template v-slot:action="{ attrs }">
            <v-btn
              color="red"
              text
              v-bind="attrs"
              @click="snackbar.show = false"
              >Close</v-btn
            >
          </template>
        </v-snackbar>
      </v-container>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      ApiKey: "HRvec2021",
      user: {},
      users: [],
      select: { state: "2564", abbr: "2021" },
      items: [
        { state: "2564", abbr: "2021" },
        { state: "2565", abbr: "2022" },
        { state: "2566", abbr: "2023" },
        { state: "2567", abbr: "2024" },
        { state: "2568", abbr: "2025" }
      ],
      snackbar: {
        show: false,
        color: "",
        timeout: 5000,
        icon: "",
        text: ""
      },
      rowsperpage: [
        25,
        50,
        100,
        {
          text: "All",
          value: -1
        }
      ],
      rate_work_g_query: [],
      rate_work_college_cal_room_for_dr: [],
      criterion_dr: [],
      incomplete_dr: [],
      criterion_sec_dr: [],
      criterion_sec_teach: [],
      incomplete_sec_dr: [],
      rate_work_college_cal_room_for_teach: [],
      official_rate_00: [],
      official_rate_01: [],
      official_rate_02: [],
      official_rate_03: [],
      official_rate_04: [],
      official_rate_05: [],
      official_rate_06: [],
      official_rate_07: [],
      official_rate_08: [],
      official_rate_09: [],
      official_rate_66: [],
      official_rate_sup: [],
      civil_servant_rate_00: [],
      civil_servant_rate_01: [],
      civil_servant_rate_02: [],
      civil_servant_rate_03: [],
      civil_servant_rate_04: [],
      civil_servant_rate_05: [],
      civil_servant_rate_06: [],
      civil_servant_rate_07: [],
      civil_servant_rate_08: [],
      civil_servant_rate_09: [],
      civil_servant_rate_66: [],
      civil_servant_rate_sub: [],
      incomplete_rate_00: [],
      incomplete_rate_01: [],
      incomplete_rate_02: [],
      incomplete_rate_03: [],
      incomplete_rate_04: [],
      incomplete_rate_05: [],
      incomplete_rate_06: [],
      incomplete_rate_07: [],
      incomplete_rate_08: [],
      incomplete_rate_09: [],
      incomplete_rate_66: [],
      incomplete_rate_sup: [],
      incomplete_rate_teach: [],
      incomplete_rate_teach_result: [],
      rate_work_college_cal_room_for_sc: [],
      rate_work_all_criterion: [],
      incomplete_rate_teach_result_all: [],
      rate_work_g_update: {}
    };
  },

  async mounted() {
    let result;
    let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
    result = await this.$http.post("user.php", {
      ApiKey: this.ApiKey,
      user_ID: userSession.user_ID
    });
    this.user = result.data;

    await this.rate_work_gQueryAll();
    await this.rate_work_cal_room_for_dr();
    await this.cal_man_power();
    await this.rate_work_cal_room_for_teach();
    await this.cal_man_power_teach();
    await this.cal_man_power_cri();
  },

  methods: {
    async rate_work_gQueryAll() {
      this.loading = true;
      let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
      let result = await this.$http
        .post("rate_work_g.php", {
          ApiKey: this.ApiKey,
          rate_work_g_college_code: userSession.user_name,
          rate_work_g_year: this.year_now
        })
        .finally(() => (this.loading = false));
      this.rate_work_g_query = result.data;
      /* console.log(result.data); */

      this.rate_work_g_query.rate_work_g_dr =
        parseInt(this.rate_work_g_query.rate_work_g_dr) || 0;
      this.rate_work_g_query.rate_work_g_sedr =
        parseInt(this.rate_work_g_query.rate_work_g_sedr) || 0;
      this.rate_work_g_query.rate_work_g_gs_ta =
        parseInt(this.rate_work_g_query.rate_work_g_gs_ta) || 0;
      this.rate_work_g_query.rate_work_g_gs_tb =
        parseInt(this.rate_work_g_query.rate_work_g_gs_tb) || 0;
      this.rate_work_g_query.rate_work_g_is_ta =
        parseInt(this.rate_work_g_query.rate_work_g_is_ta) || 0;
      this.rate_work_g_query.rate_work_g_is_tb =
        parseInt(this.rate_work_g_query.rate_work_g_is_tb) || 0;
      this.rate_work_g_query.rate_work_g_cm_ta =
        parseInt(this.rate_work_g_query.rate_work_g_cm_ta) || 0;
      this.rate_work_g_query.rate_work_g_cm_tb =
        parseInt(this.rate_work_g_query.rate_work_g_cm_tb) || 0;
      this.rate_work_g_query.rate_work_g_art_ta =
        parseInt(this.rate_work_g_query.rate_work_g_art_ta) || 0;
      this.rate_work_g_query.rate_work_g_art_tb =
        parseInt(this.rate_work_g_query.rate_work_g_art_tb) || 0;
      this.rate_work_g_query.rate_work_g_em_ta =
        parseInt(this.rate_work_g_query.rate_work_g_em_ta) || 0;
      this.rate_work_g_query.rate_work_g_em_tb =
        parseInt(this.rate_work_g_query.rate_work_g_em_tb) || 0;
      this.rate_work_g_query.rate_work_g_ag_ta =
        parseInt(this.rate_work_g_query.rate_work_g_ag_ta) || 0;
      this.rate_work_g_query.rate_work_g_ag_tb =
        parseInt(this.rate_work_g_query.rate_work_g_ag_tb) || 0;
      this.rate_work_g_query.rate_work_g_fish_ta =
        parseInt(this.rate_work_g_query.rate_work_g_fish_ta) || 0;
      this.rate_work_g_query.rate_work_g_fish_tb =
        parseInt(this.rate_work_g_query.rate_work_g_fish_tb) || 0;
      this.rate_work_g_query.rate_work_g_tour_ta =
        parseInt(this.rate_work_g_query.rate_work_g_tour_ta) || 0;
      this.rate_work_g_query.rate_work_g_tour_tb =
        parseInt(this.rate_work_g_query.rate_work_g_tour_tb) || 0;
      this.rate_work_g_query.rate_work_g_textile_ta =
        parseInt(this.rate_work_g_query.rate_work_g_textile_ta) || 0;
      this.rate_work_g_query.rate_work_g_textile_tb =
        parseInt(this.rate_work_g_query.rate_work_g_textile_tb) || 0;
      this.rate_work_g_query.rate_work_g_insy_ta =
        parseInt(this.rate_work_g_query.rate_work_g_insy_ta) || 0;
      this.rate_work_g_query.rate_work_g_insy_tb =
        parseInt(this.rate_work_g_query.rate_work_g_insy_tb) || 0;
      this.rate_work_g_query.rate_work_g_sc_ta =
        parseInt(this.rate_work_g_query.rate_work_g_sc_ta) || 0;
      this.rate_work_g_query.rate_work_g_sc_tb =
        parseInt(this.rate_work_g_query.rate_work_g_sc_tb) || 0;
      this.rate_work_g_query.rate_work_g_sup_ta =
        parseInt(this.rate_work_g_query.rate_work_g_sup_ta) || 0;
      this.rate_work_g_query.rate_work_g_sup_tb =
        parseInt(this.rate_work_g_query.rate_work_g_sup_tb) || 0;
      this.rate_work_g_query.rate_work_g_pte_ta =
        parseInt(this.rate_work_g_query.rate_work_g_pte_ta) || 0;
      this.rate_work_g_query.rate_work_g_pte_tb =
        parseInt(this.rate_work_g_query.rate_work_g_pte_tb) || 0;

      this.rate_work_g_query.sumteach_a =
        this.rate_work_g_query.rate_work_g_gs_ta +
        this.rate_work_g_query.rate_work_g_is_ta +
        this.rate_work_g_query.rate_work_g_cm_ta +
        this.rate_work_g_query.rate_work_g_art_ta +
        this.rate_work_g_query.rate_work_g_em_ta +
        this.rate_work_g_query.rate_work_g_ag_ta +
        this.rate_work_g_query.rate_work_g_fish_ta +
        this.rate_work_g_query.rate_work_g_tour_ta +
        this.rate_work_g_query.rate_work_g_textile_ta +
        this.rate_work_g_query.rate_work_g_insy_ta +
        this.rate_work_g_query.rate_work_g_sc_ta;

      this.rate_work_g_query.sumteach_b =
        this.rate_work_g_query.rate_work_g_gs_tb +
        this.rate_work_g_query.rate_work_g_is_tb +
        this.rate_work_g_query.rate_work_g_cm_tb +
        this.rate_work_g_query.rate_work_g_art_tb +
        this.rate_work_g_query.rate_work_g_em_tb +
        this.rate_work_g_query.rate_work_g_ag_tb +
        this.rate_work_g_query.rate_work_g_fish_tb +
        this.rate_work_g_query.rate_work_g_tour_tb +
        this.rate_work_g_query.rate_work_g_textile_tb +
        this.rate_work_g_query.rate_work_g_insy_tb +
        this.rate_work_g_query.rate_work_g_sc_tb;

      this.rate_work_g_query.sumall =
        this.rate_work_g_query.rate_work_g_dr +
        this.rate_work_g_query.rate_work_g_sedr +
        this.rate_work_g_query.rate_work_g_sup_ta +
        this.rate_work_g_query.rate_work_g_sup_tb +
        this.rate_work_g_query.sumteach_a +
        this.rate_work_g_query.sumteach_b;
    },
    async rate_work_cal_room_for_dr() {
      let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
      let result = await this.$http.post("rate_work_college_cal_room.php", {
        ApiKey: this.ApiKey,
        rate_work_ccr_code: userSession.user_name,
        rate_work_ccr_year: this.year_now,
        cal_room_for_dr: "Ok"
      });
      this.rate_work_college_cal_room_for_dr = result.data;
    },

    async rate_work_cal_room_for_teach() {
      let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
      let result = await this.$http.post("rate_work_college_cal_room.php", {
        ApiKey: this.ApiKey,
        rate_work_ccr_code: userSession.user_name,
        rate_work_ccr_year: this.year_now,
        cal_room_for_teach: "Ok"
      });
      this.rate_work_college_cal_room_for_teach = result.data;
    },

    async rate_work_g_querySubmit() {
      this.rate_work_g_update.ApiKey = this.ApiKey;
      this.rate_work_g_update.rate_work_g_id = this.rate_work_g_query.rate_work_g_id;
      this.rate_work_g_update.rate_criterion_dr = this.criterion_dr;
      this.rate_work_g_update.rate_criterion_incomplete_dr = this.incomplete_dr;
      this.rate_work_g_update.rate_criterion_sedr = this.criterion_sec_dr;
      this.rate_work_g_update.rate_criterion_incomplete_sedr = this.incomplete_sec_dr;
      this.rate_work_g_update.rate_teach_official_all = this.rate_work_g_query.sumteach_a;
      this.rate_work_g_update.rate_teach_civil_all = this.rate_work_g_query.sumteach_b;
      this.rate_work_g_update.rate_criterion_teach_all = this.criterion_sec_teach;
      this.rate_work_g_update.rate_criterion_teach_alls = this.incomplete_rate_teach;
      this.rate_work_g_update.rate_criterion_incomplete_teach_all = this.incomplete_rate_teach_result;
      this.rate_work_g_update.rate_man_power_teach_all = this.rate_work_college_cal_room_for_teach.rate_sum_man_all;
      this.rate_work_g_update.rate_room_cal_all = this.rate_work_college_cal_room_for_dr.rate_work_cal_room_dr;

      this.rate_work_g_update.rate_work_g_gs_ta_official = this.official_rate_00;
      this.rate_work_g_update.rate_work_g_gs_tb_civil = this.civil_servant_rate_00;
      this.rate_work_g_update.rate_work_g_gs_incomplete = this.incomplete_rate_00;

      this.rate_work_g_update.rate_work_g_is_ta_official = this.official_rate_01;
      this.rate_work_g_update.rate_work_g_is_tb_civil = this.civil_servant_rate_01;
      this.rate_work_g_update.rate_work_g_is_incomplete = this.incomplete_rate_01;

      this.rate_work_g_update.rate_work_g_cm_ta_official = this.official_rate_02;
      this.rate_work_g_update.rate_work_g_cm_tb_civil = this.civil_servant_rate_02;
      this.rate_work_g_update.rate_work_g_cm_incomplete = this.incomplete_rate_02;

      this.rate_work_g_update.rate_work_g_art_ta_official = this.official_rate_03;
      this.rate_work_g_update.rate_work_g_art_tb_civil = this.civil_servant_rate_03;
      this.rate_work_g_update.rate_work_g_art_incomplete = this.incomplete_rate_03;

      this.rate_work_g_update.rate_work_g_em_ta_official = this.official_rate_04;
      this.rate_work_g_update.rate_work_g_em_tb_civil = this.civil_servant_rate_04;
      this.rate_work_g_update.rate_work_g_em_incomplete = this.incomplete_rate_04;

      this.rate_work_g_update.rate_work_g_ag_ta_official = this.official_rate_05;
      this.rate_work_g_update.rate_work_g_ag_tb_civil = this.civil_servant_rate_05;
      this.rate_work_g_update.rate_work_g_ag_incomplete = this.incomplete_rate_05;

      this.rate_work_g_update.rate_work_g_fish_ta_official = this.official_rate_06;
      this.rate_work_g_update.rate_work_g_fish_tb_civil = this.civil_servant_rate_06;
      this.rate_work_g_update.rate_work_g_fish_incomplete = this.incomplete_rate_06;

      this.rate_work_g_update.rate_work_g_tour_ta_official = this.official_rate_07;
      this.rate_work_g_update.rate_work_g_tour_tb_civil = this.civil_servant_rate_07;
      this.rate_work_g_update.rate_work_g_tour_incomplete = this.incomplete_rate_07;

      this.rate_work_g_update.rate_work_g_textile_ta_official = this.official_rate_08;
      this.rate_work_g_update.rate_work_g_textile_tb_civil = this.civil_servant_rate_08;
      this.rate_work_g_update.rate_work_g_textile_incomplete = this.incomplete_rate_08;

      this.rate_work_g_update.rate_work_g_insy_ta_official = this.official_rate_09;
      this.rate_work_g_update.rate_work_g_insy_tb_civil = this.civil_servant_rate_09;
      this.rate_work_g_update.rate_work_g_insy_incomplete = this.incomplete_rate_09;

      this.rate_work_g_update.rate_work_g_sc_ta_official = this.official_rate_66;
      this.rate_work_g_update.rate_work_g_sc_tb_civil = this.civil_servant_rate_66;
      this.rate_work_g_update.rate_work_g_sc_incomplete = this.incomplete_rate_66;

      this.rate_work_g_update.rate_work_g_sup_ta_official = this.official_rate_sup;
      this.rate_work_g_update.rate_work_g_sup_tb_civil = this.civil_servant_rate_sub;
      this.rate_work_g_update.rate_work_g_sup_incomplete = this.incomplete_rate_sup;

      this.rate_work_g_update.rate_man_power_all = this.rate_work_g_query.sumall;
      this.rate_work_g_update.rate_criterion_all = this.rate_work_all_criterion;
      this.rate_work_g_update.rate_criterion_incomplete_all = this.incomplete_rate_teach_result_all;

      /*  console.log(this.rate_work_g_update) */
      let result_update = await this.$http.post(
        "rate_work_g_cal.update.php",
        this.rate_work_g_update
      );
      if (result_update.data.status == true) {
        this.snackbar.icon = "mdi-content-save";
        this.snackbar.color = "success";
        this.snackbar.text = "บันทึกข้อมูลเรียบร้อย";
        this.snackbar.show = true;
        this.rate_work_gQueryAll();
      } else {
        this.snackbar.icon = "mdi-content-save";
        this.snackbar.color = "success";
        this.snackbar.text = "บันทึกข้อมูลเรียบร้อย";
        this.snackbar.show = true;
        this.rate_work_gQueryAll();
      }
    },

    async cal_man_power() {
      let rate_work_g_dr = this.rate_work_g_query.rate_work_g_dr;
      let room = this.rate_work_college_cal_room_for_dr.rate_work_cal_room_dr;
      let result_cri_dr;
      if (room < 1) {
        result_cri_dr = 0;
      } else {
        result_cri_dr = 1;
      }
      this.criterion_dr = result_cri_dr;
      let incomplete_dr_cal = parseInt(rate_work_g_dr - result_cri_dr);
      this.incomplete_dr = incomplete_dr_cal;

      let rate_work_g_sec_dr = this.rate_work_g_query.rate_work_g_sedr;
      let result_cri_sec_dr;
      if (room < 37) result_cri_sec_dr = 3;
      else if (room < 26) result_cri_sec_dr = 2;
      else if (room < 16) result_cri_sec_dr = 1;
      else if (room < 3) result_cri_sec_dr = 0;
      else result_cri_sec_dr = 4;
      this.criterion_sec_dr = result_cri_sec_dr;
      let incomplete_sec_dr_cal = parseInt(
        rate_work_g_sec_dr - result_cri_sec_dr
      );
      this.incomplete_sec_dr = incomplete_sec_dr_cal;
    },

    async cal_man_power_teach() {
      let rate_00 = this.rate_work_college_cal_room_for_teach.rate_00;
      let rate_01 = this.rate_work_college_cal_room_for_teach.rate_01;
      let rate_02 = this.rate_work_college_cal_room_for_teach.rate_02;
      let rate_03 = this.rate_work_college_cal_room_for_teach.rate_03;
      let rate_04 = this.rate_work_college_cal_room_for_teach.rate_04;
      let rate_05 = this.rate_work_college_cal_room_for_teach.rate_05;
      let rate_06 = this.rate_work_college_cal_room_for_teach.rate_06;
      let rate_07 = this.rate_work_college_cal_room_for_teach.rate_07;
      let rate_08 = this.rate_work_college_cal_room_for_teach.rate_08;
      let rate_09 = this.rate_work_college_cal_room_for_teach.rate_09;
      let rate_66 = this.rate_work_college_cal_room_for_teach.rate_66;
      let rate_std_00 = this.rate_work_college_cal_room_for_teach.rate_std_00;

      let official_rate_00 = ((90 * rate_00) / 100).toFixed(2);
      let civil_servant_rate_00 = ((10 * rate_00) / 100).toFixed(2);
      let sum_of_ci_rate00 = (90 * rate_00) / 100 + (10 * rate_00) / 100;
      this.official_rate_00 = official_rate_00;
      this.civil_servant_rate_00 = civil_servant_rate_00;
      let incomplete_rate_00 = parseFloat(
        parseFloat(
          this.rate_work_g_query.rate_work_g_gs_ta +
            this.rate_work_g_query.rate_work_g_gs_tb
        ) - parseFloat(sum_of_ci_rate00)
      ).toFixed(2);
      this.incomplete_rate_00 = incomplete_rate_00;

      let official_rate_01 = ((90 * rate_01) / 100).toFixed(2);
      let civil_servant_rate_01 = ((10 * rate_01) / 100).toFixed(2);
      let sum_of_ci_rate01 = (90 * rate_01) / 100 + (10 * rate_01) / 100;
      this.official_rate_01 = official_rate_01;
      this.civil_servant_rate_01 = civil_servant_rate_01;
      let incomplete_rate_01 = parseFloat(
        parseFloat(
          this.rate_work_g_query.rate_work_g_is_ta +
            this.rate_work_g_query.rate_work_g_is_tb
        ) - parseFloat(sum_of_ci_rate01)
      ).toFixed(2);
      this.incomplete_rate_01 = incomplete_rate_01;

      let official_rate_02 = ((90 * rate_02) / 100).toFixed(2);
      let civil_servant_rate_02 = ((10 * rate_02) / 100).toFixed(2);
      let sum_of_ci_rate02 = (90 * rate_02) / 100 + (10 * rate_02) / 100;
      this.official_rate_02 = official_rate_02;
      this.civil_servant_rate_02 = civil_servant_rate_02;
      let incomplete_rate_02 = parseFloat(
        parseFloat(
          this.rate_work_g_query.rate_work_g_cm_ta +
            this.rate_work_g_query.rate_work_g_cm_tb
        ) - parseFloat(sum_of_ci_rate02)
      ).toFixed(2);
      this.incomplete_rate_02 = incomplete_rate_02;

      let official_rate_03 = ((90 * rate_03) / 100).toFixed(2);
      let civil_servant_rate_03 = ((10 * rate_03) / 100).toFixed(2);
      let sum_of_ci_rate03 = (90 * rate_03) / 100 + (10 * rate_03) / 100;
      this.official_rate_03 = official_rate_03;
      this.civil_servant_rate_03 = civil_servant_rate_03;
      let incomplete_rate_03 = parseFloat(
        parseFloat(
          this.rate_work_g_query.rate_work_g_art_ta +
            this.rate_work_g_query.rate_work_g_art_tb
        ) - parseFloat(sum_of_ci_rate03)
      ).toFixed(2);
      this.incomplete_rate_03 = incomplete_rate_03;

      let official_rate_04 = ((90 * rate_04) / 100).toFixed(2);
      let civil_servant_rate_04 = ((10 * rate_04) / 100).toFixed(2);
      let sum_of_ci_rate04 = (90 * rate_04) / 100 + (10 * rate_04) / 100;
      this.official_rate_04 = official_rate_04;
      this.civil_servant_rate_04 = civil_servant_rate_04;
      let incomplete_rate_04 = parseFloat(
        parseFloat(
          this.rate_work_g_query.rate_work_g_em_ta +
            this.rate_work_g_query.rate_work_g_em_tb
        ) - parseFloat(sum_of_ci_rate04)
      ).toFixed(2);
      this.incomplete_rate_04 = incomplete_rate_04;

      let official_rate_05 = ((90 * rate_05) / 100).toFixed(2);
      let civil_servant_rate_05 = ((10 * rate_05) / 100).toFixed(2);
      let sum_of_ci_rate05 = (90 * rate_05) / 100 + (10 * rate_05) / 100;
      this.official_rate_05 = official_rate_05;
      this.civil_servant_rate_05 = civil_servant_rate_05;
      let incomplete_rate_05 = parseFloat(
        parseFloat(
          this.rate_work_g_query.rate_work_g_ag_ta +
            this.rate_work_g_query.rate_work_g_ag_tb
        ) - parseFloat(sum_of_ci_rate05)
      ).toFixed(2);
      this.incomplete_rate_05 = incomplete_rate_05;

      let official_rate_06 = ((90 * rate_06) / 100).toFixed(2);
      let civil_servant_rate_06 = ((10 * rate_06) / 100).toFixed(2);
      let sum_of_ci_rate06 = (90 * rate_06) / 100 + (10 * rate_06) / 100;
      this.official_rate_06 = official_rate_06;
      this.civil_servant_rate_06 = civil_servant_rate_06;
      let incomplete_rate_06 = parseFloat(
        parseFloat(
          this.rate_work_g_query.rate_work_g_fish_ta +
            this.rate_work_g_query.rate_work_g_fish_tb
        ) - parseFloat(sum_of_ci_rate06)
      ).toFixed(2);
      this.incomplete_rate_06 = incomplete_rate_06;

      let official_rate_07 = ((90 * rate_07) / 100).toFixed(2);
      let civil_servant_rate_07 = ((10 * rate_07) / 100).toFixed(2);
      let sum_of_ci_rate07 = (90 * rate_07) / 100 + (10 * rate_07) / 100;
      this.official_rate_07 = official_rate_07;
      this.civil_servant_rate_07 = civil_servant_rate_07;
      let incomplete_rate_07 = parseFloat(
        parseFloat(
          this.rate_work_g_query.rate_work_g_tour_ta +
            this.rate_work_g_query.rate_work_g_tour_tb
        ) - parseFloat(sum_of_ci_rate07)
      ).toFixed(2);
      this.incomplete_rate_07 = incomplete_rate_07;

      let official_rate_08 = ((90 * rate_08) / 100).toFixed(2);
      let civil_servant_rate_08 = ((10 * rate_08) / 100).toFixed(2);
      let sum_of_ci_rate08 = (90 * rate_08) / 100 + (10 * rate_08) / 100;
      this.official_rate_08 = official_rate_08;
      this.civil_servant_rate_08 = civil_servant_rate_08;
      let incomplete_rate_08 = parseFloat(
        parseFloat(
          this.rate_work_g_query.rate_work_g_textile_ta +
            this.rate_work_g_query.rate_work_g_textile_tb
        ) - parseFloat(sum_of_ci_rate08)
      ).toFixed(2);
      this.incomplete_rate_08 = incomplete_rate_08;

      let official_rate_09 = ((90 * rate_09) / 100).toFixed(2);
      let civil_servant_rate_09 = ((10 * rate_09) / 100).toFixed(2);
      let sum_of_ci_rate09 = (90 * rate_09) / 100 + (10 * rate_09) / 100;
      this.official_rate_09 = official_rate_09;
      this.civil_servant_rate_09 = civil_servant_rate_09;
      let incomplete_rate_09 = parseFloat(
        parseFloat(
          this.rate_work_g_query.rate_work_g_insy_ta +
            this.rate_work_g_query.rate_work_g_insy_tb
        ) - parseFloat(sum_of_ci_rate09)
      ).toFixed(2);
      this.incomplete_rate_09 = incomplete_rate_09;

      let type_college_s = this.user.college_id_code_type_manpower;
      if (type_college_s == "6") {
        let official_rate_66 = ((90 * rate_66) / 100).toFixed(2);
        let civil_servant_rate_66 = ((10 * rate_66) / 100).toFixed(2);
        let sum_of_ci_rate66 = (90 * rate_66) / 100 + (10 * rate_66) / 100;
        this.official_rate_66 = official_rate_66;
        this.civil_servant_rate_66 = civil_servant_rate_66;
        let incomplete_rate_66 = parseFloat(
          parseFloat(
            this.rate_work_g_query.rate_work_g_sc_ta +
              this.rate_work_g_query.rate_work_g_sc_tb
          ) - parseFloat(sum_of_ci_rate66)
        ).toFixed(2);
        this.incomplete_rate_66 = incomplete_rate_66;
      } else {
        this.official_rate_66 = 0;
        this.civil_servant_rate_66 = 0;
        this.incomplete_rate_66 = 0;
      }

      let official_rate_sup;
      let rate_work_cal_room_dr = this.rate_work_college_cal_room_for_dr
        .rate_work_cal_room_dr;
      if (rate_std_00 > 479) {
        official_rate_sup = Math.round(
          (50 * ((8.5 * rate_work_cal_room_dr + 24.5) / 30)) / 100
        );
      } else {
        official_rate_sup = 0;
      }
      this.official_rate_sup = official_rate_sup;

      let civil_servant_rate_sub;
      if (rate_std_00 < 480) {
        civil_servant_rate_sub = Math.round(
          (8.5 * rate_work_cal_room_dr + 24.5) / 30
        );
      } else if (rate_std_00 >= 480) {
        civil_servant_rate_sub = Math.round(
          (8.5 * rate_work_cal_room_dr + 24.5) / 30 - official_rate_sup
        );
      }
      this.civil_servant_rate_sub = civil_servant_rate_sub;

      let incomplete_rate_sup;
      incomplete_rate_sup =
        parseInt(
          this.rate_work_g_query.rate_work_g_sup_ta +
            this.rate_work_g_query.rate_work_g_sup_tb
        ) -
        (civil_servant_rate_sub + official_rate_sup);
      this.incomplete_rate_sup = incomplete_rate_sup;
    },

    async cal_man_power_cri() {
      let criterion_sec_teach;
      let rate_sum_man_all = this.rate_work_college_cal_room_for_teach
        .rate_sum_man_all;
      criterion_sec_teach = Math.round((90 * rate_sum_man_all) / 100);
      this.criterion_sec_teach = criterion_sec_teach;

      let incomplete_rate_teach;
      incomplete_rate_teach = Math.round(
        rate_sum_man_all - criterion_sec_teach
      );
      this.incomplete_rate_teach = incomplete_rate_teach;

      let incomplete_rate_teach_result;
      let rate_teach_true =
        this.rate_work_g_query.sumteach_a + this.rate_work_g_query.sumteach_b;
      let sum_incomplete_rate_teach =
        criterion_sec_teach + incomplete_rate_teach;

      incomplete_rate_teach_result =
        rate_teach_true - sum_incomplete_rate_teach;
      this.incomplete_rate_teach_result = incomplete_rate_teach_result;
      /* incomplete_rate_teach_result =  */

      let rate_work_all_criterion;
      rate_work_all_criterion =
        this.criterion_dr +
        this.criterion_sec_dr +
        this.criterion_sec_teach +
        this.incomplete_rate_teach +
        this.official_rate_sup +
        this.civil_servant_rate_sub;
      this.rate_work_all_criterion = rate_work_all_criterion;

      let incomplete_rate_teach_result_all;
      incomplete_rate_teach_result_all =
        this.rate_work_g_query.sumall - this.rate_work_all_criterion;
      this.incomplete_rate_teach_result_all = incomplete_rate_teach_result_all;
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
    date_today() {
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, "0");
      let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      let yyyy = today.getFullYear();

      today = yyyy + "-" + mm + "-" + dd;
      return today;
    },
    year_now() {
      let today = new Date();
      let yyyy = today.getFullYear() + 543;
      today = yyyy;
      return today;
    },
    color() {
      return "teal darken-4";
    }
  }
};
</script>
