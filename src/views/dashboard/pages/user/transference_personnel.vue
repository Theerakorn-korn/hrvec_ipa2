<template>
   <v-container id="upgrade" fluid tag="section" class="text_google">
    <v-row >
      <v-col cols="12" md="12">
        <base-material-card color="primary">
          <template v-slot:heading>
            <h2 class="h1 font-weight-light text_google">
              <v-icon large left>mdi-file-send</v-icon>การย้ายสายการสอน
            </h2>
          </template>         
            <v-card class="pa-2 ma-6">
              <v-card-title>
                <div class="font-weight-light v-size--x-large"><v-icon large left>mdi-account-details</v-icon> ข้อมูลเบื้องต้น รหัสรายการอ้างอิง {{ id_ref }}</div>
              </v-card-title>
              <v-row>
                 <v-col cols="12" sm="6">
                     <v-alert border="left" colored-border color="green darken-1" elevation="2"  type="info">
                   <h2> ชื่อ-นามสกุล : {{ user.title_s }}{{ user.frist_name }} {{ user.last_name }}  </h2>
                   <h3> รหัสบัตรประชาชน : {{ user.id_card }} </h3>
                  <h3> เลขที่ตำแหน่ง : {{ user.id_position }} </h3>
                  <h3> วิทยฐานะ : {{ user.rang_name }}</h3>
                   <h3> สังกัด (สถานศึกษา) : {{ user.college_name }} </h3>
                   <hr>
                   <h3> วันที่เริ่มบรรจุเข้ารับราชการ : {{ date_appoin_ch || '-' }} </h3>                   
                   <h3> ระยะเวลาตั้งแต่บรรจุเข้ารับราชการ : {{ get_gov_Age }} </h3>
                   <h3> สถานะภาพ : {{ marital_status }}</h3>
                  </v-alert>  
                </v-col>         
   <!--  เดือนปัจจุบัน {{ month_now }}
                  เดือนบรรจุ {{ month_app }}
                  ปีปัจจุบัน {{ year_s }}
                  ปีบรรจุ {{ y_app }}  
                  ปีบรรจุ {{ result }}   -->

                <v-col cols="12" sm="6">
                  <v-alert border="left" colored-border color="green darken-1" elevation="2"  type="info">
                   <h2> ครั้งที่ : {{ time_s }} ประจำปี : {{ year_s }}  </h2>
                    <h3> เขียนที่ : {{ user.college_name }}</h3>
                    <h3> วันที่ยื่นคำร้อง : {{ date_today }}  </h3>
                    <hr>
                      <h3> วันที่เริ่มปฏิบัติหน้าที่ในสถานศึกษาปัจจุบัน : {{ date_appoin_ch_app }} </h3>
                      <h2> ปฏิบัติหน้าที่เป็นเวลา : {{ get_Appoint_Age }}  </h2>
                      <v-btn
                      v-if="transference_personnels.id_ref === id_ref"
                      x-large
                      color="info"
                      dark
                      class="ma-2"
                     :href="'#/user/infotransferenceprint/'+id_ref" target="_blank"
                      
                    >
                      <v-icon>mdi-printer</v-icon>
                      <span>พิมพ์แบบแสดงความประสงค์ขอย้าย</span>
                    </v-btn>
                  </v-alert>
                </v-col>              
                                  
                <v-col cols="12" sm="12">  
                     <v-alert border="left" colored-border color="green darken-1" elevation="2"  type="info">
                     <v-card>
                      <v-card-title class="mt-8">
                        <v-avatar size="56">
                          <v-icon large left>mdi-cast-education</v-icon>
                        </v-avatar>
                        <p class="ml-3">ประวัติการศึกษา</p>
                      </v-card-title>

                      <v-card-text>
                        <v-timeline align-top dense>
                          <v-timeline-item
                            v-for="item in personnel_educations"
                            :key="item.id_red"                           
                            small
                          >
                            <div>
                              <div
                                class="font-weight-normal"
                              >{{ item.education_level }} คณะวิชา : {{ item.faculty_name }} สาขาวิชา : {{ item.branch_name }} สำเร็จปีการศึกษา : {{ item.year_finish }}</div>
                            </div>
                          </v-timeline-item>
                        </v-timeline>
                      </v-card-text>
                    </v-card>
                     </v-alert>               
                    
                 
                </v-col>
              </v-row>
            </v-card>
          
<v-alert border="right" colored-border type="error" elevation="2" v-if="user.position_name ==='ครูผู้ช่วย'">
<h1> ท่านขาดคุณสมบัติในการย้าย ท่านอยู่ในระหว่างการเตรียมความพร้อมและพัฒนาอย่างเข้ม ของข้าราชการครูและบุคลากรทางการศึกษา ตำแหน่งครูผู้ช่วย</h1>
</v-alert>
            <v-alert border="right" colored-border type="error" elevation="2" v-if="get_gov_Age_year === 0">
   <h1> ตามนัยหนังสือสำนักงาน ก.ค.ศ. ที่ ศธ 0206.4/1025 ลงวันที่ 11 กรกฎาคม 2556 คุณสมบัติของผู้ขอย้าย จะต้องดำรงตำแหน่งในหน่วยงานการศึกษาปัจจุบันไม่น้อยกว่า 12 เดือน</h1>
         </v-alert>

<v-form ref="addtransference_personnelform" lazy-validation>
  
            <v-card class="pa-2 ma-2" v-if="get_gov_Age_year > 0">
              <v-card-title>
                <div class="font-weight-light v-size--x-large"><v-icon large left>mdi-electron-framework</v-icon> ปัจจุบันปฏิบัติการสอน</div>
              </v-card-title>
              <v-row>
                <v-col cols="12" sm="12">
                  <v-row>
                   <v-alert class="mx-auto justify-center pa-2 ma-2" border="bottom" colored-border type="warning" elevation="2">
                      <v-radio-group row v-model="addtransference_personnel.teaching_status"> 
                        <v-radio value="no_tech" v-on:click="isHidden = true">
                          <template v-slot:label>
                            <div>                            
                              <strong class="warning--text" v-on:click="clear_tech()">ไม่ได้ทำการสอน</strong>
                            </div>
                          </template>
                        </v-radio>
                        <v-radio value="tech" v-on:click="isHidden = !isHidden">
                          <template v-slot:label>
                            <div>                             
                              <strong class="primary--text">ทำการสอน</strong>
                            </div>
                          </template>
                        </v-radio>
                      </v-radio-group>                     
                   </v-alert>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-card class="pa-2 ma-2" v-if="!isHidden" hidden>
                    <v-row>
                      <v-col cols="12" sm="6">
                        <v-text-field
                        v-model="addtransference_personnel.subject_1"
                          :counter="100"
                          outlined
                          label="วิชาที่สอน ที่ 1:"
                          prepend-icon="mdi-notebook"
                          require :rules="[v => !!v || '']"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="addtransference_personnel.subject_2"
                          :counter="100"
                          outlined
                          label="วิชาที่สอน ที่ 2:"
                         prepend-icon="mdi-notebook"
                          require :rules="[v => !!v || '']"                       
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="addtransference_personnel.subject_3"
                          :counter="100"
                          outlined
                          label="วิชาที่สอน ที่ 3:"
                         prepend-icon="mdi-notebook"
                          require :rules="[v => !!v || '']"                         
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="addtransference_personnel.subject_4"
                          :counter="100"
                          outlined
                          label="วิชาที่สอน ที่ 4:"
                          prepend-icon="mdi-notebook"
                          require :rules="[v => !!v || '']"                         
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12">
                        <v-text-field
                          v-model="addtransference_personnel.perform_other_duties"
                          outlined
                          label="หน้าที่อื่นที่ได้รับมอบหมาย :"
                          prepend-icon="mdi-account-network"
                          require :rules="[v => !!v || '']"                          
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>

            <v-card class="pa-2 ma-2" v-if="get_gov_Age_year > 0">
              <v-card-title>
                <div class="font-weight-light v-size--x-large"><v-icon large left>mdi-office-building-marker</v-icon> อยู่ระหว่างช่วยปฏิบัติราชการหรือไม่</div>
              </v-card-title>             
              <v-row>
                <v-col cols="12" sm="12"> 
                   <v-row>
                  <v-alert class="mx-auto justify-center pa-2 ma-2" border="bottom" colored-border type="warning" elevation="2">
                         <v-radio-group row v-model="addtransference_personnel.service_status">                                            
                        <v-radio value="not_service" v-on:click="isHidden_service_gov = !isHidden_service_gov">
                          <template v-slot:label>
                            <div>                            
                              <strong class="primary--text" v-on:click="clear_gov_service()">ไม่อยู่</strong>
                            </div>
                          </template>
                        </v-radio>
                        <v-radio value="gov_service" v-on:click="isHidden_service_gov = true">
                          <template v-slot:label>
                            <div>                             
                              <strong class="warning--text">ช่วยปฏิบัติราชการ</strong>
                            </div>
                          </template>
                        </v-radio>
                      </v-radio-group>                        
                  </v-alert>
                    </v-row>                   
                </v-col>
                <v-col cols="12" sm="12">
                  <v-card class="pa-2 ma-2" v-if="isHidden_service_gov" hidden>
                    <v-row>                      
                      <v-col cols="12" sm="6">                     
                     <v-autocomplete
                     outlined 
                     :items="colleges" 
                     item-text="college_name" 
                     item-value="college_ID" 
                     v-model="addtransference_personnel.ser_college_code" 
                     label="College"
                      prepend-icon="mdi-office-building-marker"        
                      value="-"                             
                     />   

                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="addtransference_personnel.ser_order"
                          :counter="100"
                          outlined
                          label="เริ่มปฏิบัติราชการ คำสั่งที่ :"
                          prepend-icon="mdi-office-building-marker"
                          value="-"  
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="addtransference_personnel.ser_date"
                          :counter="100"
                          outlined
                          label="เมื่อวันที่:"
                          prepend-icon="mdi-office-building-marker"
                          value="-"  
                         
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="3">
                        <v-text-field
                          v-model="addtransference_personnel.ser_time_year"
                          :counter="100"
                          outlined
                          label="ช่วยปฏิบัติราชการเป็นเวลา ปี:"
                          prepend-icon="mdi-office-building-marker"
                          value="-"  
                        
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="3">
                        <v-text-field
                          v-model="addtransference_personnel.ser_time_month"
                          :counter="100"
                          outlined
                          label="ช่วยปฏิบัติราชการเป็นเวลา เดือน:"
                          prepend-icon="mdi-office-building-marker"
                          value="-"  
                         
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="addtransference_personnel.ser_reason_help"
                          :counter="100"
                          outlined
                          label="เหตุผลที่ช่วยปฏิบัติราชการ :"
                         prepend-icon="mdi-office-building-marker"
                          value="-"                            
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>

            <v-card class="pa-2 ma-2" v-if="get_gov_Age_year > 0">
              <v-card-title>
                <div
                  class="font-weight-light v-size--x-large"
                ><v-icon large left>mdi-account-reactivate</v-icon> อยู่ระหว่างทดลองปฏิบัติราชการหรือการเตรียมความพร้อมและพัฒนาอย่างเข็มหรือไม่</div>
              </v-card-title>
              
              <v-row>
                <v-col cols="12" sm="12">
                   <v-row>
                    <v-alert class="mx-auto justify-center pa-2 ma-2" border="bottom" colored-border type="warning" elevation="2">
                      <v-radio-group row v-model="addtransference_personnel.in_preparation">                        
                        <v-radio value="no_prepare">
                          <template v-slot:label>
                            <div>                            
                              <strong class="primary--text">ไม่อยู่</strong>
                            </div>
                          </template>
                        </v-radio>
                        <v-radio value="prepare">
                          <template v-slot:label>
                            <div>                             
                              <strong class="warning--text">อยู่</strong>
                            </div>
                          </template>
                        </v-radio>
                      </v-radio-group>   
                    </v-alert>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>

            <v-card class="pa-2 ma-2" v-if="get_gov_Age_year > 0">
              <v-card-title>
                <div class="font-weight-light v-size--x-large"> <v-icon large left>mdi-account-reactivate-outline</v-icon> อยู่ระหว่างลาศึกษาต่อเต็มเวลาหรือไม่</div>
              </v-card-title>
              
              <v-row>
                <v-col cols="12" sm="12">
                  <v-row>
                   <v-alert class="mx-auto justify-center pa-2 ma-2" border="bottom" colored-border type="warning" elevation="2">
                      <v-radio-group row v-model="addtransference_personnel.on_study_leave">
                        <v-radio value="no_leave">
                          <template v-slot:label>
                            <div>                            
                              <strong class="primary--text">ไม่อยู่</strong>
                            </div>
                          </template>
                        </v-radio>
                        <v-radio value="leave">
                          <template v-slot:label>
                            <div>                             
                              <strong class="warning--text">อยู่</strong>
                            </div>
                          </template>
                        </v-radio>
                      </v-radio-group>   
                   </v-alert>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>

            <v-card class="pa-2 ma-2" v-if="get_gov_Age_year > 0">
              <v-card-title>
                <div
                  class="font-weight-light v-size--x-large"
                ><v-icon large left>mdi-flag-letiant</v-icon> ขอย้ายไปปฏิบัติหน้าที่ในตำแหน่งและหน่วยงานแห่งใหม่ เรียงลำดับดังนี้</div>
              </v-card-title>              
              <v-col cols="12" sm="12">                   
                <v-card class="pa-2 ma-2">
                  <v-row>  

<v-col cols="12" sm="12">
  <v-card   
        class="px-5 py-3"        
      >     
       <v-btn
                      x-large
                      color="success"
                      dark                    
                      @click.stop="addtransference_location()"
                      
                    >
                      <v-icon>mdi-selection-multiple-marker</v-icon>
                      <span> เลือกวิทยาลัยแห่งใหม่</span>  
                    </v-btn>      
        <v-data-table             
          color="success"
          :loading="loading"
          :headers="header_trans"    
          :items="transference_locations"  
          :search="search"  
       >    
       <template v-slot:[`item.action`]="{ item }">            
            <v-icon
              color="red"             
              @click.stop="transference_locationDelete(item.id_tfl)"
            >
              mdi-delete
            </v-icon>
          </template>  
        </v-data-table>
  </v-card>

</v-col>
<v-col cols="12" sm="12">
 <span>ขอย้ายสับเปลี่ยนกับ : {{ personnel_temporarys.title_s }} {{ personnel_temporarys.frist_name }} {{ personnel_temporarys.last_name }}
               </span>
</v-col>
                    <v-col cols="12" sm="6">                     
                      <v-text-field
                        v-model="addtransference_personnel.switch_position"
                        :counter="13" 
                        outlined
                        label="บัตรประชาชน"
                        prepend-icon="mdi-account-details"
                        request
                        v-on:keyup.enter="OnEnter()"                        
                      ></v-text-field>
                      
                    </v-col> 
                           
                    <v-col cols="12" sm="3">
                      <v-text-field 
                      :value="personnel_temporarys.position_name"                       
                        :counter="100"
                        outlined
                        label="ตำแหน่ง :"
                        prepend-icon="mdi-account-star"
                        request                        
                        disabled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="3">
                      <v-text-field   
                      :value="personnel_temporarys.rang_name"                    
                        :counter="100"
                        outlined
                        label="วิทยฐานะ :"
                        prepend-icon="mdi-account-details"
                        request                       
                        disabled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-text-field   
                      :value="personnel_temporarys.id_position"                      
                        :counter="100"
                        outlined
                        label="เลขที่ตำแหน่ง :"
                        prepend-icon="mdi-account-details"
                        request                       
                        disabled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-text-field  
                      :value="personnel_temporarys.college_name"                       
                        :counter="100"
                        outlined
                        label="สังกัด :"
                        prepend-icon="mdi-flag-letiant"
                        request                        
                        disabled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12">
 <span>* กรณีย้ายสับเปลี่ยนให้กรอกหมายเลขบัตรประจำตัวประชาชนของผู้ที่ท่านประสงค์สับเปลี่ยน และกดปุ่ม Enter เพื่อดำเนินการค้นหา หากไม่ปรากฏแสดงว่าไม่มีบุคคลดังกล่าวในระบบ </span>
</v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-card>


            <v-card class="pa-2 ma-2" v-if="get_gov_Age_year > 0">
              <v-card-title>
                <div class="font-weight-light v-size--x-large" color="pink darken-2"><v-icon large left>mdi-account-details</v-icon> เหตุผลการขอย้าย</div>
              </v-card-title>
              
              <v-col cols="12" sm="12">
                <v-card class="pa-2">
                  <v-card-text>
                    <v-row align="center">
                      <v-card-title>
                        <div class="font-weight-light v-size--x-large"><v-icon></v-icon> ย้ายเพื่ออยู่ร่วมคู่สมรส</div>
                      </v-card-title>
                      {{ addtransference_personnel.reason_1 }}

                      <v-checkbox v-model="addtransference_personnel.reason_1" value="1" hide-details class="shrink mr-2 mt-0"></v-checkbox>
                      <v-text-field v-model="addtransference_personnel.reason_1_spouse" :disabled="!addtransference_personnel.reason_1" label="คู่สมรสชื่อ : " require :rules="[v => !!v || '']"></v-text-field>                      
                      <v-text-field v-model="addtransference_personnel.reason_1_occupation" :disabled="!addtransference_personnel.reason_1" label="คู่สมรสประกอบอาชีพ : " require :rules="[v => !!v || '']"></v-text-field>
                      <v-text-field
                      v-model="addtransference_personnel.reason_1_location"
                        :disabled="!addtransference_personnel.reason_1"
                        label="สถานที่ประกอบอาชีพของคู่สมรส : "
                        require :rules="[v => !!v || '']"
                      ></v-text-field>
                      <v-autocomplete v-model="addtransference_personnel.reason_1_domicile" :items="provices_sh" item-text="province_name" item-value="province_ID" :disabled="!addtransference_personnel.reason_1" label="ภูมิลำเนาของคู่สมรส จังหวัด : " require :rules="[v => !!v || '']"></v-autocomplete>
                      
                    </v-row>
                    <v-row align="center">
                      <v-card-title>
                        <div class="font-weight-light v-size--x-large">ย้ายเพื่อดูแลบิดา มารดา :</div>
                      </v-card-title>
                      {{ addtransference_personnel.reason_2 }}

                      <v-checkbox v-model="addtransference_personnel.reason_2" value="1" hide-details class="shrink mr-2 mt-0"></v-checkbox>
                      <v-text-field v-model="addtransference_personnel.reason_2_fyear" :disabled="!addtransference_personnel.reason_2" label="อายุของบิดาปี" require :rules="[v => !!v || '']"></v-text-field>
                      <v-text-field v-model="addtransference_personnel.reason_2_myear" :disabled="!addtransference_personnel.reason_2" label="อายุของมารดาปี" require :rules="[v => !!v || '']"></v-text-field>
                      <v-autocomplete v-model="addtransference_personnel.reason_2_domicile" :items="provices_sh" item-text="province_name" item-value="province_ID" :disabled="!addtransference_personnel.reason_2" label="ภูมิลำเนาของคู่สมรส จังหวัด : " require :rules="[v => !!v || '']"></v-autocomplete>
                      
                    </v-row>
                    <v-row align="center">
                      <v-card-title>
                        <div
                          class="font-weight-light v-size--x-large"
                        >ย้ายกลับภูมิลำเนาของข้าพเจ้า จังหวัด :</div>
                      </v-card-title>
                      {{ addtransference_personnel.reason_3 }}
                      <v-checkbox v-model="addtransference_personnel.reason_3" value="1" hide-details class="shrink mr-2 mt-0"></v-checkbox>
                      <v-autocomplete v-model="addtransference_personnel.reason_3_domicile" :items="provices_sh" item-text="province_name" item-value="province_ID" :disabled="!addtransference_personnel.reason_3" label="ภูมิลำเนาของคู่สมรส จังหวัด : " require :rules="[v => !!v || '']"></v-autocomplete>
                      
                    </v-row>
                    <v-row align="center">
                      <v-card-title>
                        <div class="font-weight-light v-size--x-large">เหตุผลอื่น :</div>
                      </v-card-title>
                      {{ addtransference_personnel.reason_4 }}
                      <v-checkbox v-model="addtransference_personnel.reason_4" value="1" hide-details class="shrink mr-2 mt-0"></v-checkbox>
                      <v-textarea v-model="addtransference_personnel.reason_4_detail" :disabled="!addtransference_personnel.reason_4" label="(ระบุ) : " require :rules="[v => !!v || '']"></v-textarea>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-card>

            <v-card class="pa-2 ma-2" v-if="get_gov_Age_year > 0">
              <v-card-title>
                <div class="font-weight-light v-size--x-large"><v-icon large left>mdi-details</v-icon> เอกสารประกอบการพิจารณา</div>
              </v-card-title>
              
              <v-row>               
                <v-col cols="12" sm="12">   
                  <v-row class="pa-4 mt-0">
                    <v-col cols="12" sm="4">
                      {{ addtransference_personnel.evidence_info_1 }}
                      <v-checkbox
                        v-model="addtransference_personnel.evidence_info_1"
                        label="สำเนา กพ.7/ก.ค.ศ.16 ที่เป็นปัจจุบัน"                      
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-checkbox
                       v-model="addtransference_personnel.evidence_info_2"
                        label="สำเนาทะเบียนบ้านของตน"                       
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-checkbox
                        v-model="addtransference_personnel.evidence_info_3"
                        label="สำเนาทะเบียนบ้านของบิดา มารดา"                       
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-checkbox
                        v-model="addtransference_personnel.evidence_info_4"
                        label="สำเนาทะเบียนบ้านของคู่สมรส"                      
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-checkbox
                      v-model="addtransference_personnel.evidence_info_5"
                        label="สำเนาทะเบียนสมรส"                       
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-checkbox
                        v-model="addtransference_personnel.evidence_info_6"
                        label="สำเนาคำสั่งย้ายไปดำรงตำแหน่งใหม่ของคู่สมรส"                      
                      ></v-checkbox>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>

 </v-form>           
            <v-card class="pa-1 d-flex justify-center" v-if="get_gov_Age_year > 0">            
                  <div> 
                     <v-row justify="end">                     
 * เมื่อกดปุ่มบันทึกแล้ว ท่านจะไม่สามารถแก้ไขข้อมูลใดๆ ได้ กรุณาตรวจสอบข้อมูลให้ถูกต้องการกดปุ่ม บันทึก
          
      </v-row>                             
<v-row>   
   <v-col>
    
     <v-btn
                      v-if="transference_personnels.id_ref === id_ref"
                      x-large
                      color="info"
                      dark
                      class="ma-2"
                     :href="'#/user/infotransferenceprint/'+id_ref" target="_blank"
                      
                    >
                      <v-icon>mdi-printer</v-icon>
                      <span>พิมพ์แบบแสดงความประสงค์ขอย้าย</span>
                    </v-btn>

                    <v-btn
                    v-else
                      x-large
                      color="success"
                      dark
                      class="ma-2"
                      @click.stop="addtransference_personnelSubmit()"
                      
                    >
                      <v-icon>mdi-content-save</v-icon>
                      <span>บันทึก</span>
                    </v-btn>

                    <v-btn
                      x-large
                      color="warning"
                      dark
                      class="mr-0"
                      @click.stop="isEditing = !isEditing"
                      
                    >
                      <v-icon>mdi-close</v-icon>
                      <span>ยกเลิก</span>
                    </v-btn> 
   </v-col>

</v-row>
                
             
                  
                   
                  </div>
              
            </v-card>         
        </base-material-card>

         <!--addtransference_locationdialog  -->
      <v-layout>
        <v-dialog v-model="addtransference_locationdialog" persistent max-width="80%">
          <v-card class="mx-auto pa-5">
            <base-material-card
              icon="mdi-account-multiple"
              title="เลือกวิทยาลัย"
              class="px-5 py-3"              
            >
            รหัสรายการอ้างอิง {{ id_ref }}
            </base-material-card>
            <v-card-text>
            <v-form ref="addtransference_locationform" lazy-validation>
              <v-container grid-list-md>
                <v-layout wrap>
                   <v-flex md2>
<v-select v-model="addtransference_personnel.sequence_n" :items="order_need" outlined   label="ลำดับที่ :">  
</v-select>
                   </v-flex>                                
                    <v-flex md5>                    
                      <v-autocomplete                         
                        :items="branch_s"
                        item-text="name_branch"
                        item-value="id_branch"
                        outlined
                        label="สาขาวิชา :"
                        prepend-icon="mdi-account-details"
                        request
                         v-model="addtransference_personnel.id_branch"
                        :rules="[(v) => !!v || '']"
                      ></v-autocomplete>
                    </v-flex>
                     <v-flex md5>
                      <v-autocomplete
                        v-model="addtransference_personnel.college_code"
                      :items="colleges"
                      item-text="college_name"
                      item-value="college_code"                      
                        outlined
                        label="สังกัด :"
                        prepend-icon="mdi-flag-letiant"
                        request
                        :rules="[(v) => !!v || '']"
                      ></v-autocomplete>
                               
                  </v-flex>
                </v-layout>
              </v-container>
              <small>* จำเป็น</small>
            </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="warning"
                large
                @click.stop="addtransference_locationdialog = false"
                
                ><v-icon dark>mdi-close</v-icon> ยกเลิก</v-btn
              >
              <v-btn
                large
                color="success"
                @click.stop="addtransference_locationSubmit()"
                
              >
                <v-icon dark>mdi-content-save</v-icon>&nbsp;&nbsp;บันทึก
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>



          <!-- V-model deleteuserdialog -->
      <v-layout>
        <v-dialog v-model="delettransference_locationdialog" persistent max-width="40%">
          <v-card class="mx-auto pa-5">                     
             <base-material-card
              color="error"
              icon="mdi-delete"
              title="ลบรายการ"
              class="px-5 py-3 text_google"          
             
            >
            </base-material-card>

            <v-card-text class="text_google">
              
        <v-card>        
          <v-card-text>
            <v-form ref="deletetransference_locationform" lazy-validation>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    ยืนยันการลบ <span> {{ edittransference_location.college_name }} </span> 
                  </v-flex>                                 
                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>        
        </v-card>
    
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>            
              <v-btn large @click.stop="delettransference_locationdialog = false"
                ><v-icon dark>mdi-close</v-icon>ยกเลิก</v-btn
              >
              <v-btn large
                color="red darken-3"
                @click.stop="deletetransference_locationSubmit()"
                dark
              >
                <v-icon dark>mdi-delete</v-icon>&nbsp;ลบ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      </v-col>
    </v-row>   
      
    <v-container fluid>      

 <v-snackbar v-model="snackbar.show" top :timeout="snackbar.timeout" :color="snackbar.color">
      <v-icon large>{{snackbar.icon}}</v-icon>
      <v-card-text>
        {{snackbar.text}}
      </v-card-text>
     
      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackbar.show = false">Close</v-btn>
      </template>
    </v-snackbar>
    </v-container>



    
  </v-container>

</template>

<script>
export default {
  name: 'HrvecTransferencePersonnel',

  data() {
    return {
       loading: true,    
     ApiKey: 'HRvec2021',  
    isHidden: false,
    timestamp: '',
    colleges: {},
    personnel_search: {},
    show_personnel: [],
    branch_s:[],
    transference_locations : [],
    search: '',
    isHidden_service_gov: false,
    reason_1: false,
    reason_2: false,
    reason_3: false,
    reason_4: false,
    service_gov:false,
     addtransference_locationdialog: false,
     delettransference_locationdialog : false,
     Search_Personneldialog: false,
 user: {},  
    transference_personnel: [],   
    transference_personnels: [],  
    addtransference_personnel: {teaching_status: 'tech', service_status: 'not_service', in_preparation: 'no_prepare', on_study_leave: 'no_leave'},
    edittransference_location: [],
    provinces: [],
    provices_sh: [],
    prefectures: [],
    personnel_educations: [],
    district: [],
    district_post_s: [], 
    snackbar: {
      show: false,
      color: "",
      timeout: 5000,
      icon: "",
      text: "",
    },
    order_need: [1, 2, 3],    
    header_trans: [    
    { text: "ลำดับ", align: "center", value: "sequence_n" },
    { text: "รหัสอ้างอิง", align: "center", value: "id_ref" },
    { text: "สาขาวิชา", align: "center", value: "name_branch" },
    { text: "วิทยาลัย", align: "center", value: "college_name" },
    { text: "ยกเลิก", align: "center", value: "action" },
    ], 
    education_s: [
      {
        title: "ต่ำกว่าปริญญาตรี",
        faculty: "",
        branch: "",
        color: "deep-purple lighten-1",
      },
      {
        title: "ปริญญาตรี",
        faculty: "บธ.บ.",
        branch: "ระบบสารสนเทศทางคอมพิวเตอร์",
        color: "green",
      },
      {
        title: "ปริญญาโท",
        faculty: "",
        branch: "",
        color: "deep-purple lighten-1",
      },
      {
        title: "ปริญญาเอก",
        faculty: "",
        branch: "",
        color: "deep-purple lighten-1",
      },
    ],

    isEditing: null,
    model: null,
    show1: false,
    pagination: {}, 
    personnel_marriages: [],
    rowsperpage: [
        25,
        50,
        100,
        {
          text: "All",
          value: -1,
        },
      ],    
      personnel_temporarys: [],

    };
        
  },

  async  mounted() {
    
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

      let result_user
      let userSession = JSON.parse(sessionStorage.getItem('user')) || 0
      result_user = await this.$http.post('personnel_temporary.php', {
        ApiKey: this.ApiKey,    
         id_card: userSession.id_card     
      })
      this.user = result_user.data
   
   this.transference_personnelAll()
         this.transference_locationQueryAll()
      this.personnel_educationsQueryAll()

  },

  methods: {
     async personnel_educationsQueryAll() {     
         this.loading = true
          let userSession = JSON.parse(sessionStorage.getItem('user')) || 0   
        let result = await this.$http.post('personnel_education.php', {
          ApiKey: this.ApiKey,
            id_card: userSession.id_card  

        }).finally(() => this.loading = false)
        this.personnel_educations = result.data            
      }, 

    async OnEnter() {
        let result = await this.$http.post('personnel_temporary.php', {
          ApiKey: this.ApiKey,
          id_card: this.addtransference_personnel.switch_position
         
        }).finally(() => this.loading = false)
        this.personnel_temporarys = result.data  
    }, 
     async transference_personnelAll() {
          this.loading = true
        let result = await this.$http.post('transference_personnel.php', {
          ApiKey: this.ApiKey,
          id_ref: this.id_ref       
        }).finally(() => this.loading = false)
        this.transference_personnels = result.data        
      },
     async transference_locationQueryAll() {
          this.loading = true
        let result = await this.$http.post('transference_location.php', {
          ApiKey: this.ApiKey,
          id_ref: this.id_ref       
        }).finally(() => this.loading = false)
        this.transference_locations = result.data        
      },
    
    //First >> Insert transference Location 
    async addtransference_location() {
    this.addtransference_personnel = {};
    this.addtransference_locationdialog = true;
    },   

    async Search_Personnel(){
        this.personnel_select = {};
        this.Search_Personneldialog = true
    },

    async addtransference_locationSubmit() {
      if (this.$refs.addtransference_locationform.validate()) {
        this.addtransference_personnel.ApiKey = this.ApiKey;
        this.addtransference_personnel.id_ref = this.id_ref;
        this.addtransference_personnel.id_card = this.user.id_card;
        let result = await this.$http.post(
          "transference_location.insert.php",
          this.addtransference_personnel          
        );      
        if (result.data.status == true) {
          this.transference_personnel = result.data;
          this.snackbar.icon = "mdi-checkbox-marked-circle";
          this.snackbar.color = "success";
          this.snackbar.text = "บันทึกข้อมูลเรียบร้อย";
          this.snackbar.show = true;
            this.transference_locationQueryAll()
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text = "บันทึกข้อมูลผิดพลาด รายการลำดับ หรือ ชื่อหน่วยงานแหน่งใหม่ซ้ำ";
          this.snackbar.show = true;
        }
        this.addtransference_locationdialog = false
      }
    },
      //Delete transference Location
      async transference_locationDelete(id_tfl) {
        let result = await this.$http.post('transference_location.php', {
          ApiKey: this.ApiKey,
          id_tfl: id_tfl
        })
        this.edittransference_location = result.data        
        this.delettransference_locationdialog = true
      },      
      async deletetransference_locationSubmit() {
        if (this.$refs.deletetransference_locationform.validate()) {
          this.edittransference_location.ApiKey = this.ApiKey;         
          let result = await this.$http.post('transference_location.delete.php', this.edittransference_location)
          if (result.data.status == true) {
            this.transference_location = result.data
            this.snackbar.icon = 'mdi-font-awesome'
            this.snackbar.color = 'success'
            this.snackbar.text = 'ลบข้อมูลเรียบร้อย'
            this.snackbar.show = true
            this.transference_locationQueryAll()
          } else {
            this.snackbar.icon = 'mdi-close-network'
            this.snackbar.color = 'red'
            this.snackbar.text = 'ลบข้อมูลผิดพลาด'
            this.snackbar.show = true
          }
          this.delettransference_locationdialog = false
        }
      },     
// Add transference_personnel 
      async addtransference_personnelSubmit(){
if (this.$refs.addtransference_personnelform.validate()) {
        this.addtransference_personnel.ApiKey = this.ApiKey;
        this.addtransference_personnel.id_ref = this.id_ref;
        this.addtransference_personnel.time_s = this.time_s;
        this.addtransference_personnel.year_s = this.year_s;
        this.addtransference_personnel.id_card = this.user.id_card;
        this.addtransference_personnel.date_time = this.date_today;
        this.addtransference_personnel.age_app_time = this.get_Appoint_Age;
        let result = await this.$http.post("transference_personnel.insert.php", this.addtransference_personnel)              
        if (result.data.status == true) {    
          this.transference_personnels = result.data;    
          this.snackbar.icon = "mdi-checkbox-marked-circle";
          this.snackbar.color = "success";
          this.snackbar.text = "บันทึกข้อมูลเรียบร้อย";
          this.snackbar.show = true;   
          this.transference_personnelAll()
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text = "บันทึกข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.addtransference_locationdialog = false
      }
      },

    async clear_tech() {
      //this.$v.$reset();
      this.addtransference_personnel.subject_1 = "-";
      this.addtransference_personnel.subject_2 = "-";
      this.addtransference_personnel.subject_3 = "-";
      this.addtransference_personnel.subject_4 = "-";    
    }, 
     async clear_gov_service() {
      //this.$v.$reset();
      this.addtransference_personnel.ser_college_code = "-";
      this.addtransference_personnel.ser_order = "-";
      this.addtransference_personnel.ser_date = "-";
      this.addtransference_personnel.ser_time_year = "-";    
      this.addtransference_personnel.ser_time_month = "-";    
      this.addtransference_personnel.ser_reason_help = "-";    
    }, 
  },  
    computed: {     
      
          pages() {
              if (this.pagination.rowsPerPage == null ||
                this.pagination.totalItems == null
              ) return 0
              return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
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
             id_ref_cr = this.time_s +''+this.year_s+''+this.user.id_card
             return id_ref_cr
           },
           marital_status() {
            let marital_status = this.user.marital_status
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
          date_today() {
            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = today.getFullYear()+543;

            today = dd + '/' + mm + '/' + yyyy;
            return today
          },
          
          dmy_app_cal() {   
          let month = this.user.appoin_month
          let day = this.user.appoin_day
          let year = this.user.appoin_year - 543
          let result = month+'/'+day+'/'+year
                return result
            },


          date_appoin_ch(){
            let monthNames = [
        "","มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน",
        "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม",
        "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ];
            let day = this.user.date_appoin.slice(8);
            let month = monthNames[parseInt(this.user.date_appoin.slice(5,7))];
            let year = this.user.date_appoin.slice(0,4);
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
            let day = parseInt(this.user.date_app_now.slice(8));
            let month = monthNames[parseInt(this.user.date_app_now.slice(5,7))];
            let year = this.user.date_app_now.slice(0,4);
            let years = parseInt(year) + 543;
            let today = day + ' ' + month + ' ' + years;
            return today
          },


          cal_age_gov() {
	          const today = new Date();
       	    const birthDate = new Date(this.dmy_app_cal);
	          const yearsDifference = today.getFullYear() - birthDate.getFullYear();
            if (
    	          today.getMonth() < birthDate.getMonth() ||
   	            (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
                ) {
   	            return yearsDifference - 1;
                }
  	            return yearsDifference;
          },
          date_today_cal() {
            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = today.getFullYear();

            today = yyyy + '-' + mm + '-' + dd;
            return today
          },

          date_month_cal(){
            let time_s = this.time_s
            if(time_s==1){

                let dd = '31';
                let mm = '03';
                let yyyy = parseInt(this.year_s)-543;
            let date = yyyy + '-' + mm + '-' + dd;
             return date
            }else if(time_s==2){
               let dd = '30';
                let mm = '09';
               let yyyy = parseInt(this.year_s)-543;
            let date = yyyy + '-' + mm + '-' + dd;
             return date
            }
          },
          
          get_Appoint_Age() {
                let today = new Date(this.date_month_cal);
                let DOB = new Date(this.user.date_app_now);
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
                let DOB = new Date(this.user.date_appoin);
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
          get_gov_Age_year() {
               let today = new Date(this.date_today_cal);
                let DOB = new Date(this.user.date_app_now);
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
                let age = years;
              return age;
          }





   
    },
};
</script>

<style lang="scss" scoped>

</style>