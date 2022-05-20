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
      color="info"
      horizontal     
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
    <v-container fluid>
      <base-material-card
        icon="mdi-clipboard-text"
        title="ข้อมูลการย้าย สายการสอนและสายสนับสนุน"
        class="px-5 py-3"
      >
        <v-card class="mb-4 pa-2">
          <v-row>
            <v-col cols="12" md="6" class="text-right">
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
            <v-col cols="12" md="2">
              <v-select
                v-model="times_select"
                :items="time_ss"
                item-value="time_ss"
                :value="1"
                label="ครั้งที่ :"
              >
              </v-select>
            </v-col>
            <v-col cols="12" md="2">
              <v-select
                v-model="years_select"
                :items="year_ss"
                item-value="year_ss"
                :value="2565"
                label="ปีที่ :"
              >
              </v-select>
            </v-col>
            <v-col cols="12" md="2">
              <v-btn large block @click="searchTimeYear()"> ค้นหา</v-btn>
            </v-col>
          </v-row>
        </v-card>
        <v-data-table
          color="success"
          :loading="loading"
          :headers="headers"
          :items="conditions_transfers"
          :search="search"
        >
        <template v-slot:[`item.select_item`]="{ item }">
              <v-checkbox v-model="search" :value="item.college_code"></v-checkbox>
            </template>

          <template v-slot:[`item.con_datail_branch`]="{ item }">
            <v-btn
              v-if="item.con_datail_branch === ''"
              color="info"
              @click="detail_select(item.id_cb)"
              fab
              x-small
            >
              <v-icon>
                mdi-comment-processing
              </v-icon>
            </v-btn>
            <v-chip color="green" dark v-else @click="detail_select(item.id_cb)">
             <h2>{{ item.con_datail_branch }}</h2> 
              
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


       <!--update_detailsdialog  -->
      <v-layout row justify-center>
        <v-dialog v-model="update_detailsdialog" persistent max-width="50%">
          <v-card class="mx-auto pa-5" >
            <base-material-card
              icon="mdi-account-multiple"
              title="เพิ่มเติมรายละเอียดสาขาวิชา"
              class="px-5 py-3 text_google"
              
            >
            </base-material-card>

            <v-card-text>
             <v-form ref="addconditions_branchform" lazy-validation>
              <v-container grid-list-md>
                <v-layout wrap>                
                   <v-flex md12>
                    <v-text-field label="รายละเอียดเพิ่มเติมสาขาวิชา" v-model="conditions_branchs.con_datail_branch"></v-text-field>
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
                @click.stop="update_detailsdialog = false"
                rounded
                ><v-icon dark>mdi-close</v-icon> ยกเลิก</v-btn
              >
              <v-btn
                large
                color="success"
                @click.stop="adddetail_conditionsSubmit()"
                rounded
              >
                <v-icon dark>mdi-content-save</v-icon>&nbsp;&nbsp;บันทึก
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
      loading: false,
      ApiKey: "HRvec2021",
      valid: true,
      editconditions_transferdialog: false,
      update_detailsdialog:false,
      update_details:{},
      conditions_branchs:[],
      times_select: "1",
      years_select: "2565",
      snackbar: {
        show: false,
        color: "",
        timeout: 5000,
        icon: "",
        text: ""
      },
      time_ss: [1, 2],
      year_ss: [2565, 2566, 2567, 2568, 2569, 2570],
      conditions_transfers: [],
      editconditions_transfer: {},
      search: "",
      pagination: {},
      headers: [
         { text: "เลือก", align: "left", value: "select_item" },
        { text: "อ้างอิง", align: "center", value: "id_ref" },
        { text: "สถานศึกษา", align: "center", value: "college_name" },
        { text: "รหัส", align: "center", value: "id_branch" },
        { text: "สาขาวิชา", align: "left", value: "name_branch" },
        { text: "เพิ่มเติม", align: "center", value: "con_datail_branch" },
        { text: "วุฒิการศึกษา", align: "left", value: "educational_level" },
        { text: "จำนวนรับ", align: "left", value: "quantity_n" },
        { text: "ลำดับ", align: "left", value: "sequence_n" },
        { text: "ครั้งที่", align: "center", value: "time_s" },
        { text: "ปีที่", align: "center", value: "year_s" },
        { text: "วันที่ทำรายการ", align: "center", value: "date_time" },
        {
          text: "ผลการพิจารณา",
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
      conditions_transferstatus: [],
      userstatus: {}
    };
  },
  async mounted() {
    /* await this.conditions_transferQueryAll(); */
  },
  methods: {
    async searchTimeYear() {
      this.loading = true;
      let result = await this.$http
        .post("conditions_transfer.php", {
          ApiKey: this.ApiKey,
          time_s: this.times_select,
          year_s: this.years_select,
          search: "ok"
        })
        .finally(() => (this.loading = false));
      this.conditions_transfers = result.data;
    },

    async conditions_transferQueryAll() {
      this.loading = true;
      let result = await this.$http
        .post("conditions_transfer.php", {
          ApiKey: this.ApiKey
        })
        .finally(() => (this.loading = false));
      this.conditions_transfers = result.data;
    },
    async detail_select(id_cb){
       this.loading = true;
      let result = await this.$http
        .post("conditions_transfer.php", {
          ApiKey: this.ApiKey,
          id_cb: id_cb
        })
        .finally(() => (this.loading = false));
      this.conditions_branchs = result.data;
      this.update_detailsdialog = true;
      console.log(result.data)
    },
    /* adddetail_conditionsSubmit */
     async adddetail_conditionsSubmit() {
      if (this.$refs.addconditions_branchform.validate()) {
        this.update_details.ApiKey = this.ApiKey;
        this.update_details.id_cb = this.conditions_branchs.id_cb;
        this.update_details.con_datail_branch = this.conditions_branchs.con_datail_branch; 
       console.log(this.update_details)      
       let result = await this.$http.post(
          "conditions_branch.update.php",
          this.update_details
        );

        console.log(result.data)


        if (result.data.status == true) {
          this.conditions_branch = result.data;
          this.snackbar.icon = "mdi-checkbox-marked-circle";
          this.snackbar.color = "success";
          this.snackbar.text = "บันทึกข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.conditions_transferQueryAll();
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text =
            "บันทึกข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.update_detailsdialog = false;
      }
    },
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
      return "cyan darken-4";
    }
  }
};
</script>
