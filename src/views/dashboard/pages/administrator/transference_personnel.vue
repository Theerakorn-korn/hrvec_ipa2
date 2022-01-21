<template>
  <div>
    <v-container>
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
              ></v-select>
            </v-col>
            <v-col cols="12" md="2">
              <v-select
                v-model="years_select"
                :items="year_ss"
                item-value="year_ss"
                :value="2565"
                label="ปีที่ :"
              ></v-select>
            </v-col>
            <v-col cols="12" md="2">
              <v-btn large block @click="searchTimeYear()">ค้นหา</v-btn>
            </v-col>
          </v-row>
        </v-card>
        <v-data-table
          color="success"
          :loading="loading"
          :headers="headers"
          :items="transference_personnels"
          :search="search"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon
            v-if="item.succ_college===''"
              color="yellow"
              large
              @click.stop="select_idPosition(item.id_ref)"
            >mdi-credit-card-plus</v-icon>

              <v-icon
              v-else
              color="yellow"
              large
              @click.stop="deletePosition(item.id_ref)"
            >mdi-close</v-icon>

          </template>

          <v-alert
            slot="no-results"
            :value="true"
            color="error"
            icon="mdi-alert"
          >ไม่พบผลลัพธ์ "{{ search }}" ที่คุณกำลังค้นหา.</v-alert>
        </v-data-table>
      </base-material-card>

      <!-- V-model edittransference_personneldialog -->
      <v-layout row justify-center>
        <v-dialog v-model="edittransference_personneldialog" persistent max-width="80%">
          <v-card class="mx-auto pa-6">
            <base-material-card
              color="yellow"
              icon="mdi-clipboard-text"
              title="แก้ไขข้อมูลผู้ใช้งานระบบ"
              class="px-5 py-3 text_google"
            ></base-material-card>
            <v-card-text>
              <v-form ref="edittransference_personnelform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md6>{{ edittransference_personnel.id_card }}</v-flex>
                    <v-flex md6>
                      <v-text-field
                        label="Password"
                        v-model="edittransference_personnel.p_word"
                        type="password"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        label="Confirm Password"
                        v-model="edittransference_personnel.transference_personnel_confirmpassword"
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
              <v-btn large @click.stop="edittransference_personneldialog = false" rounded>
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn large color="warning" @click.stop="edittransference_personnelSubmit()" rounded>
                <v-icon dark>mdi-pencil</v-icon>&nbsp;บันทึก
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
              title="เลือกตำแหน่ง"
              class="px-5 py-3 text_google"
            ></base-material-card>
            <v-card-text>
              <v-form ref="updatepositionform" lazy-validation>
                <v-container>
                 
                  <v-row>
                     <v-flex md6>
                     รหัสบัตรประชาชน :  {{ transference_personnels_id_ref.id_card }} ชื่อ-นามสกุล : {{ transference_personnels_id_ref.title_s }}{{ transference_personnels_id_ref.frist_name }} {{ transference_personnels_id_ref.last_name }}
                    </v-flex>
                     <v-flex md6>
                     สถานศึกษาปัจจุบัน :  {{ transference_personnels_id_ref.college_name }}  เลขที่ตำแหน่งปัจจุบัน : {{ transference_personnels_id_ref.id_position }} 
                    </v-flex>
                    
                    <v-col cols="12" sm="12" md="12">
                    <v-data-table
                      color="success"
                      :loading="loading"
                      :headers="header_trans"
                      :items="transference_locations"                     
                      class="elevation-1"
                    >                    

                    </v-data-table>
                    </v-col>                  
                  </v-row>
                  <v-layout wrap>
                     <v-flex md12>                                        
                      <v-autocomplete                         
                        :items="branch_s"
                        item-text="name_branch"
                        item-value="id_branch"
                        outlined
                        label="สาขาวิชา :"
                        prepend-icon="mdi-account-details"
                        request
                         v-model="updatepositions.id_branch"
                        :rules="[(v) => !!v || '']"
                      ></v-autocomplete>
                    </v-flex>

                     <v-flex xs12>
                    <v-autocomplete prepend-icon="mdi-account-details" :items="colleges" item-text="college_name" item-value="college_code" v-model="updatepositions.college_code" label="วิทยาลัย" @change="man_powerQuery()"
                      required :rules="[v => !!v || '']" outlined>                      
                      </v-autocomplete>                    
                  </v-flex> 
                    <v-flex md12>
                       <v-autocomplete prepend-icon="mdi-account-details" :items="man_powers" item-text="college_position_case" item-value="id_position" label="เลขที่ตำแหน่ง" v-model="updatepositions.id_position" outlined required :rules="[v => !!v || '']"></v-autocomplete>
                     
                    </v-flex>
                  </v-layout>
                </v-container>
                <small>* จำเป็น</small>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn large @click.stop="positiondialog = false" rounded>
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn large color="green" @click.stop="updatepositionSubmit()" rounded>
                <v-icon dark>mdi-content-save</v-icon>&nbsp;บันทึก
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </v-container>

    <v-container fluid>
      <v-snackbar v-model="snackbar.show" top :timeout="snackbar.timeout" :color="snackbar.color">
        <v-icon large>{{snackbar.icon}}</v-icon>
        <v-card-text>{{snackbar.text}}</v-card-text>

        <template v-slot:action="{ attrs }">
          <v-btn color="red" text v-bind="attrs" @click="snackbar.show = false">Close</v-btn>
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
       branch_s:[],
      valid: true,
      edittransference_personneldialog: false,
      positiondialog: false,
      times_select: "1",
      years_select: "2565",
      snackbar: {
        show: false,
        color: "",
        timeout: 5000,
        icon: "",
        text: "",
      },
      time_ss: [1, 2],
      year_ss: [2565, 2566, 2567, 2568, 2569, 2570],
      transference_personnels: [],
      edittransference_personnel: {},
      search: "",
      pagination: {},
      headers: [
        { text: "อ้างอิง", align: "center", value: "id_ref" },
        { text: "วิทยาลัย", align: "center", value: "college_name" },
        { text: "รหัสบัตรประชาชน", align: "center", value: "id_card" },
        { text: "ชื่อ", align: "center", value: "frist_name" },
        { text: "นามสกุล", align: "center", value: "last_name" },
        { text: "ครั้งที่", align: "center", value: "time_ss" },
        { text: "ปีที่", align: "center", value: "year_ss" },
        { text: "อายุงาน ณ ปัจจุบัน", align: "center", value: "age_app_time" },
        { text: "วันที่ทำรายการ", align: "center", value: "date_time" },
        { text: "ปลายทาง", align: "center", value: "succ_college" },
        { text: "ย้ายกรณีพิเศษ", align: "center", value: "actions" },
        
      ],

      header_trans: [
        { text: "ลำดับ", align: "center", value: "sequence_n" },
        { text: "รหัสอ้างอิง", align: "center", value: "id_ref" },
        { text: "สาขาวิชา", align: "center", value: "name_branch" },
        { text: "วิทยาลัย", align: "left", value: "college_name" },
        { text: "เลือก", align: "center", value: "action" },
      ],
      rowsperpage: [
        25,
        50,
        100,
        {
          text: "All",
          value: -1,
        },
      ],
      transference_personnelstatus: [],
      transference_personnels_id_ref: [],
      updatepositions_condition:{},
      transference_locations: [],
      man_powers:[],
      userstatus: {},
      updatepositions:{},
      colleges: [],
      provinces: [],
      regions: [],
    };
  },
 async mounted() {
      
     
        let result_branch     
        result_branch = await this.$http.post('branch.php', {
        ApiKey: this.ApiKey, 
      })
      this.branch_s = result_branch.data    

      let result
      result = await this.$http.post('collegetype.php', {
        ApiKey: this.ApiKey
      })
      this.collegetypes = result.data
      result = await this.$http.post('college.php', {
        ApiKey: this.ApiKey
      })
      
      this.colleges = result.data
      result = await this.$http.post('province.php', {
        ApiKey: this.ApiKey
      })
      this.provinces = result.data
      
      result = await this.$http.post('region.php', {
        ApiKey: this.ApiKey
      })
      this.regions = result.data  

    this.transference_personnelQueryAll();   
  },
  methods: {
    async searchTimeYear() {
      this.loading = true;
      let result = await this.$http
        .post("transference_personnel.php", {
          ApiKey: this.ApiKey,
          time_s: this.times_select,
          year_s: this.years_select,
        })
        .finally(() => (this.loading = false));
      this.transference_personnels = result.data;
    },
    

    async select_idPosition(id_ref) {
      let result_con = await this.$http.post("transference_personnel.php", {
        ApiKey: this.ApiKey,
        id_ref: id_ref,
      });

      let result = await this.$http.post("transference_location.php", {
        ApiKey: this.ApiKey,
        id_ref: id_ref,
      });
      this.transference_locations = result.data;
      this.transference_personnels_id_ref = result_con.data;     
      this.positiondialog = true;
    },
    
    async transference_personnelQueryAll() {
      this.loading = true;
      let result = await this.$http
        .post("transference_personnel.php", {
          ApiKey: this.ApiKey,
        })
        .finally(() => (this.loading = false));
      this.transference_personnels = result.data;
    },

 async man_powerQuery(){
         let man_power_result     
      man_power_result = await this.$http.post('man_power_process.php', {
        ApiKey: this.ApiKey,
        college_code : this.updatepositions.college_code
      })
        this.man_powers = man_power_result.data
      },

    /// updatepositionSubmit
    async updatepositionSubmit(){
 if (this.$refs.updatepositionform.validate()) {         
          this.updatepositions.ApiKey = this.ApiKey;
          this.updatepositions.time_s = this.transference_personnels_id_ref.time_ss;
          this.updatepositions.year_s = this.transference_personnels_id_ref.year_ss;        
          this.updatepositions.id_card = this.transference_personnels_id_ref.id_card;              
          this.updatepositions.name_position = 'ครู';

          this.updatepositions_condition.ApiKey = this.ApiKey;   
          this.updatepositions_condition.id_position = this.updatepositions.id_position;   
          this.updatepositions_condition.status_booking = this.transference_personnels_id_ref.id_card;               
          let result_man = await this.$http.post('man_power.update_process.php', this.updatepositions_condition)   
          let result = await this.$http.post('conditons_transfer_success.insert.php', this.updatepositions)   
      
          if (result_man.data.status == true && result.data.status == true) {           
            this.snackbar.icon = 'mdi-font-awesome'
            this.snackbar.color = 'success'
            this.snackbar.text = 'บันทึกข้อมูลเรียบร้อย'
            this.snackbar.show = true
            this.transference_personnelQueryAll()
          } else {
            this.snackbar.icon = 'mdi-close-network'
            this.snackbar.color = 'red'
            this.snackbar.text = 'บันทึกข้อมูลผิดพลาด'
            this.snackbar.show = true           
          }
          this.positiondialog = false
        } 
    },  

    async deletePosition(id_ref) {
      let result_con = await this.$http.post("transference_personnel.php", {
        ApiKey: this.ApiKey,
        id_ref: id_ref,
      });

      let result = await this.$http.post("transference_location.php", {
        ApiKey: this.ApiKey,
        id_ref: id_ref,
      });

      let result_position = await this.$http.post("transference_location.php", {
        ApiKey: this.ApiKey,
        id_ref: id_ref,
      });
      
      this.transference_locations = result.data;
      this.transference_personnels_id_ref = result_con.data;     
      this.positiondialog = true;
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
  },
};
</script>
