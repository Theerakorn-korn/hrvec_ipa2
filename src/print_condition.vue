<template class="text_google">
 <v-app>
    <v-system-bar class="noprint" color="grey darken-2" dark height="40" app lights-out>
      <v-toolbar-items class="ml-5">
        <v-btn href="javascript:window.print()" class="title elevation-0 mr-2" color="grey darken-1" x-large>
          <v-icon>mdi-printer</v-icon>&nbsp; พิมพ์
        </v-btn>
        <v-btn @click.stop="Export2Doc('exportContent','word-content')" class="title elevation-0" color="grey darken-1" x-large>
          <v-icon>mdi-file-word</v-icon>&nbsp; Export to Word
        </v-btn>
      </v-toolbar-items>
    </v-system-bar>
     <div id="exportContent" style="mso-page-orientation: landscape;">
    <div class="page">
      <div align="center">
          <div class="head"><v-img max-height="300" max-width="250" src="https://github.com/Theerakorn-korn/hrvec/blob/master/src/assets/krud.jpg"></v-img></div>
       <div class="head"> แบบรายงานข้อมูลเงือนไขสาขาวิชาเอก ประกอบการพิจารณาย้ายข้าราชการ ประจำปี  ครั้งที่  </div>
       <div class="head"> ส่งมาพร้อมกับหนังสือ วิทยาลัย.... ที่ ........ ลงวันที่ ...........</div>
      <hr>
      </div>
 
           <br>
           <table border="0" width="100%" align="center">
        <tr>            
             <td width="60%"></td>             
             <td width="40%"><div class="regular16"><span class="regular16">ลงชื่อ.........................................................</span></div></td>             
         </tr> 
          <tr>            
             <td width="60%"></td>             
             <td width="40%" align="center"><div class="regular16"><span class="regular16">(..........................................................)</span></div></td>             
         </tr> 
          <tr>            
             <td width="60%"></td>             
             <td width="40%"><div class="regular16"><span class="regular16">ตำแหน่ง.................................................</span></div></td>             
         </tr> 
          <tr>            
             <td width="60%"></td>             
             <td width="40%"><div class="regular16"><span class="regular16">วันที่.............../...................../...................</span></div></td>             
         </tr>            
          </table>
    </div>
  </div>
  </v-app>
</template>

<script>
  export default {
    name: 'App',
     data: () => ({
           ApiKey: 'HRvec2021', 
           personnel_temporarys: [],
           transference_personnels: [],
           personnel_educations: [],
           transference_locations: [],
           personnel_temporarys_switch: [],
           province_sh_s: [],
           province_sh_fm: [],
           province_sh_m: [],
                       valid: true, 
              loginuser: JSON.parse(sessionStorage.getItem('user')) || 0,              
      user: {},    
     
    }),

    async mounted() {   
    await this.personnel_temporarysQueryAll()
    /* await this.transference_personnelsQueryAll()
    await this.province_sh_spQueryAll()
    await this.province_sh_fmQueryAll() 
    await this.province_sh_mQueryAll()       
    await this.personnel_educationsQueryAll()
    await this.transference_locationsQueryAll()
    await this.personnel_temporarys_switchQueryAll() */
    
    },


    computed:{    

    url_result(){
    let result =window.location.href;    
    let split_s = result.split('/')
    return split_s[6]
    },

    id_card_s(){
        let result = this.url_result.slice(5);
return result
    },

    day_tims(){
        let result = this.transference_personnels.time_s;
        if(result==1){
          result="1-15 กุมภาพันธ์"
        }
        else if(result==2){
          result="1-15 สิงหาคม"
        }
        return result
    },
     marital_status() {
            let marital_status = this.personnel_temporarys.marital_status
            let marital_result
            if(marital_status =='single'){
                marital_result = 'โสด'
            }
            else if(marital_status =='married'){
                marital_result = 'สมรส'
            }
             else if(marital_status =='widow'){
                marital_result = 'หม้าย'
            }
            else if(marital_status =='divorce'){
                marital_result = 'หย่า'
            }
            else if(marital_status =='separate'){
                marital_result = 'แยกกันอยู่'
            }
             return marital_result
          },

      date_today_cal() {
            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = today.getFullYear();

            today = yyyy + '-' + mm + '-' + dd;
            return today
          },

           date_tims_ch(){
            let monthNames = [
        "","มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน",
        "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม",
        "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ];
            let day = this.transference_personnels.date_time.slice(0,2);
            let month = monthNames[parseInt(this.transference_personnels.date_time.slice(3,5))];
            let year = this.transference_personnels.date_time.slice(6);
            let years = parseInt(year);
            let today = day + ' ' + month + ' ' + years;
            return today
          },

          date_appoin_ch(){
            let monthNames = [
        "","มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน",
        "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม",
        "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ];
            let day = this.personnel_temporarys.date_appoin.slice(8);
            let month = monthNames[parseInt(this.personnel_temporarys.date_appoin.slice(5,7))];
            let year = this.personnel_temporarys.date_appoin.slice(0,4);
            let years = parseInt(year) + 543;
            let today = day + ' ' + month + ' ' + years;
            return today
          },

           date_appoin_ch_app(){
            let monthNames = [
        "","มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน",
        "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม",
        "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ];
            let day = parseInt(this.personnel_temporarys.date_app_now.slice(8));
            let month = monthNames[parseInt(this.personnel_temporarys.date_app_now.slice(5,7))];
            let year = this.personnel_temporarys.date_app_now.slice(0,4);
            let years = parseInt(year) + 543;
            let today = day + ' ' + month + ' ' + years;
            return today
          },


          get_Appoint_Age() {
                let today = new Date(this.date_today_cal);
                let DOB = new Date(this.personnel_temporarys.date_app_now);
                let totalMonths = (today.getFullYear() - DOB.getFullYear()) * 12 + today.getMonth() - DOB.getMonth();
                totalMonths += today.getDay() < DOB.getDay() ? -1 : 0;
                let years = today.getFullYear() - DOB.getFullYear();
                if (DOB.getMonth() > today.getMonth())
                    years = years - 1;
                else if (DOB.getMonth() === today.getMonth())
                    if (DOB.getDate() > today.getDate())
                        years = years - 1;

                let days;
                let months;

                if (DOB.getDate() > today.getDate()) {
                    months = (totalMonths % 12);
                    if (months == 0)
                        months = 11;
                    let x = today.getMonth();
                    switch (x) {
                        case 1:
                        case 3:
                        case 5:
                        case 7:
                        case 8:
                        case 10:
                        case 12: {
                            let a = DOB.getDate() - today.getDate();
                            days = 31 - a;
                            break;
                        }
                        default: {
                            let a = DOB.getDate() - today.getDate();
                            days = 30 - a;
                            break;
                        }
                    }

                }
                else {
                    days = today.getDate() - DOB.getDate();
                    if (DOB.getMonth() === today.getMonth())
                        months = (totalMonths % 12);
                    else
                        months = (totalMonths % 12);
                }
                let age = years + ' ปี ' + months + ' เดือน ' + days + ' วัน';
              return age;
             },

    get_gov_Age() {
                let today = new Date(this.date_today_cal);
                let DOB = new Date(this.personnel_temporarys.date_appoin);
                let totalMonths = (today.getFullYear() - DOB.getFullYear()) * 12 + today.getMonth() - DOB.getMonth();
                totalMonths += today.getDay() < DOB.getDay() ? -1 : 0;
                let years = today.getFullYear() - DOB.getFullYear();
                if (DOB.getMonth() > today.getMonth())
                    years = years - 1;
                else if (DOB.getMonth() === today.getMonth())
                    if (DOB.getDate() > today.getDate())
                        years = years - 1;

                let days;
                let months;

                if (DOB.getDate() > today.getDate()) {
                    months = (totalMonths % 12);
                    if (months == 0)
                        months = 11;
                    let x = today.getMonth();
                    switch (x) {
                        case 1:
                        case 3:
                        case 5:
                        case 7:
                        case 8:
                        case 10:
                        case 12: {
                            let a = DOB.getDate() - today.getDate();
                            days = 31 - a;
                            break;
                        }
                        default: {
                            let a = DOB.getDate() - today.getDate();
                            days = 30 - a;
                            break;
                        }
                    }

                }
                else {
                    days = today.getDate() - DOB.getDate();
                    if (DOB.getMonth() === today.getMonth())
                        months = (totalMonths % 12);
                    else
                        months = (totalMonths % 12);
                }
                let age = years + ' ปี ' + months + ' เดือน ' + days + ' วัน';
          return age;
          },

    },


    methods: {     

  async personnel_temporarysQueryAll() {     
         this.loading = true        
        let result = await this.$http.post('personnel_temporary.php', {
          ApiKey: this.ApiKey,
            id_card: this.id_card_s 
        }).finally(() => this.loading = false)
        this.personnel_temporarys = result.data       
      }, 

 async personnel_temporarys_switchQueryAll() {     
         this.loading = true        
        let result = await this.$http.post('personnel_temporary.php', {
          ApiKey: this.ApiKey,
            id_card: this.transference_personnels.switch_position  
        }).finally(() => this.loading = false)
        this.personnel_temporarys_switch = result.data     
      },      

 async transference_personnelsQueryAll() {     
         this.loading = true        
        let result = await this.$http.post('transference_personnel.php', {
          ApiKey: this.ApiKey,
          id_ref: this.url_result 
        }).finally(() => this.loading = false)
        this.transference_personnels = result.data 
      }, 

  async personnel_educationsQueryAll() {     
         this.loading = true
        let result = await this.$http.post('personnel_education.php', {
          ApiKey: this.ApiKey,
            id_card: this.id_card_s  
        }).finally(() => this.loading = false)
        this.personnel_educations = result.data            
      }, 

       async transference_locationsQueryAll() {     
         this.loading = true
        let result = await this.$http.post('transference_location.php', {
          ApiKey: this.ApiKey,
            id_ref: this.url_result  
        }).finally(() => this.loading = false)
        this.transference_locations = result.data 
      }, 

        async province_sh_spQueryAll() { 
        let result = await this.$http.post('province_sp.php', {
          province_ID: this.transference_personnels.reason_1_domicile  
        })
        this.province_sh_s = result.data 
      }, 

      async province_sh_mQueryAll() { 
        let result = await this.$http.post('province_sp.php', {
          province_ID: this.transference_personnels.reason_3_domicile  
        })
        this.province_sh_m = result.data 
      }, 

      async province_sh_fmQueryAll() { 
        let result = await this.$http.post('province_sp.php', {
          province_ID: this.transference_personnels.reason_2_domicile  
        })
        this.province_sh_fm = result.data 
      }, 



      Export2Doc(element, filename) {
        var preHtml =
          "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>"
        var postHtml = "</body></html>"
        var html = preHtml + document.getElementById(element).innerHTML + postHtml

        var blob = new Blob(['\ufeff', html], {
          type: 'application/msword'
        })

        // Specify link url
        var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html)

        // Specify file name
        filename = filename ? filename + '.doc' : 'document.doc'

        // Create download link element
        var downloadLink = document.createElement("a")

        document.body.appendChild(downloadLink)

        if (navigator.msSaveOrOpenBlob) {
          navigator.msSaveOrOpenBlob(blob, filename)
        } else {
          // Create a link to the file
          downloadLink.href = url

          // Setting the file name
          downloadLink.download = filename

          //triggering the function
          downloadLink.click()
        }

        document.body.removeChild(downloadLink)
      },
       async personnel_educationsQueryAll() {     
         this.loading = true
          let userSession = JSON.parse(sessionStorage.getItem('user')) || 0   
        let result = await this.$http.post('personnel_education.php', {
          ApiKey: this.ApiKey,
            id_card: userSession.id_card  

        }).finally(() => this.loading = false)
        this.personnel_educations = result.data            
      }, 
    },
    props: {
      source: String
    },
  
  }
</script>
<style>
  @import url(https://fonts.googleapis.com/css?family=Prompt:400,300|Roboto:400,300&subset=latin,thai);

  body {
    font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
    font-size: 16px;
    font-weight: 250;
  }

  u {    
    border-bottom: 1px dotted #000;
    text-decoration: none;
}

  * {
    font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
  }

  /* table {
    border-top-width: 1px;
    border-right-width: 1px;
    border-bottom-width: 1px;
    border-left-width: 1px;
    border-top-style: solid;
    border-right-style: solid;
    border-bottom-style: solid;
    border-left-style: solid;
  } */

  tfoot tr:hover {
    background-color: initial;
  }

  tbody tr:hover {
    background-color: inherit;
  }

  td,
  th {
    font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
    padding: 1px;
    height: initial;
   
  }

  tfoot td {
    font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
    font-weight: bold;
   
  }

  #verticaltext {
    writing-mode: tb-rl;
    filter: flipv fliph;
    -webkit-transform: rotate(-90deg);
    white-space: nowrap;
    display: block;
    overflow: hidden;
    padding: 0;
  }

  .page {
    font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
    font-size: 16pt;
    width: 21cm;
    min-height: 29.7cm;
    border: 1px #D3D3D3 solid;
    border-radius: 5px;
    background: white;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    margin-top: 0cm;
    margin-right: auto;
    margin-bottom: 0cm;
    margin-left: auto;
    padding-top: 0.5cm;
    padding-right: 1cm;
    padding-bottom: 1cm;
    padding-left: 2cm;
  }

  .head {
    font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
    font-size: 20pt;
    font-weight: bold;
  }

  .regular12 {
    font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
    font-size: 14pt;
  }

  .regular16 {
    font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
    font-size: 18pt;
  }

  .bold16 {
    font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
    font-size: 18pt;
    font-weight: bold;
  }

  .blod12 {
    font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
    font-size: 14pt;
    font-weight: bold;
  }

  .blackRegula10 {
    font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
    font-size: 12pt;
  }

  .blackBold18 {
    font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
    font-size: 20pt;
    font-weight: bold;
  }

   .largerCheckbox {
            width: 30px;
            height: 30px;
            color: blue;
           
        }
 .td_line{
    border-bottom:1pt dotted black;
  }
  /*.subpage {
    height: 247mm;
  }*/

  .BlackBold10 {
    font-weight: bold;
  }

  #content {
    display: table;
  }

  #pageFooter {
    display: table-footer-group;
  }

  #pageFooter:after {
    counter-increment: page;
    content: counter(page);
  }

  

  @media print {
    .page {
    font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
    font-size: 16pt;
    border: initial;
      border-radius: initial;
      /* width: initial; */
      min-height: initial;
      box-shadow: initial;
      background: initial;
      padding: initial;
      page-break-after: always;
  }

  .head {
    font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
    font-size: 22pt;
    font-weight: bold;
  }

  .regular12 {
    font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
    font-size: 16pt;
  }

  .regular16 {
    font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
    font-size: 20pt;
  }

  .bold16 {
    font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
    font-size: 20pt;
    font-weight: bold;
  }

  .blod12 {
    font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
    font-size: 16pt;
    font-weight: bold;
  }

  .blackRegula10 {
    font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
    font-size: 14pt;
  }

  .blackBold18 {
    font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
    font-size: 22pt;
    font-weight: bold;
  }
 

    /* .head {
      font-size: 18px;
      font-weight: bold;
    }
    .regular12 {
      font-size: 12px;
    }
    .blod12 {
      font-size: 12px;
      font-weight: bold;
    }
    .blackRegula8 {
      font-size: 8px;
    } */
    .noprint {
      display: none;
    }
   
  }

</style>
