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
          :items="personnel_award"
          :search="search"
          :class="elevation - 3"
        >        
          <v-alert
            slot="no-results"
            :value="true"
            color="error"
            icon="mdi-alert"
          >ไม่พบผลลัพธ์ "{{ search }}" ที่คุณกำลังค้นหา.</v-alert>
        </v-data-table>
      </base-material-card>

      <!--addpersonnel_awarddialog  -->
      <v-layout row justify-center>
        <v-dialog v-model="addpersonnel_awarddialog" persistent max-width="50%" overlay-opacity="0.6">
          <v-card class="mx-auto pa-5" >
            <base-material-card
              icon="mdi-clipboard-text"
              title="เพิ่มผลงาน รางวัล"
              class="px-5 py-3 text_google"
              
            ></base-material-card>
            <v-card-text class="text_google">
              <v-form
                ref="updateImageform"
                v-model="updateImageValid"
                lazy-validation
                @submit.prevent="addpersonnel_awardSubmit()"
                enctype="multipart/form-data"
              >
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md12>
                      <v-row>
                       
                        <v-col cols="12" lg="6">
                          <v-text-field
                            v-model="addpersonnel_award.ed_university"
                            dense
                            label="ชื่อผลงาน รางวัล : "
                            item-value="cat_name"
                            prepend-icon="mdi-barcode"
                            request
                            :rules="[(v) => !!v || '']"
                          ></v-text-field>
                        </v-col>
                         <v-col cols="12" lg="6">
                          <v-text-field
                            v-model="addpersonnel_award.ed_university"
                            dense
                            label="สถานที่/หน่วยงาน : "
                            item-value="cat_name"
                            prepend-icon="mdi-barcode"
                            request
                            :rules="[(v) => !!v || '']"
                          ></v-text-field>
                        </v-col>
                        
                         <v-col cols="12" lg="6">
                          <v-menu
                            ref="menu"
                            v-model="menu"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="date"
                                label="วันเดือนปี ผลงานรางวัล"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                               
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="date"
                              :active-picker.sync="activePicker"
                              :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                              min="1950-01-01"
                              @change="save"
                              locale="th"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                        
                       
                        <v-col cols="12" lg="6">
                          <v-text-field
                            v-model="addpersonnel_award.ed_gpa"
                            dense
                            label="ระดับผลงาน : "
                            item-value="cat_name"
                            prepend-icon="mdi-barcode"
                            request
                            :rules="[(v) => !!v || '']"
                          ></v-text-field>
                        </v-col>
                         <v-col cols="12" lg="6">
                          <v-text-field
                            v-model="addpersonnel_award.ed_gpa"
                            dense
                            label="ประเภทผลงาน : "
                            item-value="cat_name"
                            prepend-icon="mdi-barcode"
                            request
                            :rules="[(v) => !!v || '']"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-flex>
                  </v-layout>
                  <v-spacer></v-spacer>
                  <v-row>
                    <v-col cols="12" lg="12" class="text-right">
                      <v-btn  large color="success" type="submit">
                        <v-icon dark>mdi-content-save</v-icon>บันทึก
                      </v-btn>
                      <v-btn  large color="warning" @click.stop="addpersonnel_awarddialog = false" rounded>
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
        <v-dialog v-model="deletepersonnel_awarddialog" persistent max-width="40%">
          <v-card class="mx-auto pa-5" >
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
                      <h3>{{ editpersonnel_award.cat_name }}</h3>
                    </v-flex>
                    <v-flex xs12 md6></v-flex>
                    <v-flex xs12 md6></v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn large  @click.stop="deletepersonnel_awarddialog = false">
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn large color="red darken-3" @click.stop="deletepersonnel_awardubmit()" dark>
                <v-icon dark>mdi-delete</v-icon>&nbsp;ลบ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model editpersonnel_awarddialog -->
      <v-layout row justify-center>
        <v-dialog v-model="editpersonnel_awarddialog" persistent max-width="50%">
          <v-card class="mx-auto pa-5" >
            <base-material-card
              color="yellow"
              icon="mdi-clipboard-text"
              title="แก้ไขข้อมูลสินค้า"
              class="px-5 py-3 text_google"
              
            ></base-material-card>
            <v-card-text>
              <v-form ref="editpersonnel_awardform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md12>
                      <v-autocomplete
                        v-model="editpersonnel_award.cat_id"
                        :items="personnel_awards"
                        dense
                        filled
                        item-text="cat_name"
                        item-value="cat_id"
                        label="หมวดหมู่หลัก"
                        request
                        :rules="[(v) => !!v || '']"
                      ></v-autocomplete>

                      <v-autocomplete
                        v-model="editpersonnel_award.cat_sub_id"
                        :items="personnel_award_sub"
                        item-text="name_sub"
                        item-value="cat_parent_id"
                        label="หมวดหมู่ย่อย :"
                        dense
                        filled
                        request
                        :rules="[(v) => !!v || '']"
                      ></v-autocomplete>
                      <hr />
                      <br />
                      <v-text-field
                        v-model="editpersonnel_award.cat_name"
                        dense
                        filled
                        label="สินค้า : "
                        item-value="cat_name"
                        prepend-icon="mdi-barcode"
                        request
                        :rules="[(v) => !!v || '']"
                      ></v-text-field>

                      <v-text-field
                        v-model="editpersonnel_award.p_price"
                        item-value="p_price"
                        dense
                        filled
                        label="ราคา :"
                        prepend-icon="mdi-sale"
                        request
                        :rules="[(v) => !!v || '']"
                      ></v-text-field>

                      <v-text-field
                        v-model="editpersonnel_award.unit_name"
                        item-value="unit_name"
                        dense
                        filled
                        label="หน่วย :"
                        prepend-icon="mdi-comment-text-outline"
                        request
                        :rules="[(v) => !!v || '']"
                      ></v-text-field>
                      <v-text-field
                        v-model="editpersonnel_award.p_total"
                        item-value="p_total"
                        dense
                        filled
                        label="จำนวนสินค้า :"
                        prepend-icon="mdi-chart-pie"
                        request
                        :rules="[(v) => !!v || '']"
                      ></v-text-field>

                      <v-textarea
                        v-model="editpersonnel_award.p_desc"
                        item-value="p_desc"
                        filled
                        auto-grow
                        label="รายละเอียด :"
                        rows="4"
                        row-height="30"
                        shaped
                        prepend-icon="mdi-account-key"
                        :rules="[(v) => !!v || '']"
                      ></v-textarea>
                      <hr />
                      <br />

                      <hr />
                      <br />
                      <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :return-value.sync="editpersonnel_award.date_time"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="editpersonnel_award.date_time"
                            item-value="date_time"
                            label="วันที่ข้อมูล : "
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            :rules="[(v) => !!v || '']"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="editpersonnel_award.date_time" no-title scrollable>
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.menu.save(editpersonnel_award.date_time)"
                          >OK</v-btn>
                        </v-date-picker>
                      </v-menu>

                      <hr />
                      <br />

                      <v-select
                        v-model="editpersonnel_award.status_s"
                        item-value="status_s"
                        :items="items_list"
                        filled
                        label="สถานะสินค้า :"
                        dense
                        prepend-icon="mdi-auto-fix"
                        :rules="[(v) => !!v || '']"
                      ></v-select>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn large  @click.stop="editpersonnel_awarddialog = false" rounded>
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn large color="warning" @click.stop="editpersonnel_awardSubmit()" rounded>
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
        auto-height
        :timeout="snackbar.timeout"
        :color="snackbar.color"
      >
        <v-icon large>{{ snackbar.icon }}</v-icon>
        <br />
        {{ snackbar.text }}
        <v-btn dark  @click="snackbar.show = false">Close</v-btn>
      </v-snackbar>
    </v-container>
  </div>
</template>
<script>
import LightBox from "vue-image-lightbox";
import Password from "vue-password-strength-meter";
export default {
  components: { Password, LightBox },
  data() {
    return {
      updateImageDialog: false,
      personnel_awardImage: "",
      files: [],
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
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
        text: "",
      },
      currentPK: null,
      headers: [
        { text: "ลำดับ", align: "center", value: "id_pa" },
        { text: "ผลงาน/รางวัล", align: "left", value: "performance_name" },
        { text: "สถานที่/หน่วยงาน", align: "left", value: "performance_location" },
        { text: "วันเดือนปี", align: "center", value: "performance_time" },
        { text: "ระดับ", align: "center", value: "award_level" },
        { text: "ประเทภผลงาน", align: "center", value: "type_performance" },
        { text: "ดำเนินการ", align: "center", value: "action" },       
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
      errorMessage: "",
      successMessage: "",
      personnel_award: [],
      addpersonnel_award: {},
      editpersonnel_award: {},
      personnel_awards: [],
      personnel_award_sub: [],
      updateImageData: {},
      updateImageValid: false,
      ed_level: "",
     /*  items: ["ปริญญาตรี", "ปริญญาโท", "ปริญญาเอก"], */
      picker: new Date().toISOString().substr(0, 7),

      activePicker: null,
      date: null,
      menu: false,
    };
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },

  async mounted() {
    this.getAllpersonnel_award();
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
    async getAllpersonnel_award() {
      let result = await this.$http.post("crud_personnel_award.php");
      this.personnel_award = result.data;
    },
    //Add data
    selectImage(file) {
      this.updateImageData.p_img = file;
    },
    async personnel_awardAdd() {
      this.addpersonnel_award = {};
      this.updateImageData = {};
      this.addpersonnel_awarddialog = true;
    },
    // addpersonnel_award{} import data in form text field
    // updateImageData{} import data in form file
    // formData >> input updateImageData{ >>  input addpersonnel_award{} }
    async addpersonnel_awardSubmit() {
      this.$refs.updateImageform.validate();
      this.updateImageData.cat_name = this.addpersonnel_award.cat_name;
      if (this.updateImageValid) {
        let formData = new FormData();
        formData.append("p_img", this.updateImageData.p_img);
        formData.append("cat_name", this.updateImageData.cat_name);

        let result = await this.$http.post(
          "crud_personnel_award.php?crud=create",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (result.data.status == true) {
          this.snackbar.icon = "mdi-content-save";
          this.snackbar.color = "success";
          this.snackbar.text = "บันทึกข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.getAllpersonnel_award();
        } else {
          this.snackbar.icon = "mdi-alert";
          this.snackbar.color = "red";
          this.snackbar.text = "บันทึกข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.addpersonnel_awarddialog = false;
      }
    },

    //Edit data
    async personnel_awardEdit(cat_id) {
      let result = await this.$http.post("crud_personnel_award.php", {
        cat_id: cat_id,
      });
      this.editpersonnel_award = result.data;
      this.editpersonnel_awarddialog = true;
    },
    async editpersonnel_awardSubmit() {
      if (this.$refs.editpersonnel_awardform.validate()) {
        let result = await this.$http.post(
          "crud_personnel_award.php?crud=update",
          this.editpersonnel_award
        );
        if (result.data.status == true) {
          this.personnel_award = result.data;
          this.snackbar.icon = "mdi-content-save";
          this.snackbar.color = "success";
          this.snackbar.text = "แก้ไขข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.getAllpersonnel_award();
        } else {
          this.snackbar.icon = "mdi-alert";
          this.snackbar.color = "red";
          this.snackbar.text = "แก้ไขข้อมูลผิดพลาด";
          this.snackbar.show = true;
          this.getAllpersonnel_award();
        }
        this.getAllpersonnel_award();
        this.editpersonnel_awarddialog = false;
      }
    },
    async personnel_awardDelete(cat_id) {
      let result = await this.$http.post("crud_personnel_award.php", {
        cat_id: cat_id,
      });
      this.editpersonnel_award = result.data;
      this.deletepersonnel_awarddialog = true;
    },

    async deletepersonnel_awardubmit() {
      if (this.$refs.deletepersonnel_awardform.validate()) {
        let result = await this.$http.post(
          "crud_personnel_award.php?crud=delete",
          this.editpersonnel_award
        );
        if (result.data.status == true) {
          this.snackbar.icon = "mdi-content-save";
          this.snackbar.color = "success";
          this.snackbar.text = "ลบข้อมูลเรียบร้อย";
          this.snackbar.show = true;
        } else {
          this.snackbar.icon = "mdi-alert";
          this.snackbar.color = "red";
          this.snackbar.text = "ลบข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.deletepersonnel_awarddialog = false;
        this.getAllpersonnel_award();
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
    addpersonnel_awardpersonnel_awardChange() {
      return this.addpersonnel_award.cat_id;
    },
    editpersonnel_awardpersonnel_awardChange() {
      return this.editpersonnel_award.cat_id;
    },
  },

  watch: {
    async addpersonnel_awardpersonnel_awardChange() {
      this.prefectureQueryAll(this.addpersonnel_award.cat_id);
    },
    async editpersonnel_awardpersonnel_awardChange() {
      this.prefectureQueryAll(this.editpersonnel_award.cat_id);
    },
  },
};
</script>
