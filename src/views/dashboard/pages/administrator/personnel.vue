<template>
  <div>
    <v-container>
      <base-material-card
        icon="mdi-clipboard-text"
        title="ผู้ใช้งานระบบ-ข้าราชการครูและบุคลการทางการศึกษา"
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
                dense
                filled
                class="mb-2"
              />
            </v-col>
          </v-row>
        </v-card>
        <v-data-table
          color="success"
          :loading="loading"
          :headers="headers"
          :items="personnel_temporary_admins"
          :search="search"
        >
          <template v-slot:[`item.user_status`]="{ item }">
            <span v-if="item.user_status == 'tech'">ครู</span>
            <span v-if="item.user_status == 'se_director'">รองผู้อำนวยการ</span>
            <span v-if="item.user_status == 'director'">ผู้อำนวยการ</span>
            <span v-if="item.user_status == 'supervision'">ศึกษานิเทศก์</span>
            <span v-if="item.user_status == '38'">สนับสนุน</span>
          </template>

          <template v-slot:[`item.actions`]="{ item }">
            <v-icon
              color="yellow"
              @click.stop="personnel_temporary_adminEdit(item.id_rc)"
            >
              mdi-pencil
            </v-icon>
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

      <!-- V-model editpersonnel_temporary_admindialog -->
      <v-layout row justify-center>
        <v-dialog
          v-model="editpersonnel_temporary_admindialog"
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
              <v-form ref="editpersonnel_temporary_adminform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md6>
                      {{ editpersonnel_temporary_admin.id_card }}
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        label="Password"
                        v-model="editpersonnel_temporary_admin.p_word"
                        type="password"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        label="Confirm Password"
                        v-model="
                          editpersonnel_temporary_admin.personnel_temporary_admin_confirmpassword
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
                @click.stop="editpersonnel_temporary_admindialog = false"
                rounded
              >
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn
                large
                color="warning"
                @click.stop="editpersonnel_temporary_adminSubmit()"
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
      editpersonnel_temporary_admindialog: false,
      snackbar: {
        show: false,
        color: "",
        timeout: 5000,
        icon: "",
        text: ""
      },
      personnel_temporary_admins: [],
      editpersonnel_temporary_admin: {},
      search: "",
      pagination: {},
      headers: [
        { text: "ลำดับ", align: "center", value: "id_rc" },
        { text: "รหัสสถานศึกษา", align: "center", value: "college_code" },
        { text: "ID Card", align: "center", value: "id_card" },
        { text: "ชื่อ", align: "center", value: "frist_name" },
        { text: "นามสกุล", align: "center", value: "last_name" },
        { text: "สถานะ", align: "center", value: "user_status" },
        {
          text: "แก้ไข",
          align: "center",
          value: "actions",
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
      personnel_temporary_adminstatus: [],
      userstatus: {},
      data_syslog: {}
    };
  },
  async mounted() {
    await this.personnel_temporary_adminQueryAll();
  },
  methods: {
    async personnel_temporary_adminQueryAll() {
      this.loading = true;
      let result = await this.$http
        .post("personnel_temporary_admin.php", {
          ApiKey: this.ApiKey
        })
        .finally(() => (this.loading = false));
      this.personnel_temporary_admins = result.data;
    },

    async personnel_temporary_adminEdit(id_rc) {
      let result = await this.$http.post("personnel_temporary_admin.php", {
        ApiKey: this.ApiKey,
        id_rc: id_rc
      });
      this.editpersonnel_temporary_admin = result.data;
      this.editpersonnel_temporary_admin.p_word = "";
      this.editpersonnel_temporary_admindialog = true;
    },
    async editpersonnel_temporary_adminSubmit() {
      if (this.$refs.editpersonnel_temporary_adminform.validate()) {
        this.editpersonnel_temporary_admin.ApiKey = this.ApiKey;
        if (this.editpersonnel_temporary_admin.p_word == "")
          delete this.editpersonnel_temporary_admin.p_word;
        let result = await this.$http.post(
          "personnel_temporary.update.php",
          this.editpersonnel_temporary_admin
        );
        if (result.data.status == true) {
          this.personnel_temporary_admin = result.data;
          this.snackbar.icon = "mdi-font-awesome";
          this.snackbar.color = "success";
          this.snackbar.text = "แก้ไขข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.personnel_temporary_adminQueryAll();
          let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
          this.data_syslog.ApiKey = this.ApiKey;
          this.data_syslog.user_account = userSession.user_name;
          this.data_syslog.event_log = "update";
          this.data_syslog.page_log = "personnel";
          this.data_syslog.table_log = "personnel_temporary";
          this.data_syslog.detail_log = this.editpersonnel_temporary_admin.id_card;
          this.data_syslog.date_times = this.date_today_log;
          await this.$http.post("data_syslog.insert.php", this.data_syslog);
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text = "แก้ไขข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.editpersonnel_temporary_admindialog = false;
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
