<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="4">
        <base-material-card
          class="v-card-profile"
          avatar="https://www.vec.go.th/portals/0/ovec.jpg"
        >
          <v-card-text class="text-center">
            <h3 class="font-weight-light mb-1 grey--text">ชื่อ-นามสกุล</h3>
            <h4 class="font-weight-light mb-3 black--text">ข้อมูลเบื้องต้น</h4>
            <p class="font-weight-light grey--text"></p>
            <!-- <v-btn color="success" rounded class="mr-0">แก้ไข</v-btn> -->
          </v-card-text>
        </base-material-card>
      </v-col>
      <v-col cols="12" md="8">    

        <base-material-card class="text_google">
          <template v-slot:heading>
            <div class="font-weight-light text_google">              
              <h2 class="h1 font-weight-light text_google"><v-icon large left>mdi-account</v-icon> ข้อมูลส่วนบุคคล</h2>
            </div>
          </template>

          <v-form>
            <v-container class="pa-1 ma-1">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field label="วิทยาลัย" disabled />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field class="purple-input" label="รหัสบัตรประชาชน" />              
                </v-col>
                <v-col cols="12" md="2">
                  <v-text-field label="คำนำหน้าชื่อ" class="purple-input" />
                </v-col>
                <v-col cols="12" md="5">
                  <v-text-field label="ชื่อ" class="purple-input" />
                </v-col>
                <v-col cols="12" md="5">
                  <v-text-field label="นามสกุล" class="purple-input" />
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field label="ตำแหน่ง" class="purple-input" />
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field label="เลขที่ตำแหน่ง" class="purple-input" />
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field label="วิทยฐานะ" class="purple-input" />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field class="purple-input" label="ระดับ" type="number" />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field class="purple-input" label="เงินเดือน" type="number" />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field class="purple-input" label="คุณวุฒิ" type="number" />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field class="purple-input" label="สาขาวิชาเอก" type="number" />
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field class="purple-input" label="วันเกิด" type="number" />
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field class="purple-input" label="เดือนเกิด" type="number" />
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field class="purple-input" label="ปีเกิด" type="number" />
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field class="purple-input" label="วันบรรจุ" type="number" />
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field class="purple-input" label="เดือนบรรจุ" type="number" />
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field class="purple-input" label="ปีบรรจุ" type="number" />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field class="purple-input" label="เกษียณ" type="number" />
                </v-col>

                <v-col cols="12" class="text-right">
                  <v-btn color="success" class="mr-0">Update Profile</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      editmember: {},
      personnel: {},
    };
  },
  async mounted() {
    let result = {};
    let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
    // this.system_lock = userSession.system_lock
    console.log(userSession);
    result = await this.$http.post("crud_personnel.php?crud=read", {
      id_card: userSession.id_card,
    });
    this.personnel = result.data;
  },

  methods: {
    //Edit data
    async memberEdit() {
      let result = await this.$http.post("crud_personnel.php", {
        id_card: id_card,
      });
      this.editmember = result.data;
    },
  },
};
</script>
<style>
.text_google {
  font-family: "Kanit", sans-serif;
}
</style>
