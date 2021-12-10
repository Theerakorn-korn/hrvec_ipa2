<template>
  <v-container id="upgrade" fluid tag="section" class="text_google">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <base-material-card color="primary">
          <template v-slot:heading>
            <div class="font-weight-light v-size--x-large">
              สมัครสมาชิก
            </div>

            <div class="font-weight-light">
              คุณสามารถสมัครสมาชิกเพื่อดำเนินการจัดซื้อสินค้าออนไลน์
            </div>
          </template>

            <v-form ref="addmemberform" lazy-validation>
          <v-card
            class="mx-auto pa-1"
            :elevation="hover ? 24 : 6"
            max-width="500"
         
          >
            <v-toolbar flat color>
              <v-icon>mdi-account</v-icon>
              <v-toolbar-title class="font-weight-light"
                >ลงทะเบียนสมัคสมาชิก</v-toolbar-title
              >
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
              prepend-icon="mdi-account"
              request
              :rules="[(v) => !!v || '']"
            ></v-text-field>
            <hr />
            <br />
            <v-text><v-icon>mdi-login</v-icon> รหัสผ่าน</v-text>
            <password
              label="รหัสผ่าน :"
              v-model="addmember.p_word"
              :disabled="!isEditing"
              :toggle="true"
              dense
              filled
              prepend-icon="mdi-login"
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
              v-model="addmember.district_post_s"
              :disabled="!isEditing"
                :items="district"
              item-text="post"
              item-value="district_ID"
              label="ไปรษณีย์ :"
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
                 color="success"
              rounded
              class="mr-0"
                :disabled="!isEditing"
                :elevation="hover ? 24 : 6"
                @click.stop="addmemberSubmit()"
                round
              >
                <v-icon>mdi-content-save</v-icon>
                <span>บันทึก</span>
              </v-btn>

              <v-btn
               color="warning"
              rounded
              class="mr-0"
                outline                
                :disabled="!isEditing"
                :elevation="hover ? 24 : 6"
                @click.stop="isEditing = !isEditing"
                round
              >
               
                <v-icon>mdi-close</v-icon> <span>ยกเลิก</span>
              </v-btn>
            </div>
            <br />      
          </v-card-text>
          </v-card>
        </v-form>
        </base-material-card>     

      </v-col>
    </v-row>
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
        <v-btn dark flat @click="snackbar.show = false"> Close </v-btn>
      </v-snackbar>
    </v-container>
  </v-container>
  
</template>

<script>
import Password from "vue-password-strength-meter";
export default {
  name: "DashboardDashboard",
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
          this.snackbar.icon = "mdi-checkbox-marked-circle";
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
      this.district_post_s = null;
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

<style lang="sass">
#upgrade
  .v-data-table
    th, td
      border: none !important
</style>
<style>
@import url("https://fonts.googleapis.com/css2?family=Kanit:wght@300&display=swap");
</style>

<style>
.text_google {
  font-family: "Kanit", sans-serif;
}
</style>