<template>
 <div>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="4">
        <base-material-card
          class="v-card-profile"
          avatar="https://www.vec.go.th/portals/0/ovec.jpg"         
        >
          <v-card-text class="text-center">
            <h3 class="font-weight-light mb-1 grey--text">{{ user.id_card }}</h3>
            <h3 class="font-weight-light mb-1 grey--text">{{ user.title_s }}{{ user.frist_name }}  {{ user.last_name }}</h3>
            <h4 class="font-weight-light mb-3 black--text">{{ user.college_s }}</h4>
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
                  <h3 class="font-weight"><v-icon large>mdi-chevron-double-right</v-icon> สังกัด : {{ user.college_s }} </h3> 
                </v-col>
                <v-col cols="12" md="6">
                 <h3 class="font-weight"><v-icon large left>mdi-chevron-double-right</v-icon> รหัสบัตรประชาชน : {{ user.id_card }}</h3>               
                </v-col>               
                <v-col cols="12" md="6">
                   <h3 class="font-weight"><v-icon large left>mdi-chevron-double-right</v-icon> ตำแหน่ง : {{ user.position_name }}</h3>   
                </v-col>
                <v-col cols="12" md="6">                 
                   <h3 class="font-weight"><v-icon large left>mdi-chevron-double-right</v-icon> เลขที่ตำแหน่ง : {{ user.id_position }}</h3>   
                </v-col>
                <v-col cols="12" md="6">                 
                   <h3 class="font-weight"><v-icon large left>mdi-chevron-double-right</v-icon> วิทยฐานะ : {{ user.rang_name }}</h3>   
                </v-col>
                <v-col cols="12" md="6">                 
                   <h3 class="font-weight"><v-icon large left>mdi-chevron-double-right</v-icon> ระดับ : {{ user.rang_level }}</h3>   
                </v-col>                
                <v-col cols="12" md="6">                 
                   <h3 class="font-weight"><v-icon large left>mdi-chevron-double-right</v-icon> คุณวุฒิ : {{ user.ed_abb }}</h3>   
                </v-col>
                <v-col cols="12" md="6">                  
                   <h3 class="font-weight"><v-icon large left>mdi-chevron-double-right</v-icon> สาขาวิชาเอก : {{ user.ed_name }}</h3>   
                </v-col>
                <v-col cols="12" md="6">                  
                   <h3 class="font-weight"><v-icon large left>mdi-chevron-double-right</v-icon> วันเดือนปี เกิด : {{ user.brith_day }}/{{ user.brith_month }}/{{ user.brith_year }} </h3>   
                </v-col>               
                <v-col cols="12" md="6">                 
                   <h3 class="font-weight"><v-icon large left>mdi-chevron-double-right</v-icon> วันเดือนปี บรรจุ : {{ user.appoin_day }}/{{ user.appoin_month }}/{{ user.appoin_year }}</h3>   
                </v-col>               
                <v-col cols="12" md="6">                
                   <h3 class="font-weight"><v-icon large left>mdi-chevron-double-right</v-icon> เกษียณ : {{ user.retrire_year }}</h3> 
                </v-col>
                 <v-col cols="12" md="6">                
                   <h3 class="font-weight"><v-icon large left>mdi-chevron-double-right</v-icon> เบอร์โทรติดต่อ : {{ user.retrire_year }}</h3> 
                </v-col>
                 <v-col cols="12" md="12">                
                   <h3 class="font-weight"><v-icon large left>mdi-chevron-double-right</v-icon> E-mail : {{ user.retrire_year }}</h3> 
                </v-col>
                <v-col cols="12" class="text-right">
                  <v-btn color="warning" class="mr-0"  @click.native="educationAdd()">Update Profile</v-btn>
                </v-col>
              </v-row>              
            </v-container>
          </v-form>
        </base-material-card>
      </v-col>
    </v-row>
    
  </v-container>
 

  </div>
</template>

<script>
export default {
  data() {
    return {
      addeducationdialog: false,
      user: {},
      editmember: {},
      personnel: {},
    };
  },
  async mounted() {
      let result
      let userSession = JSON.parse(sessionStorage.getItem('user')) || 0
      result = await this.$http.post('crud_personnel.php?crud=read', {
        id_card: userSession.id_card       
      })
      this.user = result.data    
    },
 async educationAdd() {
      this.addeducation = {};
      this.updateImageData = {};
      this.addeducationdialog = true;
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
