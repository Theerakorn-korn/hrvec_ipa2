<template>
  <div>
    <v-container id="home_menu" fluid tag="section">
      <v-card>
        <v-toolbar flat color="primary" dark>
          <v-toolbar-title
            >ประมวลผลข้อมูลการย้าย แบบที่ 3 สับเปลี่ยนตำแหน่ง</v-toolbar-title
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
            <v-col cols="12" md="2">
              <v-btn
                rounded
                large
                block
                color="info"
                to="/admin/transference_personnel"
                >ประมวลผลแบบที่ 1
              </v-btn>
            </v-col>
            <v-col cols="12" md="2">
              <v-btn
                rounded
                large
                block
                color="info"
                to="/admin/process_transfer"
                >ประมวลผลแบบที่ 2
              </v-btn>
            </v-col>
            <v-col cols="12" md="2" class="text-right">
              <h1 class="text--right">ประมวลผลแบบที่ 3</h1>
            </v-col>
          </v-row>
        </v-card>

        <v-card flat>
          <v-data-table
            color="success"
            :loading="loading"
            :headers="headers"
            :items="conditions_transfers"
            :search="search"
            :items-per-page="20"
          >
            <template v-slot:[`item.title_sa`]="{ item }">
              <v-chip color="warning" dark>
                <span style="font-size:16px;">
                  {{
                    item.title_sa + item.frist_namea + " " + item.last_namea
                  }}</span
                >
              </v-chip>
            </template>

            <template v-slot:[`item.title_sb`]="{ item }">
              <v-chip color="info" dark>
                <span style="font-size:16px;">
                  {{
                    item.title_sb + item.frist_nameb + " " + item.last_nameb
                  }}</span
                >
              </v-chip>
            </template>

            <template v-slot:[`item.college_namea`]="{ item }">
              <v-chip color="warning" dark>
                <span style="font-size:16px;"> {{ item.college_namea }}</span>
              </v-chip>
            </template>

            <template v-slot:[`item.college_name`]="{ item }">
              <v-chip color="warning" dark>
                <span style="font-size:16px;"> {{ item.college_name }}</span>
              </v-chip>
            </template>

            <template v-slot:[`item.college_nameb`]="{ item }">
              <v-chip color="info" dark>
                <span style="font-size:16px;">
                  {{ item.college_nameb }}</span
                >
              </v-chip>
            </template>

            <template v-slot:[`item.status_process`]="{ item }">
              <span
                v-if="
                  item.personnel_num_s <= 1 &&
                    item.condition_edu === item.personnel_edu
                "
                ><v-icon large color="green darken-2"
                  >mdi-clipboard-check</v-icon
                ></span
              >
              <span v-else
                ><v-icon large color="yellow lighten-1"
                  >mdi-clipboard-check-multiple</v-icon
                ></span
              >
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon
                v-if="item.college_code_susss >= 1"
                color="red"
                large
                @click.stop="deletePosition(item.id_ref)"
                >mdi-delete-circle</v-icon
              >

              <v-icon
                color="green"
                large
                @click.stop="
                  select_idPosition(item.id_cb, item.id_tfl, item.id_tfp)
                "
                v-else-if="
                  item.personnel_num_s <= 1 &&
                    item.condition_edu === item.personnel_edu
                "
              >
                mdi-credit-card-plus
              </v-icon>

              <v-icon
                color="yellow"
                large
                @click.stop="
                  select_idPosition(item.id_cb, item.id_tfl, item.id_tfp)
                "
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
                {{ conditons_transfer_successs.id_cts }}
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md6>
                      <p>
                        รหัสอ้างอิง :
                        {{ transference_personnels_id_ref.id_ref }}
                      </p>
                      <div>
                        รหัสบัตรประชาชน :
                        {{ transference_personnels_id_ref.id_card }}
                        ชื่อ-นามสกุล :
                        {{ transference_personnels_id_ref.title_s
                        }}{{ transference_personnels_id_ref.frist_name }}
                        {{ transference_personnels_id_ref.last_name }}
                      </div>
                      สถานศึกษาปัจจุบัน :
                      {{ transference_personnels_id_ref.college_name }}
                      เลขที่ตำแหน่งปัจจุบัน :
                      {{ transference_personnels_id_ref.id_position }}
                    </v-flex>
                    <v-flex md6>
                      <p>
                        รหัสวิทยาลัยปลายทาง : {{ man_powerss.college_code }}
                      </p>
                      <div>วิทยาลัย : {{ man_powerss.college_name }}</div>
                      เลขที่ตำแหน่ง : {{ man_powerss.id_position }}
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

      <!-- V-model deletetransference_locationdialog -->
      <v-layout row justify-center>
        <v-dialog
          v-model="deletetransference_locationdialog"
          persistent
          max-width="80%"
        >
          <v-card class="mx-auto pa-6">
            <base-material-card
              color="yellow"
              icon="mdi-clipboard-text"
              title="ลบรายการที่ไม่ได้ดำเนินรายการเรียบร้อย"
              class="px-5 py-3 text_google"
            ></base-material-card>
            <v-card-text>
              <v-form ref="edituserform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap> </v-layout>
                </v-container>
                <small>* จำเป็น</small>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                large
                @click.stop="deletetransference_locationdialog = false"
                rounded
              >
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn
                large
                color="warning"
                @click.stop="deletetransference_locationSubmit()"
                rounded
              >
                <v-icon dark>mdi-pencil</v-icon>&nbsp;ยืนยันการลบ
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
              title="เลือกตำแหน่ง"
              class="px-5 py-3 text_google"
            ></base-material-card>
            <v-card-text>
              <v-form ref="updatepositionform" lazy-validation>
                <v-container grid-list-md>
                  <!--  {{conditions_branchs.id_cb}}
                      {{transference_locations.id_tfl}}
                      {{transference_personnels.id_tfp}} -->
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-card elevation="2" class="pa-2">
                        <h2>
                          สถานศึกษา : {{ transference_locations.college_name }}
                        </h2>
                        <h4>
                          รหัสสาขาวิชาเอก : {{ conditions_branchs.id_branch }}
                        </h4>
                        <h4>
                          สาขาวิชาเอก : {{ conditions_branchs.name_branch }}
                        </h4>
                        <h4>
                          รหัสสถานศึกษา :
                          {{ transference_locations.college_code }}
                        </h4>
                      </v-card>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-card elevation="2" class="pa-2">
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
                  </v-row>
                  <v-layout wrap>
                    <v-flex md12>
                      <v-autocomplete
                        :items="man_powers"
                        item-text="college_position_case"
                        item-value="id_position"
                        label="เลขที่ตำแหน่ง"
                        v-model="updatepositions.id_position"
                        required
                        :rules="[v => !!v || '']"
                      ></v-autocomplete>
                    </v-flex>
                  </v-layout>
                </v-container>
                <small>* จำเป็น</small>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn large @click.stop="positiondialog = false" rounded>
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn
                large
                color="warning"
                @click.stop="updatepositionSubmit()"
                rounded
              >
                <v-icon dark>mdi-pencil</v-icon>&nbsp;บันทึก
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
        { text: "ID A", align: "left", value: "id_carda" },
        { text: "ชื่อ-นามสกุล", align: "left", value: "title_sa" },
        { text: "รหัส", align: "left", value: "id_branch" },
        { text: "สาขา", align: "left", value: "name_branch" },
        { text: "วิทยาลัย A", align: "left", value: "college_namea" },
        { text: "สถานะ", align: "center", value: "status_process" },
        { text: "ID B", align: "left", value: "id_cardb" },
        { text: "ชื่อ-นามสกุล", align: "left", value: "title_sb" },
        { text: "วิทยาลัย B", align: "left", value: "college_nameb" },

        { text: "คะแนน", align: "center", value: "point_s" },
        { text: "อายุงาน ณ ปัจจบัน", align: "center", value: "age_app_time" },       
        {
          text: "เลขที่ตำแหน่ง",
          align: "center",
          value: "actions",
          icon: "mdi-file-document-edit"
        },
        { text: "แห่งใหม่", align: "center", value: "college_code_susss" },
        /*  {
          text: "สถานศึกษาแห่งใหม่",
          align: "center",
          value: "college_name_suss"
        }, */
        { text: "เลขที่", align: "center", value: "id_postion_susss" }
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
      transference_personnels_id_ref: [],
      man_powerss: [],
      updatepositions: {},
      updatepositions_condition: {}
    };
  },

  async mounted() {
    //await this.conditions_transferQueryAll();
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
          year_s: this.year_s
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
          switchs: "Ok"
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
          switchs: "Ok"
        })
        .finally(() => (this.loading = false));
      this.conditions_transfers = result.data;
    },

    async conditions_transferQueryAll() {
      this.loading = true;
      let result = await this.$http
        .post("process_transfer.php", {
          ApiKey: this.ApiKey
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

    async select_idPosition(id_cb, id_tfl, id_tfp) {
      let result_con = await this.$http.post("conditions_branch.php", {
        ApiKey: this.ApiKey,
        id_cb: id_cb
      });
      this.conditions_branchs = result_con.data;

      let result_loca = await this.$http.post("transference_location.php", {
        ApiKey: this.ApiKey,
        id_tfl: id_tfl
      });
      this.transference_locations = result_loca.data;

      let result_tran = await this.$http
        .post("transference_personnel.php", {
          ApiKey: this.ApiKey,
          id_tfp: id_tfp
        })
        .finally(() => (this.loading = false));

      this.transference_personnels = result_tran.data;
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

      this.transference_personnels_id_ref = result_con.data;

      let result_man = await this.$http.post("man_power.php", {
        ApiKey: this.ApiKey,
        id_card: this.transference_personnels_id_ref.id_card
      });
      this.man_powerss = result_man.data;

      let result_cts = await this.$http.post("conditons_transfer_success.php", {
        ApiKey: this.ApiKey,
        id_ref: id_ref
      });

      this.conditons_transfer_successs = result_cts.data;
      this.canceldialog = true;
    },

    async cancelSubmit() {
      if (this.$refs.cancelform.validate()) {
        this.man_powerss.ApiKey = this.ApiKey;
        this.man_powerss.status_booking = "";
        this.conditons_transfer_successs.ApiKey = this.ApiKey;
        let result_man = await this.$http.post(
          "man_power.update_process.php",
          this.man_powerss
        );
        let result_cts = await this.$http.post(
          "conditons_transfer_success.delete.php",
          this.conditons_transfer_successs
        );

        if (result_man.data.status == true && result_cts.data.status == true) {
          this.snackbar.icon = "mdi-font-awesome";
          this.snackbar.color = "success";
          this.snackbar.text = "ยกเลิกข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.conditions_transferQueryAll();
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
        this.updatepositions.college_code = this.transference_locations.college_code;
        this.updatepositions.id_branch = this.conditions_branchs.id_branch;
        this.updatepositions.id_card = this.transference_personnels.id_card;
        this.updatepositions.id_ref = this.transference_personnels.tid_ref;
        this.updatepositions.name_position = "ครู";

        // transference_personnels_id_ref.id_position

        this.updatepositions_condition.ApiKey = this.ApiKey;
        this.updatepositions_condition.id_position = this.updatepositions.id_position;
        this.updatepositions_condition.status_booking = this.transference_personnels.id_card;

        // console.log(this.updatepositions)
        // console.log(this.updatepositions_condition)
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
          this.conditions_transferQueryAll();
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
      /*  if (calories > 400) return 'red'
        else if (calories > 200) return 'orange'
        else return 'green'  */

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
    }
  }
};
</script>

<style lang="scss" scoped></style>
