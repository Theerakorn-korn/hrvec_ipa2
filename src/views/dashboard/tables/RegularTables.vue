<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
    class="text_google"
  >   
    <base-material-card
      icon="mdi-clipboard-text"
      title="ข้อมูลสมาชิก"
      class="px-5 py-3"    
      :elevation="hover ? 24 : 6"      
    >
    <v-spacer />
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
       <v-data-table       
          :loading="loading"
          :headers="headers"
          :items="member"
          :search="search"        
          :class="elevation - 3"
        >       
          <v-alert slot="no-results" :value="true" color="error" icon="warning"
            >Your search for "{{ search }}" found no results.</v-alert
          >
        </v-data-table>

    </base-material-card>

    <div class="py-3" />    
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      search:"",
       headers: [
        { text: "ลำดับ", align: "center", value: "ID_m" },       
        { text: "ชื่อ", align: "center", value: "name_m" },
        { text: "Email", align: "center", value: "email_m" },
        { text: "Tel", align: "center", value: "tel_m" },
        { text: "จังหวัด", align: "center", value: "province_name" },
        { text: "อำเภอ", align: "center", value: "prefecture_name" },
        { text: "ตำบล", align: "center", value: "district_name" },
        { text: "รหัสไปษณีย์", align: "center", value: "zip_code" },      
      ],      
       member: [],
    }
  },

  async mounted() {
    this.getAllmember();
  },

  methods: {
    async getAllmember() {
      let result = await this.$http.post("crud_member.php");
      this.member = result.data;
    },
    complete(index) {
      this.list[index] = !this.list[index];
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
  },
};
</script>
