<template>
  <div>
    <v-container>
      <base-material-card
        icon="mdi-clipboard-text"
        title="ผู้ใช้งานระบบ"
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
            <v-col cols="12" lg="6" class="text-right">
              <v-btn
                large
                right
                depressed
                color="primary"
                @click.native="userAdd()"
              >
                <v-icon>mdi-plus-circle-outline</v-icon>เพิ่มรายการ
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
        <v-data-table
          color="success"
          :loading="loading"
          :headers="headers"
          :items="users"
          :search="search"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon color="yellow" @click.stop="userEdit(item.user_ID)">
              mdi-pencil
            </v-icon>
          </template>
          <!-- <template v-slot:[`item.action_s`]="{ item }">            
            <v-icon
              color="red"
              
              @click.stop="userDelete(item.user_ID)"
            >
              mdi-delete
            </v-icon>
          </template> -->
          <v-alert
            slot="no-results"
            :value="true"
            color="error"
            icon="mdi-alert"
            >ไม่พบผลลัพธ์ "{{ search }}" ที่คุณกำลังค้นหา.</v-alert
          >
        </v-data-table>
      </base-material-card>

      <!--adduserdialog  -->
      <v-layout row justify-center>
        <v-dialog v-model="adduserdialog" persistent max-width="50%">
          <v-card class="mx-auto pa-5">
            <base-material-card
              icon="mdi-account-multiple"
              title="เพิ่มข้อมูลสมาชิก"
              class="px-5 py-3 text_google"
            >
            </base-material-card>

            <v-card-text>
              <v-form ref="adduserform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md6>
                      <v-select
                        :items="userstatus"
                        item-text="user_status_name"
                        item-value="user_status_sub"
                        v-model="adduser.user_status"
                        label="User Type"
                        required
                        :rules="[v => !!v || '']"
                      ></v-select>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        label="Username"
                        v-model="adduser.user_name"
                        required
                        :rules="[v => !!v || '']"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md6> </v-flex>
                    <v-flex md6>
                      <v-text-field
                        label="Password"
                        v-model="adduser.user_password"
                        type="password"
                        require
                        :rules="[v => !!v || '']"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        label="Confirm Password"
                        v-model="adduser.user_confirmpassword"
                        type="password"
                        required
                        :rules="[v => v == adduser.user_password]"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-divider></v-divider>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        label="Firstname"
                        v-model="adduser.user_firstname"
                        require
                        :rules="[v => !!v || '']"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        label="Lastname"
                        v-model="adduser.user_lastname"
                        required
                        :rules="[v => !!v || '']"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 v-if="adduser.user_status == 'E'">
                      <v-autocomplete
                        :items="colleges"
                        item-text="college_name"
                        item-value="college_ID"
                        v-model="adduser.college_ID"
                        label="College"
                        required
                        :rules="[v => !!v || '']"
                      >
                      </v-autocomplete>
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
                @click.stop="adduserdialog = false"
                rounded
                ><v-icon dark>mdi-close</v-icon> ยกเลิก</v-btn
              >
              <v-btn
                large
                color="success"
                @click.stop="adduserSubmit()"
                rounded
              >
                <v-icon dark>mdi-content-save</v-icon>&nbsp;&nbsp;บันทึก
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model deleteuserdialog -->
      <v-layout>
        <v-dialog v-model="deleteuserdialog" persistent max-width="40%">
          <v-card class="mx-auto pa-5">
            <base-material-card
              color="error"
              icon="mdi-delete"
              title="ลบข้อมูลผู้ใช้"
              class="px-5 py-3 text_google"
            >
            </base-material-card>

            <v-card-text class="text_google">
              <v-card>
                <v-card-text>
                  <v-form ref="deleteuserform" lazy-validation>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12>
                          ยืนยันการลบข้อมูลผู้ใช้ {{ edituser.user_name }}
                          <span v-if="edituser.college_name">{{
                            edituser.college_name
                          }}</span>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn large @click.stop="deleteuserdialog = false"
                ><v-icon dark>mdi-close</v-icon>ยกเลิก</v-btn
              >
              <v-btn
                large
                color="red darken-3"
                @click.stop="deleteuserSubmit()"
                dark
              >
                <v-icon dark>mdi-delete</v-icon>&nbsp;ลบ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model edituserdialog -->
      <v-layout row justify-center>
        <v-dialog v-model="edituserdialog" persistent max-width="80%">
          <v-card class="mx-auto pa-6">
            <base-material-card
              color="yellow"
              icon="mdi-clipboard-text"
              title="แก้ไขข้อมูลผู้ใช้งานระบบ"
              class="px-5 py-3 text_google"
            ></base-material-card>
            <v-card-text>
              <v-form ref="edituserform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md6>
                      <v-select
                      outlined
                        :items="userstatus"
                        item-text="user_status_name"
                        item-value="user_status_sub"
                        v-model="edituser.user_status"
                        label="User Type"
                        required
                        :rules="[v => !!v || '']"
                      ></v-select>
                    </v-flex>                    
                    <v-flex md6>
                      <v-text-field
                      outlined
                        label="Username"
                        v-model="edituser.user_name"
                        required
                        :rules="[v => !!v || '']"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                      outlined
                        label="Password"
                        v-model="edituser.user_password"
                        type="password"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                      outlined
                        label="Confirm Password"
                        v-model="edituser.user_confirmpassword"
                        type="password"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-divider></v-divider>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                      outlined
                        label="Firstname"
                        v-model="edituser.user_firstname"
                        require
                        :rules="[v => !!v || '']"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                      outlined
                        label="Lastname"
                        v-model="edituser.user_lastname"
                        required
                        :rules="[v => !!v || '']"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 v-if="edituser.user_status == 'B'">
                      <v-select
                      outlined
                        :items="colleges"
                        item-text="college_name"
                        item-value="college_ID"
                        v-model="edituser.college_ID"
                        label="College"
                        required
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
              <v-btn large @click.stop="edituserdialog = false" rounded>
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn
                large
                color="warning"
                @click.stop="edituserSubmit()"
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
      adduserdialog: false,
      edituserdialog: false,
      deleteuserdialog: false,
      snackbar: {
        show: false,
        color: "",
        timeout: 5000,
        icon: "",
        text: ""
      },
      users: [],
      adduser: {},
      edituser: {},
      search: "",
      pagination: {},
      headers: [
        { text: "ลำดับ", align: "center", value: "user_ID" },
        { text: "ชื่อผู้ใช้งาน", align: "left", value: "user_name" },
        { text: "เบอร์โทร", align: "center", value: "tel_p" },
        { text: "สถานะ", align: "left", value: "user_status_name" },
        { text: "ชื่อ/สถานศึกษา", align: "left", value: "user_firstname" },
        { text: "นามสกุล/บุคคล", align: "left", value: "user_lastname" },
        { text: "จังหวัด", align: "left", value: "province_name" },
        {
          text: "แก้ไข",
          align: "center",
          value: "actions",
          icon: "mdi-file-document-edit"
        }
        /*   { text: "ลบ", align: "center", value: "action_s" , icon: "mdi-delete-forever" }, */
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

      college: {},
      provinces: [],
      prefectures: [],
      userstatus: [],
      regions: [],
      region_ena: true,
      data_syslog: {}
    };
  },
  async mounted() {
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

    this.userQueryAll();

    let user_status_result;
    user_status_result = await this.$http.post(
      "crud_user_status.php?crud=read",
      {
        ApiKey: this.ApiKey
      }
    );
    this.userstatus = user_status_result.data;
  },
  methods: {
    async userQueryAll() {
      this.loading = true;
      let result = await this.$http
        .post("user.php", {
          ApiKey: this.ApiKey
        })
        .finally(() => (this.loading = false));
      this.users = result.data;
    },
    async userAdd() {
      this.adduser = {};
      this.adduserdialog = true;
    },
    async adduserSubmit() {
      if (this.$refs.adduserform.validate()) {
        this.adduser.ApiKey = this.ApiKey;
        let result = await this.$http.post("user.insert.php", this.adduser);
        if (result.data.status == true) {
          this.user = result.data;
          this.snackbar.icon = "mdi-font-awesome";
          this.snackbar.color = "success";
          this.snackbar.text = "บันทึกข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.userQueryAll();
          let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
          this.data_syslog.ApiKey = this.ApiKey;
          this.data_syslog.user_account = userSession.user_name;
          this.data_syslog.event_log = "insert";
          this.data_syslog.page_log = "user";
          this.data_syslog.table_log = "user";
          this.data_syslog.detail_log =
            this.adduser.user_name + " : " + this.adduser.user_status;
          this.data_syslog.date_times = this.date_today_log;
          await this.$http.post("data_syslog.insert.php", this.data_syslog);
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text = "บันทึกข้อมูลผิดพลาด";
          this.snackbar.show = true;
          this.userQueryAll();
        }
        this.adduserdialog = false;
      }
    },
    async userEdit(user_ID) {
      let result = await this.$http.post("user.php", {
        ApiKey: this.ApiKey,
        user_ID: user_ID
      });
      this.edituser = result.data;
      this.edituser.user_password = "";
      this.edituserdialog = true;
    },
    async edituserSubmit() {
      if (this.$refs.edituserform.validate()) {
        this.edituser.ApiKey = this.ApiKey;
        if (this.edituser.user_password == "")
          delete this.edituser.user_password;
        let result = await this.$http.post("user.update.php", this.edituser);
        if (result.data.status == true) {
          this.user = result.data;
          this.snackbar.icon = "mdi-font-awesome";
          this.snackbar.color = "success";
          this.snackbar.text = "แก้ไขข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.userQueryAll();
          let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
          this.data_syslog.ApiKey = this.ApiKey;
          this.data_syslog.user_account = userSession.user_name;
          this.data_syslog.event_log = "update";
          this.data_syslog.page_log = "user";
          this.data_syslog.table_log = "user";
          this.data_syslog.detail_log =
            this.edituser.user_name + " : " + this.edituser.user_status;
          this.data_syslog.date_times = this.date_today_log;
          await this.$http.post("data_syslog.insert.php", this.data_syslog);
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text = "แก้ไขข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.edituserdialog = false;
      }
    },
    async userDelete(user_ID) {
      let result = await this.$http.post("user.php", {
        ApiKey: this.ApiKey,
        user_ID: user_ID
      });
      this.edituser = result.data;
      this.deleteuserdialog = true;
    },
    async deleteuserSubmit() {
      if (this.$refs.deleteuserform.validate()) {
        this.edituser.ApiKey = this.ApiKey;
        if (this.edituser.user_status == "D")
          await this.$http.post("committee.delete.php", {
            ApiKey: this.ApiKey,
            user_ID: this.edituser.user_ID
          });
        let result = await this.$http.post("user.delete.php", this.edituser);
        if (result.data.status == true) {
          this.user = result.data;
          this.snackbar.icon = "mdi-font-awesome";
          this.snackbar.color = "success";
          this.snackbar.text = "ลบข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.userQueryAll();
          let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
          this.data_syslog.ApiKey = this.ApiKey;
          this.data_syslog.user_account = userSession.user_name;
          this.data_syslog.event_log = "delete";
          this.data_syslog.page_log = "user";
          this.data_syslog.table_log = "user";
          this.data_syslog.detail_log =
            this.edituser.user_name + " : " + this.edituser.user_status;
          this.data_syslog.date_times = this.date_today_log;
          await this.$http.post("data_syslog.insert.php", this.data_syslog);
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text = "ลบข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.deleteuserdialog = false;
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
