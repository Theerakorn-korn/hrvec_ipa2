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
          :items="personnel_temporarys"
          :search="search"
        >
          <template v-slot:[`item`]="{ item, index }">
            <tr>
              <td class="text-center">{{ index + 1 }}</td>
              <td class="text-center">{{ item.id_card }}</td>
              <td class="text-center">{{ item.title_s }}</td>
              <td class="text-center">{{ item.frist_name }}</td>
              <td class="text-center">{{ item.last_name }}</td>
              <td class="text-center">{{ item.position_name }}</td>
              <td class="text-center">
                <v-icon
                  color="yellow"
                  @click.stop="personnel_temporaryEdit(item.id_rc)"
                >
                  mdi-pencil
                </v-icon>
              </td>
              <td class="text-center"></td>
            </tr>
          </template>

          <!--  <template v-slot:[`item.user_status`]="{ item }">
   <span v-if="item.user_status=='tech'">ครู</span>
   <span v-if="item.user_status=='se_director'">รองผู้อำนวยการ</span>
   <span v-if="item.user_status=='director'">ผู้อำนวยการ</span>
   <span v-if="item.user_status=='supervision'">ศึกษานิเทศก์</span>
         
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

      <!-- V-model editpersonnel_temporarydialog -->
      <v-layout row justify-center>
        <v-dialog
          v-model="editpersonnel_temporarydialog"
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
              <v-form ref="editpersonnel_temporaryform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md6>
                      {{ editpersonnel_temporary.id_card }}
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        label="Password"
                        v-model="editpersonnel_temporary.p_word"
                        type="password"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        label="Confirm Password"
                        v-model="
                          editpersonnel_temporary.personnel_temporary_confirmpassword
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
      editpersonnel_temporarydialog: false,
      snackbar: {
        show: false,
        color: "",
        timeout: 5000,
        icon: "",
        text: ""
      },
      personnel_temporarys: [],
      editpersonnel_temporary: {},
      search: "",
      pagination: {},
      headers: [
        { text: "#", align: "center", value: "index" },
        { text: "รหัส", align: "center", value: "id_card" },
        { text: "คำนำหน้าชื่อ", align: "center", value: "title_s" },
        { text: "ชื่อ", align: "center", value: "frist_name" },
        { text: "นามสกุล", align: "center", value: "last_name" },
        { text: "ตำแหน่ง", align: "center", value: "position_name" },
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

      personnel_temporarystatus: [],
      userstatus: {}
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
    this.personnel_temporaryQueryAll();
  },
  methods: {
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
          "personnel_temporary.update.php",
          this.editpersonnel_temporary
        );
        if (result.data.status == true) {
          this.personnel_temporary = result.data;
          this.snackbar.icon = "mdi-font-awesome";
          this.snackbar.color = "success";
          this.snackbar.text = "แก้ไขข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.personnel_temporaryQueryAll();
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
    }
  }
};
</script>
