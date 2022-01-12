<template>
 <v-container id="home_menu" fluid tag="section">
   <v-card>
    <v-toolbar
      flat
      color="primary"
      dark
    >   
       <v-toolbar-title>ประมวลผลข้อมูลการย้าย</v-toolbar-title>
    </v-toolbar>
    
      <v-card class="ma-2 pa-2"> 
          <v-row>  
        <v-col class="d-flex" cols="12" md="5">
        <v-select
        v-model="times_s"
          :items="period_match"
          item-text="period_times"     
          label="ครั้งที่ :"
        ></v-select>
      </v-col> 
      <v-col class="d-flex" cols="12" md="5">
        <v-select
        v-model="year_s"
          :items="period_match"
          item-text="period_yearbd"     
          label="ปี :"
        ></v-select>
      </v-col>
       <v-col class="d-flex" cols="12" md="2">
       <v-btn elevation="2" rounded color="primary" dark x-large block @click="searchTimeYear()">เลือกดำเนินการ</v-btn>
      </v-col>
        </v-row>
      </v-card>
     
    <v-tabs vertical>
      
      <v-tab>
        <v-icon left>
         mdi-access-point
        </v-icon>
        Option 1:1
      </v-tab>
      <v-tab>
        <v-icon left>
           mdi-access-point
        </v-icon>
        Option 1:m
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi-access-point
        </v-icon>
        Option m:m
      </v-tab>

      <v-tab-item>
        <v-card flat>
          <v-data-table
          color="success"
          :loading="loading"
          :headers="headers"
          :items="conditions_transfers"
          :search="search"
           :items-per-page="20"          
       > 
          
         <template v-slot:[`item.actions`]="{ item }">
            <v-icon
              color="yellow"
              
              @click.stop="conditions_transferEdit(item.id_rc)"
            >
              mdi-pencil
            </v-icon>          
          </template>            
          <v-alert
            slot="no-results"
            :value="true"
            color="error"
            icon="mdi-alert"
          >ไม่พบผลลัพธ์ "{{ search }}" ที่คุณกำลังค้นหา.</v-alert>
        </v-data-table>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <p>
              Morbi nec metus. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Nunc sed turpis.
            </p>

            <p>
              Suspendisse feugiat. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In hac habitasse platea dictumst. Fusce ac felis sit amet ligula pharetra condimentum.
            </p>

            <p>
              Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Nam commodo suscipit quam. In consectetuer turpis ut velit. Sed cursus turpis vitae tortor. Aliquam eu nunc.
            </p>

            <p>
              Etiam ut purus mattis mauris sodales aliquam. Ut varius tincidunt libero. Aenean viverra rhoncus pede. Duis leo. Fusce fermentum odio nec arcu.
            </p>

            <p class="mb-0">
              Donec venenatis vulputate lorem. Aenean viverra rhoncus pede. In dui magna, posuere eget, vestibulum et, tempor auctor, justo. Fusce commodo aliquam arcu. Suspendisse enim turpis, dictum sed, iaculis a, condimentum nec, nisi.
            </p>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <p>
              Fusce a quam. Phasellus nec sem in justo pellentesque facilisis. Nam eget dui. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In dui magna, posuere eget, vestibulum et, tempor auctor, justo.
            </p>

            <p class="mb-0">
              Cras sagittis. Phasellus nec sem in justo pellentesque facilisis. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nam at tortor in tellus interdum sagittis.
            </p>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
 </v-container>
</template>

<script>
export default {
    name: 'HrvecProcessTransfer',
    data() {
        return {
        loading: true,       
        ApiKey: 'HRvec2021',
        valid: true, 
        times_s:'',
        year_s:'',
        headers: [
        { text: "อ้างอิง", align: "center", value: "id_ref" },                
        { text: "สถานศึกษา", align: "left", value: "college_name" },
        { text: "รหัส", align: "left", value: "id_branch" },
        { text: "สาขา", align: "left", value: "name_branch" },
        
        { text: "ครั้งที่", align: "center", value: "time_s" },         
        { text: "ปีที่", align: "center", value: "year_s" },  
        { text: "วันที่ทำรายการ", align: "center", value: "date_time" },          
        { text: "แก้ไข", align: "center", value: "actions", icon: "mdi-file-document-edit" },       
      ],
            search: '',
      pagination: {},  
      rowsperpage: [
        25,
        50,
        100,
        {
          text: "All",
          value: -1,
        },
      ],
      conditions_transfers: [],
      period_match: [],
        };
        
    },

   async mounted() {
        await this.conditions_transferQueryAll() 
        await this.period_QueryAll() 
    },

    methods: {
       async searchTimeYear(){
             this.loading = true
        let result = await this.$http.post('conditions_transfer.php', {
          ApiKey: this.ApiKey,
          time_s: this.times_s,
          year_s: this.year_s
        }).finally(() => this.loading = false)
        this.conditions_transfers = result.data
      
        },
       async conditions_transferQueryAll() {
          this.loading = true
        let result = await this.$http.post('conditions_transfer.php', {
          ApiKey: this.ApiKey,        
        }).finally(() => this.loading = false)
        this.conditions_transfers = result.data          
      },

       async period_QueryAll() {
          this.loading = true
        let result = await this.$http.post('period.php', {
          ApiKey: this.ApiKey,                  
        }).finally(() => this.loading = false)
        this.period_match = result.data          
      },
    },
    computed:{
      period_match_call(){
            let period_year = this.period_match.period_year
            let period_times = this.period_match.period_times
            let result = period_times + '/' +period_year
            return result
      },
    }
};
</script>

<style lang="scss" scoped>

</style>