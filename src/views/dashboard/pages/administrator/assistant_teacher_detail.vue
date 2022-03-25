<template>
  <div>
    <v-bottom-navigation color="info" horizontal :background-color="color" dark>
      <v-btn to="/admin/assistant_teacher_detail">
        <span>รายละเอียดการประเมินครูผู้ช่วยเอก </span>
        <v-icon>mdi-account-star</v-icon>
      </v-btn>

      <v-btn to="/admin/assistant_teacher">
        <span>ข้อมูลครูผู้ช่วย</span>
        <v-icon>mdi-account-settings</v-icon>
      </v-btn>
    </v-bottom-navigation>
    <v-container>
      <base-material-card
        icon="mdi-clipboard-text"
        title="รายละเอียดการประเมินครูผู้ช่วย"
        class="px-5 py-3"
      >
        <v-card class="mb-4 pa-2">
          <v-row>
            <v-col cols="12" lg="6" class="text-right">
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="ค้นหา ระบุคำ หรือ ส่วนข้อความเกี่ยวข้อง"
                filled
                class="mb-2"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                filled
                label="ค้นหาการประเมิน : "
                v-model="select_ass"
                :items="times_ass"
                item-text="text"
                item-value="value"
                @change="assistant_teacherQuerySelect()"
              >
              </v-select>
            </v-col>            
          </v-row>
        </v-card>
        <v-data-table
          color="success"
          :loading="loading"
          :headers="headers"
          :items="assistant_teachers"
          :search="search"
        >
          <template v-slot:[`item.select_item`]="{ item }">
            <v-checkbox
              v-model="search"
              :value="item.assistant_teacher_college_code"
            ></v-checkbox>
          </template>

          <template v-slot:[`item.assistant_teacher_score`]="{ item }">
            <v-chip
              v-if="
                item.assistant_teacher_score < 50 &&
                  item.assistant_teacher_times <= 2
              "
              color="warning"
              dark
            >
              <h2>{{ item.assistant_teacher_score }}</h2>
            </v-chip>
            <v-chip
              v-if="
                item.assistant_teacher_score < 60 &&
                  item.assistant_teacher_times === '3'
              "
              color="warning"
              dark
            >
              <h2>{{ item.assistant_teacher_score }}</h2>
            </v-chip>
            <v-chip
              v-if="
                item.assistant_teacher_score < 60 &&
                  item.assistant_teacher_times === '4'
              "
              color="warning"
              dark
            >
              <h2>{{ item.assistant_teacher_score }}</h2>
            </v-chip>
            <v-chip v-else color="green" dark>
              <h2>{{ item.assistant_teacher_score }}</h2>
            </v-chip>
          </template>

          <template v-slot:[`item.assistant_teacher_status`]="{ item }">
            <v-chip
              v-if="item.assistant_teacher_status === 'confirm'"
              color="green"
              dark
            >
              <v-icon> mdi-cube-send</v-icon> ส่งผลการประเมิน
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
      </base-material-card>

      <!--addassistant_teacherdialog  -->
      <v-layout row justify-center>
        <v-dialog
          v-model="addassistant_teacherdialog"
          persistent
          max-width="50%"
        >
          <v-card class="mx-auto pa-5">
            <base-material-card
              icon="mdi-account-multiple"
              title="เพิ่มข้อมูลรายละเอียดการประเมินครูผู้ช่วยเอก"
              class="px-5 py-3 text_google"
            >
            </base-material-card>

            <v-card-text>
              <v-form ref="addassistant_teacherform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md6>
                      <v-text-field
                        label="รหัส"
                        v-model="addassistant_teacher.id_assistant_teacher"
                        require
                        :rules="[v => !!v || '']"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        label="รายละเอียดการประเมินครูผู้ช่วยเอก"
                        v-model="addassistant_teacher.name_assistant_teacher"
                        required
                        :rules="[v => !!v || '']"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md12>
                      <v-textarea
                        label="รายละเอียด"
                        v-model="addassistant_teacher.detail_assistant_teacher"
                        require
                        :rules="[v => !!v || '']"
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
                @click.stop="addassistant_teacherdialog = false"
                rounded
                ><v-icon dark>mdi-close</v-icon> ยกเลิก</v-btn
              >
              <v-btn
                large
                color="success"
                @click.stop="addassistant_teacherSubmit()"
                rounded
              >
                <v-icon dark>mdi-content-save</v-icon>&nbsp;&nbsp;บันทึก
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model deleteassistant_teacherdialog -->
      <v-layout>
        <v-dialog
          v-model="deleteassistant_teacherdialog"
          persistent
          max-width="80%"
        >
          <v-card class="mx-auto pa-5">
            <base-material-card
              color="error"
              icon="mdi-delete"
              title="ลบข้อมูลรายละเอียดการประเมินครูผู้ช่วยเอก"
              class="px-5 py-3 text_google"
            >
            </base-material-card>

            <v-card-text class="text_google">
              <v-card>
                <v-card-text>
                  <v-form ref="deleteassistant_teacherform" lazy-validation>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12>
                          ยืนยันการลบข้อมูลรายละเอียดการประเมินครูผู้ช่วยเอก
                          {{ editassistant_teacher.name_assistant_teacher }}
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn large @click.stop="deleteassistant_teacherdialog = false"
                ><v-icon dark>mdi-close</v-icon>ยกเลิก</v-btn
              >
              <v-btn
                large
                color="red darken-3"
                @click.stop="deleteassistant_teacherSubmit()"
                dark
              >
                <v-icon dark>mdi-delete</v-icon>&nbsp;ลบ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model editassistant_teacherdialog -->
      <v-layout row justify-center>
        <v-dialog
          v-model="editassistant_teacherdialog"
          persistent
          max-width="80%"
        >
          <v-card class="mx-auto pa-6">
            <base-material-card
              color="yellow"
              icon="mdi-clipboard-text"
              title="แก้ไขข้อมูลรายละเอียดการประเมินครูผู้ช่วย"
              class="px-5 py-3 text_google"
            ></base-material-card>
            <v-card-text>
              <v-form ref="editassistant_teacherform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md6>
                      <v-text-field
                        label="รหัส"
                        v-model="editassistant_teacher.id_assistant_teacher"
                        require
                        :rules="[v => !!v || '']"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        label="รายละเอียดการประเมินครูผู้ช่วยเอก"
                        v-model="editassistant_teacher.name_assistant_teacher"
                        required
                        :rules="[v => !!v || '']"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md12>
                      <v-textarea
                        label="รายละเอียด"
                        v-model="editassistant_teacher.detail_assistant_teacher"
                        require
                        :rules="[v => !!v || '']"
                      ></v-textarea>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                large
                @click.stop="editassistant_teacherdialog = false"
                rounded
              >
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn
                large
                color="warning"
                @click.stop="editassistant_teacherSubmit()"
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
      addassistant_teacherdialog: false,
      editassistant_teacherdialog: false,
      deleteassistant_teacherdialog: false,
      select_ass: "",
      times_ass: [
        { text: "แสดงทั้งหมด ", value: "show_all" },
        { text: "ประเมินครั้งที่ 1 ", value: "1" },
        { text: "ประเมินครั้งที่ 2 ", value: "2" },
        { text: "ประเมินครั้งที่ 3 ", value: "3" },
        { text: "ประเมินครั้งที่ 4 ", value: "4" },
        { text: "ส่งผลการประเมิน ", value: "confirm" },
        { text: "ไม่ได้รับการประเมิน ", value: "not_evaluated" }
      ],
      snackbar: {
        show: false,
        color: "",
        timeout: 5000,
        icon: "",
        text: ""
      },
      assistant_teachers: [],
      addassistant_teacher: {},
      editassistant_teacher: {},
      search: "",
      pagination: {},
      headers: [
        { text: "เลือก", align: "left", value: "select_item" },
        {
          text: "รหัสสถานศึกษา",
          align: "left",
          value: "assistant_teacher_college_code"
        },
        { text: "สถานศึกษา", align: "center", value: "college_name" },
        {
          text: "รหัสบัตรประชาชน",
          align: "left",
          value: "assistant_teacher_id_card"
        },
        { text: "ชื่อ-นามสกุล", align: "left", value: "frist_names" },
        {
          text: "ครั้งที่ประเมิน",
          align: "center",
          value: "assistant_teacher_times"
        },
        {
          text: "วันที่ประเมิน",
          align: "center",
          value: "assistant_teacher_datetime"
        },
        { text: "คะแนน", align: "center", value: "assistant_teacher_score" },
        { text: "สถานะ", align: "center", value: "assistant_teacher_status" }
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
      assistant_teacherstatus: [],
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

    this.assistant_teacherQueryAll();
  },
  methods: {
    async not_evaluated_check() {
      this.loading = true;
      let result = await this.$http
        .post("assistant_teacher.php", {
          ApiKey: this.ApiKey,
          not_evaluated: "Ok"
        })
        .finally(() => (this.loading = false));
      this.assistant_teachers = result.data;
    },

    async assistant_teacherQuerySelect() {
      this.loading = true;
      if (this.select_ass == "confirm") {
           let result = await this.$http
          .post("assistant_teacher.php", {
            ApiKey: this.ApiKey,
            assistant_teacher_status: 'confirm'
          })
          .finally(() => (this.loading = false));
            this.assistant_teachers = result.data;
      } 
      else if(this.select_ass == "not_evaluated") {
           let result = await this.$http
          .post("assistant_teacher.php", {
            ApiKey: this.ApiKey,
             not_evaluated: "Ok"
          })
          .finally(() => (this.loading = false));
            this.assistant_teachers = result.data;
      } 
      else if(this.select_ass == "show_all") {
           let result = await this.$http
          .post("assistant_teacher.php", {
            ApiKey: this.ApiKey            
          })
          .finally(() => (this.loading = false));
            this.assistant_teachers = result.data;
      }       
      else {
        let result = await this.$http
          .post("assistant_teacher.php", {
            ApiKey: this.ApiKey,
            assistant_teacher_times: this.select_ass
          })
          .finally(() => (this.loading = false));
            this.assistant_teachers = result.data;
      }
    
    },

    async assistant_teacherQueryAll() {
      this.loading = true;
      let result = await this.$http
        .post("assistant_teacher.php", {
          ApiKey: this.ApiKey
        })
        .finally(() => (this.loading = false));
      this.assistant_teachers = result.data;
    },
    async assistant_teacherAdd() {
      this.addassistant_teacher = {};
      this.addassistant_teacherdialog = true;
    },
    async addassistant_teacherSubmit() {
      if (this.$refs.addassistant_teacherform.validate()) {
        this.addassistant_teacher.ApiKey = this.ApiKey;
        let result = await this.$http.post(
          "assistant_teacher.insert.php",
          this.addassistant_teacher
        );
        if (result.data.status == true) {
          this.assistant_teacher = result.data;
          this.snackbar.icon = "mdi-font-awesome";
          this.snackbar.color = "success";
          this.snackbar.text = "บันทึกข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.assistant_teacherQueryAll();
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text = "บันทึกข้อมูลผิดพลาด";
          this.snackbar.show = true;
          this.assistant_teacherQueryAll();
        }
        this.addassistant_teacherdialog = false;
      }
    },
    async assistant_teacherEdit(id_rp) {
      let result = await this.$http.post("assistant_teacher.php", {
        ApiKey: this.ApiKey,
        id_rp: id_rp
      });
      this.editassistant_teacher = result.data;
      this.editassistant_teacherdialog = true;
    },
    async editassistant_teacherSubmit() {
      if (this.$refs.editassistant_teacherform.validate()) {
        this.editassistant_teacher.ApiKey = this.ApiKey;
        let result = await this.$http.post(
          "assistant_teacher.update.php",
          this.editassistant_teacher
        );
        if (result.data.status == true) {
          this.assistant_teacher = result.data;
          this.snackbar.icon = "mdi-font-awesome";
          this.snackbar.color = "success";
          this.snackbar.text = "แก้ไขข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.assistant_teacherQueryAll();
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text = "แก้ไขข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.editassistant_teacherdialog = false;
      }
    },
    async assistant_teacherDelete(id_rp) {
      let result = await this.$http.post("assistant_teacher.php", {
        ApiKey: this.ApiKey,
        id_rp: id_rp
      });
      this.editassistant_teacher = result.data;
      this.deleteassistant_teacherdialog = true;
    },
    async deleteassistant_teacherSubmit() {
      if (this.$refs.deleteassistant_teacherform.validate()) {
        this.editassistant_teacher.ApiKey = this.ApiKey;
        let result = await this.$http.post(
          "assistant_teacher.delete.php",
          this.editassistant_teacher
        );
        if (result.data.status == true) {
          this.assistant_teacher = result.data;
          this.snackbar.icon = "mdi-font-awesome";
          this.snackbar.color = "success";
          this.snackbar.text = "ลบข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.assistant_teacherQueryAll();
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text = "ลบข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.deleteassistant_teacherdialog = false;
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
      return "deep-purple darken-4";
    }
  }
};
</script>
