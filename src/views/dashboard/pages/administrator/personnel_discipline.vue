<template>
  <div>
    <v-container class="text_google">
      <base-material-card
        icon="mdi-clipboard-text"
        title="ประวัติเกี่ยวกับวินัย และโทษ"
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
            <!-- <v-col cols="12" lg="6" class="text-right">
              <v-btn
                
                large
                right
                depressed
                color="primary"
                @click.native="personnel_disciplineAdd()"
              >
                <v-icon>mdi-plus-circle-outline</v-icon>เพิ่มรายการ
              </v-btn>
            </v-col> -->
          </v-row>
        </v-card>

        <v-data-table
          color="success"
          :loading="loading"
          :headers="headers"
          :items="personnel_disciplines"
          :search="search"
        >
          <!-- 
        <template v-slot:[`item.actions`]="{ item }">
            <v-icon
              color="yellow"
              
              @click.stop="personnel_disciplineEdit(item.id_dp)"
            >
              mdi-pencil
            </v-icon>          
          </template>
            <template v-slot:[`item.action_s`]="{ item }">            
            <v-icon
              color="red"
              
              @click.stop="personnel_disciplineDelete(item.id_dp)"
            >
              mdi-delete
            </v-icon>
          </template>   -->
          <v-alert
            slot="no-results"
            :value="true"
            color="error"
            icon="mdi-alert"
            >ไม่พบผลลัพธ์ "{{ search }}" ที่คุณกำลังค้นหา.</v-alert
          >
        </v-data-table>
      </base-material-card>

      <!--addpersonnel_disciplinedialog  -->
      <v-layout row justify-center>
        <v-dialog
          v-model="addpersonnel_disciplinedialog"
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
              <v-form ref="addpersonnel_disciplineform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md12>
                      <v-row>
                        <v-col cols="12" lg="12">
                          <v-textarea
                            v-model="addpersonnel_discipline.discipline_blame"
                            dense
                            label="รายการ : "
                            request
                            :rules="[v => !!v || '']"
                          ></v-textarea>
                        </v-col>

                        <v-col cols="12" lg="6">
                          <v-text-field
                            v-model="addpersonnel_discipline.location_disbla"
                            item-value="value"
                            label="สถานที่"
                            dense
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
                                v-model="addpersonnel_discipline.date_time"
                                label="เมื่อวันที่"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="addpersonnel_discipline.date_time"
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
                      </v-row>
                    </v-flex>
                  </v-layout>
                  <v-spacer></v-spacer>
                  <v-row>
                    <v-col cols="12" lg="12" class="text-right">
                      <v-btn
                        large
                        color="success"
                        @click.stop="addpersonnel_disciplineSubmit()"
                        rounded
                      >
                        <v-icon dark>mdi-content-save</v-icon
                        >&nbsp;&nbsp;บันทึก</v-btn
                      >
                      <v-btn
                        large
                        color="warning"
                        @click.stop="addpersonnel_disciplinedialog = false"
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

      <!-- V-model deletepersonnel_disciplinedialog -->
      <v-layout>
        <v-dialog
          v-model="deletepersonnel_disciplinedialog"
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
              <v-form ref="deletepersonnel_disciplineform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12>
                      ยืนยันการลบข้อมูล :
                      <h3>{{ editpersonnel_discipline.location_disbla }}</h3>
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
                @click.stop="deletepersonnel_disciplinedialog = false"
              >
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn
                large
                color="red darken-3"
                @click.stop="deletepersonnel_disciplineubmit()"
                dark
              >
                <v-icon dark>mdi-delete</v-icon>&nbsp;ลบ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model editpersonnel_disciplinedialog -->
      <v-layout row justify-center>
        <v-dialog
          v-model="editpersonnel_disciplinedialog"
          persistent
          max-width="50%"
        >
          <v-card class="mx-auto pa-5">
            <base-material-card
              color="yellow"
              icon="mdi-clipboard-text"
              title="แก้ไขข้อมูล"
              class="px-5 py-3 text_google"
            ></base-material-card>
            <v-card-text>
              <v-form ref="editpersonnel_disciplineform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md12>
                      <v-row>
                        <v-col cols="12" lg="12">
                          <v-textarea
                            v-model="editpersonnel_discipline.discipline_blame"
                            dense
                            label="รายการ : "
                            request
                            :rules="[v => !!v || '']"
                          ></v-textarea>
                        </v-col>

                        <v-col cols="12" lg="6">
                          <v-text-field
                            v-model="editpersonnel_discipline.location_disbla"
                            item-value="value"
                            label="สถานที่"
                            dense
                            :rules="[v => !!v || '']"
                          ></v-text-field>
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
                                v-model="editpersonnel_discipline.date_time"
                                label="เมื่อวันที่"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="editpersonnel_discipline.date_time"
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
                @click.stop="editpersonnel_disciplinedialog = false"
                rounded
              >
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn
                large
                color="warning"
                @click.stop="editpersonnel_disciplineSubmit()"
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
      addpersonnel_disciplinedialog: false,
      editpersonnel_disciplinedialog: false,
      deletepersonnel_disciplinedialog: false,
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
        { text: "ลำดับ", align: "center", value: "id_dp" },
        { text: "รายการ", align: "center", value: "discipline_blame" },
        { text: "สถานที่", align: "left", value: "location_disbla" },
        { text: "เมื่อวันที่", align: "left", value: "date_time" }
        /*  { text: "แก้ไข", align: "center", value: "actions", icon: "mdi-file-document-edit" },
        { text: "ลบ", align: "center", value: "action_s" , icon: "mdi-delete-forever" },      */
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
      personnel_discipline: [],
      addpersonnel_discipline: {},
      editpersonnel_discipline: [],
      personnel_disciplines: [],
      personnel_discipline_sub: [],
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      menu2: false,
      menu3: false,
      menu4: false,
      colleges: {},
      provinces: [],
      prefectures: [],
      regions: [],
      region_ena: true
    };
  },

  async mounted() {
    this.personnel_disciplinesQueryAll();
  },

  methods: {
    async personnel_disciplinesQueryAll() {
      this.loading = true;
      let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
      let result = await this.$http
        .post("personnel_discipline.php", {
          ApiKey: this.ApiKey,
        })
        .finally(() => (this.loading = false));
      this.personnel_disciplines = result.data;

    },
    //Add data
    async personnel_disciplineAdd() {
      this.addpersonnel_discipline = {};
      this.addpersonnel_disciplinedialog = true;
    },

    async addpersonnel_disciplineSubmit() {
      if (this.$refs.addpersonnel_disciplineform.validate()) {
        let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
        this.addpersonnel_discipline.ApiKey = this.ApiKey;
        this.addpersonnel_discipline.id_card = userSession.id_card;
        let result = await this.$http.post(
          "personnel_discipline.insert.php",
          this.addpersonnel_discipline
        );
        if (result.data.status == true) {
          this.personnel_discipline = result.data;
          this.snackbar.icon = "mdi-font-awesome";
          this.snackbar.color = "success";
          this.snackbar.text = "บันทึกข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.personnel_disciplinesQueryAll();
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text = "บันทึกข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.addpersonnel_disciplinedialog = false;
      }
    },

    //Edit data
    async personnel_disciplineEdit(id_dp) {
      let result = await this.$http.post("personnel_discipline.php", {
        ApiKey: this.ApiKey,
        id_dp: id_dp
      });
      this.editpersonnel_discipline = result.data;
      this.editpersonnel_disciplinedialog = true;
    },

    async editpersonnel_disciplineSubmit() {
      if (this.$refs.editpersonnel_disciplineform.validate()) {
        this.editpersonnel_discipline.ApiKey = this.ApiKey;
        let result = await this.$http.post(
          "personnel_discipline.update.php",
          this.editpersonnel_discipline
        );
        if (result.data.status == true) {
          this.personnel_discipline = result.data;
          this.snackbar.icon = "mdi-content-save";
          this.snackbar.color = "success";
          this.snackbar.text = "แก้ไขข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.personnel_disciplinesQueryAll();
        } else {
          this.snackbar.icon = "mdi-alert";
          this.snackbar.color = "red";
          this.snackbar.text = "แก้ไขข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.editpersonnel_disciplinedialog = false;
      }
    },

    //DELETE data
    async personnel_disciplineDelete(id_dp) {
      let result = await this.$http.post("personnel_discipline.php", {
        ApiKey: this.ApiKey,
        id_dp: id_dp
      });
      this.editpersonnel_discipline = result.data;
      this.deletepersonnel_disciplinedialog = true;
    },

    async deletepersonnel_disciplineubmit() {
      if (this.$refs.deletepersonnel_disciplineform.validate())
        this.editpersonnel_discipline.ApiKey = this.ApiKey;
      {
        let result = await this.$http.post(
          "personnel_discipline.delete.php",
          this.editpersonnel_discipline
        );
        if (result.data.status == true) {
          this.snackbar.icon = "mdi-content-save";
          this.snackbar.color = "success";
          this.snackbar.text = "ลบข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.personnel_disciplinesQueryAll();
        } else {
          this.snackbar.icon = "mdi-alert";
          this.snackbar.color = "red";
          this.snackbar.text = "ลบข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.deletepersonnel_disciplinedialog = false;
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
