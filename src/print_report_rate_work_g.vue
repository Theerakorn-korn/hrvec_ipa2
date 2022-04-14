<template class="text_google">
  <v-app>
    <v-system-bar
      class="noprint"
      color="grey darken-2"
      dark
      height="40"
      app
      lights-out
    >
      <v-toolbar-items class="ml-5">
        <v-btn
          href="javascript:window.print()"
          class="title elevation-0 mr-2"
          color="grey darken-1"
          x-large
        >
          <v-icon>mdi-printer</v-icon>&nbsp; พิมพ์
        </v-btn>
        <v-btn
          @click.stop="Export2Doc('exportContent', 'word-content')"
          class="title elevation-0 mr-2"
          color="grey darken-1"
          x-large
        >
          <v-icon>mdi-file-word</v-icon>&nbsp; Export to Word
        </v-btn>
        <v-btn
          @click.stop="exportToExcel('exportContent', 'excel-content')"
          class="title elevation-0"
          color="grey darken-1"
          x-large
        >
          <v-icon>mdi-file-excel</v-icon>&nbsp; Export to excel
        </v-btn>
      </v-toolbar-items>
    </v-system-bar>

    <div
      id="exportContent"
      style="mso-page-orientation: landscape; overflow-x: scroll;"
    >
      <div class="page">
        <div align="center">
          <div class="head">
            รายงานอัตรากำลัง ประจำปีการศึกษา {{ year_result }}
          </div>
        </div>
        <table class="table" border="1" width="100%" align="center">
          <thead>
            <tr>
              <td align="center" rowspan="3">รหัส</td>
              <td align="center" rowspan="3">ชื่อสถานศึกษา</td>
              <td align="center" rowspan="3">จังหวัด</td>
              <td align="center" rowspan="3">ปีการศึกษา</td>
              <td align="center" rowspan="3">ประเภท</td>
              <td align="center" colspan="3">นักศึกษา</td>
              <td align="center" colspan="3">ห้องเรียน</td>
              <td align="center" colspan="7">อัตรากำลังมีจริง</td>
              <td align="center" colspan="7">อัตรากำลังตามเกณฑ์</td>
              <td align="center" colspan="5">สรุป (-)ขาด/(+) เกิน</td>
              <td align="center" colspan="22">อัตรากำลังครูผู้สอนมีจริง</td>
              <td align="center" colspan="22">อัตรากำลังครูผู้สอนตามเกณฑ์ฯ</td>
              <td align="center" colspan="22">
                เปรียบเทียบอัตรากำลังครูผู้สอน (-)ขาด (+)เกิน
              </td>
            </tr>
            <tr>
              <td align="center" rowspan="2">ปวช.</td>
              <td align="center" rowspan="2">ปวส.</td>
              <td align="center" rowspan="2">ระยะสั้น</td>
              <td align="center" rowspan="2">ปวช.</td>
              <td align="center" rowspan="2">ปวส.</td>
              <td align="center" rowspan="2">ระยะสั้น</td>
              <td align="center" rowspan="2">ผอ.</td>
              <td align="center" rowspan="2">รอง ผอ.</td>
              <td align="center" colspan="2">ครูผู้สอน</td>
              <td align="center" colspan="2">บุคลากรสนับสนุน</td>
              <td align="center" rowspan="2">รวม</td>
              <td align="center" rowspan="2">ผอ.</td>
              <td align="center" rowspan="2">รอง ผอ.</td>
              <td align="center" colspan="2">ครูผู้สอน</td>
              <td align="center" colspan="2">บุคลากรสนับสนุน</td>
              <td align="center" rowspan="2">รวม</td>
              <td align="center" rowspan="2">ผอ.</td>
              <td align="center" rowspan="2">รอง ผอ.</td>
              <td align="center" rowspan="2">ครูผู้สอน</td>
              <td align="center" rowspan="2">บุคลากรสนับสนุน</td>
              <td align="center" rowspan="2">รวม</td>
              <td align="center" colspan="2">สามัญ</td>
              <td align="center" colspan="2">อุตสาหกรรม</td>
              <td align="center" colspan="2">พาณิชยกรรม</td>
              <td align="center" colspan="2">ศิลปกรรม</td>
              <td align="center" colspan="2">คหกรรม</td>
              <td align="center" colspan="2">เกษตรกรรม</td>
              <td align="center" colspan="2">ประมง</td>
              <td align="center" colspan="2">อุตสาหกรรมการท่องเที่ยว</td>
              <td align="center" colspan="2">อุตสาหกรรมสิ่งทอ</td>
              <td align="center" colspan="2">เทคโนโลยีสารสนเทศ</td>
              <td align="center" colspan="2">หลักสูตรระยะสั้น</td>
              <td align="center" colspan="2">สามัญ</td>
              <td align="center" colspan="2">อุตสาหกรรม</td>
              <td align="center" colspan="2">พาณิชยกรรม</td>
              <td align="center" colspan="2">ศิลปกรรม</td>
              <td align="center" colspan="2">คหกรรม</td>
              <td align="center" colspan="2">เกษตรกรรม</td>
              <td align="center" colspan="2">ประมง</td>
              <td align="center" colspan="2">อุตสาหกรรมการท่องเที่ยว</td>
              <td align="center" colspan="2">อุตสาหกรรมสิ่งทอ</td>
              <td align="center" colspan="2">เทคโนโลยีสารสนเทศ</td>
              <td align="center" colspan="2">หลักสูตรระยะสั้น</td>
              <td align="center" colspan="2">สามัญ</td>
              <td align="center" colspan="2">อุตสาหกรรม</td>
              <td align="center" colspan="2">พาณิชยกรรม</td>
              <td align="center" colspan="2">ศิลปกรรม</td>
              <td align="center" colspan="2">คหกรรม</td>
              <td align="center" colspan="2">เกษตรกรรม</td>
              <td align="center" colspan="2">ประมง</td>
              <td align="center" colspan="2">อุตสาหกรรมการท่องเที่ยว</td>
              <td align="center" colspan="2">อุตสาหกรรมสิ่งทอ</td>
              <td align="center" colspan="2">เทคโนโลยีสารสนเทศ</td>
              <td align="center" colspan="2">หลักสูตรระยะสั้น</td>
            </tr>
            <tr>
              <td align="center">ข้าราชการ</td>
              <td align="center">พนร./อัตราจ้าง</td>
              <td align="center">38 ค.(2)</td>
              <td align="center">พนร./อัตราจ้าง</td>
              <td align="center">ข้าราชการ</td>
              <td align="center">พนร./อัตราจ้าง</td>
              <td align="center">38 ค.(2)</td>
              <td align="center">พนร./อัตราจ้าง</td>
              <td align="center">ขรก.</td>
              <td align="center">จ้าง</td>
              <td align="center">ขรก.</td>
              <td align="center">จ้าง</td>
              <td align="center">ขรก.</td>
              <td align="center">จ้าง</td>
              <td align="center">ขรก.</td>
              <td align="center">จ้าง</td>
              <td align="center">ขรก.</td>
              <td align="center">จ้าง</td>
              <td align="center">ขรก.</td>
              <td align="center">จ้าง</td>
              <td align="center">ขรก.</td>
              <td align="center">จ้าง</td>
              <td align="center">ขรก.</td>
              <td align="center">จ้าง</td>
              <td align="center">ขรก.</td>
              <td align="center">จ้าง</td>
              <td align="center">ขรก.</td>
              <td align="center">จ้าง</td>
              <td align="center">ขรก.</td>
              <td align="center">จ้าง</td>
              <td align="center">ขรก.</td>
              <td align="center">จ้าง</td>
              <td align="center">ขรก.</td>
              <td align="center">จ้าง</td>
              <td align="center">ขรก.</td>
              <td align="center">จ้าง</td>
              <td align="center">ขรก.</td>
              <td align="center">จ้าง</td>
              <td align="center">ขรก.</td>
              <td align="center">จ้าง</td>
              <td align="center">ขรก.</td>
              <td align="center">จ้าง</td>
              <td align="center">ขรก.</td>
              <td align="center">จ้าง</td>
              <td align="center">ขรก.</td>
              <td align="center">จ้าง</td>
              <td align="center">ขรก.</td>
              <td align="center">จ้าง</td>
              <td align="center">ขรก.</td>
              <td align="center">จ้าง</td>
              <td align="center">ขรก.</td>
              <td align="center">จ้าง</td>
              <td align="center">ขรก.</td>
              <td align="center">จ้าง</td>
              <td align="center">ขรก.</td>
              <td align="center">จ้าง</td>
              <td align="center">ขรก.</td>
              <td align="center">จ้าง</td>
              <td align="center">ขรก.</td>
              <td align="center">จ้าง</td>
              <td align="center">ขรก.</td>
              <td align="center">จ้าง</td>
              <td align="center">ขรก.</td>
              <td align="center">จ้าง</td>
              <td align="center">ขรก.</td>
              <td align="center">จ้าง</td>
              <td align="center">ขรก.</td>
              <td align="center">จ้าง</td>
              <td align="center">ขรก.</td>
              <td align="center">จ้าง</td>
              <td align="center">ขรก.</td>
              <td align="center">จ้าง</td>
              <td align="center">ขรก.</td>
              <td align="center">จ้าง</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in process_transfers" :key="item.rate_work_g_id">
              <td align="center">{{ index + 1 }}</td>
              <td class="pa-1" align="left">{{ item.college_name }}</td>
              <td class="pa-1" align="left">{{ item.province_name }}</td>              
              <td class="pa-1" align="center">{{ item.rate_work_g_year }}</td> 
              <td class="pa-1" align="center">{{ item.college_id_code_type_manpower }}:{{ item.type_college}}</td>               
              <td class="pa-1" align="center">{{ item.std_vc }}</td> 
              <td class="pa-1" align="center">{{ item.std_hvc }}</td> 
              <td class="pa-1" align="center">{{ item.std_sc }}</td> 
              <td class="pa-1" align="center">{{ item.room_std_vc }}</td> 
              <td class="pa-1" align="center">{{ item.room_std_hvc }}</td> 
              <td class="pa-1" align="center">{{ item.room_std_sc }}</td>                  
              <td class="pa-1" align="center">{{ item.rate_work_g_dr }}</td>                  
              <td class="pa-1" align="center">{{ item.rate_work_g_sedr }}</td>                  
              <td class="pa-1" align="center">{{ item.rate_teach_official_all }}</td>                  
              <td class="pa-1" align="center">{{ item.rate_teach_civil_all }}</td>                  
              <td class="pa-1" align="center">{{ item.rate_work_g_sup_ta }}</td>                  
              <td class="pa-1" align="center">{{ item.rate_work_g_sup_tb }}</td>                  
              <td class="pa-1" align="center">{{ item.rate_man_power_all }}</td>                  
              <td class="pa-1" align="center">{{ item.rate_criterion_dr }}</td>                  
              <td class="pa-1" align="center">{{ item.rate_criterion_sedr }}</td>                  
              <td class="pa-1" align="center">{{ item.rate_criterion_teach_all }}</td>                  
              <td class="pa-1" align="center">{{ item.rate_criterion_teach_alls }}</td>                  
              <td class="pa-1" align="center">{{ item.rate_work_g_sup_ta_official }}</td>                  
              <td class="pa-1" align="center">{{ item.rate_work_g_sup_tb_civil }}</td>                  
              <td class="pa-1" align="center">{{ item.rate_criterion_all }}</td>                  
              <td class="pa-1" align="center">{{ item.rate_criterion_incomplete_dr }}</td>                  
              <td class="pa-1" align="center">{{ item.rate_criterion_incomplete_sedr }}</td>                  
              <td class="pa-1" align="center">{{ item.rate_criterion_incomplete_teach_all }}</td>                  
              <td class="pa-1" align="center">{{ item.rate_work_g_sup_incomplete }}</td>                  
              <td class="pa-1" align="center">{{ item.rate_criterion_incomplete_all }}</td>                  
              <td class="pa-1" align="center">{{ item.rate_work_g_gs_ta }}</td>                  
              <td class="pa-1" align="center">{{ item.rate_work_g_gs_tb }}</td>                  
              <td class="pa-1" align="center">{{ item.rate_work_g_is_ta }}</td>                  
              <td class="pa-1" align="center">{{ item.rate_work_g_is_tb }}</td>                  
              <td class="pa-1" align="center">{{ item.rate_work_g_cm_ta }}</td>                  
              <td class="pa-1" align="center">{{ item.rate_work_g_cm_tb }}</td>                  
              <td class="pa-1" align="center">{{ item.rate_work_g_art_ta }}</td>                  
              <td class="pa-1" align="center">{{ item.rate_work_g_art_tb }}</td>                  
              <td class="pa-1" align="center">{{ item.rate_work_g_em_ta }}</td>                  
              <td class="pa-1" align="center">{{ item.rate_work_g_em_tb }}</td>                  
              <td class="pa-1" align="center">{{ item.rate_work_g_ag_ta }}</td>                  
              <td class="pa-1" align="center">{{ item.rate_work_g_ag_tb }}</td>                  
              <td class="pa-1" align="center">{{ item.rate_work_g_fish_ta }}</td>                  
              <td class="pa-1" align="center">{{ item.rate_work_g_fish_tb }}</td>                  
              <td class="pa-1" align="center">{{ item.rate_work_g_tour_ta }}</td>                  
              <td class="pa-1" align="center">{{ item.rate_work_g_tour_tb }}</td>                  
              <td class="pa-1" align="center">{{ item.rate_work_g_textile_ta }}</td>                  
              <td class="pa-1" align="center">{{ item.rate_work_g_textile_tb }}</td>                  
              <td class="pa-1" align="center">{{ item.rate_work_g_insy_ta }}</td>                  
              <td class="pa-1" align="center">{{ item.rate_work_g_insy_tb }}</td>                  
              <td class="pa-1" align="center">{{ item.rate_work_g_sc_ta }}</td>                  
              <td class="pa-1" align="center">{{ item.rate_work_g_sc_tb }}</td>                  
              <td class="pa-1" align="center">{{ Math.round(item.rate_work_g_gs_ta_official) }}</td>                  
              <td class="pa-1" align="center">{{ Math.round(item.rate_work_g_gs_tb_civil) }}</td>                  
              <td class="pa-1" align="center">{{ Math.round(item.rate_work_g_is_ta_official) }}</td>                  
              <td class="pa-1" align="center">{{ Math.round(item.rate_work_g_is_tb_civil) }}</td>                  
              <td class="pa-1" align="center">{{ Math.round(item.rate_work_g_cm_ta_official) }}</td>                  
              <td class="pa-1" align="center">{{ Math.round(item.rate_work_g_cm_tb_civil) }}</td>    
              <td class="pa-1" align="center">{{ Math.round(item.rate_work_g_art_ta_official) }}</td>                  
              <td class="pa-1" align="center">{{ Math.round(item.rate_work_g_art_tb_civil) }}</td> 
              <td class="pa-1" align="center">{{ Math.round(item.rate_work_g_em_ta_official) }}</td>                  
              <td class="pa-1" align="center">{{ Math.round(item.rate_work_g_em_tb_civil) }}</td> 
              <td class="pa-1" align="center">{{ Math.round(item.rate_work_g_ag_ta_official) }}</td>                  
              <td class="pa-1" align="center">{{ Math.round(item.rate_work_g_ag_tb_civil) }}</td> 
              <td class="pa-1" align="center">{{ Math.round(item.rate_work_g_fish_ta_official) }}</td>                  
              <td class="pa-1" align="center">{{ Math.round(item.rate_work_g_fish_tb_civil) }}</td> 
              <td class="pa-1" align="center">{{ Math.round(item.rate_work_g_tour_ta_official) }}</td>                  
              <td class="pa-1" align="center">{{ Math.round(item.rate_work_g_tour_tb_civil) }}</td> 
              <td class="pa-1" align="center">{{ Math.round(item.rate_work_g_textile_ta_official) }}</td>                  
              <td class="pa-1" align="center">{{ Math.round(item.rate_work_g_textile_tb_civil) }}</td> 
              <td class="pa-1" align="center">{{ Math.round(item.rate_work_g_insy_ta_official) }}</td>                  
              <td class="pa-1" align="center">{{ Math.round(item.rate_work_g_insy_tb_civil) }}</td> 
              <td class="pa-1" align="center">{{ Math.round(item.rate_work_g_sc_ta_official) }}</td>                  
              <td class="pa-1" align="center">{{ Math.round(item.rate_work_g_sc_tb_civil) }}</td> 
              <td class="pa-1" align="center">{{ Math.round(item.rate_work_g_gs_ta - Math.round(item.rate_work_g_gs_ta_official)) }}</td> 
              <td class="pa-1" align="center">{{ Math.round(item.rate_work_g_gs_tb - Math.round(item.rate_work_g_gs_tb_civil)) }}</td> 
              <td class="pa-1" align="center">{{ Math.round(item.rate_work_g_is_ta - Math.round(item.rate_work_g_is_ta_official)) }}</td> 
              <td class="pa-1" align="center">{{ Math.round(item.rate_work_g_is_tb - Math.round(item.rate_work_g_is_tb_civil)) }}</td> 
              <td class="pa-1" align="center">{{ Math.round(item.rate_work_g_cm_ta - Math.round(item.rate_work_g_cm_ta_official)) }}</td> 
              <td class="pa-1" align="center">{{ Math.round(item.rate_work_g_cm_tb - Math.round(item.rate_work_g_cm_tb_civil)) }}</td> 
              <td class="pa-1" align="center">{{ Math.round(item.rate_work_g_art_ta - Math.round(item.rate_work_g_art_ta_official)) }}</td> 
              <td class="pa-1" align="center">{{ Math.round(item.rate_work_g_art_tb -  Math.round(item.rate_work_g_art_tb_civil)) }}</td> 
              <td class="pa-1" align="center">{{ Math.round(item.rate_work_g_em_ta - Math.round(item.rate_work_g_em_ta_official)) }}</td> 
              <td class="pa-1" align="center">{{ Math.round(item.rate_work_g_em_tb - Math.round(item.rate_work_g_em_tb_civil)) }}</td> 
              <td class="pa-1" align="center">{{ Math.round(item.rate_work_g_ag_ta - Math.round(item.rate_work_g_ag_ta_official)) }}</td> 
              <td class="pa-1" align="center">{{ Math.round(item.rate_work_g_ag_tb - Math.round(item.rate_work_g_ag_tb_civil)) }}</td> 
              <td class="pa-1" align="center">{{ Math.round(item.rate_work_g_fish_ta - Math.round(item.rate_work_g_fish_ta_official)) }}</td> 
              <td class="pa-1" align="center">{{ Math.round(item.rate_work_g_fish_tb - Math.round(item.rate_work_g_fish_tb_civil)) }}</td> 
              <td class="pa-1" align="center">{{ Math.round(item.rate_work_g_tour_ta - Math.round(item.rate_work_g_tour_ta_official)) }}</td> 
              <td class="pa-1" align="center">{{ Math.round(item.rate_work_g_tour_tb - Math.round(item.rate_work_g_tour_tb_civil)) }}</td> 
              <td class="pa-1" align="center">{{ Math.round(item.rate_work_g_textile_ta - Math.round(item.rate_work_g_textile_ta_official)) }}</td> 
              <td class="pa-1" align="center">{{ Math.round(item.rate_work_g_textile_tb - Math.round(item.rate_work_g_textile_tb_civil)) }}</td> 
              <td class="pa-1" align="center">{{ Math.round(item.rate_work_g_insy_ta - Math.round(item.rate_work_g_insy_ta_official)) }}</td> 
              <td class="pa-1" align="center">{{ Math.round(item.rate_work_g_insy_tb - Math.round(item.rate_work_g_insy_tb_civil)) }}</td> 
              <td class="pa-1" align="center">{{ Math.round(item.rate_work_g_sc_ta - Math.round(item.rate_work_g_sc_ta_official)) }}</td> 
              <td class="pa-1" align="center">{{ Math.round(item.rate_work_g_sc_tb - Math.round(item.rate_work_g_sc_tb_civil)) }}</td> 
                                 
            
            </tr>        
          </tbody>
        </table>
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    ApiKey: "HRvec2021",
    process_transfers: [],
    valid: true
  }),

  async mounted() {
     await this.searchTimeYear();
  },

  methods: {
    async searchTimeYear() {
      this.loading = true;
      let result = await this.$http
        .post("rate_work_g.php", {
          ApiKey: this.ApiKey,         
          year_s: this.year_result        
        })
        .finally(() => (this.loading = false));
      this.process_transfers = result.data;
      console.log(result.data)
    },

    Export2Doc(element, filename) {
      var preHtml =
        "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
      var postHtml = "</body></html>";
      var html =
        preHtml + document.getElementById(element).innerHTML + postHtml;

      var blob = new Blob(["\ufeff", html], {
        type: "application/msword"
      });

      // Specify link url
      var url =
        "data:application/vnd.ms-word;charset=utf-8," +
        encodeURIComponent(html);

      // Specify file name
      filename = filename ? filename + ".doc" : "document.doc";

      // Create download link element
      var downloadLink = document.createElement("a");

      document.body.appendChild(downloadLink);

      if (navigator.msSaveOrOpenBlob) {
        navigator.msSaveOrOpenBlob(blob, filename);
      } else {
        // Create a link to the file
        downloadLink.href = url;

        // Setting the file name
        downloadLink.download = filename;

        //triggering the function
        downloadLink.click();
      }
      document.body.removeChild(downloadLink);
    },

    exportToExcel(element, filename) {
      var preHtml =
        "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Excel</title></head><body>";
      var postHtml = "</body></html>";
      var html =
        preHtml + document.getElementById(element).innerHTML + postHtml;

      var blob = new Blob(["\ufeff", html], {
        type: "application/msexcel"
      });

      // Specify link url
      var url =
        "data:application/vnd.ms-excel;charset=utf-8," +
        encodeURIComponent(html);

      // Specify file name
      filename = filename ? filename + ".xls" : "document.xls";

      // Create download link element
      var downloadLink = document.createElement("a");

      document.body.appendChild(downloadLink);

      if (navigator.msSaveOrOpenBlob) {
        navigator.msSaveOrOpenBlob(blob, filename);
      } else {
        // Create a link to the file
        downloadLink.href = url;

        // Setting the file name
        downloadLink.download = filename;

        //triggering the function
        downloadLink.click();
      }
      document.body.removeChild(downloadLink);
    }
  },
  props: {
    source: String
  },

  computed: {
    year_result() {
      let result = window.location.href;
      let split_s = result.split("/");
      return split_s[6];
    }
  }
};
</script>
<style>
@import url(
  https://fonts.googleapis.com/css?family=Prompt:400,300|Roboto:400,300&subset=latin,thai
);

body {
  font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
  font-size: 16px;
  font-weight: 250;
}
.tg {
  border-collapse: collapse;
  border-spacing: 0;
}
.tg td {
  border-color: black;
  border-style: solid;
  border-width: 1px;
  font-family: Arial, sans-serif;
  font-size: 14px;
  overflow: hidden;
  padding: 10px 5px;
  word-break: normal;
}
.tg th {
  border-color: black;
  border-style: solid;
  border-width: 1px;
  font-family: Arial, sans-serif;
  font-size: 14px;
  font-weight: normal;
  overflow: hidden;
  padding: 10px 5px;
  word-break: normal;
}
.tg .tg-0pky {
  border-color: inherit;
  text-align: left;
  vertical-align: top;
}
.tg .tg-0lax {
  text-align: left;
  vertical-align: top;
}
.textAlignVer {
  display: block;
  filter: flipv fliph;
  -webkit-transform: rotate(-90deg);
  -moz-transform: rotate(-90deg);
  transform: rotate(-90deg);
  position: relative;
  width: 20px;
  white-space: nowrap;
  font-size: 14px;
  margin-bottom: 5;
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

.table,
.th,
.td {
  border-bottom: 0.5px solid black;
  border-top: 1px solid black;
  border-left: 1px solid black;
  border-right: 1px solid black;
  border-collapse: collapse;
  line-height: 1;
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
  width: 118.8cm;
  min-height: 29.7cm;
  border: 1px #d3d3d3 solid;
  border-radius: 5px;
  background: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  margin-top: 0cm;
  margin-right: auto;
  margin-bottom: 0cm;
  margin-left: auto;
  padding-top: 0.5cm;
  padding-right: 0.5cm;
  padding-bottom: 0.5cm;
  padding-left: 0.5cm;
}

.head {
  font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
  font-size: 16pt;
  font-weight: bold;
  line-height: 1;
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
  font-size: 16pt;
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
  font-size: 18pt;
  font-weight: bold;
}

.largerCheckbox {
  width: 30px;
  height: 30px;
  color: blue;
}
.td_line {
  border-bottom: 1pt dotted black;
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
    font-size: 18pt;
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
    font-size: 18pt;
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
