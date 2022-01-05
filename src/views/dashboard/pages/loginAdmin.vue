<template>
  <v-container id="user-profile" fluid tag="section" class="text_google">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2 font-weight-light">Login System</div>

            <div class="subtitle-1 font-weight-light">Username : Password</div>
          </template>

          <v-form ref="form" lazy-validation>
            <v-text-field
              prepend-icon="mdi-account"
              id="user_name"
              name="user_name"
              label="ชื่อผู้ใช้"
              type="text"
              v-model="user_name"
              :rules="[(v) => !!v || 'กรุณากรอกชื่อผู้ใช้']"
            ></v-text-field>
            <v-text-field
              id="user_password"
              prepend-icon="mdi-lock-outline"
              name="user_password"
              label="รหัสผ่าน"
              type="password"
              v-model="user_password"
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
        :elevation="hover ? 24 : 6"
          class="v-card-profile"
          avatar="https://www.bloggang.com/data/b/bigstory/picture/1449748275.gif"
        >
          <v-card-text class="text-center">
            <h4 class="mb-1 font-weight mb-4">ผู้ดูแลบริหารจัดการข้อมูล</h4>
            <h4 class="font-weight-light black--text">งานบุคลากร สถานศึกษา  </h4>
            <h4 class="font-weight-light black--text mb-4">ผู้อำนวยการวิทยาลัย  </h4>
             <hr class="mb-4">
            <h4 class="font-weight-light black--text">ผู้อำนวยการสถาบัน  </h4>
            <h4 class="font-weight-light black--text mb-4">อาชีวศึกษาจังหวัด </h4>
            <hr class="mb-4">
            <h4 class="font-weight-light mb-3 black--text">กลุ่มงานจัดการงานบุคคล </h4>
           <hr class="mb-4">
            <v-btn color="success" rounded class="mr-0"> คู่มือใช้งานระบบ </v-btn>
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
     <v-snackbar v-model="dialog" top :multi-line="multiLine">
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
        user_name: '',
        user_password: '',
        dialog: false,
        dialog_msg: '',
        snackbar_timeout: 5000,
      }
    },
    mounted() {
  //Null
    },
    methods: {
      async userLogin() {
        if (this.$refs.form.validate()) {
          let result = await this.$http.post('login.php?crud=admin', {
            user_name: this.user_name,
            user_password: this.user_password,                 
          })
          if (result.data.user_status) {
            let user = result.data
            user.system_lock = false         
            sessionStorage.setItem('user', JSON.stringify(user))
            if (user.user_status == "A"){
            sessionStorage.setItem('user', JSON.stringify(user))
              this.$router.push('/admin')}
              //administrator IPA2
            else if (user.user_status == "B"){
              sessionStorage.setItem('user', JSON.stringify(user))
              this.$router.push("/college")
            }//college
            else if (user.user_status == "C")
            
              this.$router.push("/ive")//Vocational Education Institution
            else if (user.user_status == "D")
              this.$router.push("/personnel") //College personnel 
            else if (user.user_status == "G")
              this.$router.push("/vecprovince") //Vocation College Province
            else {
              sessionStorage.clear()
              this.dialog = true
              this.dialog_msg = 'ชื่อผู้ใช้ หรือรหัสผ่าน ไม่ถูกต้อง'
            }
          }
        }
      }
    }
  }

</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Kanit:wght@300&display=swap");
</style>

<style>
.text_google {
  font-family: "Kanit", sans-serif;
}
</style>
