<template>
  <div>
    <v-container class="text_google">
      <base-material-card
        icon="mdi-account-multiple"
        title="ข้อมูลสมาชิก"
        class="px-5 py-3"
        :elevation="hover ? 24 : 6"
      >     
        
        <v-card>
          <v-btn
          :elevation="hover ? 24 : 6"
          large
          right
          depressed
          color="primary"
          @click.native="memberAdd()"
          ><v-icon>mdi-plus-circle-outline</v-icon>เพื่อรายการ</v-btn
        >
        
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="ค้นหา ระบุคำ หรือ ส่วนข้อความเกี่ยวข้อง"
            single-line
            hide-details
            :elevation="hover ? 24 : 6"
            dense
            filled
          />
        </v-card>

        <v-data-table
          color="success"
          :loading="loading"
          :headers="headers"
          :items="member"
          :search="search"
          :class="elevation - 3"
        >
         <!--  <template v-slot:item.action="{ item }" width="10%">
            <v-icon
              color="yellow"
              :elevation="hover ? 24 : 6"
              @click.stop="memberEdit(item.ID_m)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              color="red"
              :elevation="hover ? 24 : 6"
              @click.stop="memberDelete(item.ID_m)"
            >
              mdi-delete
            </v-icon>
          </template> -->
          <v-alert
            slot="no-results"
            :value="true"
            color="error"
            icon="mdi-alert"
            >ไม่พบผลลัพธ์ "{{ search }}" ที่คุณกำลังค้นหา.</v-alert
          >
        </v-data-table>
      </base-material-card>

      <!--addmemberdialog  -->
      <v-layout row justify-center>
        <v-dialog v-model="addmemberdialog" persistent max-width="50%">
          <v-card class="mx-auto pa-5" :elevation="hover ? 24 : 6">
            <base-material-card
              icon="mdi-account-multiple"
              title="เพิ่มข้อมูลสมาชิก"
              class="px-5 py-3 text_google"
              :elevation="hover ? 24 : 6"
            >
            </base-material-card>

            <v-card-text class="text_google">
              <v-form ref="addmemberform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md12>
                      <v-text-field
                        v-model="addmember.id_card"
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
                      <hr />
                      <v-text-field
                        v-model="addmember.u_name"
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
                        :counter="100"
                        label="Email : "
                        prepend-icon="mdi-email"
                        request
                        dense
                        filled
                        :rules="[
                          (v) => !!v || 'กรุณากรอก Email',
                          (v) =>
                            /.+@.+\..+/.test(v) || 'กรุณากรอก Email ให้ถูกต้อง',
                        ]"
                      ></v-text-field>

                      <v-text-field
                        v-model="addmember.tel_m"
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
                        item-text="province_name"
                        item-value="province_ID"
                        prepend-icon="mdi-account-location"
                        label="จังหวัด"
                        request
                        :rules="[(v) => !!v || '']"
                      ></v-autocomplete>

                      <v-autocomplete
                        v-model="addmember.prefecture_ID"
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
                @click.stop="addmemberdialog = false"
                rounded
                ><v-icon dark>mdi-close</v-icon> ยกเลิก</v-btn
              >
              <v-btn
                large
                color="success"
                @click.stop="addmemberSubmit()"
                rounded
              >
                <v-icon dark>mdi-content-save</v-icon>&nbsp;&nbsp;บันทึก
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model deletememberdialog -->
      <v-layout>
        <v-dialog v-model="deletememberdialog" persistent max-width="40%">
          <v-card class="mx-auto pa-5" :elevation="hover ? 24 : 6">                     
             <base-material-card
              color="error"
              icon="mdi-delete"
              title="ลบข้อมูล"
              class="px-5 py-3 text_google"
              :elevation="hover ? 24 : 6"
             
            >
            </base-material-card>

            <v-card-text class="text_google">
              <v-form ref="deletememberform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12>
                      ยืนยันการลบข้อมูล :
                      <h3>
                        {{ editmember.name_m }}
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
              <v-btn large  @click.stop="deletememberdialog = false"
                ><v-icon dark>mdi-close</v-icon>ยกเลิก</v-btn
              >
              <v-btn large
                color="red darken-3"
                @click.stop="deletememberubmit()"
                dark
              >
                <v-icon dark>mdi-delete</v-icon>&nbsp;ลบ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model editmemberdialog -->
      <v-layout row justify-center>
        <v-dialog v-model="editmemberdialog" persistent max-width="50%">
          <v-card class="mx-auto pa-5" :elevation="hover ? 24 : 6">
            <base-material-card
              color="yellow"
              icon="mdi-account-multiple"
              title="แก้ไขข้อมูลสมาชิก"
              class="px-5 py-3 text_google"
              :elevation="hover ? 24 : 6"
            >
            </base-material-card>
            <v-card-text>
              <v-form ref="editmemberform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md12>
                      <v-text-field
                        v-model="editmember.id_card"
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
                        v-model="editmember.u_name"
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
                        v-model="editmember.p_word"
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
                        v-model="editmember.name_m"
                        :counter="100"
                        label="ชื่อ-นามสกุล : "
                        prepend-icon="mdi-account-box"
                        dense
                        filled
                        request
                        :rules="[(v) => !!v || '']"
                      ></v-text-field>

                      <v-text-field
                        v-model="editmember.email_m"
                        :counter="100"
                        label="Email : "
                        prepend-icon="mdi-email"
                        request
                        dense
                        filled
                        :rules="[
                          (v) => !!v || 'กรุณากรอก Email',
                          (v) =>
                            /.+@.+\..+/.test(v) || 'กรุณากรอก Email ให้ถูกต้อง',
                        ]"
                      ></v-text-field>

                      <v-text-field
                        v-model="editmember.tel_m"
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
                        v-model="editmember.add_m"
                        dense
                        filled
                        :counter="100"
                        label="ที่อยู่ เลขที่/หมู่ : "
                        prepend-icon="mdi-account-location"
                        request
                        :rules="[(v) => !!v || '']"
                      ></v-text-field>

                      <v-autocomplete
                        v-model="editmember.province_ID"
                        :items="provinces"
                        dense
                        filled
                        item-text="province_name"
                        item-value="province_ID"
                        prepend-icon="mdi-account-location"
                        label="จังหวัด"
                        request
                        :rules="[(v) => !!v || '']"
                      ></v-autocomplete>

                      <v-autocomplete
                        v-model="editmember.prefecture_ID"
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
                        v-model="editmember.district_ID"
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
                        v-model="editmember.zip_code"
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
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn large  @click.stop="editmemberdialog = false" rounded
                ><v-icon dark>mdi-close</v-icon>ยกเลิก</v-btn
              >
              <v-btn large color="warning" @click.stop="editmemberSubmit()" rounded>
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
import Password from "vue-password-strength-meter";
export default {
  components: { Password },
  data() {
    return {
      search: "",
      addmemberdialog: false,
      editmemberdialog: false,
      deletememberdialog: false,
      snackbar: {
        show: false,
        color: "",
        timeout: 5000,
        icon: "",
        text: "",
      },
      currentPK: null,
      headers: [
        { text: "ลำดับ", align: "center", value: "ID_m" },
        { text: "ชื่อ", align: "center", value: "name_m" },
        { text: "Email", align: "center", value: "email_m" },
        { text: "Tel", align: "center", value: "tel_m" },
        { text: "จังหวัด", align: "center", value: "province_name" },
        { text: "อำเภอ", align: "center", value: "prefecture_name" },
        { text: "ตำบล", align: "center", value: "district_name" },
        { text: "รหัสไปษณีย์", align: "center", value: "zip_code" },
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
      member: [],
      addmember: {},
      editmember: {},
      provinces: [],
      prefectures: [],
      district: [],
      district_post_s: [],
    };
  },

  async mounted() {
    this.getAllmember();
    this.provinceQueryAll();
  },
  methods: {
    async getAllmember() {
      let result = await this.$http.post("crud_member.php");
      this.member = result.data;
    },
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
    //Add data
    async memberAdd() {
      this.addmember = {};
      this.addmemberdialog = true;
    },
    async addmemberSubmit() {
      if (this.$refs.addmemberform.validate()) {
        let result = await this.$http.post(
          "crud_member.php?crud=create",
          this.addmember
        );
        if (result.data.status == true) {
          this.snackbar.icon = "mdi-content-save";
          this.snackbar.color = "success";
          this.snackbar.text = "บันทึกข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.getAllmember();
        } else {
          this.snackbar.icon = "mdi-alert";
          this.snackbar.color = "red";
          this.snackbar.text = "บันทึกข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.addmemberdialog = false;
        this.isEditing = null;
      }
    },
    //Edit data
    async memberEdit(ID_m) {
      let result = await this.$http.post("crud_member.php", { ID_m: ID_m });
      this.editmember = result.data;
      this.editmemberdialog = true;
    },
    async editmemberSubmit() {
      if (this.$refs.editmemberform.validate()) {
        let result = await this.$http.post(
          "crud_member.php?crud=update",
          this.editmember
        );
        if (result.data.status == true) {
          this.member = result.data;
          this.snackbar.icon = "mdi-content-save";
          this.snackbar.color = "success";
          this.snackbar.text = "แก้ไขข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.getAllmember();
        } else {
          this.snackbar.icon = "mdi-alert";
          this.snackbar.color = "red";
          this.snackbar.text = "แก้ไขข้อมูลผิดพลาด";
          this.snackbar.show = true;
          this.getAllmember();
        }
        this.getAllmember();
        this.editmemberdialog = false;
      }
    },
    async memberDelete(ID_m) {
      let result = await this.$http.post("crud_member.php", { ID_m: ID_m });
      this.editmember = result.data;
      this.deletememberdialog = true;
    },
    async deletememberubmit() {
      if (this.$refs.deletememberform.validate()) {
        let result = await this.$http.post(
          "crud_member.php?crud=delete",
          this.editmember
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
        this.deletememberdialog = false;
        this.getAllmember();
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
    addmemberProvinceChange() {
      return this.addmember.province_ID;
    },
    addmemberprefectureChange() {
      return this.addmember.prefecture_ID;
    },
    addmemberdistrictChange() {
      return this.addmember.district_ID;
    },

    editmemberProvinceChange() {
      return this.editmember.province_ID;
    },
    editmemberprefectureChange() {
      return this.editmember.prefecture_ID;
    },
    editmemberdistrictChange() {
      return this.editmember.district_ID;
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
    async editmemberProvinceChange() {
      this.prefectureQueryAll(this.editmember.province_ID);
    },
    async editmemberprefectureChange() {
      this.districtQueryAll(this.editmember.prefecture_ID);
    },
    async editmemberdistrictChange() {
      this.district_PostQueryAll(this.editmember.district_ID);
    },
  },
};
</script>
