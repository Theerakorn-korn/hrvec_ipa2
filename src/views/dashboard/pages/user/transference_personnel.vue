<template>
  <v-container id="upgrade" fluid tag="section" class="text_google">
    <v-row justify="center">
      <v-col cols="12" md="12">
        <base-material-card color="primary">
          <template v-slot:heading>
            <h2 class="h1 font-weight-light text_google">
              <v-icon large left>mdi-file-send</v-icon>การย้ายสายการสอน
            </h2>
          </template>         
            <v-card class="pa-2 ma-2">
              <v-card-title>
                <div class="font-weight-light v-size--x-large"><v-icon large left>mdi-account-details</v-icon> ข้อมูลเบื้องต้น รหัสรายการอ้างอิง {{ id_ref }}</div>
              </v-card-title>
              <v-row>
                <v-col cols="12" sm="3">
                  <v-text-field                                    
                    dense
                    label="ครั้งที่ :"
                    :value="time_s"
                    prepend-icon="mdi-account-details"
                    request
                    disabled
                  >                 
                  </v-text-field>
                 
                </v-col>
                <v-col cols="12" sm="3">
                  <v-text-field
                    :value="y_now"
                     color="cyan darken"
                    dense
                    label="ประจำปี :"
                    prepend-icon="mdi-account-details"
                    request                
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3">
                  <v-text-field
                    v-model="user.college_name"
                    dense
                    label="เขียนที่ : "
                    prepend-icon="mdi-account-details"
                    request
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3">                 
                  <v-text-field                    
                    :value="timestamp"
                    dense
                    label="วันที่ยื่นคำร้อง : "
                    prepend-icon="mdi-account-details"
                    request
                    disabled
                  ></v-text-field>
                </v-col>
                 <v-col cols="12" sm="2">
                  <v-text-field
                  label="คำนำหน้าชื่อ"
                    :value='user.title_s'
                    dense               
                    prepend-icon="mdi-account-details"
                    request
                    disabled
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="2">
                  <v-text-field
                  label="ชื่อ"
                    :value='user.frist_name'
                    dense               
                    prepend-icon="mdi-account-details"
                    request
                    disabled
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="3">
                  <v-text-field   
                  label="นามสกุล"
                   :value="user.last_name"            
                    dense                   
                    prepend-icon="mdi-account-details"
                    request
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="2">
                  <v-text-field
                  label="เลขที่ตำแหน่ง"
                   :value='user.id_position'
                    dense                   
                    prepend-icon="mdi-account-details"
                    request
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3">
                  <v-text-field
                   
                    dense
                    label="วิทยฐานะ"
                    :value='user.rang_name'
                    prepend-icon="mdi-account-details"
                    request
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field                   
                    dense
                     label="สังกัด (สถานศึกษา) : "
                    :value='user.college_name'                    
                    prepend-icon="mdi-account-details"
                    request
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                   
                    dense 
                    label="รหัสบัตรประชาชน : "
                    :value='user.id_card'      
                    prepend-icon="mdi-account-details"
                    request
                    disabled
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="3">
                  <v-text-field
                  
                    dense                   
                     label="วันที่เริ่มบรรจุเข้ารับราชการ : "
                    :value="dmy_app"    
                    prepend-icon="mdi-account-details"
                    request
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3">
                  <v-text-field    
                       
                    dense                    
                    label="ระยะเวลาตั้งแต่บรรจุเข้ารับราชการ :"
                    prepend-icon="mdi-account-details"
                    request
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3">
                 <!--  เดือนปัจจุบัน {{ month_now }}
                  เดือนบรรจุ {{ month_app }}
                  ปีปัจจุบัน {{ y_now }}
                  ปีบรรจุ {{ y_app }}  
                  ปีบรรจุ {{ result }}   -->

                  <v-text-field
                  :value="user.date_app"                        
                    dense
                    label="วันที่เริ่มปฏิบัติหน้าที่ในสถานศึกษาปัจจุบัน :"
                    prepend-icon="mdi-account-details"
                    request
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3">
                  <v-text-field
                    v-model="addtransference_personnel.time_s"
                    dense
                    label="ปฏิบัติหน้าที่เป็นเวลา :"
                    prepend-icon="mdi-account-details"
                    request
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-text-field
                    v-model="addtransference_personnel.time_s"
                    dense
                    label="สถานะภาพ :"
                    prepend-icon="mdi-account-details"
                    request
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-row justify="space-around">
                    <v-card width="600">
                      <v-card-title class="mt-8">
                        <v-avatar size="56">
                          <v-icon large left>mdi-cast-education</v-icon>
                        </v-avatar>
                        <p class="ml-3">ประวัติการศึกษา</p>
                      </v-card-title>

                      <v-card-text>
                        <v-timeline align-top dense>
                          <v-timeline-item
                            v-for="item in education_s"
                            :key="item.time"
                            :color="item.color"
                            small
                          >
                            <div>
                              <div
                                class="font-weight-normal"
                              >{{ item.title }} : {{ item.faculty }} : {{ item.branch }}</div>
                            </div>
                          </v-timeline-item>
                        </v-timeline>
                      </v-card-text>
                    </v-card>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>

            <v-card class="pa-2 ma-2">
              <v-card-title>
                <div class="font-weight-light v-size--x-large"><v-icon large left>mdi-electron-framework</v-icon> ปัจจุบันปฏิบัติการสอน</div>
              </v-card-title>
              <v-row>
                <v-col cols="12" sm="12">
                  <v-row justify="center">
                    <v-card class="mx-auto pa-2" color="#ECE4E2">
                      <v-radio-group v-model="radio_tech" row>
                        
                        <v-radio value="dtech" v-on:click="isHidden = true">
                          <template v-slot:label>
                            <div>                            
                              <strong class="warning--text" v-on="clear_tech()">ไม่ได้ทำการสอน</strong>
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
                    </v-card>
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
                  <v-row justify="center">
                    <v-card class="mx-auto pa-2" color="#ECE4E2">
                       <v-radio-group row>                        
                        <v-radio v-on:click="isHidden_service_gov = true">
                          <template v-slot:label>
                            <div>                            
                              <strong class="primary--text" v-on="clear_gov_service()">ไม่อยู่</strong>
                            </div>
                          </template>
                        </v-radio>
                        <v-radio v-on:click="isHidden_service_gov = !isHidden_service_gov">
                          <template v-slot:label>
                            <div>                             
                              <strong class="warning--text">ช่วยปฏิบัติราชการ</strong>
                            </div>
                          </template>
                        </v-radio>
                      </v-radio-group>   
                     
                    </v-card>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-card class="pa-2 ma-2" v-if="!isHidden_service_gov" hidden>
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
                  <v-row justify="center">
                    <v-card class="mx-auto pa-2" color="#ECE4E2">
                      <v-radio-group row>                        
                        <v-radio>
                          <template v-slot:label>
                            <div>                            
                              <strong class="primary--text">ไม่อยู่</strong>
                            </div>
                          </template>
                        </v-radio>
                        <v-radio>
                          <template v-slot:label>
                            <div>                             
                              <strong class="warning--text">อยู่</strong>
                            </div>
                          </template>
                        </v-radio>
                      </v-radio-group>   
                    </v-card>
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
                  <v-row justify="center">
                    <v-card class="mx-auto pa-2" color="#ECE4E2">
                      <v-radio-group row>                        
                        <v-radio>
                          <template v-slot:label>
                            <div>                            
                              <strong class="primary--text">ไม่อยู่</strong>
                            </div>
                          </template>
                        </v-radio>
                        <v-radio>
                          <template v-slot:label>
                            <div>                             
                              <strong class="warning--text">อยู่</strong>
                            </div>
                          </template>
                        </v-radio>
                      </v-radio-group>   
                    </v-card>
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
        :elevation="hover ? 24 : 6"
      >     
       <v-btn
                      x-large
                      color="success"
                      dark
                      class="ma-2"
                      @click.stop="addtransference_location()"
                      round
                    >
                      <v-icon>mdi-content-save</v-icon>
                      <span>เลือกวิทยาลัยแห่งใหม่</span>
                    </v-btn>   
        <v-data-table
          color="success"
          :loading="loading"
          :headers="header_transference_location"
          :items="transference_locations"
          :search="search"
          :class="elevation - 3" 
       > 

         <template v-slot:[`item.actions`]="{ item }">
            <v-icon
              color="yellow"
              :elevation="hover ? 24 : 6"
              @click.stop="userEdit(item.id_tfl)"
            >
              mdi-pencil
            </v-icon>          
          </template>
            <template v-slot:[`item.action_s`]="{ item }">            
            <v-icon
              color="red"
              :elevation="hover ? 24 : 6"
              @click.stop="userDelete(item.id_tfl)"
            >
              mdi-delete
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

</v-col>


                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="addtransference_personnel.reason_1"
                        :counter="100"
                        outlined
                        label="ขอย้ายสับเปลี่ยนตำแหน่งกับ (นาย/นาง/นางสาว) :"
                        prepend-icon="mdi-account-details"
                        request
                        :rules="[(v) => !!v || '']"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="3">
                      <v-text-field
                        v-model="addtransference_personnel.reason_1"
                        :counter="100"
                        outlined
                        label="ตำแหน่ง :"
                        prepend-icon="mdi-account-star"
                        request
                        :rules="[(v) => !!v || '']"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="3">
                      <v-text-field
                        v-model="addtransference_personnel.reason_1"
                        :counter="100"
                        outlined
                        label="วิทยฐานะ :"
                        prepend-icon="mdi-account-details"
                        request
                        :rules="[(v) => !!v || '']"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-text-field
                        v-model="addtransference_personnel.reason_1"
                        :counter="100"
                        outlined
                        label="เลขที่ตำแหน่ง :"
                        prepend-icon="mdi-account-details"
                        request
                        :rules="[(v) => !!v || '']"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-text-field
                        v-model="addtransference_personnel.reason_1"
                        :counter="100"
                        outlined
                        label="สังกัด :"
                        prepend-icon="mdi-flag-variant"
                        request
                        :rules="[(v) => !!v || '']"
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
                <v-card>
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
                      <v-text-field :disabled="!move_spouse" label="ภูมิลำเนาของคู่สมรส จังหวัด : "></v-text-field>
                    </v-row>
                    <v-row align="center">
                      <v-card-title>
                        <div class="font-weight-light v-size--x-large">ย้ายเพื่อดูแลบิดา มารดา :</div>
                      </v-card-title>
                      <v-checkbox v-model="move_parents" hide-details class="shrink mr-2 mt-0"></v-checkbox>
                      <v-text-field :disabled="!move_parents" label="อายุของบิดาปี"></v-text-field>
                      <v-text-field :disabled="!move_parents" label="อายุของมารดาปี"></v-text-field>
                      <v-text-field
                        :disabled="!move_parents"
                        label="ภูมิลำเนาของบิดา มารดา จังหวัด"
                      ></v-text-field>
                    </v-row>
                    <v-row align="center">
                      <v-card-title>
                        <div
                          class="font-weight-light v-size--x-large"
                        >ย้ายกลับภูมิลำเนาของข้าพเจ้า จังหวัด :</div>
                      </v-card-title>
                      <v-checkbox v-model="move_domicile" hide-details class="shrink mr-2 mt-0"></v-checkbox>
                      <v-text-field :disabled="!move_domicile" label="จังหวัด : "></v-text-field>
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
                    :counter="173"
                    dense
                    filled                    
                    request
                    :rules="[(v) => !!v || '']"
                    disabled
                  >{{ selected }}</v-textarea>
                  <v-row class="pa-4 mt-0">
                    <v-col cols="12" sm="4">
                      <v-checkbox
                        v-model="selected"
                        label="สำเนา กพ.7/ก.ค.ศ.16 ที่เป็นปัจจุบัน"
                        value="สำเนา กพ.7/ก.ค.ศ.16 ที่เป็นปัจจุบัน"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-checkbox
                        v-model="selected"
                        label="สำเนาทะเบียนบ้านของตน"
                        value="สำเนาทะเบียนบ้านของตน"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-checkbox
                        v-model="selected"
                        label="สำเนาทะเบียนบ้านของบิดา มารดา"
                        value="สำเนาทะเบียนบ้านของบิดามารดา"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-checkbox
                        v-model="selected"
                        label="สำเนาทะเบียนบ้านของคู่สมรส"
                        value="สำเนาทะเบียนบ้านของคู่สมรส"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-checkbox
                        v-model="selected"
                        label="สำเนาทะเบียนสมรส"
                        value="สำเนาทะเบียนสมรส"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-checkbox
                        v-model="selected"
                        label="สำเนาคำสั่งย้ายไปดำรงตำแหน่งใหม่ของคู่สมรส"
                        value="สำเนาคำสั่งย้ายไปดำรงตำแหน่งใหม่ของคู่สมรส"
                      ></v-checkbox>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
            <v-card class="pa-1">
              <v-card-text>
                <v-row align="center" justify="space-around">
                  <div>
                    <v-btn
                      x-large
                      color="success"
                      dark
                      class="ma-2"
                      @click.stop="addtransference_personnelSubmit()"
                      round
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
                      round
                    >
                      <v-icon>mdi-close</v-icon>
                      <span>ยกเลิก</span>
                    </v-btn>
                  </div>
                </v-row>
              </v-card-text>
            </v-card>         
        </base-material-card>

         <!--addtransference_locationdialog  -->
      <v-layout row justify-center>
        <v-dialog v-model="addtransference_locationdialog" persistent max-width="50%">
          <v-card class="mx-auto pa-5" :elevation="hover ? 24 : 6">
            <base-material-card
              icon="mdi-account-multiple"
              title="เลือกวิทยาลัย"
              class="px-5 py-3 text_google"
              :elevation="hover ? 24 : 6"
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
                round
                ><v-icon dark>mdi-close</v-icon> ยกเลิก</v-btn
              >
              <v-btn
                large
                color="success"
                @click.stop="addtransference_locationSubmit()"
                round
              >
                <v-icon dark>mdi-content-save</v-icon>&nbsp;&nbsp;บันทึก
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
      </v-col>
    </v-row>   
    
  </v-container>
</template>

<script>
export default {

  data: () => ({
 loading: true,    
     ApiKey: 'HRvec2021',
    isHidden: false,
    isHidden_service_gov: false,
    move_spouse: false,
    move_parents: false,
    move_domicile: false,
    another_reason: false,
    service_gov:false,
     addtransference_locationdialog: false,
 user: {},
    selected: [],
    reason_transfer: [],
    transference_personnel: [],
    transference_locations:[],
    addtransference_personnel: {},
    provinces: [],
    prefectures: [],
    district: [],
    district_post_s: [],
    password: null,
    snackbar: {
      show: false,
      color: "",
      timeout: 5000,
      icon: "",
      text: "",
    },
    order_need:[1,2,3],
    header_transference_location:[
    {text: "ลำดับ",align:"",value:"sequence_n"},
    {text: "สาขาวิชา",align:"",value:"id_branch"},
    {text: "วิทยาลัย",align:"",value:"college_code"},

    ],
    education_s: [
      {
        title: "ต่ำกว่าปริญญาตรี",
        faculty: "",
        time: "10:42am",
        branch: "",
        color: "deep-purple lighten-1",
      },
      {
        title: "ปริญญาตรี",
        time: "10:42am",
        faculty: "บธ.บ.",
        branch: "ระบบสารสนเทศทางคอมพิวเตอร์",
        color: "green",
      },
      {
        title: "ปริญญาโท",
        faculty: "",
        time: "10:42am",
        branch: "",
        color: "deep-purple lighten-1",
      },
      {
        title: "ปริญญาเอก",
        faculty: "",
        time: "10:42am",
        branch: "",
        color: "deep-purple lighten-1",
      },
    ],

    isEditing: null,
    model: null,
    show1: false,
    
  }),

  async mounted() {
    let result_branch
        result_branch = await this.$http.post('branch.php', {
        ApiKey: this.ApiKey       
      })
      this.branch_s = result_branch.data      
      
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
  },

  methods: {  
     async transference_locationQueryAll() {
          this.loading = true
        let result = await this.$http.post('transference_location.php', {
          ApiKey: this.ApiKey,id_ref: this.id_ref       
        }).finally(() => this.loading = false)
        this.transference_locations = result.data      
      },

    async addtransference_location() {     
      this.addtransference_locationdialog = true;
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
          this.snackbar.icon = "error";
          this.snackbar.color = "red";
          this.snackbar.text = "บันทึกข้อมูลผิดพลาด รหัสบัตรประชาชนซ้ำ";
          this.snackbar.show = true;
        }
        this.addtransference_locationdialog = false
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
<style>
@import url("https://fonts.googleapis.com/css2?family=Kanit:wght@300&display=swap");
</style>

<style>
.text_google {
  font-family: "Kanit", sans-serif;
}
</style>