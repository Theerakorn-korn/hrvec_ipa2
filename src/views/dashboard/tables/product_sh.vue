<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
    class="text_google"
  >   
    <base-material-card
      icon="mdi-clipboard-text"
      title="ข้อมูลสินค้า"
      class="px-5 py-3"    
            
    >
    <v-spacer />
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="ค้นหา ระบุคำ หรือ ส่วนข้อความเกี่ยวข้อง"
            single-line
            hide-details
              
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
        { text: "ลำดับ", align: "left", value: "pid" },       
        { text: "หมวดหมู่หลัก", align: "left", value: "cat_name" },
        { text: "หมวดหมู่ย่อย", align: "left", value: "name_sub" },
        { text: "สินค้า", align: "left", value: "p_name" },
        { text: "ราคา", align: "center", value: "p_price" },
        { text: "หน่วย", align: "center", value: "unit_name" },
        { text: "จำนวน", align: "center", value: "p_total" },        
      ],      
       member: [],
    }
  },

  async mounted() {
    this.getAllmember();
  },

  methods: {
    async getAllmember() {
      let result = await this.$http.post("crud_product.php");
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
