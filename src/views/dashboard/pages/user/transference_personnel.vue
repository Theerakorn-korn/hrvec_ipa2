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
                   <h3> วันที่เริ่มบรรจุเข้ารับราชการ : {{ dmy_app }} </h3>
                   <h3> ระยะเวลาตั้งแต่บรรจุเข้ารับราชการ :  </h3>
                   <h3> สถานะภาพ : {{ marital_status }}</h3>
                  </v-alert>  
                </v-col>         
   <!--  เดือนปัจจุบัน {{ month_now }}
                  เดือนบรรจุ {{ month_app }}
                  ปีปัจจุบัน {{ y_now }}
                  ปีบรรจุ {{ y_app }}  
                  ปีบรรจุ {{ result }}   -->

                <v-col cols="12" sm="6">
                  <v-alert border="left" colored-border color="green darken-1" elevation="2"  type="info">
                   <h2> ครั้งที่ : {{ time_s }} ประจำปี : {{ y_now }}  </h2>
                    <h3> เขียนที่ : {{ user.college_name }}</h3>
                    <h3> วันที่ยื่นคำร้อง : {{ timestamp }}  </h3>
                    <hr>
                      <h3> วันที่เริ่มปฏิบัติหน้าที่ในสถานศึกษาปัจจุบัน :   </h3>
                      <h3> ปฏิบัติหน้าที่เป็นเวลา :   </h3>
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

            <v-card class="pa-2 ma-2">
              <v-card-title>
                <div class="font-weight-light v-size--x-large"><v-icon large left>mdi-electron-framework</v-icon> ปัจจุบันปฏิบัติการสอน</div>
              </v-card-title>
              <v-row>
                <v-col cols="12" sm="12">
                  <v-row>
                   <v-alert class="mx-auto justify-center pa-2 ma-2" border="bottom" colored-border type="warning" elevation="2">
                      <v-radio-group row v-model="radios_tech">                        
                        <v-radio value="dtech" v-on:click="isHidden = true">
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
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="addtransference_personnel.subject_2"
                          :counter="100"
                          outlined
                          label="วิชาที่สอน ที่ 2:"
                         prepend-icon="mdi-notebook"
                          request
                          :rules="[(v) => !!v || '']"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="addtransference_personnel.subject_3"
                          :counter="100"
                          outlined
                          label="วิชาที่สอน ที่ 3:"
                         prepend-icon="mdi-notebook"
                          request
                          :rules="[(v) => !!v || '']"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="addtransference_personnel.subject_4"
                          :counter="100"
                          outlined
                          label="วิชาที่สอน ที่ 4:"
                          prepend-icon="mdi-notebook"
                          request
                          :rules="[(v) => !!v || '']"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12">
                        <v-text-field
                          v-model="addtransference_personnel.perform_other_duties"
                          outlined
                          label="หน้าที่อื่นที่ได้รับมอบหมาย :"
                          prepend-icon="mdi-account-network"
                          request
                          :rules="[(v) => !!v || '']"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>

            <v-card class="pa-2 ma-2">
              <v-card-title>
                <div class="font-weight-light v-size--x-large"><v-icon large left>mdi-office-building-marker</v-icon> อยู่ระหว่างช่วยปฏิบัติราชการหรือไม่</div>
              </v-card-title>             
              <v-row>
                <v-col cols="12" sm="12"> 
                   <v-row>
                  <v-alert class="mx-auto justify-center pa-2 ma-2" border="bottom" colored-border type="warning" elevation="2">
                         <v-radio-group row v-model="gov_service">                        
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
                     outlined :items="colleges" 
                     item-text="college_name" 
                     item-value="college_ID" 
                     v-model="addtransference_personnel.college_ID" 
                     label="College"
                      prepend-icon="mdi-office-building-marker"
                      required :rules="[v => !!v || '']">                      
                      </v-autocomplete>   

                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="addtransference_personnel.ser_order"
                          :counter="100"
                          outlined
                          label="เริ่มปฏิบัติราชการ คำสั่งที่ :"
                          prepend-icon="mdi-office-building-marker"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="addtransference_personnel.ser_date"
                          :counter="100"
                          outlined
                          label="เมื่อวันที่:"
                          prepend-icon="mdi-office-building-marker"
                          request
                          :rules="[(v) => !!v || '']"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="3">
                        <v-text-field
                          v-model="addtransference_personnel.ser_time_year"
                          :counter="100"
                          outlined
                          label="ช่วยปฏิบัติราชการเป็นเวลา ปี:"
                          prepend-icon="mdi-office-building-marker"
                          request
                          :rules="[(v) => !!v || '']"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="3">
                        <v-text-field
                          v-model="addtransference_personnel.ser_time_month"
                          :counter="100"
                          outlined
                          label="ช่วยปฏิบัติราชการเป็นเวลา เดือน:"
                          prepend-icon="mdi-office-building-marker"
                          request
                          :rules="[(v) => !!v || '']"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="addtransference_personnel.ser_reason_help"
                          :counter="100"
                          outlined
                          label="เหตุผลที่ช่วยปฏิบัติราชการ :"
                         prepend-icon="mdi-office-building-marker"
                          request
                          :rules="[(v) => !!v || '']"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>

            <v-card class="pa-2 ma-2">
              <v-card-title>
                <div
                  class="font-weight-light v-size--x-large"
                ><v-icon large left>mdi-account-reactivate</v-icon> อยู่ระหว่างทดลองปฏิบัติราชการหรือการเตรียมความพร้อมและพัฒนาอย่างเข็มหรือไม่</div>
              </v-card-title>
              
              <v-row>
                <v-col cols="12" sm="12">
                   <v-row>
                    <v-alert class="mx-auto justify-center pa-2 ma-2" border="bottom" colored-border type="warning" elevation="2">
                      <v-radio-group row v-model="preparation_s">                        
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

            <v-card class="pa-2 ma-2">
              <v-card-title>
                <div class="font-weight-light v-size--x-large"> <v-icon large left>mdi-account-reactivate-outline</v-icon> อยู่ระหว่างลาศึกษาต่อเต็มเวลาหรือไม่</div>
              </v-card-title>
              
              <v-row>
                <v-col cols="12" sm="12">
                  <v-row>
                   <v-alert class="mx-auto justify-center pa-2 ma-2" border="bottom" colored-border type="warning" elevation="2">
                      <v-radio-group row v-model="leave_s">                        
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

            <v-card class="pa-2 ma-2">
              <v-card-title>
                <div
                  class="font-weight-light v-size--x-large"
                ><v-icon large left>mdi-flag-variant</v-icon> ขอย้ายไปปฏิบัติหน้าที่ในตำแหน่งและหน่วยงานแห่งใหม่ เรียงลำดับดังนี้</div>
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
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="show_personnel.id_card"
                        :counter="13" 
                        outlined
                        label="บัตรประชาชน"
                        prepend-icon="mdi-account-details"
                        request
                        v-on:keyup.enter="OnEnter()"
                        :rules="[(v) => !!v || '' || v > 13]"
                      ></v-text-field>
                      <span>ขอย้ายสับเปลี่ยนกับ {{ personnel_temporarys.title_s }} {{ personnel_temporarys.frist_name }} {{ personnel_temporarys.last_name }}
               </span>
                    </v-col>                  
                    <v-col cols="12" sm="3">
                      <v-text-field 
                      :value="personnel_temporarys.position_name"                       
                        :counter="100"
                        outlined
                        label="ตำแหน่ง :"
                        prepend-icon="mdi-account-star"
                        request
                        :rules="[(v) => !!v || '']"
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
                        :rules="[(v) => !!v || '']"
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
                        :rules="[(v) => !!v || '']"
                        disabled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-text-field  
                      :value="personnel_temporarys.college_name"                       
                        :counter="100"
                        outlined
                        label="สังกัด :"
                        prepend-icon="mdi-flag-variant"
                        request
                        :rules="[(v) => !!v || '']"
                        disabled
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-card>


            <v-card class="pa-2 ma-2">
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
                      <v-checkbox v-model="move_spouse" hide-details class="shrink mr-2 mt-0"></v-checkbox>
                      <v-text-field :disabled="!move_spouse" label="คู่สมรสชื่อ : "></v-text-field>                      
                      <v-text-field :disabled="!move_spouse" label="คู่สมรสประกอบอาชีพ : "></v-text-field>
                      <v-text-field
                        :disabled="!move_spouse"
                        label="สถานที่ประกอบอาชีพของคู่สมรส : "
                      ></v-text-field>
                      <v-autocomplete :items="provices_sh" item-text="province_name" item-value="province_ID" :disabled="!move_spouse" label="ภูมิลำเนาของคู่สมรส จังหวัด : "></v-autocomplete>
                      
                    </v-row>
                    <v-row align="center">
                      <v-card-title>
                        <div class="font-weight-light v-size--x-large">ย้ายเพื่อดูแลบิดา มารดา :</div>
                      </v-card-title>
                      <v-checkbox v-model="move_parents" hide-details class="shrink mr-2 mt-0"></v-checkbox>
                      <v-text-field :disabled="!move_parents" label="อายุของบิดาปี"></v-text-field>
                      <v-text-field :disabled="!move_parents" label="อายุของมารดาปี"></v-text-field>
                      <v-autocomplete :items="provices_sh" item-text="province_name" item-value="province_ID" :disabled="!move_parents" label="ภูมิลำเนาของคู่สมรส จังหวัด : "></v-autocomplete>
                      
                    </v-row>
                    <v-row align="center">
                      <v-card-title>
                        <div
                          class="font-weight-light v-size--x-large"
                        >ย้ายกลับภูมิลำเนาของข้าพเจ้า จังหวัด :</div>
                      </v-card-title>
                      <v-checkbox v-model="move_domicile" hide-details class="shrink mr-2 mt-0"></v-checkbox>
                      <v-autocomplete :items="provices_sh" item-text="province_name" item-value="province_ID" :disabled="!move_domicile" label="ภูมิลำเนาของคู่สมรส จังหวัด : "></v-autocomplete>
                      
                    </v-row>
                    <v-row align="center">
                      <v-card-title>
                        <div class="font-weight-light v-size--x-large">เหตุผลอื่น :</div>
                      </v-card-title>
                      <v-checkbox v-model="another_reason" hide-details class="shrink mr-2 mt-0"></v-checkbox>
                      <v-text-field :disabled="!another_reason" label="(ระบุ) : "></v-text-field>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-card>

            <v-card class="pa-2 ma-2">
              <v-card-title>
                <div class="font-weight-light v-size--x-large"><v-icon large left>mdi-details</v-icon> เอกสารประกอบการพิจารณา</div>
              </v-card-title>
              
              <v-row>
                <v-col cols="12" sm="12">
                  <v-textarea
                    v-model="selected"
                    auto-grow
                    :counter="12"
                    dense
                    filled                    
                    request
                    :rules="[(v) => !!v || '']"
                    disabled
                    hidden
                  >{{ selected }}</v-textarea>
                  <v-row class="pa-4 mt-0">
                    <v-col cols="12" sm="4">
                      <v-checkbox
                        v-model="selected"
                        label="สำเนา กพ.7/ก.ค.ศ.16 ที่เป็นปัจจุบัน"
                        value="01"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-checkbox
                        v-model="selected"
                        label="สำเนาทะเบียนบ้านของตน"
                        value="02"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-checkbox
                        v-model="selected"
                        label="สำเนาทะเบียนบ้านของบิดา มารดา"
                        value="03"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-checkbox
                        v-model="selected"
                        label="สำเนาทะเบียนบ้านของคู่สมรส"
                        value="04"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-checkbox
                        v-model="selected"
                        label="สำเนาทะเบียนสมรส"
                        value="05"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-checkbox
                        v-model="selected"
                        label="สำเนาคำสั่งย้ายไปดำรงตำแหน่งใหม่ของคู่สมรส"
                        value="06"
                      ></v-checkbox>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
            <v-card class="pa-1 d-flex justify-center">
             
                  <div>
                    <v-btn
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
                  </div>
              
            </v-card>         
        </base-material-card>

         <!--addtransference_locationdialog  -->
      <v-layout>
        <v-dialog v-model="addtransference_locationdialog" persistent max-width="50%">
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
                        prepend-icon="mdi-flag-variant"
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
              <v-btn large flat @click.stop="delettransference_locationdialog = false"
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



         <!--Search Personnel Position Switch  -->
      <v-layout>
        <v-dialog v-model="Search_Personneldialog" persistent max-width="50%">
          <v-card class="mx-auto pa-5">
            <base-material-card
              icon="mdi-account-multiple"
              title="เลือกสับเปลี่ยนตำแหน่งกับ"
              class="px-5 py-3"              
            >           
            </base-material-card>
            <v-card-text>
            <v-form ref="addtransference_locationform" lazy-validation>
              <v-container grid-list-md>
                <v-layout wrap>                                              
                    <v-flex md12>                    
                      <v-text-field
                      v-model="personnel_search.id_card"  
                        outlined
                        label="รหัสบัตรประชาชน :"
                        prepend-icon="mdi-account-details"
                        request                        
                        :rules="[(v) => !!v || '']"
                      ></v-text-field>
                    </v-flex>
                    
                </v-layout>
              </v-container>            
            </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="warning"
                large
                @click.stop="Search_Personneldialog = false"
                
                ><v-icon dark>mdi-close</v-icon> ยกเลิก</v-btn
              >
              <v-btn
                large
                color="success"
                @click.stop="Search_PersonnelSubmit()"
                
              >
                <v-icon dark>mdi-content-save</v-icon>&nbsp;&nbsp;เลือก
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

    </v-container>
  </v-container>
</template>

<script>
export default {

  data: () => ({
 loading: true,    
     ApiKey: 'HRvec2021',
     radios_tech: 'tech',
     gov_service: 'not_service',
     preparation_s: 'no_prepare',
    leave_s: 'no_leave',
    isHidden: false,
    timestamp: '',
    colleges: {},
    personnel_search: {},
    show_personnel: [],
    branch_s:[],
    transference_locations : [],
    search: '',
    isHidden_service_gov: false,
    move_spouse: false,
    move_parents: false,
    move_domicile: false,
    another_reason: false,
    service_gov:false,
     addtransference_locationdialog: false,
     delettransference_locationdialog : false,
     Search_Personneldialog: false,
 user: {},
    selected: [],   
    transference_personnel: [],  
    addtransference_personnel: {},
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
    { text: "รายการ", align: "center", value: "id_tfl" },
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

      let result_user
      let userSession = JSON.parse(sessionStorage.getItem('user')) || 0
      result_user = await this.$http.post('personnel_temporary.php', {
        ApiKey: this.ApiKey,    
         id_card: userSession.id_card     
      })
      this.user = result_user.data

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
          id_card: this.show_personnel.id_card
         
        }).finally(() => this.loading = false)
        this.personnel_temporarys = result.data  
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
        this.Search_Personneldialog = true
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

    async clear_tech() {
      //this.$v.$reset();
      this.addtransference_personnel.subject_1 = "";
      this.addtransference_personnel.subject_2 = "";
      this.addtransference_personnel.subject_3 = "";
      this.addtransference_personnel.subject_4 = "";    
    }, 
     async clear_gov_service() {
      //this.$v.$reset();
      this.addtransference_personnel.ser_college_code = "";
      this.addtransference_personnel.ser_order = "";
      this.addtransference_personnel.ser_date = "";
      this.addtransference_personnel.ser_time_year = "";    
      this.addtransference_personnel.ser_time_month = "";    
      this.addtransference_personnel.ser_reason_help = "";    
    }, 
},   

  computed: {     
    pages() {
        if (this.pagination.rowsPerPage == null ||
          this.pagination.totalItems == null
        ) return 0

        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      },      
            dmy_app: function () {               
                return this.user.appoin_day+'/'+this.user.appoin_month+'/'+this.user.appoin_year
            },
            y_app: function(){                      
            return this.user.appoin_year
            },
            y_now: function(){
              const d = new Date();
              let year = d.getFullYear()+543     
              return year
            },
            month_app: function(){
              let month_a = this.user.appoin_month
              return month_a
            },
            day_now: function(){
             const d = new Date()
              let day = d.getDate()
              return day
            },
             month_now: function(){
             const d = new Date()
              let month  = d.getMonth()+1
              return month 
            },            
           time_s: function(){
             let time_m              
             if(this.month_now > 2)
             {time_m = 2}else{
               time_m = 1
             }
              return time_m
           },
           id_ref: function(){
             let id_ref_cr
             id_ref_cr = this.time_s +''+this.y_now+''+this.user.id_card
             return id_ref_cr
           },
         
          marital_status: function(){
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
          }         
        }
};
</script>

<style lang="sass">
#upgrade
  .v-data-table
    th, td
      border: none !important
</style>
