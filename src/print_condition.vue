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
          <v-img max-height="30mm" max-width="25mm" src="~../src/assets/krud.jpg"></v-img>
       <div class="head"> แบบรายงานข้อมูลเงือนไขสาขาวิชาเอก ประกอบการพิจารณาย้ายข้าราชการ ประจำปี  ครั้งที่  </div>
       <div class="head"> ส่งมาพร้อมกับหนังสือ {{ colleges_user.college_name }} ที่ ................................ ลงวันที่ ..............................</div>
     <div>___________________________</div>
      </div>
    <table border="0" width="100%" align="center">
        <tr>
            <td width="10%" class="regular16">เรียน</td>
            <td width="90%" class="regular16">เลขาธิการคณะกรรมการการอาชีวศึกษา</td>
        </tr>
    </table>
     <table border="0" width="100%" align="center">
        <tr>
            <td width="20%" class="regular16"></td>
            <td width="80%" class="regular16">ตามที่สำนักงานคณะกรรมการการอาชีวศึกษา ขอทราบข้อมูลเงือนไขสาขาวิชาเอก</td>
        </tr>
    </table>
      <table border="0" width="100%" align="center">
        <tr>
            <td width="100%" class="regular16">เพื่อใช้ประกอบการพิจารณาย้ายข้าราชการครู ประจำปี.. ครั้งที่..นั้น วิทยาลัย.. ได้จัดประชุมคณะกรรมการบริหารสถานศึกษาแล้ว มีมติให้จัดความต้องการครูในสาขาวิชา เรียงลำดับดังต่อไปนี้  </td>
        </tr>
    </table>
     <table width="100%" align="center" class="table">
        <tr>
            <th width="7%" class="regular16 th" align="center">อันดับ</th>
            <th width="10%" class="regular16 th" align="center">คุณวุฒิ</th>
            <th width="25%" class="regular16 th" align="center">สาขาวิชา</th>
            <th width="15%" class="regular16 th" align="center">จำนวนข้าราชการครู</th>
            <th width="15%" class="regular16 th" align="center">จำนวนพนักงานราชการ</th>
            <th width="15%" class="regular16 th" align="center">จำนวนครูจ้างสอน </th>
            <th width="15%" class="regular16 th" align="center">จำนวนนักเรียน</th>
        </tr>
     </table>
         <table width="100%" align="center" class="table"
          v-for="item in conditions_branchs"
                            :key="item.id_ref"                           
                            small
         >
          <tr>
            <td width="7%" class="regular12 th" align="center"> {{item.sequence_n}} </td>
            <td width="10%" class="regular12 th" align="center"> {{item.educational_level}} </td>
            <td width="25%" class="regular12 th"> {{item.id_branch}} {{item.name_branch}} </td>
            <td width="15%" class="regular12 th" align="center"> {{item.sequence_n}} </td>
            <td width="15%" class="regular12 th" align="center"> {{item.sequence_n}} </td>
            <td width="15%" class="regular12 th" align="center"> {{item.sequence_n}} </td>
            <td width="15%" class="regular12 th" align="center"> {{item.sequence_n}} </td>
        </tr>
    </table>

     <table border="0" width="100%" align="center">
        <tr>            
             <td width="10%"></td>             
             <td width="40%"><div class="regular16"><span class="regular16">ข้อมูล ณ วันที่ </span></div></td>             
         </tr> 
     </table>
           <br>
           <table border="0" width="100%" align="center">
        <tr>            
             <td width="60%"></td>             
             <td width="40%"><div class="regular16">ลงชื่อ.............................................................</div></td>             
         </tr> 
          <tr>            
             <td width="60%"></td>             
             <td width="40%" align="center"><div class="regular16">(..........................................................)</div></td>             
         </tr> 
          <tr>            
             <td width="60%"></td>             
             <td width="40%" align="center"><div class="regular16">ผู้รายงาน</div></td>             
         </tr> 
           </table>
                <br><br>
          <table border="0" width="100%" align="center">        
                  <tr>            
             <td width="60%"></td>             
             <td width="40%"><div class="regular16">ลงชื่อ.............................................................</div></td>             
         </tr> 
          <tr>            
             <td width="60%"></td>             
             <td width="40%" align="center"><div class="regular16">(..........................................................)</div></td>             
         </tr> 
          <tr>            
             <td width="60%"></td>             
             <td width="40%" align="center"><div class="regular16">ผู้อำนวยการ{{ colleges_user.college_name }}</div></td>             
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
           conditions_transfers: [],
           conditions_branchs: [],
           personnel_temporarys_switch: [],
           province_sh_s: [],
           province_sh_fm: [],
           province_sh_m: [],
           colleges_user: [],
                       valid: true, 
              loginuser: JSON.parse(sessionStorage.getItem('user')) || 0,              
      user: {},    
     
    }),

    async mounted() {   
   let result_branch
        result_branch = await this.$http.post('branch.php', {
        ApiKey: this.ApiKey       
      })
      this.branch_s = result_branch.data      
      
    let result_provice
    result_provice = await this.$http.post('province_sh.php', {
      ApiKey: this.ApiKey
    })
    this.provices_sh = result_provice.data


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
   
    
  await this.personnel_temporaryQueryAll()
  await this.conditions_transferQueryAll()   
  await this.conditions_branchQueryAll()
    
    },


    computed:{    

    url_result(){
    let result =window.location.href;    
    let split_s = result.split('/')
    return split_s[6]
    },

    id_ref_url(){
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
   
         month_now() {
             const d = new Date()
              let month  = d.getMonth()+1
              return month 
            }, 
            year_s() {
              const d = new Date();
              let year = d.getFullYear()+543     
              return year
            },
            time_s() {
             let time_m              
             if(this.month_now > 2)
             {time_m = 2}else{
               time_m = 1
             }
              return time_m
           },
           id_ref() {
             let id_ref_cr
             id_ref_cr = this.time_s +''+this.year_s+''+this.colleges_user.user_name
             return id_ref_cr
           },
           
          date_today() {
             let monthNames = [
        "","มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน",
        "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม",
        "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ];
            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = today.getFullYear()+543;

            today = dd + ' ' + monthNames[parseInt(mm)] + ' ' + yyyy;
            return today
          },
    },


    methods: {     
            async personnel_temporaryQueryAll() {
          this.loading = true
        let result = await this.$http.post('admin.php', {
          ApiKey: this.ApiKey,
          user_name: this.id_ref_url  
        })
        this.colleges_user = result.data  
      },

    
   
     async conditions_branchQueryAll() {
          this.loading = true
        let result = await this.$http.post('conditions_branch.php', {
          ApiKey: this.ApiKey,
          id_ref: this.id_ref_url       
        }).finally(() => this.loading = false)
        this.conditions_branchs = result.data        
      },
    
   async conditions_transferQueryAll() {
          this.loading = true
        let result = await this.$http.post('conditions_transfer.php', {
          ApiKey: this.ApiKey,
          id_ref: this.id_ref_url       
        }).finally(() => this.loading = false)
        this.conditions_transfers = result.data    
        console.log(result.data)          
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

  .table, .th, .td {
    border-bottom: 0.5px solid black;
    border-top: 1px solid black;
    border-left: 1px solid black;
    border-right: 1px solid black;
  border-collapse: collapse;
  }

  tfoot tr:hover {
    background-color: initial;
  }

  tbody tr:hover {
    background-color: inherit;
  }

  td,
  th {
    font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;   
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
    padding-left: 1cm;
  }

  .head {
    font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
    font-size: 16pt;
    font-weight: bold;
  }

  .regular12 {
    font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
    font-size: 14pt;
  }

  .regular16 {
    font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
    font-size: 16pt;
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
    font-size: 16pt;
  }

  .bold16 {
    font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
    font-size: 16pt;
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
