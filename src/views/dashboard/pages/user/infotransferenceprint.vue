<template>
     <v-app>
    <v-system-bar class="noprint" color="grey darken-2" dark height="40" app lights-out>
      <v-toolbar-items class="ml-5">
        <v-btn href="javascript:window.print()" class="title elevation-0 mr-2" color="grey darken-1">
          <v-icon>fa-print</v-icon>&nbsp; พิมพ์
        </v-btn>
        <v-btn @click.stop="Export2Doc('exportContent','word-content')" class="title elevation-0" color="grey darken-1">
          <v-icon>fa-file-word</v-icon>&nbsp; Export to Word
        </v-btn>
      </v-toolbar-items>
    </v-system-bar>
   
  </v-app>
 
</template>

<style>
  .textBold20{
    font-size: 20pt;
    font-weight: bold;
  }
  .table-no-border {
    border-width: 0px;
  }

  .table-no-border td, .table-no-border th {
    border-width: 0px;
  }

  .table-g {
    border-width: 0px 1px 0px 1px;
    padding: 0px;
    margin: 0px;
  }

  .table-g td, .table-g th {
    border-width: 0px 1px 0px 1px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    padding: 0px;
    margin: 0px;
  }

  .table-kpi{
    width: 100%;
    border: 1px solid black;
  }

  .table-kpi thead {
    background-color: silver;
    font-weight: bold;
  }

  .table-kpi tbody {
    background-color: white;
  }

  .table-kpi tfoot {
    background-color: whitesmoke;
  }

  .table-kpi td, .table-kpi th {
    border: 1px solid black;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    padding: 0px;
    margin: 0px;
  }

  .firsthead {
    height: 50px;
    border-radius: 0px 50px 50px 0px;
  }

  .logo {
    padding: 0px;
    margin: 0px;
    text-align: center;
  }

  .logo img {
    padding: 0px;
    margin: 0px;
    text-align: center;
  }

  .thirdhead {
    height: 50px;
    border-radius: 50px 0px 0px 50px;
    text-align: right;
    color: white;
    font-size: 20pt;
    font-weight: bold;
    padding-right: 1cm;
    padding-top: 0.2cm;
  }

  .infotexthead {
    padding: 0.2cm;
    font-weight: bold;
    color: rgb(163, 19, 19);
  }

  .infotextheadnopad {
    font-weight: bold;
    color: rgb(163, 19, 19);
  }

</style>

<script>
  export default {
    
    data: () => ({
     
     
    }),
    async mounted() {
      
    },
    
    
  }

</script>
