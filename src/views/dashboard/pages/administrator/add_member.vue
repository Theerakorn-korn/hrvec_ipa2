<template>
  <div id="Register">
    <v-container>
          <base-material-card
      icon="mdi-account"
      title="ข้อมูลสมาชิก"
      class="px-5 py-3"    
            
    >    
      <v-form ref="addmemberform" lazy-validation>
        <v-card
          class="mx-auto pa-1"
             
        >
          <v-toolbar  color>  
            <v-spacer></v-spacer>
            <v-btn
              color="darken-3"
              fab
              small
              @click="(isEditing = !isEditing), memberAdd()"
            >
              <v-icon v-if="isEditing">mdi-close</v-icon>
              <v-icon v-else>mdi-pencil</v-icon>
            </v-btn>
          </v-toolbar>

          <v-card-text>
            <v-text-field
              v-model="addmember.id_card"
              :disabled="!isEditing"
              :counter="13"
              dense
              filled
              label="รหัสบัตรประชาชน : "
              prepend-icon="mdi-account"
              request
              :rules="[
                (v) => !!v || 'กรุณากรอก',
                (v) => v.length == 13 || 'หมายเลขบัตรประชาชน 13 ตัว',
              ]"
            ></v-text-field>
            <span>{{ id_card }}</span>
            <hr />
            <v-text-field
              v-model="addmember.u_name"
              :disabled="!isEditing"
              :counter="100"
              dense
              filled
              label="ชื่อในการเข้าใช้งานระบบ :"
              prepend-icon="mdi-account-key"
              request
              :rules="[(v) => !!v || '']"
            ></v-text-field>
            <hr />
            <br />
            <v-text><v-icon>mdi-account-key</v-icon> รหัสผ่าน</v-text>
            <password
              label="รหัสผ่าน :"
              v-model="addmember.p_word"
              :disabled="!isEditing"
              :toggle="true"
              dense
              filled
              prepend-icon="mdi-account-key"
              request
              @score="showScore"
              @feedback="showFeedback"
            />

            <hr />
            <v-text-field
              v-model="addmember.name_m"
              :disabled="!isEditing"
              :counter="100"
              label="ชื่อ-นามสกุล : "
              prepend-icon="mdi-account-box"
              dense
              filled
              request
              :rules="[(v) => !!v || '']"
            ></v-text-field>

            <v-text-field
              v-model="addmember.email_m"
              :disabled="!isEditing"
              :counter="100"
              label="Email : "
              prepend-icon="mdi-email"
              request
              dense
              filled
              :rules="[
                (v) => !!v || 'กรุณากรอก Email',
                (v) => /.+@.+\..+/.test(v) || 'กรุณากรอก Email ให้ถูกต้อง',
              ]"
            ></v-text-field>

            <v-text-field
              v-model="addmember.tel_m"
              :disabled="!isEditing"
              :counter="10"
              label="เบอร์โทร : "
              prepend-icon="mdi-cellphone"
              request
              dense
              filled
              :rules="[(v) => !!v || '']"
            ></v-text-field>

            <hr />
            <v-text-field
              v-model="addmember.add_m"
              :disabled="!isEditing"
              dense
              filled
              :counter="100"
              label="ที่อยู่ เลขที่/หมู่ : "
              prepend-icon="mdi-account-location"
              request
              :rules="[(v) => !!v || '']"
            ></v-text-field>

            <v-autocomplete
              v-model="addmember.province_ID"
              :items="provinces"
              dense
              filled
              :disabled="!isEditing"
              item-text="province_name"
              item-value="province_ID"
              prepend-icon="mdi-account-location"
              label="จังหวัด"
              request
              :rules="[(v) => !!v || '']"
            ></v-autocomplete>

            <v-autocomplete
              v-model="addmember.prefecture_ID"
              :disabled="!isEditing"
              :items="prefectures"
              item-text="prefecture_name"
              item-value="prefecture_ID"
              label="อำเภอ :"
              dense
              filled
              prepend-icon="mdi-account-location"
              request
              :rules="[(v) => !!v || '']"
            ></v-autocomplete>

            <v-autocomplete
              v-model="addmember.district_ID"
              :disabled="!isEditing"
              :items="district"
              item-text="district_name"
              item-value="district_ID"
              label="ตำบล :"
              dense
              filled
              prepend-icon="mdi-account-location"
              request
              :rules="[(v) => !!v || '']"
            ></v-autocomplete>

            <v-autocomplete
              v-model="addmember.zip_code"
              :disabled="!isEditing"
              :items="district_post_s"
              item-text="zip_code"
              item-value="zip_code"
              label="zip_code :"
              dense
              filled
              prepend-icon="mdi-account-location"
              request
              :rules="[(v) => !!v || '']"
            ></v-autocomplete>

            <hr />
            <v-file-input
              v-model="addmember.pic_s"
              :disabled="!isEditing"
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Pick an avatar"
              prepend-icon="mdi-camera"
              label="Avatar"
              request
              :rules="[(v) => !!v || '']"
            ></v-file-input>
            <hr />
            <br />

            <div>
              <v-btn
                outline
                class="success mr-5"
                :disabled="!isEditing"
                
                @click.stop="addmemberSubmit()"
                rounded
              >
                <v-icon>mdi-content-save</v-icon>
                <span>บันทึก</span>
              </v-btn>

              <v-btn
                outline
                class="warning mr-5"
                :disabled="!isEditing"
                
                @click.stop="isEditing = !isEditing"
                rounded
              >
                <span>ยกเลิก</span>
                <v-icon>mdi-window-close</v-icon>
              </v-btn>
            </div>
            <br />      
          </v-card-text>
        </v-card>
      </v-form>
       </base-material-card>
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

    <v-layout row justify-center>
      <v-dialog v-model="addmemberdialog" persistent max-width="30%">
        <v-card>
          <v-card-title class="green--text headline">
            <v-icon medium color="green darken-2">fa-college-circle</v-icon
            >&nbsp;ดำเนินการกรอกข้อมูล
          </v-card-title>
          <v-card-text>
            <v-form ref="addcollegeform" lazy-validation>
              <v-container grid-list-md>
                <v-layout wrap> </v-layout>
              </v-container>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn  @click="addmemberdialog = false" round
              >ดำเนินการกรอกข้อมูล</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
import Password from "vue-password-strength-meter";
export default {
  name: "Register",
  addmemberdialog: false,
  components: { Password },

  data: () => ({
    member: [],
    addmember: {},
    provinces: [],
    prefectures: [],
    district: [],
    district_post_s: [],
    password: null,
    snackbar: {
      show: false,
      color: "",
      timeout: 5000,
      icon: "",
      text: "",
    },   
   
    isEditing: null,
    model: null,
    show1: false,
  }),

  async mounted() {
    this.provinceQueryAll();
  },

  methods: {
    async provinceQueryAll() {
      let result = await this.$http.post("province.php");
      this.provinces = result.data;
    },

    async prefectureQueryAll(province_ID) {
      let result = await this.$http.post("prefecture.php", {
        province_ID: province_ID,
      });
      this.prefectures = result.data;
    },

    async districtQueryAll(prefecture_ID) {
      let result = await this.$http.post("districts.php", {
        prefecture_ID: prefecture_ID,
      });
      this.district = result.data;
    },

    async district_PostQueryAll(district_ID) {
      let result = await this.$http.post("districts_post.php", {
        district_ID: district_ID,
      });
      this.district_post_s = result.data;
    },

    async memberAdd() {
      this.addmember = {};
      //this.addmemberdialog = true
    },

  async getAllmember() {
      let result = await this.$http.post(
        "crud_member.php"
      )
      this.member = result.data
    },

    async addmemberSubmit() {   
      if (this.$refs.addmemberform.validate()) {
        let result = await this.$http.post(
          "crud_member.php?crud=create",
          this.addmember
        )
        if (result.data.status == true) {
          this.member = result.data;
          this.snackbar.icon = "check_circle";
          this.snackbar.color = "success";
          this.snackbar.text = "บันทึกข้อมูลเรียบร้อย";
          this.snackbar.show = true;
        } else {
          this.snackbar.icon = "error";
          this.snackbar.color = "red";
          this.snackbar.text = "บันทึกข้อมูลผิดพลาด รหัสบัตรประชาชนซ้ำ";
          this.snackbar.show = true;
        }
      }
    },

    

    async clear() {
      this.$v.$reset();
      this.id_card = "";
      this.u_name = "";
      this.p_word = "";
      this.name_m = "";
      this.email_m = "";
      this.tel_m = "";
      this.add_m = "";
      this.province_ID = null;
      this.prefecture_ID = null;
      this.district_ID = null;
      this.zip_code = null;
      this.pic_s = "";
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

    addmemberProvinceChange() {
      return this.addmember.province_ID;
    },
    addmemberprefectureChange() {
      return this.addmember.prefecture_ID;
    },
    addmemberdistrictChange() {
      return this.addmember.district_ID;
    },

    editCmemberProvinceChange() {
      return this.editcmember.province_ID;
    },
    editCmemberprefectureChange() {
      return this.editcmember.prefecture_ID;
    },
    editCmemberdistrictChange() {
      return this.editcmember.district_ID;
    },
  },
  watch: {
    async addmemberProvinceChange() {
      this.prefectureQueryAll(this.addmember.province_ID);
    },
    async addmemberprefectureChange() {
      this.districtQueryAll(this.addmember.prefecture_ID);
    },
    async addmemberdistrictChange() {
      this.district_PostQueryAll(this.addmember.district_ID);
    },
    async editCmemberProvinceChange() {
      this.prefectureQueryAll(this.editcmember.province_ID);
    },
    async editCmemberprefectureChange() {
      this.districtQueryAll(this.editcmember.prefecture_ID);
    },
    async editCmemberdistrictChange() {
      this.district_PostQueryAll(this.editcmember.district_ID);
    },
  },
};
</script>

<style>
</style>