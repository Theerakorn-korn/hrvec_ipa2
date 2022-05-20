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
 <v-btn to="/college/rate_workforce_report">
        <span>รายงานผลอัตรากำลัง </span>
        <v-icon>mdi-numeric-5-box</v-icon>
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
                          <v-col cols="12" md="12">
                            <h3>
                              <v-select
                                filled
                                v-model="select"
                                :items="items"
                                item-value="state"
                                item-text="state"
                                @change="rate_work_g_search()"
                                label="ปีการศึกษา พ.ศ.  : "
                                :hint="`อัตรากำลังปี : ,${select.state}, ${select.abbr}`"
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
                                                
                                              </td>
                                              <td class="text-center ">
                                                {{
                                                  rate_work_g_query.rate_criterion_dr
                                                }}
                                              </td>
                                              <td
                                                class="text-center grey lighten-1"
                                                rowspan="2"
                                              >
                                               
                                              </td>
                                              <td class="text-center">
                                                {{
                                                  rate_work_g_query.rate_criterion_incomplete_dr
                                                }}
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
                                                 {{
                                                  rate_work_g_query.rate_criterion_sedr
                                                }}
                                              </td>
                                              <td class="text-center">
                                               {{
                                                  rate_work_g_query.rate_criterion_incomplete_sedr
                                                }}
                                              </td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
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
                                                  rate_work_g_query.rate_teach_official_all
                                                }}
                                              </td>
                                              <td
                                                class="text-center green lighten-1 white--text"
                                              >
                                                {{
                                                  rate_work_g_query.rate_teach_civil_all
                                                }}
                                              </td>
                                              <td
                                                class="text-center cyan lighten-2 white--text"
                                              >
                                                 {{
                                                  rate_work_g_query.rate_criterion_teach_all
                                                }}
                                              </td>
                                              <td
                                                class="text-center cyan lighten-2 white--text"
                                              >
                                                {{
                                                  rate_work_g_query.rate_criterion_teach_alls
                                                }}
                                              </td>
                                              <td
                                                class="text-center blue darken-1 white--text"
                                              >
                                                 {{
                                                  rate_work_g_query.rate_criterion_incomplete_teach_all
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
                                               {{
                                                  rate_work_g_query.rate_work_g_gs_ta_official
                                                }}
                                              </td>
                                              <td class="text-center">
                                                {{
                                                  rate_work_g_query.rate_work_g_gs_tb_civil
                                                }}
                                              </td>
                                              <td class="text-center">
                                                 {{
                                                  rate_work_g_query.rate_work_g_gs_incomplete
                                                }}
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
                                                {{
                                                  rate_work_g_query.rate_work_g_is_ta_official
                                                }}
                                              </td>
                                              <td class="text-center">
                                                {{
                                                  rate_work_g_query.rate_work_g_is_tb_civil
                                                }}
                                              </td>
                                              <td class="text-center">
                                                  {{
                                                  rate_work_g_query.rate_work_g_is_incomplete
                                                }}
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
                                               {{
                                                  rate_work_g_query.rate_work_g_cm_ta_official
                                                }}
                                              </td>
                                              <td class="text-center">
                                                {{
                                                  rate_work_g_query.rate_work_g_cm_tb_civil
                                                }}
                                              </td>
                                              <td class="text-center">
                                                {{
                                                  rate_work_g_query.rate_work_g_cm_incomplete
                                                }}
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
                                                {{
                                                  rate_work_g_query.rate_work_g_art_ta_official
                                                }}
                                              </td>
                                              <td class="text-center">
                                               {{
                                                  rate_work_g_query.rate_work_g_art_tb_civil
                                                }}
                                              </td>
                                              <td class="text-center">
                                               {{
                                                  rate_work_g_query.rate_work_g_art_incomplete
                                                }}
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
                                               {{
                                                  rate_work_g_query.rate_work_g_em_ta_official
                                                }}
                                              </td>
                                              <td class="text-center">
                                                 {{
                                                  rate_work_g_query.rate_work_g_em_tb_civil
                                                }}
                                              </td>
                                              <td class="text-center">
                                              {{
                                                  rate_work_g_query.rate_work_g_em_incomplete
                                                }}
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
                                               {{
                                                  rate_work_g_query.rate_work_g_ag_ta_official
                                                }}
                                              </td>
                                              <td class="text-center">
                                               {{
                                                  rate_work_g_query.rate_work_g_ag_tb_civil
                                                }}
                                              </td>
                                              <td class="text-center">
                                            {{
                                                  rate_work_g_query.rate_work_g_ag_incomplete
                                                }}
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
                                                 {{
                                                  rate_work_g_query.rate_work_g_fish_ta_official
                                                }}
                                              </td>
                                              <td class="text-center">
                                               {{
                                                  rate_work_g_query.rate_work_g_fish_tb_civil
                                                }}
                                              </td>
                                              <td class="text-center">
                                                 {{
                                                  rate_work_g_query.rate_work_g_fish_incomplete
                                                }}
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
                                                {{
                                                  rate_work_g_query.rate_work_g_tour_ta_official
                                                }}
                                              </td>
                                              <td class="text-center">
                                               {{
                                                  rate_work_g_query.rate_work_g_tour_tb_civil
                                                }}
                                              </td>
                                              <td class="text-center">
                                               {{
                                                  rate_work_g_query.rate_work_g_tour_incomplete
                                                }}
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
                                                {{
                                                  rate_work_g_query.rate_work_g_textile_ta_official
                                                }}
                                              </td>
                                              <td class="text-center">
                                                {{
                                                  rate_work_g_query.rate_work_g_textile_tb_civil
                                                }}
                                              </td>
                                              <td class="text-center">
                                                {{
                                                  rate_work_g_query.rate_work_g_textile_incomplete
                                                }}
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
                                               {{
                                                  rate_work_g_query.rate_work_g_insy_ta_official
                                                }}
                                              </td>
                                              <td class="text-center">
                                              {{
                                                  rate_work_g_query.rate_work_g_insy_tb_civil
                                                }}
                                              </td>
                                              <td class="text-center">
                                            {{
                                                  rate_work_g_query.rate_work_g_insy_incomplete
                                                }}
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
                                           {{
                                                  rate_work_g_query.rate_work_g_sc_ta_official
                                                }}
                                              </td>
                                              <td class="text-center">
                                            {{
                                                  rate_work_g_query.rate_work_g_sc_tb_civil
                                                }}
                                              </td>
                                              <td class="text-center">
                                             {{
                                                  rate_work_g_query.rate_work_g_sc_incomplete
                                                }}
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
                                                {{
                                                  rate_work_g_query.rate_work_g_sup_ta_official
                                                }}
                                              </td>
                                              <td class="text-center">
                                               {{
                                                  rate_work_g_query.rate_work_g_sup_tb_civil
                                                }}
                                              </td>
                                              <td class="text-center">
                                             {{
                                                  rate_work_g_query.rate_work_g_sup_incomplete
                                                }}
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
                                                  {{ rate_work_g_query.rate_man_power_all }}
                                                </h3>
                                              </td>

                                              <td
                                                class="text-center cyan lighten-2 white--text"
                                              >
                                            {{ rate_work_g_query.rate_criterion_all }}
                                              </td>
                                              <td
                                                class="text-center cyan lighten-2 white--text"
                                              ></td>
                                              <td
                                                class="text-center cyan lighten-2 white--text"
                                              >
                                              {{ rate_work_g_query.rate_criterion_incomplete_all }}
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
                                    v-if="period_colleges.period_college_enable ==='1' && period_colleges.period_college_type ==='update_college'"
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
      select: { state: "2565", abbr: "2022" },
      items: [        
        { state: "2565", abbr: "2022" },
        { state: "2566", abbr: "2023" },
        { state: "2567", abbr: "2024" },
        { state: "2568", abbr: "2025" },
        { state: "2569", abbr: "2026" },
        { state: "2570", abbr: "2027" },
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
      period_colleges:[],
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
    await this.period_collegeQuery();
    await this.rate_work_gQueryAll();
  },

  methods: {

  
     async period_collegeQuery() {
       let result_period_college;
    result_period_college = await this.$http.post("period_college.php", {
      ApiKey: this.ApiKey,
      period_college_enable: "1",
      period_college_type: "update_college"
    });
    this.period_colleges = result_period_college.data;    
   /*  console.log(result_period_college.data) */
    },


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
    },   

     async rate_work_g_search() {
      this.loading = true;
      let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
      let result = await this.$http
        .post("rate_work_g.php", {
          ApiKey: this.ApiKey,
          rate_work_g_college_code: userSession.user_name,
          rate_work_g_year: this.select.state
        })
        .finally(() => (this.loading = false));
      this.rate_work_g_query = result.data;
      /* console.log(result.data); */     
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
