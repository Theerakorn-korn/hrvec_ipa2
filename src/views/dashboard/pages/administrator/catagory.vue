<template>
  <div>
    <v-container class="text_google">
      <base-material-card
        icon="mdi-clipboard-text"
        title="หมวดหมู่สินค้า"
        class="px-5 py-3"
        
      >
        <v-card>
          <v-btn
            
            large
            right
            depressed
            color="primary"
            @click.native="catagoryAdd()"
            ><v-icon>mdi-plus-circle-outline</v-icon>เพิ่มรายการ</v-btn
          >
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="ค้นหา ระบุคำ หรือ ส่วนข้อความเกี่ยวข้อง"
            single-line
            hide-details
            
            dense
            filled
          />
        </v-card>

        <v-data-table
          color="success"
          :loading="loading"
          :headers="headers"
          :items="catagory"
          :search="search"
          :class="elevation - 3"
        >
          <!--  <template v-slot:item.p_img="{ item }">
            <img
              :src="require('./fileUpload/' + item.p_img) || ''"
              width="50"
                         
            />
          </template>
 -->
          <template v-slot:item.action="{ item }" width="10%">
            <v-icon
              color="yellow"
              
              @click.stop="catagoryEdit(item.cat_id)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              color="red"
              
              @click.stop="catagoryDelete(item.cat_id)"
            >
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

      <!--addcatagorydialog  -->
      <v-layout row justify-center>
        <v-dialog v-model="addcatagorydialog" persistent max-width="50%" overlay-opacity="0.6">
          <v-card class="mx-auto pa-5"  >
            <base-material-card
              icon="mdi-clipboard-text"
              title="เพิ่มหมวดหมู่สินค้า"
              class="px-5 py-3 text_google"
              
              
            >
            </base-material-card>
            <v-card-text class="text_google">
              <v-form
                ref="updateImageform"
                v-model="updateImageValid"
                lazy-validation
                @submit.prevent="addcatagorySubmit()"
                enctype="multipart/form-data"
              >
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md12>
                     
                      <v-text-field
                        v-model="addcatagory.cat_name"
                        dense
                        filled
                        label="หมวดหมู่สินค้า : "
                        item-value="cat_name"
                        prepend-icon="mdi-barcode"
                        request
                        rounded
                        :rules="[(v) => !!v || '']"
                      ></v-text-field>

                     
                      <hr />
                      <br />
                      <v-file-input
                        label="เลือกไฟล์ภาพประจำหมวดหมู่"
                        ref="p_img"
                        show-size
                        outlined
                        dense
                        rounded
                        clearable
                        @change="selectImage"
                      ></v-file-input>
                    </v-flex>
                  </v-layout>
                  <v-spacer></v-spacer>
     
                  <v-btn rounded large color="success" type="submit"
                    ><v-icon dark>mdi-content-save</v-icon>บันทึก</v-btn
                  >
                               <v-btn
                    rounded
                    color="warning"
                    large
                    @click.stop="addcatagorydialog = false"
                    rounded
                    ><v-icon dark>mdi-close</v-icon> ยกเลิก</v-btn
                  >
                </v-container>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model deletecatagorydialog -->
      <v-layout>
        <v-dialog v-model="deletecatagorydialog" persistent max-width="40%">
          <v-card class="mx-auto pa-5" >
            <base-material-card
              color="error"
              icon="mdi-delete"
              title="ลบข้อมูล"
              class="px-5 py-3 text_google"
              
            >
            </base-material-card>
            <v-card-text class="text_google">
              <v-form ref="deletecatagoryform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12>
                      ยืนยันการลบข้อมูล :
                      <h3>
                        {{ editcatagory.cat_name }}
                      </h3>
                    </v-flex>
                    <v-flex xs12 md6></v-flex>
                    <v-flex xs12 md6></v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn large  @click.stop="deletecatagorydialog = false"
                ><v-icon dark>mdi-close</v-icon>ยกเลิก</v-btn
              >
              <v-btn
                large
                color="red darken-3"
                @click.stop="deletecatagoryubmit()"
                dark
              >
                <v-icon dark>mdi-delete</v-icon>&nbsp;ลบ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model editcatagorydialog -->
      <v-layout row justify-center>
        <v-dialog v-model="editcatagorydialog" persistent max-width="50%">
          <v-card class="mx-auto pa-5" >
            <base-material-card
              color="yellow"
              icon="mdi-clipboard-text"
              title="แก้ไขข้อมูลสินค้า"
              class="px-5 py-3 text_google"
              
            >
            </base-material-card>
            <v-card-text>
              <v-form ref="editcatagoryform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md12>
                      <v-autocomplete
                        v-model="editcatagory.cat_id"
                        :items="catagorys"
                        dense
                        filled
                        item-text="cat_name"
                        item-value="cat_id"
                        label="หมวดหมู่หลัก"
                        request
                        :rules="[(v) => !!v || '']"
                      ></v-autocomplete>

                      <v-autocomplete
                        v-model="editcatagory.cat_sub_id"
                        :items="catagory_sub"
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
                        v-model="editcatagory.cat_name"
                        dense
                        filled
                        label="สินค้า : "
                        item-value="cat_name"
                        prepend-icon="mdi-barcode"
                        request
                        :rules="[(v) => !!v || '']"
                      ></v-text-field>

                      <v-text-field
                        v-model="editcatagory.p_price"
                        item-value="p_price"
                        dense
                        filled
                        label="ราคา :"
                        prepend-icon="mdi-sale"
                        request
                        :rules="[(v) => !!v || '']"
                      ></v-text-field>

                      <v-text-field
                        v-model="editcatagory.unit_name"
                        item-value="unit_name"
                        dense
                        filled
                        label="หน่วย :"
                        prepend-icon="mdi-comment-text-outline"
                        request
                        :rules="[(v) => !!v || '']"
                      ></v-text-field>
                      <v-text-field
                        v-model="editcatagory.p_total"
                        item-value="p_total"
                        dense
                        filled
                        label="จำนวนสินค้า :"
                        prepend-icon="mdi-chart-pie"
                        request
                        :rules="[(v) => !!v || '']"
                      ></v-text-field>

                      <v-textarea
                        v-model="editcatagory.p_desc"
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
                        :return-value.sync="editcatagory.date_time"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="editcatagory.date_time"
                            item-value="date_time"
                            label="วันที่ข้อมูล : "
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            :rules="[(v) => !!v || '']"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="editcatagory.date_time"
                          no-title
                          scrollable
                        >
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="menu = false">
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.menu.save(editcatagory.date_time)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-menu>

                      <hr />
                      <br />

                      <v-select
                        v-model="editcatagory.status_s"
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
              <v-btn large  @click.stop="editcatagorydialog = false" round
                ><v-icon dark>mdi-close</v-icon>ยกเลิก</v-btn
              >
              <v-btn
                large
                color="warning"
                @click.stop="editcatagorySubmit()"
                round
              >
                <v-icon dark>mdi-pencil</v-icon>&nbsp;แก้ไขข้อมูล</v-btn
              >
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
        <v-btn dark  @click="snackbar.show = false"> Close </v-btn>
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
      catagoryImage: "",
      files: [],      
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      search: "",
      addcatagorydialog: false,
      editcatagorydialog: false,
      deletecatagorydialog: false,
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
        { text: "ลำดับ", align: "center", value: "cat_id" },
        { text: "หมวดหลัก", align: "left", value: "cat_name" },
        { text: "หมวดย่อย", align: "left", value: "p_img" },     
        { text: "ดำเนินการแก้ไข", align: "center", value: "action" },
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
      catagory: [],
      addcatagory: {},
      editcatagory: {},
      catagorys: [],
      catagory_sub: [],
      updateImageData: {},
      updateImageValid: false,
      p_img: "",
    };
  },

  async mounted() {
    this.getAllcatagory(); 
  },
  methods: {
    async getAllcatagory() {
      let result = await this.$http.post("crud_catagory.php");
      this.catagory = result.data;
    },   
    //Add data
    selectImage(file) {
      this.updateImageData.p_img = file;
    },
    async catagoryAdd() {
      this.addcatagory = {};
      this.updateImageData = {};
      this.addcatagorydialog = true;
    },
    // addcatagory{} import data in form text field 
    // updateImageData{} import data in form file 
    // formData >> input updateImageData{ >>  input addcatagory{} }
    async addcatagorySubmit() {
      this.$refs.updateImageform.validate();
      this.updateImageData.cat_name = this.addcatagory.cat_name;     
      if (this.updateImageValid) {
        let formData = new FormData();
        formData.append("p_img", this.updateImageData.p_img);      
        formData.append("cat_name", this.updateImageData.cat_name);       

      let result = await this.$http.post("crud_catagory.php?crud=create", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })       
        if (result.data.status == true) {
          this.snackbar.icon = "mdi-content-save";
          this.snackbar.color = "success";
          this.snackbar.text = "บันทึกข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.getAllcatagory();
        } else {
          this.snackbar.icon = "mdi-alert";
          this.snackbar.color = "red";
          this.snackbar.text = "บันทึกข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.addcatagorydialog = false;
      
      }
    },

    //Edit data
    async catagoryEdit(cat_id) {
      let result = await this.$http.post("crud_catagory.php", { cat_id: cat_id });
      this.editcatagory = result.data;
      this.editcatagorydialog = true;
    },
    async editcatagorySubmit() {
      if (this.$refs.editcatagoryform.validate()) {
        let result = await this.$http.post(
          "crud_catagory.php?crud=update",
          this.editcatagory
        );
        if (result.data.status == true) {
          this.catagory = result.data;
          this.snackbar.icon = "mdi-content-save";
          this.snackbar.color = "success";
          this.snackbar.text = "แก้ไขข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.getAllcatagory();
        } else {
          this.snackbar.icon = "mdi-alert";
          this.snackbar.color = "red";
          this.snackbar.text = "แก้ไขข้อมูลผิดพลาด";
          this.snackbar.show = true;
          this.getAllcatagory();
        }
        this.getAllcatagory();
        this.editcatagorydialog = false;
      }
    },
    async catagoryDelete(cat_id) {
      let result = await this.$http.post("crud_catagory.php", { cat_id: cat_id });
      this.editcatagory = result.data;
      this.deletecatagorydialog = true;
    },

    async deletecatagoryubmit() {
      if (this.$refs.deletecatagoryform.validate()) {
        let result = await this.$http.post(
          "crud_catagory.php?crud=delete",
          this.editcatagory
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
        this.deletecatagorydialog = false;
        this.getAllcatagory();
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
    addcatagorycatagoryChange() {
      return this.addcatagory.cat_id;
    },
    editcatagorycatagoryChange() {
      return this.editcatagory.cat_id;
    },
  },

  watch: {
    async addcatagorycatagoryChange() {
      this.prefectureQueryAll(this.addcatagory.cat_id);
    },
    async editcatagorycatagoryChange() {
      this.prefectureQueryAll(this.editcatagory.cat_id);
    },
  },
};
</script>
