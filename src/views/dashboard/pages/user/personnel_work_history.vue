<template>
  <div>
    <v-container class="text_google">
      <base-material-card
        icon="mdi-clipboard-text"
        title="ประวัติการทำงาน"
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
                @click.native="personnel_work_historyAdd()"
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
          :items="personnel_work_historys"
          :search="search"
        >
          <template v-slot:[`item.government_status`]="{ item }">
            <span v-if="item.government_status === '0'">ไม่ได้ช่วยราชการ</span>
            <span v-if="item.government_status === '1'">ช่วยราชการ</span>
          </template>

          <template v-slot:[`item.actions`]="{ item }">
            <v-icon
              color="yellow"
              @click.stop="personnel_work_historyEdit(item.id_rh)"
            >
              mdi-pencil
            </v-icon>
          </template>
          <template v-slot:[`item.action_s`]="{ item }">
            <v-icon
              color="red"
              @click.stop="personnel_work_historyDelete(item.id_rh)"
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

      <!--addpersonnel_work_historydialog  -->
      <v-layout row justify-center>
        <v-dialog
          v-model="addpersonnel_work_historydialog"
          persistent
          max-width="50%"
          overlay-opacity="0.6"
        >
          <v-card class="mx-auto pa-5">
            <base-material-card
              icon="mdi-clipboard-text"
              title="เพิ่มข้อมูล"
              class="px-5 py-3 text_google"
            ></base-material-card>
            <v-card-text class="text_google">
              <v-form ref="addpersonnel_work_historyform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md12>
                      <v-row>
                        <v-col cols="12" lg="6">
                          <v-text-field
                            v-model="addpersonnel_work_history.id_position"
                            dense
                            label="เลขที่ตำแหน่ง : "
                            request
                            :rules="[v => !!v || '']"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" lg="6">
                          <v-select
                            v-model="
                              addpersonnel_work_history.government_status
                            "
                            :items="service_status"
                            item-value="value"
                            label="สถานะช่วยราชการ"
                            dense
                            :rules="[v => !!v || '']"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" lg="6">
                          <v-autocomplete
                            v-model="addpersonnel_work_history.college_code"
                            :items="colleges"
                            item-value="college_code"
                            item-text="college_name"
                            dense
                            label="วิทยาลัย : "
                            request
                            :rules="[v => !!v || '']"
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" lg="6">
                          <v-text-field
                            v-model="addpersonnel_work_history.position_s"
                            dense
                            label="ตำแหน่ง : "
                            request
                            :rules="[v => !!v || '']"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" lg="6">
                            <v-text-field
                                v-model="addpersonnel_work_history.date_begin"
                                label="วันที่เริ่ม"
                                prepend-icon="mdi-calendar"
                             type="date"
                              ></v-text-field>
                        </v-col>

                        <v-col cols="12" lg="6">
                         <v-text-field
                                v-model="addpersonnel_work_history.date_end"
                                label="วันที่สิ้นสุด"
                                prepend-icon="mdi-calendar"
                               type="date"
                              ></v-text-field>
                        </v-col>
                        <v-col cols="12" lg="12">
                          <v-text-field
                            v-model="addpersonnel_work_history.special_duty"
                            dense
                            label="หน้าที่อื่น : "
                            request
                            :rules="[v => !!v || '']"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-flex>
                  </v-layout>
                  <v-spacer></v-spacer>
                  <v-row>
                    <v-col cols="12" lg="12" class="text-right">
                      <v-btn
                        large
                        color="success"
                        @click.stop="addpersonnel_work_historySubmit()"
                        rounded
                      >
                        <v-icon dark>mdi-content-save</v-icon
                        >&nbsp;&nbsp;บันทึก</v-btn
                      >
                      <v-btn
                        large
                        color="warning"
                        @click.stop="addpersonnel_work_historydialog = false"
                        rounded
                      >
                        <v-icon dark>mdi-close</v-icon>ยกเลิก
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model deletepersonnel_work_historydialog -->
      <v-layout>
        <v-dialog
          v-model="deletepersonnel_work_historydialog"
          persistent
          max-width="40%"
        >
          <v-card class="mx-auto pa-5">
            <base-material-card
              color="error"
              icon="mdi-delete"
              title="ลบข้อมูล"
              class="px-5 py-3 text_google"
            ></base-material-card>
            <v-card-text class="text_google">
              <v-form ref="deletepersonnel_work_historyform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12>
                      ยืนยันการลบข้อมูล :
                      <h3>
                        {{ editpersonnel_work_history.government_status }}
                      </h3>
                    </v-flex>
                    <v-flex xs12 md6></v-flex>
                    <v-flex xs12 md6></v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                large
                @click.stop="deletepersonnel_work_historydialog = false"
              >
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn
                large
                color="red darken-3"
                @click.stop="deletepersonnel_work_historyubmit()"
                dark
              >
                <v-icon dark>mdi-delete</v-icon>&nbsp;ลบ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model editpersonnel_work_historydialog -->
      <v-layout row justify-center>
        <v-dialog
          v-model="editpersonnel_work_historydialog"
          persistent
          max-width="50%"
        >
          <v-card class="mx-auto pa-5">
            <base-material-card
              color="yellow"
              icon="mdi-clipboard-text"
              title="แก้ไขข้อมูลการศึกษา"
              class="px-5 py-3 text_google"
            ></base-material-card>
            <v-card-text>
              <v-form ref="editpersonnel_work_historyform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md12>
                      <v-row>
                        <v-col cols="12" lg="6">
                          <v-text-field
                            v-model="editpersonnel_work_history.id_position"
                            dense
                            label="เลขที่ตำแหน่ง : "
                            request
                            :rules="[v => !!v || '']"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" lg="6">
                          <v-select
                            v-model="
                              editpersonnel_work_history.government_status
                            "
                            :items="service_status"
                            item-value="value"
                            label="สถานะช่วยราชการ"
                            dense
                            :rules="[v => !!v || '']"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" lg="6">
                          <v-autocomplete
                            v-model="editpersonnel_work_history.college_code"
                            :items="colleges"
                            item-value="college_code"
                            item-text="college_name"
                            dense
                            label="วิทยาลัย : "
                            request
                            :rules="[v => !!v || '']"
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" lg="6">
                          <v-text-field
                            v-model="editpersonnel_work_history.position_s"
                            dense
                            label="ตำแหน่ง : "
                            request
                            :rules="[v => !!v || '']"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" lg="6">
                          <v-menu
                            ref="menu"
                            v-model="menu"
                            :close-on-content-click="false"
                            :return-value.sync="date"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="editpersonnel_work_history.date_begin"
                                label="วันที่เริ่ม"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="editpersonnel_work_history.date_begin"
                              no-title
                              scrollable
                              locale="TH-th"
                            >
                              <v-spacer></v-spacer>
                              <v-btn text color="primary" @click="menu = false">
                                Cancel
                              </v-btn>
                              <v-btn
                                text
                                color="primary"
                                @click="$refs.menu.save(date)"
                              >
                                OK
                              </v-btn>
                            </v-date-picker>
                          </v-menu>
                        </v-col>

                        <v-col cols="12" lg="6">
                          <v-menu
                            ref="menu2"
                            v-model="menu2"
                            :close-on-content-click="false"
                            :return-value.sync="date"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="editpersonnel_work_history.date_end"
                                label="วันที่สิ้นสุด"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="editpersonnel_work_history.date_end"
                              no-title
                              scrollable
                              locale="TH-th"
                            >
                              <v-spacer></v-spacer>
                              <v-btn
                                text
                                color="primary"
                                @click="menu2 = false"
                              >
                                Cancel
                              </v-btn>
                              <v-btn
                                text
                                color="primary"
                                @click="$refs.menu2.save(date)"
                              >
                                OK
                              </v-btn>
                            </v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="12" lg="12">
                          <v-text-field
                            v-model="editpersonnel_work_history.special_duty"
                            dense
                            label="หน้าที่อื่น : "
                            request
                            :rules="[v => !!v || '']"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                large
                @click.stop="editpersonnel_work_historydialog = false"
                rounded
              >
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn
                large
                color="warning"
                @click.stop="editpersonnel_work_historySubmit()"
                rounded
              >
                <v-icon dark>mdi-pencil</v-icon>&nbsp;แก้ไขข้อมูล
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </v-container>
    <v-container fluid>
      <v-snackbar
        v-model="snackbar.show"
        multi-line
        vertical
        top
        :timeout="snackbar.timeout"
        :color="snackbar.color"
      >
        <v-icon large>{{ snackbar.icon }}</v-icon>
        <br />
        {{ snackbar.text }}
        <v-btn dark @click="snackbar.show = false">Close</v-btn>
      </v-snackbar>
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ApiKey: "HRvec2021",
      loading: true,
      updateImageDialog: false,
      search: "",
      addpersonnel_work_historydialog: false,
      editpersonnel_work_historydialog: false,
      deletepersonnel_work_historydialog: false,
      showimagedialog: false,
      snackbar: {
        show: false,
        color: "",
        timeout: 5000,
        icon: "",
        text: ""
      },
      currentPK: null,
      headers: [
        { text: "ลำดับ", align: "center", value: "id_rh" },
        { text: "เลขที่ตำแหน่ง", align: "center", value: "id_position_old" },
        { text: "สถานะช่วยราชการ", align: "left", value: "government_status" },
        { text: "วันที่", align: "left", value: "date_begin" },
        { text: "สถานที่", align: "left", value: "college_name_work" },
        { text: "สิ้นสุด", align: "center", value: "date_end" },
        { text: "ตำแหน่ง", align: "center", value: "position_s" },
        { text: "หน้าที่อื่น", align: "left", value: "special_duty" },
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
      rowsperpage: [
        25,
        50,
        100,
        {
          text: "All",
          value: -1
        }
      ],
      pagination: {},
      personnel_work_history: [],
      addpersonnel_work_history: {},
      editpersonnel_work_history: [],
      personnel_work_historys: [],
      personnel_work_history_sub: [],
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      menu2: false,
      menu3: false,
      menu4: false,
      service_status: [
        { text: "ไม่ได้ช่วยราชการ", value: "0" },
        { text: "ช่วยราชการ", value: "1" }
      ],
      colleges: {},
      provinces: [],
      prefectures: [],
      regions: [],
      region_ena: true
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

    this.personnel_work_historysQueryAll();
  },

  methods: {
    async personnel_work_historysQueryAll() {
      this.loading = true;
      let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
      let result = await this.$http
        .post("personnel_work_history.php", {
          ApiKey: this.ApiKey,
          id_card: userSession.id_card
        })
        .finally(() => (this.loading = false));
      this.personnel_work_historys = result.data;
    },
    //Add data
    async personnel_work_historyAdd() {
      this.addpersonnel_work_history = {};
      this.addpersonnel_work_historydialog = true;
    },

    async addpersonnel_work_historySubmit() {
      if (this.$refs.addpersonnel_work_historyform.validate()) {
        let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
        this.addpersonnel_work_history.ApiKey = this.ApiKey;
        this.addpersonnel_work_history.id_card = userSession.id_card;
        let result = await this.$http.post(
          "personnel_work_history.insert.php",
          this.addpersonnel_work_history
        );
        if (result.data.status == true) {
          this.personnel_work_history = result.data;
          this.snackbar.icon = "mdi-font-awesome";
          this.snackbar.color = "success";
          this.snackbar.text = "บันทึกข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.personnel_work_historysQueryAll();
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text = "บันทึกข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.addpersonnel_work_historydialog = false;
      }
    },

    //Edit data
    async personnel_work_historyEdit(id_rh) {
      let result = await this.$http.post("personnel_work_history.php", {
        ApiKey: this.ApiKey,
        id_rh: id_rh
      });
      this.editpersonnel_work_history = result.data;
      this.editpersonnel_work_historydialog = true;
    },

    async editpersonnel_work_historySubmit() {
      if (this.$refs.editpersonnel_work_historyform.validate()) {
        this.editpersonnel_work_history.ApiKey = this.ApiKey;
        let result = await this.$http.post(
          "personnel_work_history.update.php",
          this.editpersonnel_work_history
        );
        if (result.data.status == true) {
          this.personnel_work_history = result.data;
          this.snackbar.icon = "mdi-content-save";
          this.snackbar.color = "success";
          this.snackbar.text = "แก้ไขข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.personnel_work_historysQueryAll();
        } else {
          this.snackbar.icon = "mdi-alert";
          this.snackbar.color = "red";
          this.snackbar.text = "แก้ไขข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.editpersonnel_work_historydialog = false;
      }
    },

    //DELETE data
    async personnel_work_historyDelete(id_rh) {
      let result = await this.$http.post("personnel_work_history.php", {
        ApiKey: this.ApiKey,
        id_rh: id_rh
      });
      this.editpersonnel_work_history = result.data;
      this.deletepersonnel_work_historydialog = true;
    },

    async deletepersonnel_work_historyubmit() {
      if (this.$refs.deletepersonnel_work_historyform.validate())
        this.editpersonnel_work_history.ApiKey = this.ApiKey;
      {
        let result = await this.$http.post(
          "personnel_work_history.delete.php",
          this.editpersonnel_work_history
        );
        if (result.data.status == true) {
          this.snackbar.icon = "mdi-content-save";
          this.snackbar.color = "success";
          this.snackbar.text = "ลบข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.personnel_work_historysQueryAll();
        } else {
          this.snackbar.icon = "mdi-alert";
          this.snackbar.color = "red";
          this.snackbar.text = "ลบข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.deletepersonnel_work_historydialog = false;
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
