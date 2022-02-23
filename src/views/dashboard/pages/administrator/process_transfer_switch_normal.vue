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
    <v-container id="home_menu" fluid tag="section">
      <v-card>
        <v-toolbar flat color="primary" dark>
          <v-toolbar-title
            >ประมวลผลข้อมูลการย้าย 3 สับเปลี่ยนตำแหน่ง</v-toolbar-title
          >
        </v-toolbar>

        <v-card class="ma-2 pa-2">
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

            <v-col class="d-flex" cols="12" md="2">
              <v-select
                v-model="times_s"
                :items="period_match"
                item-text="period_times"
                label="ครั้งที่ :"
              ></v-select>
            </v-col>
            <v-col class="d-flex" cols="12" md="2">
              <v-select
                v-model="year_s"
                :items="period_match"
                item-text="period_yearbd"
                label="ปี :"
              ></v-select>
            </v-col>
            <v-col class="d-flex" cols="12" md="2">
              <v-btn
                elevation="2"
                rounded
                color="primary"
                dark
                x-large
                block
                @click="Switch_personnel()"
              >
                <v-icon>mdi-clipboard-check</v-icon> เลือกดำเนินการ</v-btn
              >
            </v-col>
            <v-col cols="12" md="2" class="text-right">
              <h1 class="text--right">ประมวลผล 3</h1>
            </v-col>
          </v-row>
        </v-card>
        <v-card flat>
          <v-data-table
            v-model="select_item"
            color="success"
            :loading="loading"
            :headers="headers"
            :items="conditions_transfers"
            :search="search"
            :items-per-page="20"
          >
            <template v-slot:[`item.select_item`]="{ item }">
              <v-checkbox v-model="search" :value="item.id_card_a"></v-checkbox>
            </template>

            <template v-slot:[`item.title_s_a`]="{ item }">
              <v-chip color="warning" dark>
                <span style="font-size:16px;">
                  {{
                    item.title_s_a + item.frist_name_a + " " + item.last_name_a
                  }}</span
                >
              </v-chip>
            </template>

            <template v-slot:[`item.title_s_b`]="{ item }">
              <v-chip color="info" dark>
                <span style="font-size:16px;">
                  {{
                    item.title_s_b + item.frist_name_b + " " + item.last_name_b
                  }}</span
                >
              </v-chip>
            </template>

            <template v-slot:[`item.college_name_a`]="{ item }">
              <v-chip color="warning" dark>
                <span style="font-size:16px;"> {{ item.college_name_a }}</span>
              </v-chip>
            </template>

            <template v-slot:[`item.college_name_b`]="{ item }">
              <v-chip color="info" dark>
                <span style="font-size:16px;"> {{ item.college_name_b }}</span>
              </v-chip>
            </template>

            <template v-slot:[`item.status_process`]="{ item }">
              <span v-if="item.id_card_a !== item.switch_position">
                <v-icon large color="green darken-2"
                  >mdi-clipboard-check</v-icon
                >
              </span>
              <span v-else>
                <v-icon large color="yellow lighten-1"
                  >mdi-clipboard-check-multiple</v-icon
                >
              </span>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
            <v-chip v-if="item.status_select_a==='demand' || item.status_select_b==='demand'" color="warning" dark>          
                <span style="font-size:16px;">รับย้าย</span>
              </v-chip>

              <v-chip v-else-if="item.status_select_a==='agree' || item.status_select_b==='agree'" color="warning" dark>          
                <span style="font-size:16px;">ปกติ</span>
              </v-chip>                 

          <v-icon
                v-else-if="item.id_card_a === item.switch_position"
                color="red"
                large
                >mdi-close-box</v-icon
              >
              <v-icon
                v-else-if="item.college_code_susss >= 1"
                color="red"
                large
                @click.stop="deletePosition(item.id_ref)"
                >mdi-delete-circle</v-icon
              >
              <v-icon
                color="green"
                large
                @click.stop="select_idPosition(item.id_ref)"
                v-else
              >
                mdi-credit-card-plus
              </v-icon>
            </template>

            <template v-slot:[`item.college_code_susss`]="{ item }">
              <v-chip :color="getColor(item.college_code_susss)" dark>
                <span style="font-size:16px;">
                  {{ item.college_code_susss }}</span
                >
              </v-chip>
            </template>

            <template v-slot:[`item.id_postion_susss`]="{ item }">
              <v-chip :color="getColor(item.id_postion_susss)" dark>
                <span style="font-size:16px;">
                  {{ item.id_postion_susss }}</span
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
        </v-card>
      </v-card>

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
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-card elevation="2" class="pa-2">
                        <h2>
                          รหัสอ้างอิง A:
                          {{ transference_personnels.tid_ref }}
                        </h2>
                        <h2>
                          รหัสบัตรประชาชน :
                          {{ transference_personnels.id_card }}
                        </h2>
                        <h4>
                          ชื่อ-นามสกุล : {{ transference_personnels.title_s
                          }}{{ transference_personnels.frist_name }}
                          {{ transference_personnels.last_name }}
                        </h4>
                        <h4>
                          สถานศึกษาปัจจุบัน :
                          {{ transference_personnels.college_name }} [
                          {{ transference_personnels.college_code }} ]
                        </h4>
                        <h4>
                          เลขที่ตำแหน่งปัจจุบัน :
                          {{ transference_personnels.id_position }}
                        </h4>
                      </v-card>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-card elevation="2" class="pa-2">
                        <h2>
                          รหัสอ้างอิง B :
                          {{ transference_personnels_b.tid_ref }}
                        </h2>
                        <h2>
                          รหัสบัตรประชาชน :
                          {{ personnel_temporarys.id_card }}
                        </h2>
                        <h4>
                          ชื่อ-นามสกุล : {{ personnel_temporarys.title_s
                          }}{{ personnel_temporarys.frist_name }}
                          {{ personnel_temporarys.last_name }}
                        </h4>
                        <h4>
                          สถานศึกษาปัจจุบัน :
                          {{ personnel_temporarys.college_name }} [
                          {{ personnel_temporarys.college_code }} ]
                        </h4>
                        <h4>
                          เลขที่ตำแหน่งปัจจุบัน :
                          {{ personnel_temporarys.id_position }}
                        </h4>
                      </v-card>
                    </v-col>
                  </v-row>
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

      <!-- V-model positiondialog -->
      <v-layout row justify-center>
        <v-dialog v-model="positiondialog" persistent max-width="80%">
          <v-card class="mx-auto pa-6">
            <base-material-card
              color="yellow"
              icon="mdi-clipboard-text"
              title="สลับตำแหน่ง"
              class="px-5 py-3 text_google"
            >
              <small>
                {{ transference_personnels.time_ss }}/{{
                  transference_personnels.year_ss
                }}</small
              >
            </base-material-card>
            <v-card-text>
              <v-form ref="updatepositionform" lazy-validation>
                <v-container grid-list-md>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-card elevation="2" class="pa-2">
                        <h2>
                          รหัสอ้างอิง A:
                          {{ transference_personnels.tid_ref }}
                        </h2>
                        <h2>
                          รหัสบัตรประชาชน :
                          {{ transference_personnels.id_card }}
                        </h2>
                        <h4>
                          ชื่อ-นามสกุล : {{ transference_personnels.title_s
                          }}{{ transference_personnels.frist_name }}
                          {{ transference_personnels.last_name }}
                        </h4>
                        <h4>
                          สถานศึกษาปัจจุบัน :
                          {{ transference_personnels.college_name }} [
                          {{ transference_personnels.college_code }} ]
                        </h4>
                        <h4>
                          เลขที่ตำแหน่งปัจจุบัน :
                          {{ transference_personnels.id_position }}
                        </h4>
                        <v-flex md12>
                          <v-select
                            v-model="transference_personnels.id_branch"
                            :items="personnel_educations"
                            item-text="name_branch"
                            item-value="id_branch"
                            required
                            :rules="[v => !!v || '']"
                          >
                          </v-select>
                        </v-flex>
                      </v-card>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-card elevation="2" class="pa-2">
                        <h2>
                          รหัสอ้างอิง B :
                          {{ transference_personnels_b.tid_ref }}
                        </h2>
                        <h2>
                          รหัสบัตรประชาชน :
                          {{ personnel_temporarys.id_card }}
                        </h2>
                        <h4>
                          ชื่อ-นามสกุล : {{ personnel_temporarys.title_s
                          }}{{ personnel_temporarys.frist_name }}
                          {{ personnel_temporarys.last_name }}
                        </h4>
                        <h4>
                          สถานศึกษาปัจจุบัน :
                          {{ personnel_temporarys.college_name }} [
                          {{ personnel_temporarys.college_code }} ]
                        </h4>
                        <h4>
                          เลขที่ตำแหน่งปัจจุบัน :
                          {{ personnel_temporarys.id_position }}
                        </h4>
                        <v-flex md12>
                          <v-select
                            v-model="personnel_educations_b.id_branch"
                            :items="personnel_educations_b"
                            item-text="name_branch"
                            item-value="id_branch"
                            required
                            :rules="[v => !!v || '']"
                          >
                          </v-select>
                        </v-flex>
                      </v-card>
                    </v-col>
                  </v-row>
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
                color="success"
                @click.stop="updatepositionSubmit()"
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
  name: "HrvecProcessTransfer",
  data() {
    return {
      select_item: [],
      singleSelect: true,
      selected: [],
      value: "4",
      loading: true,
      ApiKey: "HRvec2021",
      process_transfer: {},
      valid: true,
      times_s: "",
      year_s: "",
      row: null,
      man_powers: [],
      man_powers: [],
      snackbar: {
        show: false,
        color: "",
        timeout: 5000,
        icon: "",
        text: ""
      },
      headers: [
        { text: "เลือก", align: "left", value: "select_item" },
        { text: "ID A", align: "left", value: "id_card_a" },
        { text: "ชื่อ-นามสกุล", align: "left", value: "title_s_a" },
        { text: "วิทยาลัย A", align: "left", value: "college_name_a" },
        { text: "สถานะ", align: "center", value: "status_process" },
        { text: "ID B", align: "left", value: "switch_position" },
        { text: "ชื่อ-นามสกุล", align: "left", value: "title_s_b" },
        { text: "วิทยาลัย B", align: "left", value: "college_name_b" },
        {
          text: "ดำเนินการ",
          align: "center",
          value: "actions",
          icon: "mdi-file-document-edit"
        },
        { text: "Result", align: "center", value: "college_code_susss" }
      ],
      search: "",
      pagination: {},
      rowsperpage: [
        25,
        50,
        100,
        {
          text: "All",
          value: -1
        }
      ],
      conditions_transfers: [],
      period_match: [],
      delete_transference: [],
      conditions_branchs: [],
      transference_locations: [],
      transference_personnels: [],
      edittransference_location: [],
      positiondialog: false,
      deletetransference_locationdialog: false,
      canceldialog: false,
      conditons_transfer_successs: [],
      conditons_transfer_successs_b: [],
      transference_personnels_id_ref: [],
      man_powerss: [],
      updatepositions: {},
      updatepositions_b: {},
      updatepositions_condition: {},
      personnel_educations: [],
      personnel_temporarys: [],
      transference_personnels_b: [],
      personnel_educations_b: []
    };
  },

  async mounted() {
    await this.Switch_personnelAll();
    await this.period_QueryAll();
    await this.man_powerQuery();
  },

  methods: {
    async searchTimeYear() {
      this.loading = true;
      let result = await this.$http
        .post("process_transfer.php", {
          ApiKey: this.ApiKey,
          time_s: this.times_s,
          year_s: this.year_s,
          switchs_normal: "Ok"
        })
        .finally(() => (this.loading = false));
      this.conditions_transfers = result.data;
    },

    async man_powerQuery(college_code) {
      let man_power_result;
      man_power_result = await this.$http.post("man_power.php", {
        ApiKey: this.ApiKey,
        college_code: college_code
      });
      this.man_powers = man_power_result.data;
    },

    async Switch_personnelAll() {
      this.loading = true;
      let result = await this.$http
        .post("process_transfer.php", {
          ApiKey: this.ApiKey,
          switchs_normal: "Ok"
        })
        .finally(() => (this.loading = false));
      this.conditions_transfers = result.data;
    },

    async Switch_personnel() {
      this.loading = true;
      let result = await this.$http
        .post("process_transfer.php", {
          ApiKey: this.ApiKey,
          time_s: this.times_s,
          year_s: this.year_s,
          switchs_normal: "Ok"
        })
        .finally(() => (this.loading = false));
      this.conditions_transfers = result.data;
    },

    async period_QueryAll() {
      this.loading = true;
      let result = await this.$http
        .post("period.php", {
          ApiKey: this.ApiKey
        })
        .finally(() => (this.loading = false));
      this.period_match = result.data;
    },

    async select_idPosition(id_ref) {
      let result_tran = await this.$http
        .post("transference_personnel.php", {
          ApiKey: this.ApiKey,
          id_ref: id_ref
        })
        .finally(() => (this.loading = false));
      this.transference_personnels = result_tran.data;

      let result_personnel = await this.$http
        .post("personnel_temporary.php", {
          ApiKey: this.ApiKey,
          id_card: this.transference_personnels.switch_position
        })
        .finally(() => (this.loading = false));
      this.personnel_temporarys = result_personnel.data;

      let result_education = await this.$http
        .post("personnel_education.php", {
          ApiKey: this.ApiKey,
          id_card: this.transference_personnels.id_card
        })
        .finally(() => (this.loading = false));
      this.personnel_educations = result_education.data;

      let result_education_b = await this.$http
        .post("personnel_education.php", {
          ApiKey: this.ApiKey,
          id_card: this.transference_personnels.switch_position
        })
        .finally(() => (this.loading = false));
      this.personnel_educations_b = result_education_b.data;

      let result_tran_b = await this.$http
        .post("transference_personnel.php", {
          ApiKey: this.ApiKey,
          id_card: this.transference_personnels.switch_position,
          time_s: this.transference_personnels.time_ss,
          year_s: this.transference_personnels.year_ss
        })
        .finally(() => (this.loading = false));
      this.transference_personnels_b = result_tran_b.data;

      this.positiondialog = true;
      this.man_powerQuery();
    },

    async man_powerQuery() {
      let man_power_result;
      man_power_result = await this.$http.post("man_power.php", {
        ApiKey: this.ApiKey,
        college_code: this.conditions_branchs.college_code
      });
      this.man_powers = man_power_result.data;
    },

    async transference_locationDelete() {
      this.deletetransference_locationdialog = true;
    },
    async deletetransference_locationSubmit() {
      if (this.$refs.edituserform.validate()) {
        let result = await this.$http.post(
          "transference_location.delete.admin.php"
        );
        if (result.data.status == true) {
          this.conditions_transfers = result.data;
          this.snackbar.icon = "mdi-font-awesome";
          this.snackbar.color = "success";
          this.snackbar.text = "ลบข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.conditions_transferQueryAll();
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text = "ลบข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.deletetransference_locationdialog = false;
      }
    },

    async deletePosition(id_ref) {
      let result_con = await this.$http.post("transference_personnel.php", {
        ApiKey: this.ApiKey,
        id_ref: id_ref
      });
      this.transference_personnels = result_con.data;

      let result_personnel = await this.$http
        .post("personnel_temporary.php", {
          ApiKey: this.ApiKey,
          id_card: this.transference_personnels.switch_position
        })
        .finally(() => (this.loading = false));
      this.personnel_temporarys = result_personnel.data;

      let result_tran_b = await this.$http
        .post("transference_personnel.php", {
          ApiKey: this.ApiKey,
          id_card: this.transference_personnels.switch_position,
          time_s: this.transference_personnels.time_ss,
          year_s: this.transference_personnels.year_ss
        })
        .finally(() => (this.loading = false));
      this.transference_personnels_b = result_tran_b.data;

      let result_cts = await this.$http.post("conditons_transfer_success.php", {
        ApiKey: this.ApiKey,
        id_ref: id_ref
      });
      this.conditons_transfer_successs = result_cts.data;    

      let result_cts_b = await this.$http.post(
        "conditons_transfer_success.php",
        {
          ApiKey: this.ApiKey,
          id_card: this.transference_personnels.switch_position,
          time_s: this.transference_personnels.time_ss,
          year_s: this.transference_personnels.year_ss
        }
      );
      this.conditons_transfer_successs_b = result_cts_b.data;
   
      this.canceldialog = true;
    },

    async cancelSubmit() {
      if (this.$refs.cancelform.validate()) {
        this.conditons_transfer_successs.ApiKey = this.ApiKey;
        this.conditons_transfer_successs_b.ApiKey = this.ApiKey;     

        let result_cts = await this.$http.post(
          "conditons_transfer_success.delete.php",
          this.conditons_transfer_successs
        );

        let result_cts_b = await this.$http.post(
          "conditons_transfer_success.delete.php",
          this.conditons_transfer_successs_b
        );

        if (
          result_cts.data.status == true &&
          result_cts_b.data.status == true
        ) {
          this.snackbar.icon = "mdi-font-awesome";
          this.snackbar.color = "success";
          this.snackbar.text = "ยกเลิกข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.Switch_personnelAll();
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text = "ยกเลิกข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.canceldialog = false;
      }
    },

    /// updatepositionSubmit
    async updatepositionSubmit() {
      if (this.$refs.updatepositionform.validate()) {
        this.updatepositions.ApiKey = this.ApiKey;
        this.updatepositions.time_s = this.transference_personnels.time_ss;
        this.updatepositions.year_s = this.transference_personnels.year_ss;
        this.updatepositions.id_postion_old = this.transference_personnels.id_position;
        this.updatepositions.college_code_old = this.transference_personnels.college_code;
        this.updatepositions.id_card = this.transference_personnels.id_card;
        this.updatepositions.id_ref = this.transference_personnels.tid_ref;
        this.updatepositions.name_position = "ครู";
        this.updatepositions.college_code = this.personnel_temporarys.college_code;
        this.updatepositions.id_position = this.personnel_temporarys.id_position;
        this.updatepositions.id_branch = this.transference_personnels.id_branch;
        this.updatepositions.status_select = 'sw_normal';

        this.updatepositions_b.ApiKey = this.ApiKey;
        this.updatepositions_b.time_s = this.transference_personnels_b.time_ss;
        this.updatepositions_b.year_s = this.transference_personnels_b.year_ss;
        this.updatepositions_b.id_postion_old = this.personnel_temporarys.id_position;
        this.updatepositions_b.college_code_old = this.personnel_temporarys.college_code;
        this.updatepositions_b.id_card = this.personnel_temporarys.id_card;
        this.updatepositions_b.id_ref = this.transference_personnels_b.tid_ref;
        this.updatepositions_b.name_position = "ครู";
        this.updatepositions_b.college_code = this.transference_personnels.college_code;
        this.updatepositions_b.id_position = this.transference_personnels.id_position;
        this.updatepositions_b.id_branch = this.personnel_educations_b.id_branch;
        this.updatepositions_b.status_select = 'sw_normal';
        

      let result_a = await this.$http.post(
          "conditons_transfer_success.insert.php",
          this.updatepositions
        );

        let result_b = await this.$http.post(
          "conditons_transfer_success.insert.php",
          this.updatepositions_b
        );

        if (result_a.data.status == true && result_b.data.status == true) {
          this.snackbar.icon = "mdi-font-awesome";
          this.snackbar.color = "success";
          this.snackbar.text = "บันทึกข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.Switch_personnelAll();
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text = "บันทึกข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.positiondialog = false;
      }
    },

    getColor(calories) {  
      if (calories > 0) return "green";
      else return "";
    }
  },
  computed: {
    period_match_call() {
      let period_year = this.period_match.period_year;
      let period_times = this.period_match.period_times;
      let result = period_times + "/" + period_year;
      return result;
    },
    color() {
      return "brown darken-4";
    }
  }
};
</script>

<style lang="scss" scoped></style>
