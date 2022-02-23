<template>
  <div>
  <v-bottom-navigation    
      color="info"
      horizontal    
      :background-color="color"
      dark
    >
      <v-btn to="/admin/conditions_branch">
        <span>รายละเอียดเงือนไขสาขาวิชา </span>
        <v-icon>mdi-source-branch</v-icon>
      </v-btn>

      <v-btn to="/admin/conditions_transfer">
        <span>รายการเงือนไขสาขาวิชา</span>
        <v-icon>mdi-source-branch</v-icon>
      </v-btn>
    </v-bottom-navigation>
    <v-bottom-navigation
      :value="value"
      color="info"
      horizontal
      v-model="value"
      :background-color="color"
      dark
    >
      <v-btn to="/admin/transference_location_detail">
        <span>รายละเอียดผู้ยืนย้าย ประกอบพิจารณา </span>
        <v-icon>mdi-details</v-icon>
      </v-btn>
      <v-btn to="/admin/transference_location">
        <span>รายละเอียดผู้ยืนย้าย </span>
        <v-icon>mdi-details</v-icon>
      </v-btn>

      <v-btn to="/admin/transference_personnel">
        <span>ประมวลผล 1 </span>
        <v-icon>mdi-calculator</v-icon>
      </v-btn>

      <v-btn to="/admin/process_transfer">
        <span>ประมวลผล 2 [ระบบ]</span>
        <v-icon>mdi-calculator</v-icon>
      </v-btn>

      <v-btn to="/admin/process_transfer_switch_normal">
        <span>ประมวลผล 3 [สับเปลี่ยน ปกติ]</span>
        <v-icon>mdi-calculator</v-icon>
      </v-btn>

      <v-btn to="/admin/process_transfer_switch">
        <span>ประมวลผล 4 [สับเปลี่ยน]</span>
        <v-icon>mdi-calculator</v-icon>
      </v-btn>
      <v-btn to="/admin/conditons_transfer_success">
        <span>สรุปผล</span>
        <v-icon>mdi-bookmark-check</v-icon>
      </v-btn>
    </v-bottom-navigation>
    <v-container id="home_menu" fluid tag="section">
      <v-card>
        <v-toolbar flat color="primary" dark>
          <v-toolbar-title
            >ประมวลผลข้อมูลการย้าย แบบที่ 4 สับเปลี่ยนไม่ปกติ</v-toolbar-title
          >
        </v-toolbar>

        <v-card class="ma-2 pa-2">
          <v-row>
            <v-col cols="12" md="4" class="text-right">
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

            <v-col class="d-flex" cols="12" md="2">
              <v-select
                v-model="times_s"
                :items="period_match"
                item-text="period_times"
                label="ครั้งที่ :"
              ></v-select>
            </v-col>
            <v-col class="d-flex" cols="12" md="2">
              <v-select
                v-model="year_s"
                :items="period_match"
                item-text="period_yearbd"
                label="ปี :"
              ></v-select>
            </v-col>
            <v-col class="d-flex" cols="12" md="2">
              <v-btn
                elevation="2"
                rounded
                color="primary"
                dark
                x-large
                block
                @click="Switch_personnel()"
              >
                <v-icon>mdi-clipboard-check</v-icon> เลือกดำเนินการ</v-btn
              >
            </v-col>
            <v-col cols="12" md="2" class="text-right">
              <h1 class="text--right">ประมวลผลแบบที่ 4 ไม่ปกติ</h1>
            </v-col>
          </v-row>
        </v-card>

        <v-card flat>
          <v-data-table
            color="success"
            :loading="loading"
            :headers="headers"
            :items="conditions_transfers"
            :search="search"
            :items-per-page="5"
          >
            <template v-slot:[`item.select_item`]="{ item }">
              <v-checkbox v-model="search" :value="item.id_card_a"></v-checkbox>
            </template>

            <template v-slot:[`item.title_s_a`]="{ item }">
              <v-chip color="warning" dark>
                <span style="font-size:16px;">
                  {{
                    item.title_s_a + item.frist_name_a + " " + item.last_name_a
                  }}</span
                >
              </v-chip>
            </template>

            <template v-slot:[`item.title_s_b`]="{ item }">
              <v-chip color="info" dark>
                <span style="font-size:16px;">
                  {{
                    item.title_s_b + item.frist_name_b + " " + item.last_name_b
                  }}</span
                >
              </v-chip>
            </template>

            <template v-slot:[`item.college_namea`]="{ item }">
              <v-chip color="warning" dark>
                <span style="font-size:16px;"> {{ item.college_namea }}</span>
              </v-chip>
            </template>

            <template v-slot:[`item.college_name`]="{ item }">
              <v-chip color="warning" dark>
                <span style="font-size:16px;"> {{ item.college_name }}</span>
              </v-chip>
            </template>

            <template v-slot:[`item.college_nameb`]="{ item }">
              <v-chip color="info" dark>
                <span style="font-size:16px;"> {{ item.college_nameb }}</span>
              </v-chip>
            </template>

            <template v-slot:[`item.status_process`]="{ item }">
              <span
                v-if="
                  item.personnel_num_s <= 1 &&
                    item.condition_edu === item.personnel_edu
                "
                ><v-icon large color="green darken-2"
                  >mdi-clipboard-check</v-icon
                ></span
              >
              <span v-else
                ><v-icon large color="yellow lighten-1"
                  >mdi-clipboard-check-multiple</v-icon
                ></span
              >
            </template>
            <template v-slot:[`item.actions`]="{ item }">
               <v-icon
                v-if="item.id_card_a === item.switch_position"
                color="red"
                large
                >mdi-close-box</v-icon
              > 

              <v-chip v-else-if="item.status_select_a==='demand' || item.status_select_b==='demand'" color="warning" dark>          
                <span style="font-size:16px;">รับย้าย</span>
              </v-chip>

              <v-chip v-else-if="item.status_select_a==='agree' || item.status_select_b==='agree'" color="warning" dark>          
                <span style="font-size:16px;">ปกติ</span>
              </v-chip>
               <v-chip v-else-if="item.status_select_a==='sw_normal' || item.status_select_b==='sw_normal'" color="warning" dark>          
                <span style="font-size:16px;">สับเปลี่ยน</span>
              </v-chip>              

              <v-icon
                v-else-if="item.college_code_susss >= 1"
                color="red"
                large
                @click.stop="deletePosition(item.id_ref,item.id_ref_b,item.id_branch)"
                >mdi-delete-circle</v-icon
              >
             
              <v-icon
                color="green"
                large
                @click.stop="select_idPosition(item.id_ref,item.id_ref_b,item.id_branch)"
                v-else
              >
                mdi-credit-card-plus
              </v-icon>
            </template>

            <template v-slot:[`item.college_code_susss`]="{ item }">
              <v-chip :color="getColor(item.college_code_susss)" dark>
                <span style="font-size:16px;">
                  {{ item.college_code_susss }}</span
                >
              </v-chip>
            </template>

            <template v-slot:[`item.id_postion_susss`]="{ item }">
              <v-chip :color="getColor(item.id_postion_susss)" dark>
                <span style="font-size:16px;">
                  {{ item.id_postion_susss }}</span
                >
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
        </v-card>
      </v-card>

      <!-- V-model canceldialog -->
      <v-layout row justify-center>
        <v-dialog v-model="canceldialog" persistent max-width="80%">
          <v-card class="mx-auto pa-6">
            <base-material-card
              color="yellow"
              icon="mdi-clipboard-text"
              title="ยกเลิกรายการ"
              class="px-5 py-3 text_google"
            >
              <div class="text-right"></div>
            </base-material-card>
            <v-card-text>
              <v-form ref="cancelform" lazy-validation>
                <v-container grid-list-md>
                <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-card elevation="2" class="pa-2">
                        <h2>
                          รหัสอ้างอิง A:
                          {{ conditons_transfer_successs.id_ref }}
                        </h2>
                        <h2>
                          รหัสบัตรประชาชน :
                          {{ transference_personnels.id_card }}
                        </h2>
                        <h4>
                          ชื่อ-นามสกุล : {{ transference_personnels.title_s
                          }}{{ transference_personnels.frist_name }}
                          {{ transference_personnels.last_name }}
                        </h4>
                        <h4>
                          สถานศึกษาปัจจุบัน :
                          {{ transference_personnels.college_name }} [
                          {{ transference_personnels.college_code }} ]
                        </h4>
                        <h4>
                          เลขที่ตำแหน่งปัจจุบัน :
                          {{ transference_personnels.id_position }}
                        </h4>
                      <h3>{{branchs.id_branch}} : {{branchs.name_branch}}</h3>
                      </v-card>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-card elevation="2" class="pa-2">
                        <h2>
                          รหัสอ้างอิง B :
                          {{ conditons_transfer_successs_b.id_ref }}
                        </h2>
                        <h2>
                          รหัสบัตรประชาชน :
                          {{ transference_personnels_b.id_card }}
                        </h2>
                        <h4>
                          ชื่อ-นามสกุล : {{ transference_personnels_b.title_s
                          }}{{ transference_personnels_b.frist_name }}
                          {{ transference_personnels_b.last_name }}
                        </h4>
                        <h4>
                          สถานศึกษาปัจจุบัน :
                          {{ transference_personnels_b.college_name }} [
                          {{ transference_personnels_b.college_code }} ]
                        </h4>
                        <h4>
                          เลขที่ตำแหน่งปัจจุบัน :
                          {{ transference_personnels_b.id_position }}
                        </h4>
                        <h3>{{branchs.id_branch}} : {{branchs.name_branch}}</h3>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn large @click.stop="canceldialog = false" rounded>
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn large color="warning" @click.stop="cancelSubmit()" rounded>
                <v-icon dark>mdi-pencil</v-icon>&nbsp;ยืนยัน
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model deletetransference_locationdialog -->
      <v-layout row justify-center>
        <v-dialog
          v-model="deletetransference_locationdialog"
          persistent
          max-width="80%"
        >
          <v-card class="mx-auto pa-6">
            <base-material-card
              color="yellow"
              icon="mdi-clipboard-text"
              title="ลบรายการที่ไม่ได้ดำเนินรายการเรียบร้อย"
              class="px-5 py-3 text_google"
            ></base-material-card>
            <v-card-text>
              <v-form ref="edituserform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap> </v-layout>
                </v-container>
                <small>* จำเป็น</small>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                large
                @click.stop="deletetransference_locationdialog = false"
                rounded
              >
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn
                large
                color="warning"
                @click.stop="deletetransference_locationSubmit()"
                rounded
              >
                <v-icon dark>mdi-pencil</v-icon>&nbsp;ยืนยันการลบ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model positiondialog -->
      <v-layout row justify-center>
        <v-dialog v-model="positiondialog" persistent max-width="80%">
        <v-card class="mx-auto pa-6">
            <base-material-card
              color="yellow"
              icon="mdi-clipboard-text"
              title="สลับตำแหน่ง"
              class="px-5 py-3 text_google"
            >
              <small>
                {{ transference_personnels.time_ss }}/{{
                  transference_personnels.year_ss
                }}</small
              >
            </base-material-card>
            <v-card-text>
              <v-form ref="updatepositionform" lazy-validation>
                <v-container grid-list-md>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-card elevation="2" class="pa-2">
                        <h2>
                          รหัสอ้างอิง A:
                          {{ transference_personnels.tid_ref }}
                        </h2>
                        <h2>
                          รหัสบัตรประชาชน :
                          {{ transference_personnels.id_card }}
                        </h2>
                        <h4>
                          ชื่อ-นามสกุล : {{ transference_personnels.title_s
                          }}{{ transference_personnels.frist_name }}
                          {{ transference_personnels.last_name }}
                        </h4>
                        <h4>
                          สถานศึกษาปัจจุบัน :
                          {{ transference_personnels.college_name }} [
                          {{ transference_personnels.college_code }} ]
                        </h4>
                        <h4>
                          เลขที่ตำแหน่งปัจจุบัน :
                          {{ transference_personnels.id_position }}
                        </h4>
                      <h3>{{branchs.id_branch}} : {{branchs.name_branch}}</h3>
                      </v-card>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-card elevation="2" class="pa-2">
                        <h2>
                          รหัสอ้างอิง B :
                          {{ transference_personnels_b.tid_ref }}
                        </h2>
                        <h2>
                          รหัสบัตรประชาชน :
                          {{ transference_personnels_b.id_card }}
                        </h2>
                        <h4>
                          ชื่อ-นามสกุล : {{ transference_personnels_b.title_s
                          }}{{ transference_personnels_b.frist_name }}
                          {{ transference_personnels_b.last_name }}
                        </h4>
                        <h4>
                          สถานศึกษาปัจจุบัน :
                          {{ transference_personnels_b.college_name }} [
                          {{ transference_personnels_b.college_code }} ]
                        </h4>
                        <h4>
                          เลขที่ตำแหน่งปัจจุบัน :
                          {{ transference_personnels_b.id_position }}
                        </h4>
                        <h3>{{branchs.id_branch}} : {{branchs.name_branch}}</h3>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn large @click.stop="positiondialog = false" rounded>
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn
                large
                color="success"
                @click.stop="updatepositionSubmit()"
                rounded
              >
                <v-icon dark>mdi-content-save</v-icon>&nbsp;บันทึก
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
        <v-card-text>{{ snackbar.text }}</v-card-text>

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
  name: "HrvecProcessTransfer",
  data() {
    return {
      ApiKey: "HRvec2021",
      process_transfer: {},
      valid: true,
      times_s: "",
      year_s: "",
      row: null,
      man_powers: [],
      man_powers: [], 
      value: "4",
      loading: true,
      snackbar: {
        show: false,
        color: "",
        timeout: 5000,
        icon: "",
        text: ""
      },
      headers: [
        { text: "เลือก", align: "left", value: "select_item" },
        { text: "วิทยาลัย A", align: "left", value: "college_code_a" },
        { text: "วิทยาลัย A", align: "left", value: "college_name_a" },
        { text: "ID A", align: "left", value: "id_card_a" },
        { text: "ชื่อ-นามสกุล", align: "left", value: "title_s_a" },
        { text: "รหัส", align: "left", value: "id_branch" },
        { text: "สาขา", align: "left", value: "name_branch" },
        { text: "สถานะ", align: "center", value: "status_process" },
        { text: "วิทยาลัย B", align: "left", value: "college_code_b" },
        { text: "วิทยาลัย B", align: "left", value: "college_name_b" },
        { text: "ID B", align: "left", value: "id_card_b" },
        { text: "ชื่อ-นามสกุล", align: "left", value: "title_s_b" },
     
        {
          text: "เลขที่ตำแหน่ง",
          align: "center",
          value: "actions",
          icon: "mdi-file-document-edit"
        },
        { text: "แห่งใหม่ A", align: "center", value: "college_code_susss" },
        /*  {
          text: "สถานศึกษาแห่งใหม่",
          align: "center",
          value: "college_name_suss"
        }, */
        { text: "เลขที่ A", align: "center", value: "id_postion_susss" }
      ],
      search: "",
      pagination: {},
      rowsperpage: [
        25,
        50,
        100,
        {
          text: "All",
          value: -1
        }
      ],
      conditions_transfers: [],
      period_match: [],
      delete_transference: [],
      conditions_branchs: [],
      transference_locations: [],
      transference_personnels: [],
      edittransference_location: [],
      positiondialog: false,
      deletetransference_locationdialog: false,
      canceldialog: false,
      conditons_transfer_successs: [],
      conditons_transfer_successs_b:[],
      transference_personnels_id_ref: [],
      man_powerss: [],
      updatepositions: {}, 
      updatepositions_b:{},
      personnel_temporarys:[],
      transference_personnels_b: [],
      personnel_educations_b: [],
      personnel_educations:[],
      branchs:[],
    };
  },

  async mounted() {
    //await this.conditions_transferQueryAll();
    await this.Switch_personnelAll();
    await this.period_QueryAll();
    await this.man_powerQuery();
  },

  methods: {
    async searchTimeYear() {
      this.loading = true;
      let result = await this.$http
        .post("process_transfer.php", {
          ApiKey: this.ApiKey,
          time_s: this.times_s,
          year_s: this.year_s
        })
        .finally(() => (this.loading = false));
      this.conditions_transfers = result.data;
    },

    async man_powerQuery(college_code) {
      let man_power_result;
      man_power_result = await this.$http.post("man_power.php", {
        ApiKey: this.ApiKey,
        college_code: college_code
      });
      this.man_powers = man_power_result.data;
    },

    async Switch_personnelAll() {
      this.loading = true;
      let result = await this.$http
        .post("process_transfer.php", {
          ApiKey: this.ApiKey,
          switchs: "Ok"
        })
        .finally(() => (this.loading = false));
      this.conditions_transfers = result.data;
    },

    async Switch_personnel() {
      this.loading = true;
      let result = await this.$http
        .post("process_transfer.php", {
          ApiKey: this.ApiKey,
          time_s: this.times_s,
          year_s: this.year_s,
          switchs: "Ok"
        })
        .finally(() => (this.loading = false));
      this.conditions_transfers = result.data;
    },

    async conditions_transferQueryAll() {
      this.loading = true;
      let result = await this.$http
        .post("process_transfer.php", {
          ApiKey: this.ApiKey
        })
        .finally(() => (this.loading = false));
      this.conditions_transfers = result.data;
    },

    async period_QueryAll() {
      this.loading = true;
      let result = await this.$http
        .post("period.php", {
          ApiKey: this.ApiKey
        })
        .finally(() => (this.loading = false));
      this.period_match = result.data;
    },

    async select_idPosition(id_ref,id_ref_b,id_branch) {
    let result_tran = await this.$http
        .post("transference_personnel.php", {
          ApiKey: this.ApiKey,
          id_ref: id_ref
        })
        .finally(() => (this.loading = false));
      this.transference_personnels = result_tran.data;

      let result_tran_b = await this.$http
        .post("transference_personnel.php", {
          ApiKey: this.ApiKey,
          id_ref: id_ref_b
        })
        .finally(() => (this.loading = false));
      this.transference_personnels_b = result_tran_b.data;

      let result_branch = await this.$http
        .post("branch.php", {
          ApiKey: this.ApiKey,
          id_branch: id_branch
        })
        .finally(() => (this.loading = false));
      this.branchs = result_branch.data;       
      this.positiondialog = true;
      this.man_powerQuery();
    },



    async man_powerQuery() {
      let man_power_result;
      man_power_result = await this.$http.post("man_power.php", {
        ApiKey: this.ApiKey,
        college_code: this.conditions_branchs.college_code
      });
      this.man_powers = man_power_result.data;
    },

    async transference_locationDelete() {
      this.deletetransference_locationdialog = true;
    },
    async deletetransference_locationSubmit() {
      if (this.$refs.edituserform.validate()) {
        let result = await this.$http.post(
          "transference_location.delete.admin.php"
        );
        if (result.data.status == true) {
          this.conditions_transfers = result.data;
          this.snackbar.icon = "mdi-font-awesome";
          this.snackbar.color = "success";
          this.snackbar.text = "ลบข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.conditions_transferQueryAll();
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text = "ลบข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.deletetransference_locationdialog = false;
      }
    },

    async deletePosition(id_ref,id_ref_b,id_branch) {
       let result_tran = await this.$http
        .post("transference_personnel.php", {
          ApiKey: this.ApiKey,
          id_ref: id_ref
        })
        .finally(() => (this.loading = false));
      this.transference_personnels = result_tran.data;

      let result_tran_b = await this.$http
        .post("transference_personnel.php", {
          ApiKey: this.ApiKey,
          id_ref: id_ref_b
        })
        .finally(() => (this.loading = false));
      this.transference_personnels_b = result_tran_b.data;

      let result_branch = await this.$http
        .post("branch.php", {
          ApiKey: this.ApiKey,
          id_branch: id_branch
        })
        .finally(() => (this.loading = false));
      this.branchs = result_branch.data;    

      let result_cts = await this.$http.post("conditons_transfer_success.php", {
        ApiKey: this.ApiKey,
        id_ref: id_ref
      });
      this.conditons_transfer_successs = result_cts.data;
     

      let result_cts_b = await this.$http.post("conditons_transfer_success.php", {
        ApiKey: this.ApiKey,
        id_ref: id_ref_b
      });
      this.conditons_transfer_successs_b = result_cts_b.data;
    


      this.canceldialog = true;
    },

    async cancelSubmit() {
      if (this.$refs.cancelform.validate()) {
        this.conditons_transfer_successs.ApiKey = this.ApiKey;
        this.conditons_transfer_successs_b.ApiKey = this.ApiKey;     

        let result_cts = await this.$http.post(
          "conditons_transfer_success.delete.php",
          this.conditons_transfer_successs
        );

        let result_cts_b = await this.$http.post(
          "conditons_transfer_success.delete.php",
          this.conditons_transfer_successs_b
        );

        if (
          result_cts.data.status == true &&
          result_cts_b.data.status == true
        ) {
          this.snackbar.icon = "mdi-font-awesome";
          this.snackbar.color = "success";
          this.snackbar.text = "ยกเลิกข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.Switch_personnelAll();
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text = "ยกเลิกข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.canceldialog = false;
      }
    },

    /// updatepositionSubmit
    async updatepositionSubmit() {
      if (this.$refs.updatepositionform.validate()) {
        this.updatepositions.ApiKey = this.ApiKey;
        this.updatepositions.time_s = this.transference_personnels.time_ss;
        this.updatepositions.year_s = this.transference_personnels.year_ss;
        this.updatepositions.id_postion_old = this.transference_personnels.id_position;
        this.updatepositions.college_code_old = this.transference_personnels.college_code;
        this.updatepositions.id_card = this.transference_personnels.id_card;
        this.updatepositions.id_ref = this.transference_personnels.tid_ref;
        this.updatepositions.name_position = "ครู";
        this.updatepositions.college_code = this.transference_personnels_b.college_code;
        this.updatepositions.id_position = this.transference_personnels_b.id_position;
        this.updatepositions.id_branch = this.branchs.id_branch;
        this.updatepositions.status_select = 'sw_agree';


        this.updatepositions_b.ApiKey = this.ApiKey;
        this.updatepositions_b.time_s = this.transference_personnels_b.time_ss;
        this.updatepositions_b.year_s = this.transference_personnels_b.year_ss;
        this.updatepositions_b.id_postion_old = this.transference_personnels_b.id_position;
        this.updatepositions_b.college_code_old = this.transference_personnels_b.college_code;
        this.updatepositions_b.id_card = this.transference_personnels_b.id_card;
        this.updatepositions_b.id_ref = this.transference_personnels_b.tid_ref;
        this.updatepositions_b.name_position = "ครู";
        this.updatepositions_b.college_code = this.transference_personnels.college_code;
        this.updatepositions_b.id_position = this.transference_personnels.id_position;
        this.updatepositions_b.id_branch = this.branchs.id_branch;
        this.updatepositions_b.status_select = 'sw_agree';
      
       let result_a = await this.$http.post(
          "conditons_transfer_success.insert.php",
          this.updatepositions
        );

        let result_b = await this.$http.post(
          "conditons_transfer_success.insert.php",
          this.updatepositions_b
        );

        if (result_a.data.status == true && result_b.data.status == true) {
          this.snackbar.icon = "mdi-font-awesome";
          this.snackbar.color = "success";
          this.snackbar.text = "บันทึกข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.Switch_personnelAll();
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text = "บันทึกข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.positiondialog = false;
      }
    },

    getColor(calories) {
      /*  if (calories > 400) return 'red'
        else if (calories > 200) return 'orange'
        else return 'green'  */

      if (calories > 0) return "green";
      else return "";
    }
  },
  computed: {
    period_match_call() {
      let period_year = this.period_match.period_year;
      let period_times = this.period_match.period_times;
      let result = period_times + "/" + period_year;
      return result;
    },
    color() {
      return "blue-grey darken-4";
    }
  }
};
</script>

<style lang="scss" scoped></style>
