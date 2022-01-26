<template>
  <div>
    <v-container>
      <base-material-card
        icon="mdi-clipboard-text"
        title="คำสั่งย้าย"
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
                @click.native="order_appointAdd()"
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
          :items="order_appoints"
          :search="search"
        >
         <template v-slot:[`item.dated_order`]="{ item }">
            {{ item.dated_order| moment("add","543 years") | moment("Do MMMM YYYY") }}
          </template>

<template v-slot:[`item.start_date`]="{ item }">
            {{ item.start_date| moment("add","543 years") | moment("Do MMMM YYYY") }}
          </template>

              <template v-slot:[`item.print_s`]="{ item }">
            <v-btn color="info" fab small          
            :href="'#/admin/print_report_movement/'+item.id_oa+item.year_s" target="_blank"
            >
            <v-icon>
                  mdi-printer
            </v-icon>
            
            </v-btn>
          </template>

          <template v-slot:[`item.actions`]="{ item }">
            <v-icon color="yellow" @click.stop="order_appointEdit(item.id_oa)">
              mdi-pencil
            </v-icon>
          </template>
          <template v-slot:[`item.action_s`]="{ item }">
            <v-icon color="red" @click.stop="order_appointDelete(item.id_oa)">
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

      <!--addorder_appointdialog  -->
      <v-layout row justify-center>
        <v-dialog v-model="addorder_appointdialog" persistent max-width="50%">
          <v-card class="mx-auto pa-5">
            <base-material-card
              icon="mdi-account-multiple"
              title="เพิ่มข้อมูลคำสั่งย้าย"
              class="px-5 py-3 text_google"
            >
            <div class="text-right">
 วันที่รายการ : {{ date_today }}
            </div>
          
            </base-material-card>

            <v-card-text>
              <v-form ref="addorder_appointform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md6>
                      <v-text-field
                        label="หนังสือราชการที่ : ศธ 0618/3994"
                        v-model="addorder_appoint.book_number"
                        require
                        :rules="[v => !!v || '']"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        label="คำสั่งที่ : "
                        v-model="addorder_appoint.order_number"
                        required
                        :rules="[v => !!v || '']"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        label="วันที่หนังสือ :"
                        v-model="addorder_appoint.dated_order"
                        type="date"
                        required
                        :rules="[v => !!v || '']"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        label="ประชุมครั้งที่ : 1/2565"
                        v-model="addorder_appoint.meeting_no"
                        required
                        :rules="[v => !!v || '']"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md4>
                      <v-select
                        label="การย้ายครั้งที่  :"
                        v-model="addorder_appoint.time_s"
                        :items="time_ss"
                        required
                        :rules="[v => !!v || '']"
                      ></v-select>
                    </v-flex>
                    <v-flex md4>
                      <v-select
                        label="การย้ายปีที่ :"
                        v-model="addorder_appoint.year_s"
                        :items="year_ss"
                        required
                        :rules="[v => !!v || '']"
                      ></v-select>
                    </v-flex>
                    <v-flex md4>
                      <v-select
                        label="ตำแหน่ง :"
                        v-model="addorder_appoint.name_position"
                        :items="name_position_s"
                        item-value="value"
                        required
                        :rules="[v => !!v || '']"
                      ></v-select>
                    </v-flex>
                    <v-flex md12>
                      <v-text-field
                        label="วันที่เริ่มปฏิบัติงาน"
                        v-model="addorder_appoint.start_date"
                        type="date"
                        required
                        :rules="[v => !!v || '']"
                      ></v-text-field>
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
                @click.stop="addorder_appointdialog = false"
                rounded
                ><v-icon dark>mdi-close</v-icon> ยกเลิก</v-btn
              >
              <v-btn
                large
                color="success"
                @click.stop="addorder_appointSubmit()"
                rounded
              >
                <v-icon dark>mdi-content-save</v-icon>&nbsp;&nbsp;บันทึก
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model deleteorder_appointdialog -->
      <v-layout>
        <v-dialog
          v-model="deleteorder_appointdialog"
          persistent
          max-width="50%"
        >
          <v-card class="mx-auto pa-5">
            <base-material-card
              color="error"
              icon="mdi-delete"
              title="ลบข้อมูลคำสั่งย้ายเอก"
              class="px-5 py-3 text_google"
            >
            </base-material-card>

            <v-card-text class="text_google">
              <v-card>
                <v-card-text>
                  <v-form ref="deleteorder_appointform" lazy-validation>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12>
                          ยืนยันการลบข้อมูลคำสั่งย้ายเอก
                         หนังสือราชการที่ : {{ editorder_appoint.book_number }}
                         คำสั่งที่ : {{ editorder_appoint.order_number }}
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn large @click.stop="deleteorder_appointdialog = false"
                ><v-icon dark>mdi-close</v-icon>ยกเลิก</v-btn
              >
              <v-btn
                large
                color="red darken-3"
                @click.stop="deleteorder_appointSubmit()"
                dark
              >
                <v-icon dark>mdi-delete</v-icon>&nbsp;ลบ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model editorder_appointdialog -->
      <v-layout row justify-center>
        <v-dialog v-model="editorder_appointdialog" persistent max-width="80%">
          <v-card class="mx-auto pa-6">
            <base-material-card
              color="yellow"
              icon="mdi-clipboard-text"
              title="แก้ไขข้อมูลคำสั่งย้าย"
              class="px-5 py-3 text_google"
            ></base-material-card>
            <v-card-text>
              <v-form ref="editorder_appointform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>                                     
                   <v-flex md6>
                      <v-text-field
                        label="หนังสือราชการที่ : ศธ 0618/3994"
                        v-model="editorder_appoint.book_number"
                        require
                        :rules="[v => !!v || '']"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        label="คำสั่งที่ : "
                        v-model="editorder_appoint.order_number"
                        required
                        :rules="[v => !!v || '']"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        label="วันที่หนังสือ :"
                        v-model="editorder_appoint.dated_order"
                        type="date"
                        required
                        :rules="[v => !!v || '']"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        label="ประชุมครั้งที่ : 1/2565"
                        v-model="editorder_appoint.meeting_no"
                        required
                        :rules="[v => !!v || '']"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md4>
                      <v-select
                        label="การย้ายครั้งที่  :"
                        v-model="editorder_appoint.time_s"
                        :items="time_ss"
                        required
                        :rules="[v => !!v || '']"
                      ></v-select>
                    </v-flex>
                    <v-flex md4>
                      <v-select
                        label="การย้ายปีที่ :"
                        v-model="editorder_appoint.year_s"
                        :items="year_ss"
                        required
                        :rules="[v => !!v || '']"
                      ></v-select>
                    </v-flex>
                    <v-flex md4>
                      <v-select
                        label="ตำแหน่ง :"
                        v-model="editorder_appoint.name_position"
                        :items="name_position_s"
                        item-value="value"
                        required
                        :rules="[v => !!v || '']"
                      ></v-select>
                    </v-flex>
                    <v-flex md12>
                      <v-text-field
                        label="วันที่เริ่มปฏิบัติงาน"
                        v-model="editorder_appoint.start_date"
                        type="date"
                        required
                        :rules="[v => !!v || '']"
                      ></v-text-field>
                    </v-flex>





                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                large
                @click.stop="editorder_appointdialog = false"
                rounded
              >
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn
                large
                color="warning"
                @click.stop="editorder_appointSubmit()"
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
      addorder_appointdialog: false,
      editorder_appointdialog: false,
      deleteorder_appointdialog: false,
      snackbar: {
        show: false,
        color: "",
        timeout: 5000,
        icon: "",
        text: ""
      },
      order_appoints: [],
      addorder_appoint: {},
      editorder_appoint: {},
      search: "",
      pagination: {},
      time_ss:[1,2],
      year_ss:[2565,2566,2567,2568,2569,2570],
      name_position_s:[
          { text:"สายการสอนและสนับสนุนการสอน", value:"ครู"},
          { text:"สายงานบริหารสถานศึกษา", value:"บริหาร"},
          ],
      headers: [
        { text: "หนังสือราชการที่", align: "center", value: "book_number" },
        { text: "คำสั่งที่", align: "center", value: "order_number" },
        { text: "วันที่หนังสือ", align: "left", value: "dated_order" },
        { text: "ประชุมครั้งที่", align: "left", value: "meeting_no" },
        { text: "ครั้งที่", align: "left", value: "time_s" },
        { text: "ปีที่", align: "left", value: "year_s" },
        { text: "วันที่เริ่มปฏิบัติงาน", align: "left", value: "start_date" },
        { text: "วันที่รายการ", align: "left", value: "date_time" },
        { text: "ตำแหน่ง", align: "left", value: "name_position" },
        { text: "พิมพ์", align: "center", value: "print_s", icon: "mdi-printer" },
        {
          text: "แก้ไข",
          align: "center",
          value: "actions",         
        },
        {
          text: "ลบ",
          align: "center",
          value: "action_s",        
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
      order_appointstatus: []
    };
  },
  async mounted() {
    this.order_appointQueryAll();
  },
  methods: {
    async order_appointQueryAll() {
      this.loading = true;
      let result = await this.$http
        .post("order_appoint.php", {
          ApiKey: this.ApiKey
        })
        .finally(() => (this.loading = false));
      this.order_appoints = result.data;
    },
    async order_appointAdd() {
      this.addorder_appoint = {};
      this.addorder_appointdialog = true;
    },
    async addorder_appointSubmit() {
      if (this.$refs.addorder_appointform.validate()) {
        this.addorder_appoint.ApiKey = this.ApiKey;
        this.addorder_appoint.date_time = this.date_today;

        console.log(this.addorder_appoint)
        let result = await this.$http.post(
          "order_appoint.insert.php",
          this.addorder_appoint
        );
        if (result.data.status == true) {
          this.order_appoint = result.data;
          this.snackbar.icon = "mdi-font-awesome";
          this.snackbar.color = "success";
          this.snackbar.text = "บันทึกข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.order_appointQueryAll();
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text = "บันทึกข้อมูลผิดพลาด";
          this.snackbar.show = true;
          this.order_appointQueryAll();
        }
        this.addorder_appointdialog = false;
      }
    },
    async order_appointEdit(id_oa) {
      let result = await this.$http.post("order_appoint.php", {
        ApiKey: this.ApiKey,
        id_oa: id_oa
      });
      this.editorder_appoint = result.data;
      this.editorder_appointdialog = true;
    },
    async editorder_appointSubmit() {
      if (this.$refs.editorder_appointform.validate()) {
        this.editorder_appoint.ApiKey = this.ApiKey;
        let result = await this.$http.post(
          "order_appoint.update.php",
          this.editorder_appoint
        );
        if (result.data.status == true) {
          this.order_appoint = result.data;
          this.snackbar.icon = "mdi-font-awesome";
          this.snackbar.color = "success";
          this.snackbar.text = "แก้ไขข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.order_appointQueryAll();
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text = "แก้ไขข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.editorder_appointdialog = false;
      }
    },
    async order_appointDelete(id_oa) {
      let result = await this.$http.post("order_appoint.php", {
        ApiKey: this.ApiKey,
        id_oa: id_oa
      });
      this.editorder_appoint = result.data;
      this.deleteorder_appointdialog = true;
    },
    async deleteorder_appointSubmit() {
      if (this.$refs.deleteorder_appointform.validate()) {
        this.editorder_appoint.ApiKey = this.ApiKey;
        let result = await this.$http.post(
          "order_appoint.delete.php",
          this.editorder_appoint
        );
        if (result.data.status == true) {
          this.order_appoint = result.data;
          this.snackbar.icon = "mdi-font-awesome";
          this.snackbar.color = "success";
          this.snackbar.text = "ลบข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.order_appointQueryAll();
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text = "ลบข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.deleteorder_appointdialog = false;
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
     date_today() {
            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = today.getFullYear()+543;

            today = dd + '/' + mm + '/' + yyyy;
            return today
          },
          date_tims_ch(){
            let monthNames = [
        "","มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน",
        "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม",
        "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ];
            let day = this.order_appoints.date_time.slice(0,2);
            let month = monthNames[parseInt(this.order_appoints.date_time.slice(3,5))];
            let year = this.order_appoints.date_time.slice(6);
            let years = parseInt(year);
            let today = day + ' ' + month + ' ' + years;
            return today
          },
          
  }
};
</script>
