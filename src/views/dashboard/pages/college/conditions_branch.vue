<template>
  <v-container id="upgrade" fluid tag="section" class="text_google">
    <v-row>
      <v-col cols="12" md="12">
        <base-material-card color="primary">
          <template v-slot:heading>
            <h2 class="h1 font-weight-light text_google">
              <v-icon large left>mdi-file-send</v-icon>เงือนไขในการรับย้าย
            </h2>
          </template>
          <v-card class="pa-2 ma-6">
            <v-card-title>
              <div class="font-weight-light v-size--x-large">
                <v-icon large left>mdi-account-details</v-icon> ข้อมูลเบื้องต้น
                รหัสรายการอ้างอิง {{ id_ref }}
              </div>
            </v-card-title>
            <v-row>
              <v-col cols="12" sm="6">
                <v-alert
                  border="left"
                  colored-border
                  color="green darken-1"
                  elevation="2"
                  type="info"
                >
                  <h2>
                    วิทยาลัย : {{ colleges_user.college_name
                    }}{{ user.frist_name }} {{ user.last_name }}
                  </h2>
                  <h3>รหัสวิทยาลัย : {{ colleges_user.college_code }}</h3>
                  <div align="right">
                    <v-btn
                      v-if="conditions_transfers.id_ref === id_ref"
                      color="info"
                      dark
                      :href="'#/college/print_condition/' + id_ref"
                      target="_blank"
                    >
                      <v-icon>mdi-printer</v-icon>
                      <span>พิมพ์แบบรายงานเงือนไขสาขาวิชาเอก</span>
                    </v-btn>
                  </div>
                </v-alert>
              </v-col>
              <v-col cols="12" sm="6">
                <v-alert
                  border="left"
                  colored-border
                  color="green darken-1"
                  elevation="2"
                  type="info"
                >
                  <h2>ครั้งที่ : {{ time_s }} ประจำปี : {{ year_s }}</h2>
                  <h3>เขียนที่ : {{ colleges_user.college_name }}</h3>
                  <h3>วันที่ยื่นคำร้อง : {{ date_today }}</h3>
                </v-alert>
              </v-col>
            </v-row>
          </v-card> {{ periods.period_enable }}
          <v-form
            ref="addconditions_transferform"
            lazy-validation
            v-if="periods.period_enable === '1'"
          >
         
            <v-card class="pa-2 ma-2">
              <v-card-title>
                <div class="font-weight-light v-size--x-large">
                  <v-icon large left>mdi-flag-letiant</v-icon>
                  สาขาวิชาในการรับย้าย เรียงลำดับดังนี้
                </div>
              </v-card-title>
              <v-col cols="12" sm="12">
                <v-card class="pa-2 ma-2">
                  <v-row>
                    <v-col cols="12" sm="12">
                      <v-card
                        class="px-5 py-3"
                        v-if="conditions_transfers.id_ref === id_ref"
                      >
                        <v-alert
                          border="left"
                          colored-border
                          color="green darken-1"
                          elevation="2"
                          type="info"
                        >
                          <table width="100%" align="center" class="table">
                            <tr>
                              <th
                                width="7%"
                                class="regular16 th"
                                align="center"
                              >
                                อันดับ
                              </th>
                              <th width="10%" class="regular16 " align="center">
                                คุณวุฒิ
                              </th>
                              <th width="25%" class="regular16 " align="left">
                                สาขาวิชา
                              </th>
                              <th
                                width="10%"
                                class="regular16 th"
                                align="center"
                              >
                                จำนวนรับ
                              </th>
                            </tr>
                          </table>

                          <table
                            width="100%"
                            align="center"
                            class="table"
                            v-for="item in conditions_branchs"
                            :key="item.id_ref"
                            small
                          >
                            <tr>
                              <td
                                width="7%"
                                class="regular12 th"
                                align="center"
                              >
                                {{ item.sequence_n }}
                              </td>
                              <td width="10%" class="regular12 " align="center">
                                {{ item.educational_level }}
                              </td>
                              <td width="25%" class="regular12 ">
                                {{ item.id_branch }} {{ item.name_branch }}
                              </td>
                              <td
                                width="10%"
                                class="regular12 th"
                                align="center"
                              >
                                {{ item.quantity_n }}
                              </td>
                            </tr>
                          </table>
                        </v-alert>
                      </v-card>
                      <v-card class="px-5 py-3" v-else>
                        <v-btn
                          x-large
                          color="success"
                          dark
                          @click.stop="addconditions_branchForm()"
                        >
                          <v-icon>mdi-selection-multiple-marker</v-icon>
                          <span> เลือกสาขาวิชา</span>
                        </v-btn>
                        <v-data-table
                          color="success"
                          :loading="loading"
                          :headers="header_trans"
                          :items="conditions_branchs"
                          :search="search"
                        >
                          <template v-slot:[`item.action`]="{ item }">
                            <v-icon
                              color="red"
                              @click.stop="conditions_branchDelete(item.id_cb)"
                            >
                              mdi-delete
                            </v-icon>
                          </template>
                        </v-data-table>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-card>
          </v-form>

<v-form  v-else          >
         
            <v-card class="pa-2 ma-2">
              <v-alert
      border="bottom"
      colored-border
      type="warning"
      elevation="2"
    >
    <h1 class="text-center red--text">ยังไม่ถึงกำหนดการการยืนเงือนไขการรับย้าย</h1>
        </v-alert>

            </v-card>
</v-form>
         

          <v-card
            class="pa-1 d-flex justify-center"
            v-if="periods.period_enable === '1'"
          >
            <div>
              <v-row align="center">
                <h2>
                  * เมื่อกดปุ่มบันทึกแล้ว ท่านจะไม่สามารถแก้ไขข้อมูลใดๆ ได้
                  กรุณาตรวจสอบข้อมูลให้ถูกต้องการกดปุ่ม บันทึก
                </h2>
              </v-row>
              <v-row>
                <v-col cols="12" align="center">
                  <v-btn
                    v-if="conditions_transfers.id_ref === id_ref"
                    x-large
                    color="info"
                    dark
                    class="ma-2"
                    :href="'#/college/print_condition/' + id_ref"
                    target="_blank"
                  >
                    <v-icon>mdi-printer</v-icon>
                    <span>พิมพ์แบบรายงานเงือนไขสาขาวิชาเอก</span>
                  </v-btn>

                  <v-btn
                    v-else-if="id_ref"
                    x-large
                    color="success"
                    dark
                    class="ma-2"
                    @click.stop="confirmsSubmit()"
                  >
                    <v-icon>mdi-content-save</v-icon>
                    <span>บันทึก</span>
                  </v-btn>
                </v-col>
              </v-row>
            </div>
          </v-card>
        </base-material-card>

        <!--addconditions_branchdialog  -->
        <v-layout>
          <v-dialog
            v-model="addconditions_branchdialog"
            persistent
            max-width="80%"
          >
            <v-card class="mx-auto pa-5">
              <base-material-card
                icon="mdi-account-multiple"
                title="เลือกสาขาวิชา"
                class="px-5 py-3"
              >
                รหัสรายการอ้างอิง {{ id_ref }}
              </base-material-card>
              <v-card-text>
                <v-form ref="addconditions_branchform" lazy-validation>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex md2>
                        <v-select
                          v-model="addconditions_branch.sequence_n"
                          :items="order_need"
                          outlined
                          label="ลำดับที่ :"
                        >
                        </v-select>
                      </v-flex>
                      <v-flex md6>
                        <v-autocomplete
                          :items="branch_s"
                          item-text="name_branch"
                          item-value="id_branch"
                          outlined
                          label="สาขาวิชา :"
                          prepend-icon="mdi-account-details"
                          request
                          v-model="addconditions_branch.id_branch"
                          :rules="[v => !!v || '']"
                        ></v-autocomplete>
                      </v-flex>
                      <v-flex md4>
                        <v-text-field
                          v-model="addconditions_branch.quantity_n"
                          type="number"
                          outlined
                          label="จำนวน :"
                          prepend-icon="mdi-flag-letiant"
                          request
                          :rules="[v => !!v || '']"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md12>
                        <v-select
                          v-model="addconditions_branch.educational_level"
                          type="number"
                          :items="education_s"
                          item-text="title"
                          item-value="title"
                          outlined
                          label="ระดับการศึกษา :"
                          prepend-icon="mdi-flag-letiant"
                          request
                          :rules="[v => !!v || '']"
                        ></v-select>
                      </v-flex>
                    </v-layout>
                  </v-container>
                  <small>* จำเป็น</small>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="warning"
                  large
                  @click.stop="addconditions_branchdialog = false"
                  ><v-icon dark>mdi-close</v-icon> ยกเลิก</v-btn
                >
                <v-btn
                  large
                  color="success"
                  @click.stop="addconditions_branchSubmit()"
                >
                  <v-icon dark>mdi-content-save</v-icon>&nbsp;&nbsp;บันทึก
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-layout>

        <!-- V-model deleteuserdialog -->
        <v-layout>
          <v-dialog
            v-model="deletconditions_branchdialog"
            persistent
            max-width="40%"
          >
            <v-card class="mx-auto pa-5">
              <base-material-card
                color="error"
                icon="mdi-delete"
                title="ลบรายการ"
                class="px-5 py-3 text_google"
              >
              </base-material-card>

              <v-card-text class="text_google">
                <v-card>
                  <v-card-text>
                    <v-form ref="deleteconditions_branchform" lazy-validation>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12>
                            ยืนยันการลบ
                            <span> {{ editconditions_branch.id_branch }} </span>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn large @click.stop="deletconditions_branchdialog = false"
                  ><v-icon dark>mdi-close</v-icon>ยกเลิก</v-btn
                >
                <v-btn
                  large
                  color="red darken-3"
                  @click.stop="deleteconditions_branchsubmit()"
                  dark
                >
                  <v-icon dark>mdi-delete</v-icon>&nbsp;ลบ
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-layout>

        <!-- V-model confirm -->
        <v-layout>
          <v-dialog v-model="confirm_dialog" persistent max-width="40%">
            <v-card class="mx-auto pa-5">
              <base-material-card
                color="warning"
                icon="mdi-content-save"
                title="ยืนยันรายการ"
                class="px-5 py-3 text_google"
              >
              </base-material-card>

              <v-card-text class="text_google">
                <v-card>
                  <v-card-text>
                    <v-form
                      ref="deletetransference_locationform"
                      lazy-validation
                    >
                      <v-container grid-list-md>
                        <v-alert
                          outlined
                          type="warning"
                          prominent
                          border="left"
                        >
                          <h2>
                            เตือน
                          </h2>
                          <h3>
                            หากกดปุ่มบันทึกท่านไม่สามารถ แก้ไขข้อมูลใดๆ ได้แล้ว
                            กรุณาตรวจสอบให้ถูกต้องก่อนการบันทึก
                          </h3>
                        </v-alert>
                      </v-container>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn large rounded @click.stop="confirm_dialog = false"
                  ><v-icon dark>mdi-close</v-icon>ยกเลิก</v-btn
                >
                <v-btn
                  large
                  color="warning"
                  @click.stop="addconditions_transferSubmit()"
                  dark
                  rounded
                >
                  <v-icon dark>mdi-content-save</v-icon>&nbsp;ยืนยัน
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-layout>
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
          <v-btn color="red" text v-bind="attrs" @click="snackbar.show = false"
            >Close</v-btn
          >
        </template>
      </v-snackbar>
    </v-container>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      ApiKey: "HRvec2021",
      colleges_user: [],
      colleges: {},
      personnel_search: {},
      show_personnel: [],
      branch_s: [],
      search: "",
      addconditions_branchdialog: false,
      deletconditions_branchdialog: false,
      Search_Personneldialog: false,
      confirm_dialog: false,
      user: {},
      conditions_branch: [],
      conditions_branchs: [],
      conditions_transfers: [],
      addconditions_branch: {},
      addconditions_transfer: {},
      editconditions_branch: [],
      provinces: [],
      provices_sh: [],
      prefectures: [],
      district: [],
      district_post_s: [],
      periods: [],
      snackbar: {
        show: false,
        color: "",
        timeout: 5000,
        icon: "",
        text: ""
      },
      order_need: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      header_trans: [
        { text: "ลำดับ", align: "center", value: "sequence_n" },
        { text: "รหัสอ้างอิง", align: "center", value: "id_ref" },
        { text: "สาขาวิชา", align: "left", value: "name_branch" },
        { text: "ระดับการศึกษา", align: "center", value: "educational_level" },
        { text: "จำนวน", align: "center", value: "quantity_n" },
        { text: "ยกเลิก", align: "center", value: "action" }
      ],
      education_s: [
        {
          title: "ปริญญาตรี"
        },
        {
          title: "ปริญญาโท",
          faculty: ""
        },
        {
          title: "ปริญญาเอก"
        }
      ],
      status_condition: [{ text: "ยืนยัน", value: "confirm" }],

      isEditing: null,
      model: null,
      show1: false,
      pagination: {},
      personnel_marriages: [],
      rowsperpage: [
        25,
        50,
        100,
        {
          text: "All",
          value: -1
        }
      ],
       period_enable: '1',
    };
  },

  async mounted() {

    let result_period;
    result_period = await this.$http.post("period.php", {
      ApiKey: this.ApiKey,
      period_enable: this.period_enable
    });
    this.periods = result_period.data;
    console.log(result_period.data)


    let result_branch;
    result_branch = await this.$http.post("branch.php", {
      ApiKey: this.ApiKey
    });
    this.branch_s = result_branch.data;

    let result_provice;
    result_provice = await this.$http.post("province_sh.php", {
      ApiKey: this.ApiKey
    });
    this.provices_sh = result_provice.data;

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

    await this.personnel_temporaryQueryAll();
    await this.conditions_transferQueryAll();
    await this.conditions_branchQueryAll();
  },

  methods: {
    async personnel_temporaryQueryAll() {
      this.loading = true;
      let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
      let result = await this.$http
        .post("admin.php", {
          ApiKey: this.ApiKey,
          user_name: userSession.user_name
        })
        .finally(() => (this.loading = false));
      this.colleges_user = result.data;
    },

    async confirmsSubmit() {
      this.confirm_dialog = true;
    },

    async conditions_branchQueryAll() {
      this.loading = true;
      let result = await this.$http
        .post("conditions_branch.php", {
          ApiKey: this.ApiKey,
          id_ref: this.id_ref
        })
        .finally(() => (this.loading = false));
      this.conditions_branchs = result.data;
    },

    async conditions_transferQueryAll() {
      this.loading = true;
      let result = await this.$http
        .post("conditions_transfer.php", {
          ApiKey: this.ApiKey,
          id_ref: this.id_ref
        })
        .finally(() => (this.loading = false));
      this.conditions_transfers = result.data;
    },

    //First >> Insert transference Location
    async addconditions_branchForm() {
      this.addconditions_branchdialog = true;
    },

    async addconditions_branchSubmit() {
      if (this.$refs.addconditions_branchform.validate()) {
        this.addconditions_branch.ApiKey = this.ApiKey;
        this.addconditions_branch.id_ref = this.id_ref;
        this.addconditions_branch.college_code = this.colleges_user.college_code;
        let result = await this.$http.post(
          "conditions_branch.insert.php",
          this.addconditions_branch
        );
        if (result.data.status == true) {
          this.conditions_branch = result.data;
          this.snackbar.icon = "mdi-checkbox-marked-circle";
          this.snackbar.color = "success";
          this.snackbar.text = "บันทึกข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.conditions_branchQueryAll();
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text =
            "บันทึกข้อมูลผิดพลาด รายการลำดับ หรือ สาขาวิชาซ้ำ";
          this.snackbar.show = true;
        }
        this.addconditions_branchdialog = false;
      }
    },
    //Delete transference Location
    async conditions_branchDelete(id_cb) {
      let result = await this.$http.post("conditions_branch.php", {
        ApiKey: this.ApiKey,
        id_cb: id_cb
      });
      this.editconditions_branch = result.data;
      this.deletconditions_branchdialog = true;
    },
    async deleteconditions_branchsubmit() {
      if (this.$refs.deleteconditions_branchform.validate()) {
        this.editconditions_branch.ApiKey = this.ApiKey;
        let result = await this.$http.post(
          "conditions_branch.delete.php",
          this.editconditions_branch
        );
        if (result.data.status == true) {
          this.conditions_branch = result.data;
          this.snackbar.icon = "mdi-font-awesome";
          this.snackbar.color = "success";
          this.snackbar.text = "ลบข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.conditions_branchQueryAll();
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text = "ลบข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.deletconditions_branchdialog = false;
      }
    },
    // Add conditions_transfer
    async addconditions_transferSubmit() {
      if (this.$refs.addconditions_transferform.validate()) {
        this.addconditions_transfer.ApiKey = this.ApiKey;
        this.addconditions_transfer.id_ref = this.id_ref;
        this.addconditions_transfer.time_s = this.time_s;
        this.addconditions_transfer.year_s = this.year_s;
        this.addconditions_transfer.college_code = this.colleges_user.college_code;
        this.addconditions_transfer.date_time = this.date_today;
        let result = await this.$http.post(
          "conditions_transfer.insert.php",
          this.addconditions_transfer
        );
        if (result.data.status == true) {
          this.conditions_transfers = result.data;
          this.snackbar.icon = "mdi-checkbox-marked-circle";
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
        this.confirm_dialog = false;
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
    month_now() {
      const d = new Date();
      let month = d.getMonth() + 1;
      return month;
    },
    year_s() {
      const d = new Date();
      let year = d.getFullYear() + 543;
      return year;
    },
    time_s() {
      let time_m;
      if (this.month_now > 2) {
        time_m = 2;
      } else {
        time_m = 1;
      }
      return time_m;
    },
    id_ref() {
      let id_ref_cr;
      id_ref_cr =
        this.time_s + "" + this.year_s + "" + this.colleges_user.user_name;
      return id_ref_cr;
    },

    date_today() {
      let monthNames = [
        "",
        "มกราคม",
        "กุมภาพันธ์",
        "มีนาคม",
        "เมษายน",
        "พฤษภาคม",
        "มิถุนายน",
        "กรกฎาคม",
        "สิงหาคม",
        "กันยายน",
        "ตุลาคม",
        "พฤศจิกายน",
        "ธันวาคม"
      ];
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, "0");
      let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      let yyyy = today.getFullYear() + 543;

      today = dd + " " + monthNames[parseInt(mm)] + " " + yyyy;
      return today;
    }
  },
  watch: {
    async conditions_br() {
      await this.conditions_transferQueryAll();
    }
  }
};
</script>
