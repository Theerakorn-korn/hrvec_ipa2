<template>
  <div>
    <v-container class="text_google">
      <base-material-card
        icon="mdi-clipboard-text"
        title="ผลงาน รางวัล"
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
                @click.native="personnel_awardAdd()"
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
          :items="personnel_awards"
          :search="search"
        >
          <template v-slot:[`item`]="{ item, index }">
            <tr>
              <td class="text-center">{{ index + 1 }}</td>
              <td class="text-center">{{ item.performance_name }}</td>
              <td class="text-center">{{ item.performance_location }}</td>
              <td class="text-center">{{ item.performance_time }}</td>
              <td class="text-center">
                <span v-if="item.award_level == 'college'">ระดับวิทยาลัย</span>
                <span v-if="item.award_level == 'provincial'"
                  >ระดับอาชีวศึกษาจังหวัด</span
                >
                <span v-if="item.award_level == 'sector'">ระดับภาค</span>
                <span v-if="item.award_level == 'vocational'"
                  >ระดับอาชีวศึกษา</span
                >
                <span v-if="item.award_level == 'nation'">ระดับชาติ</span>
                <span v-if="item.award_level == 'word'">ระดับโลก</span>
              </td>
              <td class="text-center">
                <span v-if="item.type_performance == 'skill'"
                  >การแข่งขันทักษะ</span
                >
                <span v-if="item.type_performance == 'innovation'"
                  >การประกวดสิ่งประดิษฐ์</span
                >
                <span v-if="item.type_performance == 'award'"
                  >รางวัลเชิดชูเกียรติ</span
                >
              </td>
              <td class="text-center">
                <v-icon
                  color="yellow"
                  @click.stop="personnel_awardEdit(item.id_pa)"
                >
                  mdi-pencil
                </v-icon>
              </td>
              <td class="text-center">
                <v-icon
                  color="red"
                  @click.stop="personnel_awardDelete(item.id_pa)"
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

      <!--addpersonnel_awarddialog  -->
      <v-layout row justify-center>
        <v-dialog
          v-model="addpersonnel_awarddialog"
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
              <v-form ref="addpersonnel_awardform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md12>
                      <v-row>
                        <v-col cols="12" lg="12">
                          <v-textarea
                            v-model="addpersonnel_award.performance_name"
                            dense
                            label="ผลงาน : "
                            request
                            :rules="[v => !!v || '']"
                          ></v-textarea>
                        </v-col>

                        <v-col cols="12" lg="6">
                          <v-text-field
                            v-model="addpersonnel_award.performance_location"
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
                                v-model="addpersonnel_award.performance_time"
                                label="เมื่อวันที่"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="addpersonnel_award.performance_time"
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
                        <v-col cols="12" lg="12">
                          <v-select
                            v-model="addpersonnel_award.award_level"
                            :items="award_levels"
                            item-value="value"
                            dense
                            label="ระดับผลงาน : "
                            request
                            :rules="[v => !!v || '']"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" lg="12">
                          <v-select
                            v-model="addpersonnel_award.type_performance"
                            :items="type_performances"
                            item-value="value"
                            dense
                            label="ประเภท : "
                            request
                            :rules="[v => !!v || '']"
                          ></v-select>
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
                        @click.stop="addpersonnel_awardSubmit()"
                        rounded
                      >
                        <v-icon dark>mdi-content-save</v-icon
                        >&nbsp;&nbsp;บันทึก</v-btn
                      >
                      <v-btn
                        large
                        color="warning"
                        @click.stop="addpersonnel_awarddialog = false"
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

      <!-- V-model deletepersonnel_awarddialog -->
      <v-layout>
        <v-dialog
          v-model="deletepersonnel_awarddialog"
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
              <v-form ref="deletepersonnel_awardform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12>
                      ยืนยันการลบข้อมูล :
                      <h3>{{ editpersonnel_award.performance_location }}</h3>
                    </v-flex>
                    <v-flex xs12 md6></v-flex>
                    <v-flex xs12 md6></v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn large @click.stop="deletepersonnel_awarddialog = false">
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn
                large
                color="red darken-3"
                @click.stop="deletepersonnel_awardubmit()"
                dark
              >
                <v-icon dark>mdi-delete</v-icon>&nbsp;ลบ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model editpersonnel_awarddialog -->
      <v-layout row justify-center>
        <v-dialog
          v-model="editpersonnel_awarddialog"
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
              <v-form ref="editpersonnel_awardform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md12>
                      <v-row>
                        <v-col cols="12" lg="12">
                          <v-textarea
                            v-model="editpersonnel_award.performance_name"
                            dense
                            label="ผลงาน : "
                            request
                            :rules="[v => !!v || '']"
                          ></v-textarea>
                        </v-col>

                        <v-col cols="12" lg="6">
                          <v-text-field
                            v-model="editpersonnel_award.performance_location"
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
                                v-model="editpersonnel_award.performance_time"
                                label="เมื่อวันที่"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="editpersonnel_award.performance_time"
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
                          <v-select
                            v-model="editpersonnel_award.award_level"
                            :items="award_levels"
                            item-value="value"
                            dense
                            label="ระดับผลงาน : "
                            request
                            :rules="[v => !!v || '']"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" lg="12">
                          <v-select
                            v-model="editpersonnel_award.type_performance"
                            :items="type_performances"
                            item-value="value"
                            dense
                            label="ประเภท : "
                            request
                            :rules="[v => !!v || '']"
                          ></v-select>
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
                @click.stop="editpersonnel_awarddialog = false"
                rounded
              >
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn
                large
                color="warning"
                @click.stop="editpersonnel_awardSubmit()"
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
      addpersonnel_awarddialog: false,
      editpersonnel_awarddialog: false,
      deletepersonnel_awarddialog: false,
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
        { text: "ผลงาน รางวัล", align: "center", value: "performance_name" },
        { text: "สถานที่", align: "center", value: "performance_location" },
        { text: "เมื่อวันที่", align: "center", value: "performance_time" },
        { text: "ระดับ", align: "center", value: "award_level" },
        { text: "ประเภท", align: "center", value: "type_performance" },
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
      personnel_award: [],
      addpersonnel_award: {},
      editpersonnel_award: [],
      personnel_awards: [],
      personnel_award_sub: [],
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
      region_ena: true,
      award_levels: [
        { text: "#", align: "center", value: "index" },
        { text: "ระดับวิทยาลัย", value: "college" },
        { text: "ระดับอาชีวศึกษาจังหวัด", value: "provincial" },
        { text: "ระดับภาค", value: "sector" },
        { text: "ระดับอาชีวศึกษา", value: "vocational" },
        { text: "ระดับชาติ", value: "nation" },
        { text: "ระดับโลก", value: "word" }
      ],
      type_performances: [
        { text: "การแข่งขันทักษะ", value: "skill" },
        { text: "การประกวดสิ่งประดิษฐ์", value: "innovation" },
        { text: "รางวัลเชิดชูเกียรติ", value: "award" }
      ]
    };
  },

  async mounted() {
    this.personnel_awardsQueryAll();
  },

  methods: {
    async personnel_awardsQueryAll() {
      this.loading = true;
      let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
      let result = await this.$http
        .post("personnel_award.php", {
          ApiKey: this.ApiKey,
          id_card: userSession.id_card
        })
        .finally(() => (this.loading = false));
      this.personnel_awards = result.data;
    },

    
    //Add data
    async personnel_awardAdd() {
      this.addpersonnel_award = {};
      this.addpersonnel_awarddialog = true;
    },

    async addpersonnel_awardSubmit() {
      if (this.$refs.addpersonnel_awardform.validate()) {
        let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
        this.addpersonnel_award.ApiKey = this.ApiKey;
        this.addpersonnel_award.id_card = userSession.id_card;
        let result = await this.$http.post(
          "personnel_award.insert.php",
          this.addpersonnel_award
        );
        if (result.data.status == true) {
          this.personnel_award = result.data;
          this.snackbar.icon = "mdi-font-awesome";
          this.snackbar.color = "success";
          this.snackbar.text = "บันทึกข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.personnel_awardsQueryAll();
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text = "บันทึกข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.addpersonnel_awarddialog = false;
      }
    },

    //Edit data
    async personnel_awardEdit(id_pa) {
      let result = await this.$http.post("personnel_award.php", {
        ApiKey: this.ApiKey,
        id_pa: id_pa
      });
      this.editpersonnel_award = result.data;
      this.editpersonnel_awarddialog = true;
    },

    async editpersonnel_awardSubmit() {
      if (this.$refs.editpersonnel_awardform.validate()) {
        this.editpersonnel_award.ApiKey = this.ApiKey;
        let result = await this.$http.post(
          "personnel_award.update.php",
          this.editpersonnel_award
        );
        if (result.data.status == true) {
          this.personnel_award = result.data;
          this.snackbar.icon = "mdi-content-save";
          this.snackbar.color = "success";
          this.snackbar.text = "แก้ไขข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.personnel_awardsQueryAll();
        } else {
          this.snackbar.icon = "mdi-alert";
          this.snackbar.color = "red";
          this.snackbar.text = "แก้ไขข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.editpersonnel_awarddialog = false;
      }
    },

    //DELETE data
    async personnel_awardDelete(id_pa) {
      let result = await this.$http.post("personnel_award.php", {
        ApiKey: this.ApiKey,
        id_pa: id_pa
      });
      this.editpersonnel_award = result.data;
      this.deletepersonnel_awarddialog = true;
    },

    async deletepersonnel_awardubmit() {
      if (this.$refs.deletepersonnel_awardform.validate())
        this.editpersonnel_award.ApiKey = this.ApiKey;
      {
        let result = await this.$http.post(
          "personnel_award.delete.php",
          this.editpersonnel_award
        );
        if (result.data.status == true) {
          this.snackbar.icon = "mdi-content-save";
          this.snackbar.color = "success";
          this.snackbar.text = "ลบข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.personnel_awardsQueryAll();
        } else {
          this.snackbar.icon = "mdi-alert";
          this.snackbar.color = "red";
          this.snackbar.text = "ลบข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.deletepersonnel_awarddialog = false;
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
