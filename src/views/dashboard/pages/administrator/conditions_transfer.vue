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
              <v-btn
                class="ma-2"
                color="success"
                large
                @click="searchTimeYear()"
              >
                ค้นหา</v-btn
              >
            </v-col>
            <v-col cols="12" md="12">
              <v-btn
                class="ma-2"
                color="warning"
                large
                @click="search_confirm()"
              >
                สถานศึกษายังไม่ได้ยืนยัน</v-btn
              >
              <v-btn
                class="ma-2"
                color="red"
                large
                @click="search_not_submit()"
              >
                สถานศึกษาไม่ได้ดำเนินการ</v-btn
              >
              <v-btn
                class="ma-2"
                color="red"
                large
                @click="search_not_submit_but()"
              >
                สถานศึกษา [ มีตำแหน่ง ] ไม่ได้ดำเนินการ</v-btn
              >
            </v-col>
            <v-col cols="12" md="4"> </v-col>
          </v-row>
        </v-card>
        <v-data-table
          color="success"
          :loading="loading"
          :headers="headers"
          :items="conditions_transfers"
          :search="search"
        >
          <template v-slot:[`item.select_item`]="{ item }">
            <v-checkbox
              v-model="search"
              :value="item.college_code"
            ></v-checkbox>
          </template>
          <template v-slot:[`item.cancel_row`]="{ item }">
            <v-chip v-if="item.count_idref === '0'">
              ทำรายการไม่สำเร็จ
            </v-chip>

            <v-chip v-else-if="item.action_sub === 'not_submit'">
              ไม่ได้ทำรายการ
            </v-chip>

            <v-chip v-else-if="item.action_sub === 'not_submit_but'">
              ไม่ได้ทำรายการ(มีอัตราว่าง)
            </v-chip>

            <v-btn
              v-else
              color="red"
              @click="cancel_condition(item.id_ref)"
              fab
              x-small
            >
              <v-icon>
                mdi-delete
              </v-icon>
            </v-btn>
          </template>
          <template v-slot:[`item.date_time`]="{ item }">
            <span v-if="item.count_idref === '0'">
              <h2 class="red--text">ยังไม่ได้ดำเนินการยืนยัน</h2>
            </span>

            <span v-else-if="item.action_sub === 'not_submit'">
              <h2 class="red--text">ไม่ได้ทำรายการ</h2>
            </span>

            <span v-if="item.action_sub === 'not_submit_but'">
              <h2 class="red--text">ไม่ได้ทำรายการมีอัตราว่าง</h2>
            </span>

            <span v-else>
              {{ item.date_time }}
            </span>
          </template>

          <template v-slot:[`item.status_confirm`]="{ item }">
            <v-chip
              v-if="item.status_confirm === 'receive'"
              color="green"
              @click="receive_cancel(item.id_ref)"
              dark
            >
              ได้รับแล้ว
            </v-chip>

            <v-chip
              v-else-if="item.status_confirm === 'receive_but'"
              color="warning"
              @click="receive_cancel(item.id_ref)"
              dark
            >
              ไม่สมูรณ์
            </v-chip>

            <v-chip
              v-else-if="item.status_confirm === 'dt_receive'"
              color="red"
              @click="receive_cancel(item.id_ref)"
              dark
            >
              ไม่ได้รับ
            </v-chip>

            <v-btn
              v-else
              color="info"
              @click="receive_status(item.id_ref)"
              fab
              x-small
            >
              <v-icon>
                mdi-message-alert
              </v-icon>
            </v-btn>
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

      <!-- V-model deletecondition_transfer_dialog -->
      <v-layout>
        <v-dialog
          v-model="deletecondition_transfer_dialog"
          persistent
          max-width="40%"
        >
          <v-card class="mx-auto pa-5">
            <base-material-card
              color="error"
              icon="mdi-delete"
              title="ลบข้อมูล"
              class="px-5 py-3 text_google"
            >
            </base-material-card>

            <v-card-text class="text_google">
              <v-card>
                <v-card-text>
                  <v-form ref="deleteconditions_transer_form" lazy-validation>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12>
                          ยืนยันการลบรายการ
                          {{ conditions_transfers_select.id_ref }} :
                          {{ conditions_transfers_select.college_code }}
                          <h2>
                            {{ conditions_transfers_select.college_name }}
                          </h2>
                        </v-flex>
                        <v-flex>
                          <v-text-field
                            label="Password ?"
                            v-model="conditions_transfers_select.password_b"
                            required
                            :rules="[v => v == '0612698358']"
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show1 ? 'text' : 'password'"
                            @click:append="show1 = !show1"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn large @click.stop="deletecondition_transfer_dialog = false"
                ><v-icon dark>mdi-close</v-icon>ยกเลิก</v-btn
              >
              <v-btn
                large
                color="red darken-3"
                @click.stop="delete_conditions_transfer_Submit()"
                dark
              >
                <v-icon dark>mdi-delete</v-icon>&nbsp;ลบ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- receive_dialog -->
      <v-layout>
        <v-dialog v-model="receive_dialog" persistent max-width="60%">
          <v-card class="mx-auto pa-5">
            <base-material-card
              color="green"
              icon="mdi-clipboard-text"
              title="ได้รับเอกสารแล้ว"
              class="px-5 py-3 text_google"
            >
            </base-material-card>
            <v-card-text class="text_google">
              <v-card>
                <v-card-text>
                  <v-form ref="receive_dialog_form" lazy-validation>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12>
                          ยืนยันรายการ
                          {{ conditions_transfers_select.id_ref }} :
                          {{ conditions_transfers_select.college_code }}
                          <h2>
                            {{ conditions_transfers_select.college_name }}
                          </h2>
                        </v-flex>
                      </v-layout>
                      <v-col cols="12" md="12">
                        <v-alert
                          class="mx-auto text-center pa-2 ma-2"
                          border="top"
                          colored-border
                          type="info"
                          elevation="2"
                        >
                          <h2>การจัดส่งเอกสาร</h2>
                          <h2>
                            <v-radio-group
                              v-model="
                                conditions_transfers_select.status_confirm
                              "
                              row
                              required
                              :rules="[v => !!v || '']"
                              align="center"
                            >
                              <v-radio value="receive">
                                <template v-slot:label>
                                  <div>
                                    <strong class="primary--text"
                                      >ได้รับแล้วสมบูรณ์</strong
                                    >
                                  </div>
                                </template>
                              </v-radio>
                              <v-radio value="receive_but">
                                <template v-slot:label>
                                  <div>
                                    <strong class="warning--text"
                                      >ได้รับแล้วแต่ไม่สมบูรณ์</strong
                                    >
                                  </div>
                                </template>
                              </v-radio>
                              <v-radio value="dt_receive">
                                <template v-slot:label>
                                  <div>
                                    <strong class="red--text"
                                      >ไม่ได้รับเอกสาร</strong
                                    >
                                  </div>
                                </template>
                              </v-radio>
                            </v-radio-group>
                          </h2>
                        </v-alert>
                      </v-col>
                      <v-col cols="12" md="12">
                        <v-text-field
                          v-model="conditions_transfers_select.comment_s"
                          outlined
                          label=" เอกสารที่ขาด หมายเหตุ:"
                        ></v-text-field>
                      </v-col>
                    </v-container>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn large @click.stop="receive_dialog = false"
                ><v-icon dark>mdi-close</v-icon>ยกเลิก</v-btn
              >
              <v-btn large color="green" @click.stop="receive_Submit()" dark>
                <v-icon dark>mdi-content-save</v-icon>&nbsp;บันทึก
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- receive_cancel_dialog -->
      <v-layout>
        <v-dialog v-model="receive_cancel_dialog" persistent max-width="60%">
          <v-card class="mx-auto pa-5">
            <base-material-card
              color="warning"
              icon="mdi-clipboard-text"
              title="ยกเลิกได้รับเอกสารแล้ว"
              class="px-5 py-3 text_google"
            >
            </base-material-card>
            <v-card-text class="text_google">
              <v-card>
                <v-card-text>
                  <v-form ref="receive_cancel_dialog_form" lazy-validation>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12>
                          ยืนยันรายการ
                          {{ conditions_transfers_select.id_ref }} :
                          {{ conditions_transfers_select.college_code }}
                          <h2>
                            {{ conditions_transfers_select.college_name }}
                          </h2>
                        </v-flex>
                        <v-col cols="12" md="12">
                          <v-alert
                            class="mx-auto text-center pa-2 ma-2"
                            border="top"
                            colored-border
                            type="info"
                            elevation="2"
                          >
                            <h2>การจัดส่งเอกสาร</h2>
                            <h2>
                              <v-radio-group
                                v-model="
                                  conditions_transfers_select.status_confirm
                                "
                                row
                                required
                                :rules="[v => !!v || '']"
                                align="center"
                              >
                                <v-radio value="receive">
                                  <template v-slot:label>
                                    <div>
                                      <strong class="primary--text"
                                        >ได้รับแล้วสมบูรณ์</strong
                                      >
                                    </div>
                                  </template>
                                </v-radio>
                                <v-radio value="receive_but">
                                  <template v-slot:label>
                                    <div>
                                      <strong class="warning--text"
                                        >ได้รับแล้วแต่ไม่สมบูรณ์</strong
                                      >
                                    </div>
                                  </template>
                                </v-radio>
                                <v-radio value="dt_receive">
                                  <template v-slot:label>
                                    <div>
                                      <strong class="red--text"
                                        >ไม่ได้รับเอกสาร</strong
                                      >
                                    </div>
                                  </template>
                                </v-radio>
                              </v-radio-group>
                            </h2>
                          </v-alert>
                        </v-col>
                        <v-col cols="12" md="12">
                          <v-text-field
                            v-model="conditions_transfers_select.comment_s"
                            outlined
                            label=" เอกสารที่ขาด หมายเหตุ:"
                          ></v-text-field>
                        </v-col>
                      </v-layout>
                    </v-container>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn large @click.stop="receive_cancel_dialog = false"
                ><v-icon dark>mdi-close</v-icon>ยกเลิก</v-btn
              >
              <v-btn
                large
                color="warning"
                @click.stop="receive_cancel_Submit()"
                dark
              >
                <v-icon dark>mdi-pencil</v-icon>&nbsp;แก้ไข
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
      loading: false,
      ApiKey: "HRvec2021",
      valid: true,
      editconditions_transferdialog: false,
      receive_dialog: false,
      receive_cancel_dialog: false,
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
      conditions_transfers: [],
      editconditions_transfer: {},
      search: "",
      pagination: {},
      show1: false,
      headers: [
        { text: "เลือก", align: "left", value: "select_item" },
        { text: "อ้างอิง", align: "center", value: "id_ref" },
        { text: "รหัสสถานศึกษา", align: "center", value: "college_code" },
        { text: "สถานศึกษา", align: "left", value: "college_name" },
        { text: "ครั้งที่", align: "center", value: "time_s" },
        { text: "ปีที่", align: "center", value: "year_s" },
        { text: "วันที่ทำรายการ", align: "center", value: "date_time" },
        { text: "อัตราว่าง", align: "center", value: "man_power_college" },

        {
          text: "สถานะ",
          align: "center",
          value: "status_confirm",
          icon: "mdi-message-alert"
        },
        {
          text: "ดำเนินการ",
          align: "center",
          value: "cancel_row",
          icon: "mdi-file-document-edit"
        }
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
      conditions_transferstatus: [],
      userstatus: {},
      conditions_transfers_select: [],
      deletecondition_transfer_dialog: false
    };
  },
  async mounted() {
   /*  await this.conditions_transferQueryAll(); */
  },
  methods: {
    async cancel_condition(id_ref) {
      let result = await this.$http.post("conditions_transfer.php", {
        ApiKey: this.ApiKey,
        id_ref: id_ref
      });
      this.conditions_transfers_select = result.data;
      this.deletecondition_transfer_dialog = true;
    },

    async receive_status(id_ref) {
      let result = await this.$http.post("conditions_transfer.php", {
        ApiKey: this.ApiKey,
        id_ref: id_ref
      });
      this.conditions_transfers_select = result.data;
      this.receive_dialog = true;
    },

    async receive_cancel(id_ref) {
      let result = await this.$http.post("conditions_transfer.php", {
        ApiKey: this.ApiKey,
        id_ref: id_ref
      });
      this.conditions_transfers_select = result.data;
      this.receive_cancel_dialog = true;
    },

    async search_confirm() {
      this.loading = true;
      let result = await this.$http
        .post("conditions_transfer_admin.php", {
          ApiKey: this.ApiKey,
          time_s: this.times_select,
          year_s: this.years_select,
          check_send: "ok"
        })
        .finally(() => (this.loading = false));
      this.conditions_transfers = result.data;
    },

    async search_not_submit() {
      this.loading = true;
      let result = await this.$http
        .post("conditions_transfer_admin.php", {
          ApiKey: this.ApiKey,
          time_s: this.times_select,
          year_s: this.years_select,
          check_not_submit: "ok"
        })
        .finally(() => (this.loading = false));
      this.conditions_transfers = result.data;
    },

    async search_not_submit_but() {
      this.loading = true;
      let result = await this.$http
        .post("conditions_transfer_admin.php", {
          ApiKey: this.ApiKey,
          time_s: this.times_select,
          year_s: this.years_select,
          check_not_submit_but: "ok"
        })
        .finally(() => (this.loading = false));
      this.conditions_transfers = result.data;
    },

    async searchTimeYear() {
      this.loading = true;
      let result = await this.$http
        .post("conditions_transfer_admin.php", {
          ApiKey: this.ApiKey,
          time_s: this.times_select,
          year_s: this.years_select
        })
        .finally(() => (this.loading = false));
      this.conditions_transfers = result.data;
    },

    async conditions_transferQueryAll() {
      this.loading = true;
      let result = await this.$http
        .post("conditions_transfer_admin.php", {
          ApiKey: this.ApiKey
        })
        .finally(() => (this.loading = false));
      this.conditions_transfers = result.data;
    },

    async delete_conditions_transfer_Submit() {
      if (this.$refs.deleteconditions_transer_form.validate()) {
        this.conditions_transfers_select.ApiKey = this.ApiKey;
        let result = await this.$http.post(
          "conditions_transfer.delete.php",
          this.conditions_transfers_select
        );

        if (result.data.status == true) {
          this.period = result.data;
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
        this.deletecondition_transfer_dialog = false;
      }
    },

    async receive_Submit() {
      if (this.$refs.receive_dialog_form.validate()) {
        this.conditions_transfers_select.ApiKey = this.ApiKey;

        let result = await this.$http.post(
          "conditions_transfer.update.php",
          this.conditions_transfers_select
        );

        if (result.data.status == true) {
          this.snackbar.icon = "mdi-font-awesome";
          this.snackbar.color = "success";
          this.snackbar.text = "บันทึกรายการเรียบร้อย";
          this.snackbar.show = true;
          this.conditions_transferQueryAll();
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text = "ผิดพลาด";
          this.snackbar.show = true;
        }
        this.receive_dialog = false;
      }
    },

    async receive_cancel_Submit() {
      if (this.$refs.receive_cancel_dialog_form.validate()) {
        this.conditions_transfers_select.ApiKey = this.ApiKey;

        let result = await this.$http.post(
          "conditions_transfer.update.php",
          this.conditions_transfers_select
        );

        if (result.data.status == true) {
          this.snackbar.icon = "mdi-font-awesome";
          this.snackbar.color = "success";
          this.snackbar.text = "บันทึกรายการเรียบร้อย";
          this.snackbar.show = true;
          this.conditions_transferQueryAll();
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text = "ผิดพลาด";
          this.snackbar.show = true;
        }
        this.receive_cancel_dialog = false;
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
    },
    color() {
      return "blue darken-4";
    }
  }
};
</script>
