<template>
  <v-container id="user-profile" fluid tag="section" class="text_google">
    <v-row justify="center">
      <v-col cols="12" lg="12">
        <v-bottom-navigation :background-color="color" horizontal>
          <v-btn color="primary" max-width="100%"  elevation="3" rounded to="/pages/login">
           <h3><span>เข้าสู่ระบบ : ข้าราชการครูและบุคลากรทางการศึกษา</span></h3> 
            <v-icon>mdi-account-key</v-icon>
          </v-btn>

          <v-btn color="warning" max-width="100%" elevation="3" rounded to="/pages/loginAdmin">
            <h3><span>เข้าสู่ระบบ : สถานศึกษา</span></h3>

            <v-icon>mdi-login-variant</v-icon>
          </v-btn>
        </v-bottom-navigation>
      </v-col>
      <v-col cols="12" md="8">
        <base-material-card color="warning">
          <template v-slot:heading>
            <div class="font-weight-light">
              <h3>Login สถานศึกษา อศจ. สถานบัน กจ2 ผู้ดูแลระบบ</h3>
            </div>
          </template>

          <v-form ref="form" lazy-validation>
            <v-text-field
              prepend-icon="mdi-account"
              id="user_name"
              name="user_name"
              label="ชื่อผู้ใช้"
              type="text"
              v-model="user_name"
              :rules="[v => !!v || 'กรุณากรอกชื่อผู้ใช้']"
            ></v-text-field>
            <v-text-field
              id="user_password"
              prepend-icon="mdi-lock-outline"
              name="user_password"
              label="รหัสผ่าน"
              v-model="user_password"
              :rules="[v => !!v || 'กรุณากรอกรหัสผ่าน']"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              hint="At least 8 characters"
              counter
              @click:append="show1 = !show1"
            ></v-text-field>
          </v-form>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="userLogin()" color="success" rounded class="mr-0">
              <v-icon dark small>mdi-login</v-icon>&nbsp;&nbsp; เข้าสู่ระบบ
            </v-btn>
          </v-card-actions>
        </base-material-card>
      </v-col>

      <v-col cols="12" md="4">
        <base-material-card
          class="v-card-profile"
          avatar="https://www.bloggang.com/data/b/bigstory/picture/1449748275.gif"
        >
          <v-card-text class="text-center">
            <h4 class="mb-1 font-weight mb-4">ผู้ดูแลบริหารจัดการข้อมูล</h4>
            <h4 class="font-weight-light black--text">งานบุคลากร สถานศึกษา</h4>
            <h4 class="font-weight-light black--text mb-4">
              ผู้อำนวยการวิทยาลัย
            </h4>
            <hr class="mb-4" />
            <h4 class="font-weight-light black--text">ผู้อำนวยการสถาบัน</h4>
            <h4 class="font-weight-light black--text mb-4">
              อาชีวศึกษาจังหวัด
            </h4>
            <hr class="mb-4" />
            <h4 class="font-weight-light mb-3 black--text">
              กลุ่มงานจัดการงานบุคคล
            </h4>
            <hr class="mb-4" />
            <v-btn color="success" rounded class="mr-0" to="/news">
              คู่มือใช้งานระบบ
             
            </v-btn>
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="dialog" top>
      <v-card-text>
        {{ dialog_msg }}
      </v-card-text>

      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="dialog = false"
          >Close</v-btn
        >
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
       ApiKey: 'HRvec2021',
      show1: false,
      data_syslog:{},
      user_name: "",
      user_password: "",
      dialog: false,
      dialog_msg: "",
      snackbar_timeout: 5000
    };
  },
  mounted() {
    //Null
  },
  methods: {
    async userLogin() {
      if (this.$refs.form.validate()) {
        let result = await this.$http.post("login.php?crud=admin", {
          user_name: this.user_name,
          user_password: this.user_password
        });
        if (result.data.user_status) {
          let user = result.data;
          user.system_lock = false;
          sessionStorage.setItem("user", JSON.stringify(user));
          if (user.user_status == "A") {
          
          this.data_syslog.ApiKey = this.ApiKey;
          this.data_syslog.user_account = this.user_name;
          this.data_syslog.event_log = "login-admin";
          this.data_syslog.page_log = "loginAdmin";
          this.data_syslog.table_log = "";
          this.data_syslog.date_times = this.date_today_log;          

          await this.$http.post('data_syslog.insert.php', this.data_syslog)

            sessionStorage.setItem("user", JSON.stringify(user));
            this.$router.push("/admin");
          }
          //administrator IPA2
          else if (user.user_status == "B") {
            sessionStorage.setItem("user", JSON.stringify(user));
            this.$router.push("/college");
          } //college
          else if (user.user_status == "C") this.$router.push("/ive");
          //Vocational Education Institution
          else if (user.user_status == "D") this.$router.push("/personnel");
          //College personnel
          else if (user.user_status == "G") this.$router.push("/vecprovince");
          //Vocation College Province
          else {
            sessionStorage.clear();
            this.dialog = true;
            this.dialog_msg = "ชื่อผู้ใช้ หรือรหัสผ่าน ไม่ถูกต้อง";
          }
        }
      }
    }
  },
  computed: {
      color () {
      return 'orange lighten-1'      
    },
     date_today_log() {
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, "0");
      let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      let yyyy = today.getFullYear() + 543;
let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      today = dd + "/" + mm + "/" + yyyy + "/" + time;
      return today;
    },
   }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Kanit:wght@300&display=swap");
</style>

<style>
.text_google {
  font-family: "Kanit", sans-serif;
}
</style>
