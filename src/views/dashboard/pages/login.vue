<template>
  <v-container id="user-profile" fluid tag="section" class="text_google">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2 font-weight-light">Login Member</div>

            <div class="subtitle-1 font-weight-light">Username : Password</div>
          </template>

          <v-form ref="form" lazy-validation>
            <v-text-field
              prepend-icon="mdi-account"
              id="id_card"
              name="id_card"
              label="ชื่อผู้ใช้"
              type="text"
              v-model="id_card"
              :rules="[(v) => !!v || 'กรุณากรอกชื่อผู้ใช้']"
            ></v-text-field>
            <v-text-field
              id="p_word"
              prepend-icon="mdi-lock-outline"
              name="p_word"
              label="รหัสผ่าน"
              type="password"
              v-model="p_word"
              :rules="[(v) => !!v || 'กรุณากรอกรหัสผ่าน']"
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
            <h6 class="display-1 mb-1 grey--text">CEO / CO-FOUNDER</h6>
            <h4 class="display-2 font-weight-light mb-3 black--text">Name Personal</h4>
            <p class="font-weight-light grey--text">I,m Teacher.</p>
            <v-btn color="success" rounded class="mr-0">Follow</v-btn>
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>    
    <v-snackbar v-model="dialog" top>
      <v-card-text>
         {{ dialog_msg }}
      </v-card-text>
     
      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="dialog = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      id_card: "",
      p_word: "",
      dialog: false,
      dialog_msg: "",
      snackbar_timeout: 10000,
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
          p_word: this.p_word,
        });
        if (result.data.user_status) {
          let user = result.data;
          user.system_lock = false;
           this.$store.commit('getLoginUser', user)
          sessionStorage.setItem("user", JSON.stringify(user));
          if (user.user_status == "tech") {
            this.dialog = true;            
            sessionStorage.setItem("user", JSON.stringify(user));
            this.$router.push("/user");
          } else if (user.user_status == "se_director") {
            this.dialog = true;           
            sessionStorage.setItem("user", JSON.stringify(user));
            this.$router.push("/#");
          } else if (user.user_status == "director") {
            this.dialog = true;           
            sessionStorage.setItem("user", JSON.stringify(user));
            this.$router.push("/#");
          } else {
            sessionStorage.clear();
            this.dialog = true;
            this.dialog_msg = "ชื่อผู้ใช้ หรือรหัสผ่าน ไม่ถูกต้อง";
          }
        }
      }
    },
  },
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
