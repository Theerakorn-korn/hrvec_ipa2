<template>
  <div>
    <v-container class="text_google">
      <base-material-card
        icon="mdi-clipboard-text"
        title="ประสบการณ์ การพัฒนาตนเอง การศึกษาดูงาน อื่นๆ"
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
                @click.native="personnel_experienceAdd()"
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
          :items="personnel_experiences"
          :search="search"
        >
          <template v-slot:[`item`]="{ item, index }">
            <tr>
              <td class="text-center">{{ index + 1 }}</td>
              <td class="text-center">{{ item.year_s }}</td>
              <td>{{ item.course_name }}</td>
              <td>{{ item.course_location }}</td>
              <td>{{ item.agency_name }}</td>
              <td class="text-center">{{ item.date_time_begin| moment("add", "543 years")
                    | moment("D MMMM YYYY") }}</td>
              <td class="text-center">{{ item.date_time_end| moment("add", "543 years")
                    | moment("D MMMM YYYY") }}</td>
              <td class="text-center">{{ item.number_hours }}</td>
              <td class="text-center">
                <v-icon
                  color="yellow"
                  @click.stop="personnel_experienceEdit(item.id_pe)"
                >
                  mdi-pencil
                </v-icon>
              </td>
              <td class="text-center">
                <v-icon
                  color="red"
                  @click.stop="personnel_experienceDelete(item.id_pe)"
                >
                  mdi-delete
                </v-icon>
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

      <!--addpersonnel_experiencedialog  -->
      <v-layout row justify-center>
        <v-dialog
          v-model="addpersonnel_experiencedialog"
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
              <v-form ref="addpersonnel_experienceform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md12>
                      <v-row>
                        <v-col cols="12" lg="12">
                          <v-text-field
                            v-model="addpersonnel_experience.year_s"
                            dense
                            label="ปี : "
                            request
                            :rules="[
                              v => !!v || '',
                              v => (v && v.length <= 4) || ''
                            ]"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" lg="12">
                          <v-textarea
                            v-model="addpersonnel_experience.course_name"
                            label="ประสบการณ์ การพัฒนาตนเอง การศึกษาดูงาน อื่นๆ"
                            dense
                            :rules="[v => !!v || '']"
                          ></v-textarea>
                        </v-col>
                        <v-col cols="12" lg="6">
                          <v-text-field
                            v-model="addpersonnel_experience.course_location"
                            dense
                            label="สถานที่ : "
                            request
                            :rules="[v => !!v || '']"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" lg="6">
                          <v-text-field
                            v-model="addpersonnel_experience.agency_name"
                            dense
                            label="หน่วยงานที่จัด : "
                            request
                            :rules="[v => !!v || '']"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" lg="4">
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
                                v-model="
                                  addpersonnel_experience.date_time_begin
                                "
                                label="วันที่เริ่ม"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="addpersonnel_experience.date_time_begin"
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
                        <v-col cols="12" lg="4">
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
                                v-model="addpersonnel_experience.date_time_end"
                                label="วันที่เริ่ม"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="addpersonnel_experience.date_time_end"
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

                        <v-col cols="12" lg="4">
                          <v-text-field
                            v-model="addpersonnel_experience.number_hours"
                            dense
                            label="จำนวนชั่วโมง : "
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
                        @click.stop="addpersonnel_experienceSubmit()"
                        rounded
                      >
                        <v-icon dark>mdi-content-save</v-icon
                        >&nbsp;&nbsp;บันทึก</v-btn
                      >
                      <v-btn
                        large
                        color="warning"
                        @click.stop="addpersonnel_experiencedialog = false"
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

      <!-- V-model deletepersonnel_experiencedialog -->
      <v-layout>
        <v-dialog
          v-model="deletepersonnel_experiencedialog"
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
              <v-form ref="deletepersonnel_experienceform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12>
                      ยืนยันการลบข้อมูล :
                      <h3>{{ editpersonnel_experience.course_name }}</h3>
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
                @click.stop="deletepersonnel_experiencedialog = false"
              >
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn
                large
                color="red darken-3"
                @click.stop="deletepersonnel_experienceubmit()"
                dark
              >
                <v-icon dark>mdi-delete</v-icon>&nbsp;ลบ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model editpersonnel_experiencedialog -->
      <v-layout row justify-center>
        <v-dialog
          v-model="editpersonnel_experiencedialog"
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
              <v-form ref="editpersonnel_experienceform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md12>
                      <v-row>
                        <v-col cols="12" lg="12">
                          <v-text-field
                            v-model="editpersonnel_experience.year_s"
                            dense
                            label="ปี : "
                            request
                            :rules="[
                              v => !!v || '',
                              v => (v && v.length <= 4) || ''
                            ]"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" lg="12">
                          <v-textarea
                            v-model="editpersonnel_experience.course_name"
                            label="ประสบการณ์ การพัฒนาตนเอง การศึกษาดูงาน อื่นๆ"
                            dense
                            :rules="[v => !!v || '']"
                          ></v-textarea>
                        </v-col>
                        <v-col cols="12" lg="6">
                          <v-text-field
                            v-model="editpersonnel_experience.course_location"
                            dense
                            label="สถานที่ : "
                            request
                            :rules="[v => !!v || '']"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" lg="6">
                          <v-text-field
                            v-model="editpersonnel_experience.agency_name"
                            dense
                            label="หน่วยงานที่จัด : "
                            request
                            :rules="[v => !!v || '']"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" lg="4">
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
                                v-model="
                                  editpersonnel_experience.date_time_begin
                                "
                                label="วันที่เริ่ม"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="editpersonnel_experience.date_time_begin"
                              no-title
                              scrollable
                              locale="TH-th"
                            >
                              <v-spacer></v-spacer>
                              <v-btn
                                text
                                color="primary"
                                @click="menu3 = false"
                              >
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
                        </v-col>
                        <v-col cols="12" lg="4">
                          <v-menu
                            ref="menu2"
                            v-model="menu4"
                            :close-on-content-click="false"
                            :return-value.sync="date"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="editpersonnel_experience.date_time_end"
                                label="วันที่เริ่ม"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="editpersonnel_experience.date_time_end"
                              no-title
                              scrollable
                              locale="TH-th"
                            >
                              <v-spacer></v-spacer>
                              <v-btn
                                text
                                color="primary"
                                @click="menu4 = false"
                              >
                                Cancel
                              </v-btn>
                              <v-btn
                                text
                                color="primary"
                                @click="$refs.menu4.save(date)"
                              >
                                OK
                              </v-btn>
                            </v-date-picker>
                          </v-menu>
                        </v-col>

                        <v-col cols="12" lg="4">
                          <v-text-field
                            v-model="editpersonnel_experience.number_hours"
                            dense
                            label="จำนวนชั่วโมง : "
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
                @click.stop="editpersonnel_experiencedialog = false"
                rounded
              >
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn
                large
                color="warning"
                @click.stop="editpersonnel_experienceSubmit()"
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
      addpersonnel_experiencedialog: false,
      editpersonnel_experiencedialog: false,
      deletepersonnel_experiencedialog: false,
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
        { text: "#", align: "center", value: "index" },
        { text: "ปี", align: "center", value: "year_s" },
        { text: "รายการ", align: "left", value: "course_name" },
        { text: "สถานที่", align: "left", value: "course_location" },
        { text: "หน่วยงานที่จัด", align: "center", value: "agency_name" },
        { text: "วันที่เริ่มต้น", align: "center", value: "date_time_begin" },
        { text: "วันที่สิ้นสุด", align: "center", value: "date_time_end" },
        { text: "จำนวนชั่วโมง", align: "center", value: "number_hours" },
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
      personnel_experience: [],
      addpersonnel_experience: {},
      editpersonnel_experience: [],
      personnel_experiences: [],
      personnel_experience_sub: [],
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      menu2: false,
      menu3: false,
      menu4: false
    };
  },

  async mounted() {
    this.personnel_experiencesQueryAll();
  },

  methods: {
    async personnel_experiencesQueryAll() {
      this.loading = true;
      let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
      let result = await this.$http
        .post("personnel_experience.php", {
          ApiKey: this.ApiKey,
          id_card: userSession.id_card
        })
        .finally(() => (this.loading = false));
      this.personnel_experiences = result.data;
    },
    //Add data
    async personnel_experienceAdd() {
      this.addpersonnel_experience = {};
      this.addpersonnel_experiencedialog = true;
    },

    async addpersonnel_experienceSubmit() {
      if (this.$refs.addpersonnel_experienceform.validate()) {
        let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
        this.addpersonnel_experience.ApiKey = this.ApiKey;
        this.addpersonnel_experience.id_card = userSession.id_card;
        let result = await this.$http.post(
          "personnel_experience.insert.php",
          this.addpersonnel_experience
        );
        if (result.data.status == true) {
          this.personnel_experience = result.data;
          this.snackbar.icon = "mdi-font-awesome";
          this.snackbar.color = "success";
          this.snackbar.text = "บันทึกข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.personnel_experiencesQueryAll();
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text = "บันทึกข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.addpersonnel_experiencedialog = false;
      }
    },

    //Edit data
    async personnel_experienceEdit(id_pe) {
      let result = await this.$http.post("personnel_experience.php", {
        ApiKey: this.ApiKey,
        id_pe: id_pe
      });
      this.editpersonnel_experience = result.data;
      this.editpersonnel_experiencedialog = true;
    },

    async editpersonnel_experienceSubmit() {
      if (this.$refs.editpersonnel_experienceform.validate()) {
        this.editpersonnel_experience.ApiKey = this.ApiKey;
        let result = await this.$http.post(
          "personnel_experience.update.php",
          this.editpersonnel_experience
        );
        if (result.data.status == true) {
          this.personnel_experience = result.data;
          this.snackbar.icon = "mdi-content-save";
          this.snackbar.color = "success";
          this.snackbar.text = "แก้ไขข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.personnel_experiencesQueryAll();
        } else {
          this.snackbar.icon = "mdi-alert";
          this.snackbar.color = "red";
          this.snackbar.text = "แก้ไขข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.editpersonnel_experiencedialog = false;
      }
    },

    //DELETE data
    async personnel_experienceDelete(id_pe) {
      let result = await this.$http.post("personnel_experience.php", {
        ApiKey: this.ApiKey,
        id_pe: id_pe
      });
      this.editpersonnel_experience = result.data;
      this.deletepersonnel_experiencedialog = true;
    },

    async deletepersonnel_experienceubmit() {
      if (this.$refs.deletepersonnel_experienceform.validate())
        this.editpersonnel_experience.ApiKey = this.ApiKey;
      {
        let result = await this.$http.post(
          "personnel_experience.delete.php",
          this.editpersonnel_experience
        );
        if (result.data.status == true) {
          this.snackbar.icon = "mdi-content-save";
          this.snackbar.color = "success";
          this.snackbar.text = "ลบข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.personnel_experiencesQueryAll();
        } else {
          this.snackbar.icon = "mdi-alert";
          this.snackbar.color = "red";
          this.snackbar.text = "ลบข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.deletepersonnel_experiencedialog = false;
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
<style>
.v-data-table thead th {
  font-size: 16px !important;
}
</style>
