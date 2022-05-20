<template>
  <div>
    <v-bottom-navigation color="info" horizontal :background-color="color" dark>
      <v-btn to="/admin/branch">
        <span>สาขาวิชาเอก </span>
        <v-icon>mdi-source-commit</v-icon>
      </v-btn>

      <v-btn to="/admin/branch_sub">
        <span>สาขางาน</span>
        <v-icon>mdi-source-branch</v-icon>
      </v-btn>
    </v-bottom-navigation>
    <v-container>
      <base-material-card
        icon="mdi-clipboard-text"
        title="สาขางาน"
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
                @click.native="branch_sub_dAdd()"
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
          :items="branch_sub_ds"
          :search="search"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon
              color="yellow"
              @click.stop="branch_sub_dEdit(item.id_rp_sub)"
            >
              mdi-pencil
            </v-icon>
          </template>
          <template v-slot:[`item.action_s`]="{ item }">
            <v-icon
              color="red"
              @click.stop="branch_sub_dDelete(item.id_rp_sub)"
            >
              mdi-delete
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

      <!--addbranch_sub_ddialog  -->
      <v-layout row justify-center>
        <v-dialog v-model="addbranch_sub_ddialog" persistent max-width="80%">
          <v-card class="mx-auto pa-5">
            <base-material-card
              icon="mdi-account-multiple"
              title="เพิ่มข้อมูลสาขางานเอก"
              class="px-5 py-3 text_google"
            >
            </base-material-card>

            <v-card-text>
              <v-form ref="addbranch_sub_dform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md12>
                      <v-autocomplete
                        label="กลุ่มสาขาวิชา"
                        v-model="addbranch_sub_d.id_main_branch"
                        :items="branchs"
                        item-text="name_branch"
                        item-value="id_branch"
                        require
                        filled
                        :rules="[v => !!v || '']"
                        @change="branch_sub_id(), branch_sub_d_select()"
                      ></v-autocomplete>
                    </v-flex>
                    <v-flex md12>
                      <v-card>
                        <v-flex md12>
                          <v-col cols="12" lg="12" class="text-right">
                            <v-text-field
                              v-model="search_id"
                              append-icon="mdi-magnify"
                              label="ค้นหา ระบุคำ หรือ ส่วนข้อความเกี่ยวข้อง"
                              single-line
                              hide-details
                              dense
                              filled
                              class="mb-2"
                            />
                          </v-col>
                        </v-flex>
                        <v-flex md12>
                          <v-data-table
                            color="success"
                            :headers="headers_id_sub"
                            :items="branch_sub_ds_select"
                            :search="search_id"
                          >
                            <v-alert
                              slot="no-results"
                              :value="true"
                              color="error"
                              icon="mdi-alert"
                              >ไม่พบผลลัพธ์ "{{ search }}"
                              ที่คุณกำลังค้นหา.</v-alert
                            >
                          </v-data-table>
                        </v-flex>
                      </v-card>
                    </v-flex>
                    <v-flex md12>
                      <v-textarea
                        label="สาขางาน/กลุ่มวิชาเอก"
                        v-model="addbranch_sub_d.name_sub_branch"
                        require
                        :rules="[v => !!v || '']"
                        filled
                      ></v-textarea>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="warning"
                large
                @click.stop="addbranch_sub_ddialog = false"
                rounded
                ><v-icon dark>mdi-close</v-icon> ยกเลิก</v-btn
              >
              <v-btn
                large
                color="success"
                @click.stop="addbranch_sub_dSubmit()"
                rounded
              >
                <v-icon dark>mdi-content-save</v-icon>&nbsp;&nbsp;บันทึก
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model deletebranch_sub_ddialog -->
      <v-layout>
        <v-dialog v-model="deletebranch_sub_ddialog" persistent max-width="80%">
          <v-card class="mx-auto pa-5">
            <base-material-card
              color="error"
              icon="mdi-delete"
              title="ลบข้อมูลสาขางานเอก"
              class="px-5 py-3 text_google"
            >
            </base-material-card>

            <v-card-text class="text_google">
              <v-card>
                <v-card-text>
                  <v-form ref="deletebranch_sub_dform" lazy-validation>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12>
                          ยืนยันการลบข้อมูลสาขางานเอก :
                        <u> {{ editbranch_sub_d.name_sub_branch }}</u> 
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn large @click.stop="deletebranch_sub_ddialog = false"
                ><v-icon dark>mdi-close</v-icon>ยกเลิก</v-btn
              >
              <v-btn
                large
                color="red darken-3"
                @click.stop="deletebranch_sub_dSubmit()"
                dark
              >
                <v-icon dark>mdi-delete</v-icon>&nbsp;ลบ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model editbranch_sub_ddialog -->
      <v-layout row justify-center>
        <v-dialog v-model="editbranch_sub_ddialog" persistent max-width="80%">
          <v-card class="mx-auto pa-6">
            <base-material-card
              color="yellow"
              icon="mdi-clipboard-text"
              title="แก้ไขข้อมูลสาขางาน"
              class="px-5 py-3 text_google"
            ></base-material-card>
            <v-card-text>
              <v-form ref="editbranch_sub_dform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md12>
                      <v-autocomplete
                        label="กลุ่มสาขาวิชา"
                        v-model="editbranch_sub_d.id_main_branch"
                        :items="branchs"
                        item-text="name_branch"
                        item-value="id_branch"
                        require
                        filled
                        :rules="[v => !!v || '']"
                      ></v-autocomplete>
                    </v-flex>
                    <v-flex md12>
                      <v-card>
                        <v-flex md12>
                          <v-col cols="12" lg="12" class="text-right">
                            <v-text-field
                              v-model="search_id"
                              append-icon="mdi-magnify"
                              label="ค้นหา ระบุคำ หรือ ส่วนข้อความเกี่ยวข้อง"
                              single-line
                              hide-details
                              dense
                              filled
                              class="mb-2"
                            />
                          </v-col>
                        </v-flex>
                        <v-flex md12>
                          <v-data-table
                            color="success"
                            :headers="headers_id_sub"
                            :items="branch_sub_ds_select_sh"
                            :search="search_id"
                          >
                            <v-alert
                              slot="no-results"
                              :value="true"
                              color="error"
                              icon="mdi-alert"
                              >ไม่พบผลลัพธ์ "{{ search }}"
                              ที่คุณกำลังค้นหา.</v-alert
                            >
                          </v-data-table>
                        </v-flex>
                      </v-card>
                    </v-flex>
                    <v-flex md12>
                      <v-textarea
                        label="สาขางาน/กลุ่มวิชาเอก"
                        v-model="editbranch_sub_d.name_sub_branch"
                        require
                        :rules="[v => !!v || '']"
                        filled
                      ></v-textarea>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn large @click.stop="editbranch_sub_ddialog = false" rounded>
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn
                large
                color="warning"
                @click.stop="editbranch_sub_dSubmit()"
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
      addbranch_sub_ddialog: false,
      editbranch_sub_ddialog: false,
      deletebranch_sub_ddialog: false,
      snackbar: {
        show: false,
        color: "",
        timeout: 5000,
        icon: "",
        text: ""
      },
      branch_sub_ds: [],
      addbranch_sub_d: {},
      editbranch_sub_d: {},
      search: "",
      search_id: "",
      pagination: {},
      branchs: [],
      headers: [
        { text: "รหัสกลุ่มสาขาวิชา", align: "center", value: "id_main_branch" },
        { text: "ชื่อสาขาวิชา", align: "left", value: "name_branch" },
        { text: "รหัสสาขางาน", align: "left", value: "id_branch_sub" },
        { text: "รายละเอียด", align: "left", value: "name_sub_branch" },
        {
          text: "แก้ไข",
          align: "center",
          value: "actions",
          icon: "mdi-file-document-edit"
        },
        {
          text: "ลบ",
          align: "center",
          value: "action_s",
          icon: "mdi-delete-forever"
        }
      ],
      headers_id_sub: [
        { text: "รหัสหลัก", align: "center", value: "id_rp_sub" },
        { text: "รหัสสาขาวิชา", align: "center", value: "id_main_branch" },
        { text: "รหัสสาขางาน", align: "center", value: "id_branch_sub" },
        { text: "ชื่อสาขางาน", align: "left", value: "name_sub_branch" }
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
      branch_sub_dstatus: [],
      branchs_id_sub: [],
      branch_sub_ds_select: [],
      branch_sub_ds_select_sh: [],
      data_syslog:{},
    };
  },
  async mounted() {
    this.branchQueryAll();
    this.branch_sub_dQueryAll();
  },
  methods: {
    async branchQueryAll() {
      this.loading = true;
      let result = await this.$http
        .post("branch.php", {
          ApiKey: this.ApiKey
        })
        .finally(() => (this.loading = false));
      this.branchs = result.data;
    },

    async branch_sub_id() {
      this.loading = true;
      let result = await this.$http
        .post("branch_sub_d.id_last.php", {
          ApiKey: this.ApiKey,
          id_main_branch: this.addbranch_sub_d.id_main_branch
        })
        .finally(() => (this.loading = false));
      this.branchs_id_sub = result.data;

      console.log(result.data);
      console.log(this.addbranch_sub_d.id_main_branch);
    },

    async branch_sub_dQueryAll() {
      this.loading = true;
      let result = await this.$http
        .post("branch_sub_d.php", {
          ApiKey: this.ApiKey
        })
        .finally(() => (this.loading = false));
      this.branch_sub_ds = result.data;
    },

    async branch_sub_d_select() {
      this.loading = true;
      let result = await this.$http
        .post("branch_sub_d.php", {
          ApiKey: this.ApiKey,
          id_main_branch: this.addbranch_sub_d.id_main_branch
        })
        .finally(() => (this.loading = false));
      this.branch_sub_ds_select = result.data;
    },

    async branch_sub_dAdd() {
      this.addbranch_sub_d = {};

      this.addbranch_sub_ddialog = true;
    },
    async addbranch_sub_dSubmit() {
      if (this.$refs.addbranch_sub_dform.validate()) {
        this.addbranch_sub_d.ApiKey = this.ApiKey;
        this.addbranch_sub_d.id_branch_sub = this.max_id_branch_sub_q;
        console.log(this.addbranch_sub_d);
        let result = await this.$http.post(
          "branch_sub_d.insert.php",
          this.addbranch_sub_d
        );
        if (result.data.status == true) {
          this.snackbar.icon = "mdi-font-awesome";
          this.snackbar.color = "success";
          this.snackbar.text = "บันทึกข้อมูลเรียบร้อย";
          this.snackbar.show = true;

          let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
          this.data_syslog.ApiKey = this.ApiKey;
          this.data_syslog.user_account = userSession.user_name;
          this.data_syslog.event_log = "update";
          this.data_syslog.page_log = "personnel";
          this.data_syslog.table_log = "personnel_temporary";
          this.data_syslog.detail_log = this.editpersonnel_temporary_admin.id_card;
          this.data_syslog.date_times = this.date_today_log;
          await this.$http.post("data_syslog.insert.php", this.data_syslog);

          this.branch_sub_dQueryAll();
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text = "บันทึกข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.addbranch_sub_ddialog = false;
      }
    },
    async branch_sub_dEdit(id_rp_sub) {
      let result = await this.$http.post("branch_sub_d.php", {
        ApiKey: this.ApiKey,
        id_rp_sub: id_rp_sub
      });
      this.editbranch_sub_d = result.data;

      let result_branch_sub = await this.$http
        .post("branch_sub_d.php", {
          ApiKey: this.ApiKey,
          id_main_branch: this.editbranch_sub_d.id_main_branch
        })
        .finally(() => (this.loading = false));
      this.branch_sub_ds_select_sh = result_branch_sub.data;

      this.editbranch_sub_ddialog = true;
    },

    async editbranch_sub_dSubmit() {
      if (this.$refs.editbranch_sub_dform.validate()) {
        this.editbranch_sub_d.ApiKey = this.ApiKey;
        console.log(this.editbranch_sub_d)
        let result = await this.$http.post(
          "branch_sub_d.update.php",
          this.editbranch_sub_d
        );
        if (result.data.status == true) {        
          this.snackbar.icon = "mdi-font-awesome";
          this.snackbar.color = "success";
          this.snackbar.text = "แก้ไขข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.branch_sub_dQueryAll();
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text = "แก้ไขข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.editbranch_sub_ddialog = false;
      }
    },
    async branch_sub_dDelete(id_rp_sub) {
      let result = await this.$http.post("branch_sub_d.php", {
        ApiKey: this.ApiKey,
        id_rp_sub: id_rp_sub
      });
      this.editbranch_sub_d = result.data;
      this.deletebranch_sub_ddialog = true;
    },
    async deletebranch_sub_dSubmit() {
      if (this.$refs.deletebranch_sub_dform.validate()) {
        this.editbranch_sub_d.ApiKey = this.ApiKey;
        let result = await this.$http.post(
          "branch_sub_d.delete.php",
          this.editbranch_sub_d
        );
        if (result.data.status == true) {
          this.branch_sub_d = result.data;
          this.snackbar.icon = "mdi-font-awesome";
          this.snackbar.color = "success";
          this.snackbar.text = "ลบข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.branch_sub_dQueryAll();
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text = "ลบข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.deletebranch_sub_ddialog = false;
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
    max_id_branch_sub_q() {
      let result = parseInt(this.branchs_id_sub.max_id_branch_sub) + 1;
      return result;
    },
    color() {
      return "teal darken-4";
    },
    date_today_log() {
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, "0");
      let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      let yyyy = today.getFullYear() + 543;
let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      today = dd + "/" + mm + "/" + yyyy + "/" + time;
      return today;
    },
  }
};
</script>
