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
              <v-select
                v-model="times_select"
                :items="time_ss"
                item-value="time_ss"
                :value="1"
                label="ครั้งที่ :"
              >
              </v-select>
            </v-col>
            <v-col cols="12" md="2">
              <v-select
                v-model="years_select"
                :items="year_ss"
                item-value="year_ss"
                :value="2565"
                label="ปีที่ :"
              >
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
          <template v-slot:[`item`]="{ item, index }">
            <tr>
              <td class="text-center">{{ index + 1 }}</td>
              <td class="text-center">{{ item.tid_ref }}</td>
              <td class="text-center">{{ item.id_card }}</td>
              <td class="text-center">{{ item.frist_name }}</td>
              <td class="text-center">{{ item.last_name }}</td>
              <td class="text-center">{{ item.time_ss }}</td>
              <td class="text-center">{{ item.year_ss }}</td>
              <td class="text-center">{{ item.age_app_time }}</td>
              <td class="text-center">{{ item.date_time }}</td>
              <td class="text-center">
                <v-chip
                  v-if="item.comment_dr_c === 'approp'"
                  color="green"
                  @click.stop="comment_idPosition(item.tid_ref)"
                  dark
                  >เห็นควร</v-chip
                >
                <v-chip
                  v-else-if="item.comment_dr_c === 'inapprop'"
                  color="red"
                  dark
                  @click.stop="comment_idPosition(item.tid_ref)"
                  >ไม่เห็นควร</v-chip
                >
                <v-icon
                  large
                  v-else
                  color="info"
                  @click.stop="comment_idPosition(item.tid_ref)"
                  >mdi-comment-processing</v-icon
                >
              </td>
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

      <!-- V-model edittransference_personneldialog -->
      <v-layout row justify-center>
        <v-dialog
          v-model="edittransference_personneldialog"
          persistent
          max-width="80%"
        >
          <v-card class="mx-auto pa-6">
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
                      <v-text-field
                        label="Password"
                        v-model="edittransference_personnel.p_word"
                        type="password"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        label="Confirm Password"
                        v-model="
                          edittransference_personnel.transference_personnel_confirmpassword
                        "
                        type="password"
                      ></v-text-field>
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
              <v-btn
                large
                @click.stop="edittransference_personneldialog = false"
                rounded
              >
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn
                large
                color="warning"
                @click.stop="edittransference_personnelSubmit()"
                rounded
              >
                <v-icon dark>mdi-pencil</v-icon>&nbsp;บันทึก
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model commentDrdialog -->
      <v-layout row justify-center>
        <v-dialog v-model="commentDrdialog" persistent max-width="80%">
          <v-card class="mx-auto pa-6">
            <base-material-card
              color="yellow"
              icon="mdi-clipboard-text"
              title="เพิ่มความคิดเห็นผู้อำนวยการ"
              class="px-5 py-3 text_google"
            ></base-material-card>
            <v-card-text>
              <v-form ref="updatecommentform" lazy-validation>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <h3>
                        รหัสอ้างอิง :
                        {{ transference_personnels_id_ref.tid_ref }}
                        {{ transference_personnels_id_ref.id_tfp }}
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
                      <v-text-field
                        type="number"
                        outlined
                        label=" 1.ปัจจุบันสถานศึกษามีครูผู้สอนในสาขาวิชาเดียวกับผู้ขอย้าย จำนวน :"
                        v-model="transference_personnels_id_ref.num_tech_tran_a"
                        required
                        :rules="[v => !!v || '']"
                      ></v-text-field>
                      <v-text-field
                        type="number"
                        outlined
                        label="2.หากผู้ขอย้ายได้ย้ายไปปฏิบัติหน้าที่แห่งใหม่มีครูผู้สอนในสาขาวิชาเดียวกับผู้ขอย้าย จำนวน :"
                        v-model="transference_personnels_id_ref.num_tech_tran_b"
                        required
                        :rules="[v => !!v || '']"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="12">
                      <v-alert
                        class="mx-auto text-center pa-2 ma-2"
                        border="top"
                        colored-border
                        type="info"
                        elevation="2"
                      >
                        <h2>
                          หากผู้ขอย้ายได้ย้ายไปปฏิบัติหน้าที่แห่งใหม่
                          สถานศึกษามีครูผู้สอนในสาขาเดียวกับผู้ขอย้ายเพียงพอหรือไม่
                        </h2>

                        <h2>
                          <v-radio-group
                            v-model="transference_personnels_id_ref.com_enough"
                            row
                            required
                            :rules="[v => !!v || '']"
                            align="center"
                          >
                            <v-radio value="enough">
                              <template v-slot:label>
                                <div>
                                  <strong class="primary--text">เพียงพอ</strong>
                                </div>
                              </template>
                            </v-radio>
                            <v-radio value="not_enough">
                              <template v-slot:label>
                                <div>
                                  <strong class="warning--text"
                                    >ไม่เพียงพอ</strong
                                  >
                                </div>
                              </template>
                            </v-radio>
                          </v-radio-group>
                        </h2>
                      </v-alert>
                    </v-col>

                    <v-col cols="12" md="12">
                      <v-alert
                        class="mx-auto text-center pa-2 ma-2"
                        border="top"
                        colored-border
                        type="info"
                        elevation="2"
                      >
                        <h2>ความคิดเห็น</h2>

                        <h2>
                          <v-radio-group
                            v-model="
                              transference_personnels_id_ref.comment_dr_c
                            "
                            row
                            required
                            :rules="[v => !!v || '']"
                            align="center"
                          >
                            <v-radio value="approp">
                              <template v-slot:label>
                                <div>
                                  <strong class="primary--text"
                                    >เห็นควรให้ย้าย</strong
                                  >
                                </div>
                              </template>
                            </v-radio>
                            <v-radio value="inapprop">
                              <template v-slot:label>
                                <div>
                                  <strong class="warning--text"
                                    >ไม่เห็นควรให้ย้าย</strong
                                  >
                                </div>
                              </template>
                            </v-radio>
                          </v-radio-group>
                        </h2>
                      </v-alert>
                    </v-col>

                    <v-col cols="12" md="6">
                      <v-autocomplete
                        :items="branch_s"
                        item-text="name_branch"
                        item-value="id_branch"
                        outlined
                        label="สาขาวิชารับย้าย :"
                        v-model="transference_personnels_id_ref.id_branch"
                        @change="branch_sub_d_select()"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-autocomplete
                        :items="branch_sub_ds_select"
                        item-text="name_sub_branch"
                        item-value="id_branch_sub"
                        outlined
                        label="วุฒิการศึกษา :"
                        v-model="transference_personnels_id_ref.tran_id_branch_sub"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" md="12">
                      <v-text-field
                        outlined
                        label=" ไม่เห็นควรให้ย้ายเนื่องจาก:"
                        v-model="transference_personnels_id_ref.detail_comment"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn large @click.stop="commentDrdialog = false" rounded>
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn
                large
                color="green"
                @click.stop="updatecommentSubmit()"
                rounded
              >
                <v-icon dark>mdi-content-save</v-icon>&nbsp;บันทึก
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
        <v-card-text>
          {{ snackbar.text }}
        </v-card-text>

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
      edittransference_personneldialog: false,
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
      transference_personnels: [],
      edittransference_personnel: {},
      search: "",
      pagination: {},
      headers: [
        { text: "#", align: "center", value: "index" },
        { text: "อ้างอิง", align: "center", value: "tid_ref" },
        { text: "รหัสบัตรประชาชน", align: "center", value: "id_card" },
        { text: "ชื่อ", align: "center", value: "frist_name" },
        { text: "นามสกุล", align: "center", value: "last_name" },
        { text: "ครั้งที่", align: "center", value: "time_ss" },
        { text: "ปีที่", align: "center", value: "year_ss" },
        { text: "อายุงาน ณ ปัจจุบัน", align: "center", value: "age_app_time" },
        { text: "วันที่ทำรายการ", align: "center", value: "date_time" },
        { text: "ดำเนินการ", align: "center", value: "actions" }
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
      transference_personnelstatus: [],
      userstatus: {},
      commentDrdialog: false,
      transference_personnels_id_ref: [],
      regions: [],
      periods: [],
      period_enable: "1",
      updatecomment: {},
      branch_s: [],
      branch_sub_ds_select:[],
      branchs_id_sub:[],
    };
  },
  async mounted() {
    await this.transference_personnelQueryAll();
    let result_branch;
    result_branch = await this.$http.post("branch.php", {
      ApiKey: this.ApiKey
    });
    this.branch_s = result_branch.data;
    this.periodQuery();
  },
  methods: {

async branch_sub_d_select() {
      this.loading = true;
      let result = await this.$http
        .post("branch_sub_d.php", {
          ApiKey: this.ApiKey,
          id_main_branch: this.transference_personnels_id_ref.id_branch
        })
        .finally(() => (this.loading = false));
      this.branch_sub_ds_select = result.data;
    },     

    async periodQuery() {
      let result_period;
      result_period = await this.$http.post("period.php", {
        ApiKey: this.ApiKey,
        period_enable: this.period_enable
      });
      this.periods = result_period.data;
    },

    async searchTimeYear() {
      this.loading = true;
      let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
      let result = await this.$http
        .post("transference_personnel.php", {
          ApiKey: this.ApiKey,
          time_s: this.times_select,
          year_s: this.years_select,
          user_name: userSession.user_name
        })
        .finally(() => (this.loading = false));
      this.transference_personnels = result.data;
    },

    async comment_idPosition(tid_ref) {
      let result_con = await this.$http.post("transference_personnel.php", {
        ApiKey: this.ApiKey,
        id_ref: tid_ref
      });
      this.transference_personnels_id_ref = result_con.data;
      this.commentDrdialog = true;
    },

    async transference_personnelQueryAll() {
      this.loading = true;
      let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
      let result = await this.$http
        .post("transference_personnel.php", {
          ApiKey: this.ApiKey,
          user_name: userSession.user_name
        })
        .finally(() => (this.loading = false));
      this.transference_personnels = result.data;
    },
    async updatecommentSubmit() {
      if (this.$refs.updatecommentform.validate()) {
        this.updatecomment.ApiKey = this.ApiKey;
        this.updatecomment.id_tfp = this.transference_personnels_id_ref.id_tfp;
        this.updatecomment.comment_dr_c = this.transference_personnels_id_ref.comment_dr_c;
        this.updatecomment.id_branch = this.transference_personnels_id_ref.id_branch;
        this.updatecomment.detail_comment = this.transference_personnels_id_ref.detail_comment;
        this.updatecomment.num_tech_tran_a = this.transference_personnels_id_ref.num_tech_tran_a;
        this.updatecomment.num_tech_tran_b = this.transference_personnels_id_ref.num_tech_tran_b;
        this.updatecomment.com_enough = this.transference_personnels_id_ref.com_enough;
        this.updatecomment.tran_id_branch_sub = this.transference_personnels_id_ref.tran_id_branch_sub;
console.log(this.updatecomment)
        let result = await this.$http.post(
          "transference_personnel.update.php",
          this.updatecomment
        );

        if (result.data.status == true) {
          this.snackbar.icon = "mdi-font-awesome";
          this.snackbar.color = "success";
          this.snackbar.text = "บันทึกข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.transference_personnelQueryAll();
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text = "บันทึกข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.commentDrdialog = false;
      }
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
    }
  }
};
</script>
