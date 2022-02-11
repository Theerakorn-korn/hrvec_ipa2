<template>
  <v-container id="user-profile" fluid tag="section" class="text_google">
    <v-row justify="center">
      <v-col cols="12" lg="12">
        <v-bottom-navigation  v-model="value" :value="value" :background-color="color" horizontal>
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
        <base-material-card>
          <template v-slot:heading>
            <div class="font-weight-light">
              <h2>Login ข้าราชการครูและบุคลากรทางการศึกษา</h2>
            </div>

            <div class="font-weight-light">Username : รหัสบัตรประชาชน</div>
            <div class="font-weight-light">
              Password : วันเดือนปีเกิด : 8/8/2531
            </div>
          </template>

          <v-form ref="form" lazy-validation>
            <v-text-field
              prepend-icon="mdi-account"
              id="id_card"
              name="id_card"
              label="ชื่อผู้ใช้ : รหัสบัตรประชาชน"
              type="text"
              v-model="id_card"
              :rules="[v => !!v || 'กรุณากรอกชื่อผู้ใช้']"
            ></v-text-field>
            <v-text-field
              id="p_word"
              prepend-icon="mdi-lock-outline"
              name="p_word"
              label="รหัสผ่าน : 8/8/2531"
              v-model="p_word"
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
            <h2 class="font-weight-light mb-1 grey--text">เข้าสู่ระบบ</h2>
            <h1 class="font-weight-light mb-3 black--text">
              ข้าราชการครูและบุคลากรทางการศึกษา
            </h1>
            <p class="font-weight-light grey--text">
              ชื่อผู้ใช้ระบบ : รหัสบัตรประชาชน
            </p>
            <p class="font-weight-light red--text">
              รหัสผ่าน : วันเดือนปีเกิด "8/8/2531" ไม่ต้องระบุ 0 นำหน้า
            </p>
            <p class="font-weight-light black--text">
              เข้าสู่ระบบแล้วให้ดำเนินการเปลี่ยนรหัสผ่านของท่าน
            </p>
            <v-btn color="success" to="/news" rounded class="mr-0">คู่มือ</v-btn>
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
      show1: false,
      id_card: "",
      p_word: "",
      dialog: false,
      dialog_msg: "",
      snackbar_timeout: 10000
    };
  },
  mounted() {
    //Null
  },
  methods: {
    async userLogin() {
      if (this.$refs.form.validate()) {
        let result = await this.$http.post("login.php?crud=user", {
          id_card: this.id_card,
          p_word: this.p_word
        });
        if (result.data.user_status) {
          let user = result.data;
          user.system_lock = false;
          sessionStorage.setItem("user", JSON.stringify(user));
          if (user.user_status == "tech") {
            this.dialog = true;
            sessionStorage.setItem("user", JSON.stringify(user));
            this.$router.push("/user");
          } else if (user.user_status == "se_director") {
            this.dialog = true;
            sessionStorage.setItem("user", JSON.stringify(user));
            this.$router.push("/user");
          } else if (user.user_status == "director") {
            this.dialog = true;
            sessionStorage.setItem("user", JSON.stringify(user));
            this.$router.push("/user");
          } else {
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
      return 'green lighten-1'      
    }
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
