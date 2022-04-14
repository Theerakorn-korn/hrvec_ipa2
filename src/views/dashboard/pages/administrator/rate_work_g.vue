<template>
  <div>
    <v-container fluid>
      <base-material-card
        icon="mdi-clipboard-text"
        title="รายงานอัตรากำลังประจำปี สถานศึกษา"
        class="px-5 py-3"
      >
        <v-row>
          <v-col cols="12" md="4">
            <v-card>
              <v-select
                filled
                v-model="years_select"
                :items="year_ss"
                item-value="year_ss"
                label="ปีที่ :"
              ></v-select>
              <v-list dense>
                <v-subheader>REPORTS</v-subheader>
                <v-list-item-group v-model="selectedItem" color="primary">
                  <v-list-item
                    v-for="(item, i) in items"
                    :key="i"
                    :href="item.link + years_select"
                    target="_blank"
                  >
                    <v-list-item-icon>
                      <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title v-text="item.text"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card>
          </v-col>
        </v-row>

        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="ค้นหา ระบุคำ หรือ ส่วนข้อความเกี่ยวข้อง"
          filled
          class="mb-2"
        />
        <v-data-table
          color="success"
          :loading="loading"
          :headers="headers"
          :items="rate_work_gs"
          :search="search"
        >
          <template v-slot:[`item.status_booking`]="{ item }">
            <v-chip dark color="warning" v-if="item.status_booking">
              {{ item.status_booking }}
            </v-chip>
            <v-chip dark color="green" v-else>
              ว่าง
            </v-chip>
          </template>

          <template v-slot:[`item.actions`]="{ item }">
            <v-icon color="yellow" @click.stop="rate_work_gEdit(item.id_m)">
              mdi-pencil
            </v-icon>
          </template>
          <template v-slot:[`item.action_s`]="{ item }">
            <v-icon color="red" @click.stop="rate_work_gDelete(item.id_m)">
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

      <!--addrate_work_gdialog  -->
      <v-layout row justify-center>
        <v-dialog v-model="addrate_work_gdialog" persistent max-width="50%">
          <v-card class="mx-auto pa-5">
            <base-material-card
              icon="mdi-account-multiple"
              title="เพิ่มข้อมูลประเภทสถานศึกษา"
              class="px-5 py-3 text_google"
            >
            </base-material-card>

            <v-card-text>
              <v-form ref="addrate_work_gform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md12>
                      <v-autocomplete
                        :items="colleges"
                        item-text="college_name"
                        item-value="college_code"
                        v-model="addrate_work_g.college_code"
                        label="สถานศึกษา"
                        required
                        :rules="[v => !!v || '']"
                      >
                      </v-autocomplete>
                    </v-flex>
                    <v-flex md12>
                      <v-text-field
                        label="เลขที่ตำแหน่ง"
                        v-model="addrate_work_g.id_position"
                        required
                        :rules="[v => !!v || '']"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md12>
                      <v-flex md6>
                        <v-autocomplete
                          v-model="addrate_work_g.position"
                          :items="userstatus"
                          item-text="user_status_name"
                          item-value="user_status_name"
                          label="ตำแหน่ง"
                          required
                          :rules="[v => !!v || '']"
                        ></v-autocomplete>
                      </v-flex>
                    </v-flex>
                    <v-flex md12>
                      <v-text-field
                        label="กรณี"
                        v-model="addrate_work_g.case_vacancy"
                        required
                        :rules="[v => !!v || '']"
                      ></v-text-field>
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
                @click.stop="addrate_work_gdialog = false"
                rounded
                ><v-icon dark>mdi-close</v-icon> ยกเลิก</v-btn
              >
              <v-btn
                large
                color="success"
                @click.stop="addrate_work_gSubmit()"
                rounded
              >
                <v-icon dark>mdi-content-save</v-icon>&nbsp;&nbsp;บันทึก
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model deleterate_work_gdialog -->
      <v-layout>
        <v-dialog v-model="deleterate_work_gdialog" persistent max-width="40%">
          <v-card class="mx-auto pa-5">
            <base-material-card
              color="error"
              icon="mdi-delete"
              title="ลบข้อมูลประเภทสถานศึกษา"
              class="px-5 py-3 text_google"
            >
            </base-material-card>

            <v-card-text class="text_google">
              <v-card>
                <v-card-text>
                  <v-form ref="deleterate_work_gform" lazy-validation>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12>
                          ยืนยันการลบข้อมูล <br />
                          {{
                            editrate_work_g.college_name +
                              " : " +
                              editrate_work_g.id_position
                          }}
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn large @click.stop="deleterate_work_gdialog = false"
                ><v-icon dark>mdi-close</v-icon>ยกเลิก</v-btn
              >
              <v-btn
                large
                color="red darken-3"
                @click.stop="deleterate_work_gSubmit()"
                dark
              >
                <v-icon dark>mdi-delete</v-icon>&nbsp;ลบ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model editrate_work_gdialog -->
      <v-layout row justify-center>
        <v-dialog v-model="editrate_work_gdialog" persistent max-width="80%">
          <v-card class="mx-auto pa-6">
            <base-material-card
              color="yellow"
              icon="mdi-clipboard-text"
              title="แก้ไขข้อมูลผู้ใช้งานระบบ"
              class="px-5 py-3 text_google"
            ></base-material-card>
            <v-card-text>
              <v-form ref="editrate_work_gform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md12>
                      <v-autocomplete
                        :items="colleges"
                        item-text="college_name"
                        item-value="college_code"
                        v-model="editrate_work_g.college_code"
                        label="สถานศึกษา"
                        required
                        :rules="[v => !!v || '']"
                      >
                      </v-autocomplete>
                    </v-flex>
                    <v-flex md12>
                      <v-text-field
                        label="เลขที่ตำแหน่ง"
                        v-model="editrate_work_g.id_position"
                        required
                        :rules="[v => !!v || '']"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md12>
                      <v-flex md6>
                        <v-autocomplete
                          v-model="editrate_work_g.position"
                          :items="userstatus"
                          item-text="user_status_name"
                          item-value="user_status_name"
                          label="ตำแหน่ง"
                          required
                          :rules="[v => !!v || '']"
                        ></v-autocomplete>
                      </v-flex>
                    </v-flex>
                    <v-flex md12>
                      <v-text-field
                        label="กรณี"
                        v-model="editrate_work_g.case_vacancy"
                        required
                        :rules="[v => !!v || '']"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
                <small>* จำเป็น</small>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn large @click.stop="editrate_work_gdialog = false" rounded>
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn
                large
                color="warning"
                @click.stop="editrate_work_gSubmit()"
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
      years_select: "",
      year_ss: [2565, 2566, 2567, 2568, 2569, 2570],
      valid: true,
      addrate_work_gdialog: false,
      editrate_work_gdialog: false,
      deleterate_work_gdialog: false,
      snackbar: {
        show: false,
        color: "",
        timeout: 5000,
        icon: "",
        text: ""
      },
      rate_work_gs: [],
      addrate_work_g: {},
      editrate_work_g: {},
      colleges: [],
      userstatus: [],
      search: "",
      pagination: {},
      headers: [
        {
          text: "รหัสสถานศึกษา",
          align: "left",
          value: "rate_work_g_college_code"
        },
        { text: "สถานศึกษา", align: "left", value: "college_name" },
        { text: "จังหวัด", align: "left", value: "province_name" },
        { text: "ปี", align: "left", value: "rate_work_g_year" },
        {
          text: "ประเภท",
          align: "left",
          value: "college_id_code_type_manpower"
        },
        { text: "ประเภท", align: "left", value: "type_college" },
        { text: "นร.ปวช.", align: "left", value: "std_vc" },
        { text: "นศ.ปวส.", align: "left", value: "std_hvc" },
        { text: "นศ.ระยะสั้น", align: "left", value: "std_sc" },
        { text: "ห้อง ปวช.", align: "left", value: "room_std_vc" },
        { text: "ห้อง ปวส.", align: "left", value: "room_std_hvc" },
        { text: "ห้อง ระยะสั้น", align: "left", value: "room_std_sc" },
        { text: "ผอ. จ", align: "left", value: "rate_work_g_dr" },
        { text: "รอง. จ", align: "left", value: "rate_work_g_sedr" },
        { text: "ข.ครู จ", align: "left", value: "rate_teach_official_all" },
        { text: "พนร./จ้าง จ", align: "left", value: "rate_teach_civil_all" },
        { text: "38 ค.(2) จ", align: "left", value: "rate_work_g_sup_ta" },
        { text: "พนร./จ้าง จ", align: "left", value: "rate_work_g_sup_tb" },
        { text: "รวม จริง", align: "left", value: "rate_man_power_all" },
        { text: "ผอ. ก", align: "left", value: "rate_criterion_dr" },
        { text: "รอง. ก", align: "left", value: "rate_criterion_sedr" },
        { text: "ข.ครู ก", align: "left", value: "rate_criterion_teach_all" },
        {
          text: "พนร./จ้าง ก",
          align: "left",
          value: "rate_criterion_teach_alls"
        },
        {
          text: "38 ค.(2) ก",
          align: "left",
          value: "rate_work_g_sup_ta_official"
        },
        {
          text: "พนร./จ้าง ก",
          align: "left",
          value: "rate_work_g_sup_tb_civil"
        },
        { text: "รวม เกณฑ์", align: "left", value: "rate_criterion_all" },
        {
          text: "ผอ. -+",
          align: "left",
          value: "rate_criterion_incomplete_dr"
        },
        {
          text: "รอง. -+",
          align: "left",
          value: "rate_criterion_incomplete_sedr"
        },
        {
          text: "ครู -+",
          align: "left",
          value: "rate_criterion_incomplete_teach_all"
        },
        {
          text: "สนับสนุน -+",
          align: "left",
          value: "rate_work_g_sup_incomplete"
        },
        {
          text: "รวม -+",
          align: "left",
          value: "rate_criterion_incomplete_all"
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

      college: {},
      provinces: [],
      prefectures: [],
      collgegs: [],
      rate_work_gstatus: [],
      regions: [],
      region_ena: true,
      selectedItem: 1,
      items: [
        {
          text: "รายงานข้อมูลสถานศึกษา",
          icon: "mdi-clock",
          link: "#/admin/print_report_rate_work_g/"
        },
        {
          text: "รายงานอัตรากำลังครูผู้สอน",
          icon: "mdi-clock",
          link: "#/admin/print_report_rate_work_g_teach/"
        },
        {
          text: " รายงานอัตรากำลัง ผู้บริหาร",
          icon: "mdi-clock",
          link: "#/admin/print_report_rate_work_g_dr/"
        },
        {
          text: "รายงานอัตรากำลังสายสนับสนุนการสอน",
          icon: "mdi-clock",
          link: "#/admin/print_report_rate_work_g_sup/"
        }
      ]
    };
  },
  async mounted() {
    await this.rate_work_gQueryAll();

    let result;
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
  },

  methods: {
    async rate_work_gQueryAll() {
      this.loading = true;
      let result = await this.$http
        .post("rate_work_g.php", {
          ApiKey: this.ApiKey
        })
        .finally(() => (this.loading = false));
      this.rate_work_gs = result.data;
    },
    async rate_work_gAdd() {
      this.addrate_work_g = {};
      this.addrate_work_gdialog = true;
    },
    async addrate_work_gSubmit() {
      if (this.$refs.addrate_work_gform.validate()) {
        this.addrate_work_g.ApiKey = this.ApiKey;
        let result = await this.$http.post(
          "rate_work_g.insert.php",
          this.addrate_work_g
        );
        if (result.data.status == true) {
          this.rate_work_g = result.data;
          this.snackbar.icon = "mdi-font-awesome";
          this.snackbar.color = "success";
          this.snackbar.text = "บันทึกข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.rate_work_gQueryAll();
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text = "บันทึกข้อมูลผิดพลาด";
          this.snackbar.show = true;
          this.rate_work_gQueryAll();
        }
        this.addrate_work_gdialog = false;
      }
    },

    async rate_work_gEdit(id_m) {
      let result = await this.$http.post("rate_work_g.php", {
        ApiKey: this.ApiKey,
        id_m: id_m
      });
      this.editrate_work_g = result.data;
      this.editrate_work_gdialog = true;
    },
    async editrate_work_gSubmit() {
      if (this.$refs.editrate_work_gform.validate()) {
        this.editrate_work_g.ApiKey = this.ApiKey;
        let result = await this.$http.post(
          "rate_work_g.update.php",
          this.editrate_work_g
        );
        if (result.data.status == true) {
          this.rate_work_g = result.data;
          this.snackbar.icon = "mdi-font-awesome";
          this.snackbar.color = "success";
          this.snackbar.text = "แก้ไขข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.rate_work_gQueryAll();
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text = "แก้ไขข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.editrate_work_gdialog = false;
      }
    },
    async rate_work_gDelete(id_m) {
      let result = await this.$http.post("rate_work_g.php", {
        ApiKey: this.ApiKey,
        id_m: id_m
      });
      this.editrate_work_g = result.data;
      this.deleterate_work_gdialog = true;
    },
    async deleterate_work_gSubmit() {
      if (this.$refs.deleterate_work_gform.validate()) {
        this.editrate_work_g.ApiKey = this.ApiKey;
        let result = await this.$http.post(
          "rate_work_g.delete.php",
          this.editrate_work_g
        );
        if (result.data.status == true) {
          this.rate_work_g = result.data;
          this.snackbar.icon = "mdi-font-awesome";
          this.snackbar.color = "success";
          this.snackbar.text = "ลบข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.rate_work_gQueryAll();
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text = "ลบข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.deleterate_work_gdialog = false;
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
