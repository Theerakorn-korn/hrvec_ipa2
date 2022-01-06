<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row>
      <v-col cols="12" sm="6" lg="4">
        <base-material-stats-card          
          :value="Number(showAlldata.count_id).toLocaleString()"
          color="primary"
          icon="mdi-account-group"
          title="ครูบุคลากรทั้งหมด"
          sub-icon="mdi-clock"
          sub-text="ALL Personnel"
        />
      </v-col>

      <v-col cols="12" sm="6" lg="4">
        <base-material-stats-card
         :value="Number(showAlldatatech.count_id).toLocaleString()"
          color="primary"
          icon="mdi-account-group"
          title="ข้าราชการครู"
          sub-icon="mdi-clock"
          sub-text="Teacher"
        />
      </v-col>

      <v-col cols="12" sm="6" lg="4">
        <base-material-stats-card
        :value="Number(showAlldatadr.count_id).toLocaleString()"
          color="primary"
          icon="mdi-account-group"
          title="ผู้อำนวยการวิทยาลัย"
          sub-icon="mdi-clock"
          sub-text="Director"
        />
      </v-col>

      <v-col cols="12" sm="6" lg="4">
        <base-material-stats-card
         :value="Number(showAlldatasedr.count_id).toLocaleString()"
          color="primary"
          icon="mdi-account-group"
          title="รองผู้อำนวยการ"          
          sub-icon="mdi-clock"
          sub-text="Deputy Director"
        />
      </v-col>

      <v-col cols="12" sm="6" lg="4">
        <base-material-stats-card
        :value="Number(showAlldatasupervision.count_id).toLocaleString()"
          color="primary"
          icon="mdi-account-group"
          title="ศึกษานิเทศก์"
        
          sub-icon="mdi-clock"
          sub-text="Study supervision"
        />
      </v-col>

      <v-col cols="12" sm="6" lg="4">
        <base-material-stats-card
        :value="Number(showAlldatatechprepare.count_id).toLocaleString()"
          color="primary"
          icon="mdi-account-group"
          title="ครูผู้ช่วย"         
          sub-icon="mdi-clock"
          sub-text="Intense Preparation"
        />
      </v-col>
      <v-col cols="12" lg="6">
        <base-material-chart-card
          :data="Personnel_chart.data"
          :options="Personnel_chart.options"
          :responsive-options="Personnel_chart.responsiveOptions"         
          color="#E91E63"
          hover-reveal
          type="Bar"
        >
          <template v-slot:reveal-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn v-bind="attrs" color="info" icon v-on="on">
                  <v-icon color="info">mdi-refresh</v-icon>
                </v-btn>
              </template>
              <span>Refresh</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn v-bind="attrs" light icon v-on="on">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>

              <span>Change Date</span>
            </v-tooltip>
          </template>

          <h4 class="card-title font-weight-light mt-2 ml-2">ข้าราชการครูและบุคลากรทางการศึกษา</h4>

          <template v-slot:actions>
            <v-icon class="mr-1" small>mdi-clock-outline</v-icon>
            <span class="caption grey--text font-weight-light">updated 10 minutes ago</span>
          </template>
        </base-material-chart-card>
      </v-col>

      <v-col cols="12" lg="6">
        <base-material-chart-card
          :data="dailySalesChart.data"
          :options="dailySalesChart.options"
          color="success"
          hover-reveal
          type="Line"
        >
          <template v-slot:reveal-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn v-bind="attrs" color="info" icon v-on="on">
                  <v-icon color="info">mdi-refresh</v-icon>
                </v-btn>
              </template>

              <span>Refresh</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn v-bind="attrs" light icon v-on="on">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>

              <span>Change Date</span>
            </v-tooltip>
          </template>

          <h4 class="card-title font-weight-light mt-2 ml-2">ข้อมูลวิทยฐานะข้าราชการครู</h4>
         
          <template v-slot:actions>
            <v-icon class="mr-1" small>mdi-clock-outline</v-icon>
            <span class="caption grey--text font-weight-light">updated 4 minutes ago</span>
          </template>
        </base-material-chart-card>
      </v-col>

     <!--  <v-col cols="12" lg="4">
        <base-material-chart-card
          :data="dataCompletedTasksChart.data"
          :options="dataCompletedTasksChart.options"
          hover-reveal
          color="info"
          type="Line"
        >
          <template v-slot:reveal-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn v-bind="attrs" color="info" icon v-on="on">
                  <v-icon color="info">mdi-refresh</v-icon>
                </v-btn>
              </template>

              <span>Refresh</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn v-bind="attrs" light icon v-on="on">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>

              <span>Change Date</span>
            </v-tooltip>
          </template>

          <h3 class="card-title font-weight-light mt-2 ml-2">Completed Tasks</h3>

          <p class="d-inline-flex font-weight-light ml-2 mt-1">Last Last Campaign Performance</p>

          <template v-slot:actions>
            <v-icon class="mr-1" small>mdi-clock-outline</v-icon>
            <span class="caption grey--text font-weight-light">campaign sent 26 minutes ago</span>
          </template>
        </base-material-chart-card>
      </v-col>
 -->
      <v-col cols="12" md="12">
        <base-material-card color="warning" class="px-5 py-3">
          <template v-slot:heading>
            <div class="font-weight-light">สถานศึกษา</div>

            <div class="font-weight-light">ข้อมูลสถานศึกษาที่อยู่ในระบบ</div>
          </template>
          <v-card-text>
            <v-data-table :headers="headers" :items="colleges"  :search="search">
              <template v-slot:top>
        <v-text-field
          v-model="search"
          label="ค้นหา :"
          class="mx-4"
        ></v-text-field>
      </template>
            </v-data-table>
          </v-card-text>
        </base-material-card>
      </v-col>



       <v-col cols="12" md="12">
        <base-material-card color="success" class="px-5 py-3">
          <template v-slot:heading>
            <div class="font-weight-light">สาขาวิชาเอก</div>

            <div class="font-weight-light">ข้อมูลสาขาวิชาในระบบ</div>
          </template>
          <v-card-text>
            <v-data-table :headers="header_branchs" :items="showbranchdata"  :search="search_branch">
              <template v-slot:top>
        <v-text-field
          v-model="search_branch"
          label="ค้นหา :"
          class="mx-4"
        ></v-text-field>
      </template>
            </v-data-table>
          </v-card-text>
        </base-material-card>
      </v-col>
     
    </v-row>
     </v-container>
</template>

<script>
export default {
  name: "DashboardDashboard",

  data() {
    return {
    
     headers: [      
        { text: "รหัสสถานศึกษา", align: "center", value: "college_code" },              
        { text: "ชื่อสถานศึกษา", align: "left", value: "college_name" },
        { text: "อำเภอ", align: "left", value: "prefecture_name" },
        { text: "จังหวัด", align: "left", value: "province_name" },
        { text: "ประเภทสถานศึกษา", align: "left", value: "collegetype_name" }, 
        { text: "เบอร์โทร", align: "left", value: "collegeinfo_phone" }, 
      ],
      header_branchs: [      
        { text: "รหัสสาขา", align: "center", value: "id_branch" },              
        { text: "สาขาวิชา", align: "left", value: "name_branch" },
        { text: "รายละเอียด", align: "left", value: "detail_branch" },
      ],
      search: '',
      search_branch: '',
      pagination: {},
      ApiKey: 'HRvec2021',
      
      rowsperpage: [
        25,
        50,
        100,
        {
          text: "All",
          value: -1,
        },
      ],    
      dailySalesChart: {
        data: {
          labels: ["M", "T", "W", "T", "F", "S", "S"],
          series: [[this.num_tech, 17, 7, 17, 23, 18, 38]],
        },
        options: {
          lineSmooth: this.$chartist.Interpolation.cardinal({
            tension: 0,
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
      },
      dataCompletedTasksChart: {
        data: {
          labels: ["12am", "3pm", "6pm", "9pm", "12pm", "3am", "6am", "9am"],
          series: [[this.num_tech, 750, 450, 300, 280, 240, 200, 190]],
        },
        options: {
          lineSmooth: this.$chartist.Interpolation.cardinal({
            tension: 0,
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
      },
     
      Personnel_chart: {
        data: {
          labels: [
            "ผู้อำนวยการ",
            "รองผู้อำนวยการ",
            "ครู",
            "ครูผู้ช่วย",
            "ศึกษานิเทศก์",
          ],
          series: [
            [ 0, 0, 0, 0, 0]
          ],
        },
        options: {
          axisX: {
            showGrid: false,
          },
          low: 0,
          high: 12000,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 10,
          },
        },
        responsiveOptions: [
          [
            "screen and (max-width: 100%)",
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function (value) {
                  return value[0];
                },

              },
            },
          ],
        ],
      },
           
    
      colleges: [],
      provinces: [],
      prefectures: [],        
      regions: [],     
      region_ena: true,
      showAlldata: {},
      showAlldatatech: {},
      showAlldatadr: {},
      showAlldatasedr: {},
      showAlldatasupervision: {},
      showAlldatatechprepare: {},
      showcollegedata: {},   
       showbranchdata: [],  
    };
  },

 async mounted() {
      
    let result
      result = await this.$http.post('collegetype.php', {
        ApiKey: this.ApiKey
      })
      this.collegetypes = result.data
      result = await this.$http.post('college.php', {
        ApiKey: this.ApiKey
      })
      
      this.colleges = result.data
      result = await this.$http.post('province.php', {
        ApiKey: this.ApiKey
      })
      this.provinces = result.data
      
      result = await this.$http.post('region.php', {
        ApiKey: this.ApiKey
      })
      this.regions = result.data 
    
  await this.getAlldata();
  await this.getAlldatatech();
  await this.getAlldatadr();
  await this.getAlldatasedr();
  await this.getAlldataSupervision();
  await this.getAlldatatechprepare();
  await this.getPersonnelChart();
  await this.getAllbranchdata();
  
   },


  methods: { 
    async getAlldata() {
      let result = await this.$http.post("show_dashboard_all.php");
      this.showAlldata = result.data;
    },
    async getAlldatatech() {
      let result = await this.$http.post("show_dashboard_tech.php");
      this.showAlldatatech = result.data;
    },
    async getAlldatadr() {
      let result = await this.$http.post("show_dashboard_dr.php");
      this.showAlldatadr = result.data;
    },
    async getAlldatasedr() {
      let result = await this.$http.post("show_dashboard_se_dr.php");
      this.showAlldatasedr = result.data;
    },
     async getAlldataSupervision() {
      let result = await this.$http.post("show_dashboard_supervision.php");
      this.showAlldatasupervision = result.data;
    }, 
    async getAlldatatechprepare() {
      let result = await this.$http.post("show_dashboard_tech_prepare.php");
      this.showAlldatatechprepare = result.data;
    },
    async getPersonnelChart(){ 
   this.Personnel_chart.data.series=[[this.num_dr,this.num_se_dr,this.num_se_tech,this.num_se_techprepare,this.num_se_supervision]] 
    },

     async getAllbranchdata() {
      let result = await this.$http.post("branch.php",{
        ApiKey: this.ApiKey
      });
      this.showbranchdata = result.data;
    },
  },
  computed:{
    num_dr(){
      let result = parseInt(this.showAlldatadr.count_id)           
      return result
    },
    num_se_dr(){
      let result = parseInt(this.showAlldatasedr.count_id)           
      return result
    },
     num_se_tech(){
      let result = parseInt(this.showAlldatatech.count_id)           
      return result
    },
     num_se_techprepare(){
      let result = parseInt(this.showAlldatatechprepare.count_id)           
      return result
    },
     num_se_supervision(){
      let result = parseInt(this.showAlldatasupervision.count_id)           
      return result
    },

  },
};
</script>
