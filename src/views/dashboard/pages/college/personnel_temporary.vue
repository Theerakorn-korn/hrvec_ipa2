<template>
  <div>
    <v-container fluid>
      <base-material-card
        icon="mdi-clipboard-text"
        title="ข้าราชการครูและบุคลากรทางการศึกษา"
        class="px-5 py-3"
      >
        <v-card class="mb-4 pa-2">
          <v-row>
            <v-col cols="12" lg="6" class="text-right">
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="ค้นหา ระบุคำ หรือ ส่วนข้อความเกี่ยวข้อง"
                single-line
                hide-details
                v-on:keyup.enter="OnEnter()"
                dense
                filled
                class="mb-2"
              />
            </v-col>
          </v-row>
        </v-card>
        <v-data-table
          :headers="headers"
          :items="personnel_temporarys"
          class="elevation-1"
          :loading="loading"
          :search="search"
        >
          <template v-slot:[`item.brith_day`]="{ item }">
            {{
              item.brith_day + "/" + item.brith_month + "/" + item.brith_year
            }}
          </template>
          <template v-slot:[`item.appoin_day`]="{ item }">
            {{
              item.appoin_day + "/" + item.appoin_month + "/" + item.appoin_year
            }}
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon
              color="yellow"
              @click.stop="personnel_temporaryEdit(item.id_rc)"
            >
              mdi-pencil
            </v-icon>
          </template>
          <v-alert slot="no-results" :value="true" color="error" icon="warning">
            Your search for "{{ search }}" found no results.
          </v-alert>
        </v-data-table>
      </base-material-card>

      <!-- V-model editpersonnel_temporarydialog -->
      <v-layout row justify-center>
        <v-dialog
          v-model="editpersonnel_temporarydialog"
          persistent
          max-width="60%"
        >
          <v-card class="mx-auto pa-6">
            <base-material-card
              color="yellow"
              icon="mdi-clipboard-text"
              title="ปรับปรุงข้อมูลบุคลากร"
              class="px-5 py-3 text_google"
            ></base-material-card>
            <v-card-text>
              <v-form ref="editpersonnel_temporaryform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md12>
                      <h3>ข้อมูลการเริ่มปฏิบัติหน้าที่ในสถานศึกษาปัจจุบัน</h3>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        outlined
                        label="คำสั่งที่ ระบุเพียง : 783/2563"
                        v-model="editpersonnel_temporary.order_app_now"
                        required
                        :rules="[v => !!v || '']"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md6>
                      <v-menu
                        ref="menu3"
                        v-model="menu3"
                        :close-on-content-click="false"
                        :return-value.sync="date"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            outlined
                            v-model="editpersonnel_temporary.date_app_now"
                            label="วันเดือนเริ่มปฏิบัติงาน"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            locale="th"
                            required
                            :rules="[v => !!v || '']"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="editpersonnel_temporary.date_app_now"
                          no-title
                          scrollable
                          locale="th"
                        >
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="menu3 = false">
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.menu3.save(date)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-flex>
                    <v-flex md6>
                      <v-autocomplete
                        outlined
                        label="สาขาวิชาที่สอน"
                        v-model="editpersonnel_temporary.personnel_tem_branch"
                        :items="rate_work_course_stds"
                        item-text="branch_name_th"
                        item-value="id_course_branch"
                        required
                        :rules="[v => !!v || '']"
                      ></v-autocomplete>
                    </v-flex>
                  </v-layout>
                </v-container>
                <strong class="red--text">* จำเป็น</strong>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                large
                @click.stop="editpersonnel_temporarydialog = false"
                rounded
              >
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn
                large
                color="warning"
                @click.stop="editpersonnel_temporarySubmit()"
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
      addpersonnel_temporarydialog: false,
      editpersonnel_temporarydialog: false,
      deletepersonnel_temporarydialog: false,
      snackbar: {
        show: false,
        color: "",
        timeout: 5000,
        icon: "",
        text: ""
      },
      personnel_temporarys: [],
      addpersonnel_temporary: {},
      editpersonnel_temporary: {},
      search: "",
      pagination: {},
      headers: [
        { text: "รหัสบัตรประชาชน", align: "left", value: "id_card" },
        { text: "คำนำหน้าชื่อ", align: "left", value: "title_s" },
        { text: "ชื่อ", align: "left", value: "frist_name" },
        { text: "สกุล", align: "left", value: "last_name" },
        { text: "ตำแหน่ง", align: "center", value: "position_name" },
        { text: "เลขที่ตำแหน่ง", align: "center", value: "id_position" },
        { text: "วิทยฐานะ", align: "center", value: "rang_name" },
        { text: "ระดับ", align: "center", value: "rang_level" },
        { text: "สาขาวิชา", align: "center", value: "branch_name_th" },
        
        { text: "วันเดือนปีเกิด", align: "center", value: "brith_day" },
        { text: "วันเดือนปีบรรจุ", align: "center", value: "appoin_day" },
        { text: "คำสั่งที่", align: "center", value: "order_app_now" },
        {
          text: "วันที่ปฏิบัติหน้าที่ ณ สถานศึกษาปัจจุบัน",
          align: "center",
          value: "date_app"
        },
        { text: "เกษียณ", align: "center", value: "retrire_year" },
        {
          text: "แก้ไข",
          align: "center",
          value: "actions",
          icon: "mdi-file-document-edit"
        }
      ],
      rang_names: [
        { text: "-", value: "-" },
        { text: "ชำนาญการ", value: "ชำนาญการ" },
        { text: "ชำนาญการพิเศษ", value: "ชำนาญการพิเศษ" },
        { text: "เชี่ยวชาญ", value: "เชี่ยวชาญ" },
        { text: "เชี่ยวชาญพิเศษ", value: "เชี่ยวชาญพิเศษ" }
      ],
      rang_levels: ["-", 1, 2, 3, 4, 5],
      rowsperpage: [
        25,
        50,
        100,
        {
          text: "All",
          value: -1
        }
      ],

      college: {},
      provinces: [],
      prefectures: [],
      userstatus: [],
      man_powers: [],
      collgegs: [],
      personnel_temporarystatus: [],
      regions: [],
      region_ena: true,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      menu2: false,
      menu3: false,
      menu4: false,
      data_syslog: {},
      rate_work_course_stds: []
    };
  },

  async mounted() {
    await this.personnel_temporaryQueryAll();

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

    let user_status_result;
    user_status_result = await this.$http.post(
      "crud_user_status.php?crud=read",
      {
        ApiKey: this.ApiKey
      }
    );
    this.userstatus = user_status_result.data;

    this.rate_work_course_stdsQueryAll();
  },

  methods: {
    async rate_work_course_stdsQueryAll() {
      let result = await this.$http.post("rate_work_course_std.php", {
        ApiKey: this.ApiKey
      });
      this.rate_work_course_stds = result.data;
    },
    async OnEnter() {
      let result = await this.$http.post("personnel_temporary.php", {
        ApiKey: this.ApiKey,
        frist_name: this.search
      });
      this.personnel_temporarys = result.data;
    },

    async man_powerQuery() {
      let man_power_result;
      man_power_result = await this.$http.post("man_power.php", {
        ApiKey: this.ApiKey,
        college_code: this.addpersonnel_temporary.college_code
      });
      this.man_powers = man_power_result.data;
    },

    async personnel_temporaryQueryAll() {
      this.loading = true;
      let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
      let result = await this.$http
        .post("personnel_temporary.php", {
          ApiKey: this.ApiKey,
          user_name: userSession.user_name
        })
        .finally(() => (this.loading = false));
      this.personnel_temporarys = result.data;
    },

    async personnel_temporaryAdd() {
      this.addpersonnel_temporary = {};
      this.addpersonnel_temporarydialog = true;
    },
    async addpersonnel_temporarySubmit() {
      if (this.$refs.addpersonnel_temporaryform.validate()) {
        this.addpersonnel_temporary.ApiKey = this.ApiKey;
        let result = await this.$http.post(
          "personnel_temporary.insert.php",
          this.addpersonnel_temporary
        );
        if (result.data.status == true) {
          this.personnel_temporary = result.data;
          this.snackbar.icon = "mdi-font-awesome";
          this.snackbar.color = "success";
          this.snackbar.text = "บันทึกข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.personnel_temporaryQueryAll();
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text = "บันทึกข้อมูลผิดพลาด";
          this.snackbar.show = true;
          this.personnel_temporaryQueryAll();
        }
        this.addpersonnel_temporarydialog = false;
      }
    },
    async personnel_temporaryEdit(id_rc) {
      let result = await this.$http.post("personnel_temporary.php", {
        ApiKey: this.ApiKey,
        id_rc: id_rc
      });
      this.editpersonnel_temporary = result.data;
      this.editpersonnel_temporary.p_word = "";
      this.editpersonnel_temporarydialog = true;
    },

    async editpersonnel_temporarySubmit() {
      if (this.$refs.editpersonnel_temporaryform.validate()) {
        this.editpersonnel_temporary.ApiKey = this.ApiKey;
        if (this.editpersonnel_temporary.p_word == "")
          delete this.editpersonnel_temporary.p_word;
        let result = await this.$http.post(
          "personnel_temporary.update.admin.php",
          this.editpersonnel_temporary
        );
        if (result.data.status == true) {
          this.personnel_temporary = result.data;
          this.snackbar.icon = "mdi-font-awesome";
          this.snackbar.color = "success";
          this.snackbar.text = "แก้ไขข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.personnel_temporaryQueryAll();

          let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
          this.data_syslog.ApiKey = this.ApiKey;
          this.data_syslog.user_account = userSession.user_name;
          this.data_syslog.event_log = "update";
          this.data_syslog.page_log = "personnel_tem";
          this.data_syslog.table_log = "personnel_temporary";
          this.data_syslog.detail_log = this.editpersonnel_temporary.id_card;
          this.data_syslog.date_times = this.date_today_log;
          await this.$http.post("data_syslog.insert.php", this.data_syslog);
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text = "แก้ไขข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.editpersonnel_temporarydialog = false;
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
    p_word() {
      let today = new Date(
        this.addpersonnel_temporary.birthday ||
          this.editpersonnel_temporary.birthday
      );
      let dd = String(today.getDate()).padStart(2, "0");
      let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      let yyyy = today.getFullYear() + 543;
      let password = dd + "/" + mm + "/" + yyyy;
      return password;
    },
    brith_day() {
      let today = new Date(
        this.addpersonnel_temporary.birthday ||
          this.editpersonnel_temporary.birthday
      );
      let dd = parseInt(String(today.getDate()).padStart(2, "0"));
      return dd;
    },
    brith_month() {
      let today = new Date(
        this.addpersonnel_temporary.birthday ||
          this.editpersonnel_temporary.birthday
      );
      let mm = parseInt(String(today.getMonth() + 1).padStart(2, "0"));
      return mm;
    },
    brith_year() {
      let today = new Date(
        this.addpersonnel_temporary.birthday ||
          this.editpersonnel_temporary.birthday
      );
      let yyyy = today.getFullYear() + 543;
      return yyyy;
    },

    appoin_day() {
      let today = new Date(
        this.addpersonnel_temporary.date_app_now ||
          this.editpersonnel_temporary.date_app_now
      );
      let dd = parseInt(String(today.getDate()).padStart(2, "0"));
      return dd;
    },
    appoin_month() {
      let today = new Date(
        this.addpersonnel_temporary.date_app_now ||
          this.editpersonnel_temporary.date_app_now
      );
      let mm = parseInt(String(today.getMonth() + 1).padStart(2, "0")); //January is 0!
      return mm;
    },
    appoin_year() {
      let today = new Date(
        this.addpersonnel_temporary.date_app_now ||
          this.editpersonnel_temporary.date_app_now
      );
      let yyyy = today.getFullYear() + 543;
      return yyyy;
    },
    date_today_cal() {
      let today = new Date(
        this.addpersonnel_temporary.birthday ||
          this.editpersonnel_temporary.birthday
      );
      let dd = String(today.getDate()).padStart(2, "0");
      let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      let yyyy = today.getFullYear();

      today = yyyy + "-" + mm + "-" + dd;
      return today;
    },

    retrire_year() {
      let mm = this.brith_month;
      let yy_retire = this.brith_year;
      let result;
      if (mm > 9) {
        result = yy_retire + 61;
      } else {
        result = yy_retire + 60;
      }
      return result;
    },
    cal_date_age() {
      let today = new Date(this.date_today_cal);
      let DOB = new Date(
        this.addpersonnel_temporary.birthday ||
          this.editpersonnel_temporary.birthday
      );

      let totalMonths =
        (today.getFullYear() - DOB.getFullYear()) * 12 +
        today.getMonth() -
        DOB.getMonth();
      totalMonths += today.getDay() < DOB.getDay() ? -1 : 0;
      let years = today.getFullYear() - DOB.getFullYear();
      if (DOB.getMonth() > today.getMonth()) years = years - 1;
      else if (DOB.getMonth() === today.getMonth())
        if (DOB.getDate() > today.getDate()) years = years - 1;

      let days;
      let months;

      if (DOB.getDate() > today.getDate()) {
        months = totalMonths % 12;
        if (months == 0) months = 11;
        let x = today.getMonth();
        switch (x) {
          case 1:
          case 3:
          case 5:
          case 7:
          case 8:
          case 10:
          case 12: {
            let a = DOB.getDate() - today.getDate();
            days = 31 - a;
            break;
          }
          default: {
            let a = DOB.getDate() - today.getDate();
            days = 30 - a;
            break;
          }
        }
      } else {
        days = today.getDate() - DOB.getDate();
        if (DOB.getMonth() === today.getMonth()) months = totalMonths % 12;
        else months = totalMonths % 12;
      }
      let age = years + " ปี " + months + " เดือน " + days + " วัน";
      return age;
    },

    cal_date_age_gov() {
      let today = new Date(this.date_today_cal);
      let DOB = new Date(
        this.addpersonnel_temporary.date_app_now ||
          this.editpersonnel_temporary.date_app_now
      );

      let totalMonths =
        (today.getFullYear() - DOB.getFullYear()) * 12 +
        today.getMonth() -
        DOB.getMonth();
      totalMonths += today.getDay() < DOB.getDay() ? -1 : 0;
      let years = today.getFullYear() - DOB.getFullYear();
      if (DOB.getMonth() > today.getMonth()) years = years - 1;
      else if (DOB.getMonth() === today.getMonth())
        if (DOB.getDate() > today.getDate()) years = years - 1;

      let days;
      let months;

      if (DOB.getDate() > today.getDate()) {
        months = totalMonths % 12;
        if (months == 0) months = 11;
        let x = today.getMonth();
        switch (x) {
          case 1:
          case 3:
          case 5:
          case 7:
          case 8:
          case 10:
          case 12: {
            let a = DOB.getDate() - today.getDate();
            days = 31 - a;
            break;
          }
          default: {
            let a = DOB.getDate() - today.getDate();
            days = 30 - a;
            break;
          }
        }
      } else {
        days = today.getDate() - DOB.getDate();
        if (DOB.getMonth() === today.getMonth()) months = totalMonths % 12;
        else months = totalMonths % 12;
      }
      let age = years + " ปี " + months + " เดือน " + days + " วัน";
      return age;
    },
    date_today_log() {
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, "0");
      let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      let yyyy = today.getFullYear() + 543;
      let time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      today = dd + "/" + mm + "/" + yyyy + "/" + time;
      return today;
    }
  }
};
</script>
