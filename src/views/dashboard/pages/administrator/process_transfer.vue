<template>
<div>


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
 <v-col class="d-flex" cols="12" md="3">
       <v-btn elevation="2" rounded color="primary" dark x-large block @click="transference_locationDelete()">ลบข้อมูลการย้ายที่ไม่ได้กดบันทึกเสนอ</v-btn>
      </v-col>
        </v-row>
          <v-row>  
            
        <v-col class="d-flex" cols="12" md="3">
        <v-select
        v-model="times_s"
          :items="period_match"
          item-text="period_times"     
          label="ครั้งที่ :"
        ></v-select>
      </v-col> 
      <v-col class="d-flex" cols="12" md="3">
        <v-select
        v-model="year_s"
          :items="period_match"
          item-text="period_yearbd"     
          label="ปี :"
        ></v-select>
      </v-col>
       <v-col class="d-flex" cols="12" md="3">
         <v-radio-group
      v-model="row"
      row
    >
      <v-radio
        label="สถานะ 1 : 1"       
        @click="OnetoOne()" 
      ></v-radio>    
       <v-radio
        label="แสดงทั้งหมด"  
      ></v-radio>     
    </v-radio-group>
      
      </v-col>
       <v-col class="d-flex" cols="12" md="3">
       <v-btn elevation="2" rounded color="primary" dark x-large block @click="searchTimeYear()">เลือกดำเนินการ</v-btn>
      </v-col>
        </v-row>
      </v-card>
     
   
     
        <v-card flat>
          <v-data-table
          color="success"
          :loading="loading"
          :headers="headers"
          :items="conditions_transfers"
          :search="search"
           :items-per-page="20"          
       > 
          
          
           <template v-slot:[`item.status_process`]="{ item }">
           <span v-if="item.personnel_num_s <=1 && item.condition_edu === item.personnel_edu"><v-icon large color="green darken-2">mdi-clipboard-check</v-icon></span>   
           <span v-else><v-icon large color="yellow lighten-1">mdi-clipboard-check-multiple</v-icon></span>   
          </template> 
          <template v-slot:[`item.actions`]="{ item }">
             <v-icon
              color="green"
              large
              @click.stop="select_idPosition(item.id_cb,item.id_tfl,item.id_tfp)"
              v-if="item.personnel_num_s <=1 && item.condition_edu === item.personnel_edu"
            >
              mdi-credit-card-plus
            </v-icon>     

            <v-icon
              color="yellow"
              large
              @click.stop="select_idPosition(item.id_cb,item.id_tfl,item.id_tfp)"
              v-else
            >
              mdi-credit-card-plus
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
  
  </v-card>
   <!-- V-model deletetransference_locationdialog -->
      <v-layout row justify-center>
         <v-dialog v-model="deletetransference_locationdialog" persistent max-width="80%">
        <v-card class="mx-auto pa-6" >
           <base-material-card
              color="yellow"
              icon="mdi-clipboard-text"
              title="ลบรายการที่ไม่ได้ดำเนินรายการเรียบร้อย"
              class="px-5 py-3 text_google"
              
            ></base-material-card>
          <v-card-text>
            <v-form ref="edituserform" lazy-validation>
              <v-container grid-list-md>
                <v-layout wrap>                     
                </v-layout>
              </v-container>
              <small>* จำเป็น</small>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn large  @click.stop="deletetransference_locationdialog = false" rounded>
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn large color="warning" @click.stop="deletetransference_locationSubmit()" rounded>
                <v-icon dark>mdi-pencil</v-icon>&nbsp;ยืนยันการลบ
              </v-btn>

          </v-card-actions>
        </v-card>
      </v-dialog>
      </v-layout>

       <!-- V-model positiondialog -->
      <v-layout row justify-center>
         <v-dialog v-model="positiondialog" persistent max-width="80%">
        <v-card class="mx-auto pa-6" >
           <base-material-card
              color="yellow"
              icon="mdi-clipboard-text"
              title="เลือกตำแหน่ง"
              class="px-5 py-3 text_google"
              
            ></base-material-card>
          <v-card-text>
            <v-form ref="updatepositionform" lazy-validation>
              <v-container grid-list-md>
                <!--  {{conditions_branchs.id_cb}}
                      {{transference_locations.id_tfl}}
                      {{transference_personnels.id_tfp}} -->
                 <v-row>                   
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
              <v-card
                  elevation="2"
                  class="pa-2"
                >
                <h2> สถานศึกษา : {{ transference_locations.college_name }} </h2>
              <h4> รหัสสาขาวิชาเอก :  {{ conditions_branchs.id_branch }} </h4>
             <h4> สาขาวิชาเอก :  {{ conditions_branchs.name_branch }} </h4>
             <h4> รหัสสถานศึกษา :  {{ transference_locations.college_code }} </h4>
            </v-card>
              
          
             </v-col>
             <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <v-card
                  elevation="2"
                  class="pa-2"
                >
               <h2> รหัสบัตรประชาชน :  {{ transference_personnels.id_card }}</h2>
             <h4> ชื่อ-นามสกุล :  {{ transference_personnels.title_s }}{{ transference_personnels.frist_name }}  {{ transference_personnels.last_name }} </h4>
          <h4> สถานศึกษาปัจจุบัน :  {{ transference_personnels.college_name }} [ {{ transference_personnels.college_code }} ]</h4>
          <h4> เลขที่ตำแหน่งปัจจุบัน :  {{ transference_personnels.id_position }}</h4>
                </v-card>
            </v-col>

            
              
            </v-row>
                <v-layout wrap>  
                      <v-flex md12>
                    <v-autocomplete :items="man_powers" item-text="college_position_case" item-value="id_position" label="เลขที่ตำแหน่ง" v-model="process_transfer.id_position" required :rules="[v => !!v || '']"></v-autocomplete>
                  </v-flex>
                </v-layout>
              </v-container>
              <small>* จำเป็น</small>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn large  @click.stop="positiondialog = false" rounded>
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn large color="warning" @click.stop="updatepositionSubmit()" rounded>
                <v-icon dark>mdi-pencil</v-icon>&nbsp;บันทึก
              </v-btn>

          </v-card-actions>
        </v-card>
      </v-dialog>
      </v-layout>
 </v-container>
 <v-container fluid>
      <v-snackbar
        v-model="snackbar.show"
        multi-line
        vertical
        top
        auto-height
        :timeout="snackbar.timeout"
        :color="snackbar.color"
      >
        <v-icon large>{{ snackbar.icon }}</v-icon>
        <br />
        {{ snackbar.text }}
        <v-btn dark  @click="snackbar.show = false">Close</v-btn>
      </v-snackbar>
    </v-container>
</div>
</template>

<script>
export default {
    name: 'HrvecProcessTransfer',
    data() {
        return {
        loading: true,       
        ApiKey: 'HRvec2021',
        process_transfer: {},
        valid: true, 
        times_s:'',
         row: null,
        year_s:'',        
        man_powers:[], 
          man_powers:[],     
        snackbar: {
        show: false,
        color: "",
        timeout: 5000,
        icon: "",
        text: "",
      },
        headers: [                   
        { text: "สถานศึกษา", align: "left", value: "college_name" },
        { text: "รหัส", align: "left", value: "id_branch" },
        { text: "สาขา", align: "left", value: "name_branch" },        
        { text: "วุฒิการศึกษาที่เปิดรับ", align: "left", value: "condition_edu" },        
         { text: "อัตราว่าง", align: "center", value: "num_position" },        
         { text: "จำนวนรับ", align: "center", value: "quantity_n" },  
        { text: "จำนวนเขียนเข้า", align: "center", value: "personnel_num_s" },        
        { text: "สถานะ", align: "center", value: "status_process" },        
        { text: "ลำดับที่", align: "center", value: "sequence_n" },        
        { text: "วุฒิ", align: "center", value: "personnel_edu" },          
        { text: "ชื่อ-นามสกุล", align: "center", value: "personnel_name" },   
        { text: "คะแนน", align: "center", value: "point_s" },   
        { text: "อายุงาน ณ ปัจจบัน", align: "center", value: "age_app_time" },      
        { text: "เลขที่ตำแหน่ง", align: "center", value: "actions", icon: "mdi-file-document-edit" },       
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
      delete_transference: [],
      conditions_branchs:[],
      transference_locations:[],
      transference_personnels:[],
      edittransference_location:[],
      positiondialog: false,
      deletetransference_locationdialog: false,
        };
        
    },

   async mounted() {
        await this.conditions_transferQueryAll() 
        await this.period_QueryAll() 
        await this.man_powerQuery()
    },

    methods: {
       async searchTimeYear(){
             this.loading = true
        let result = await this.$http.post('process_transfer.php', {
          ApiKey: this.ApiKey,
          time_s: this.times_s,
          year_s: this.year_s
        }).finally(() => this.loading = false)
        this.conditions_transfers = result.data      
        },

async man_powerQuery(college_code){
         let man_power_result     
      man_power_result = await this.$http.post('man_power.php', {
        ApiKey: this.ApiKey,
        college_code: college_code
      })
        this.man_powers = man_power_result.data
      },


        async OnetoOne(){
          this.loading = true
        let result = await this.$http.post('process_transfer.php', {
          ApiKey: this.ApiKey,
          time_s: this.times_s,
          year_s: this.year_s,
          OnetoOne: '1',
        }).finally(() => this.loading = false)
        this.conditions_transfers = result.data      
        },

       async conditions_transferQueryAll() {
          this.loading = true
        let result = await this.$http.post('process_transfer.php', {
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

      async select_idPosition(id_cb,id_tfl,id_tfp){
        
         let result_con = await this.$http.post('conditions_branch.php', {
          ApiKey: this.ApiKey,
          id_cb: id_cb       
        })
        this.conditions_branchs = result_con.data         

        let result_loca = await this.$http.post('transference_location.php', {
          ApiKey: this.ApiKey,
          id_tfl: id_tfl       
        })
        this.transference_locations = result_loca.data       

        let result_tran = await this.$http.post('transference_personnel.php', {
          ApiKey: this.ApiKey,
          id_tfp: id_tfp       
        }).finally(() => this.loading = false)

          this.transference_personnels = result_tran.data
          this.positiondialog = true
          this.man_powerQuery()

      },

       async man_powerQuery(){
         let man_power_result     
      man_power_result = await this.$http.post('man_power.php', {
        ApiKey: this.ApiKey,
        college_code : this.conditions_branchs.college_code
      })
        this.man_powers = man_power_result.data
      },

      async transference_locationDelete() {      
        this.deletetransference_locationdialog = true       
      },
      async deletetransference_locationSubmit() {
        if (this.$refs.edituserform.validate()) {  
          let result = await this.$http.post('transference_location.delete.admin.php')          
        if (result.data.status == true) {
            this.conditions_transfers = result.data
            this.snackbar.icon = 'mdi-font-awesome'
            this.snackbar.color = 'success'
            this.snackbar.text = 'ลบข้อมูลเรียบร้อย'
            this.snackbar.show = true
            this.conditions_transferQueryAll()
          } else {
            this.snackbar.icon = 'mdi-close-network'
            this.snackbar.color = 'red'
            this.snackbar.text = 'ลบข้อมูลผิดพลาด'
            this.snackbar.show = true
          }
          this.deletetransference_locationdialog = false     
        }
      },

      async updatepositionSubmit(){
          if (this.$refs.updatepositionform.validate()){

          }
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