<template>
  <v-app>
  <v-container fluid grid-list-xl>
    <v-layout row wrap class="ma-1">
      <v-flex xs12 sm12 md12>
        <v-card>  
          <v-app top-toolbar id="profileCard" style="min-height: 0;" standalone>
            <v-toolbar  :class="{ 'blue-grey darken-1': isReadOnly, 'deep-orange darken-4': !isReadOnly }">
              <v-btn dark icon>
                <span v-tooltip:bottom="{html:'Edit Member Profile'}"><v-icon circle @click="isReadOnly = !isReadOnly">border_color</v-icon></span>
              </v-btn>
              <v-toolbar-title class="white--text">Member Profile</v-toolbar-title>
              <v-spacer></v-spacer>

            </v-toolbar>
            <main>
              <!-- <v-container fluid> -->
                <v-form v-model="valid" ref="form" class="ma-3">
                  <v-layout row>
                    <v-flex md12>
                      <v-text-field label="Member ID" v-model="memberid" :rules="genRules" required :readonly="isReadOnly" prepend-icon="class"></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex md6>
                      <v-text-field label="Last Name" v-model="lastname" :rules="genRules" required :readonly=isReadOnly prepend-icon="label"></v-text-field>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field label="First Name" v-model="firstname" :rules="genRules" required :readonly=isReadOnly prepend-icon="label_outline"></v-text-field>
                    </v-flex>
                  </v-layout>   
                  <v-layout row>
                    <v-flex md12>
                      <v-text-field label="Address" v-model="address" :rules="genRules" required :readonly=isReadOnly prepend-icon="mail_outline"></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex md6>
                      <v-menu lazy :close-on-content-click="true" v-model="menu" transition="scale-transition" offset-y full-width :nudge-left="40" max-width="290px">
                        <v-text-field slot="activator" label="Date of Birth" v-model="birthdate" :readonly=isReadOnly prepend-icon="event"></v-text-field>
                        <v-date-picker v-model="birthdate" no-title scrollable actions>
                          <template scope="{ save, cancel }">
                            <v-card-actions>
                              <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
                              <v-btn flat primary @click.native="save()">Save</v-btn>
                            </v-card-actions>
                          </template>
                        </v-date-picker>
                      </v-menu>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field label="Age" v-model="age" prepend-icon="hourglass_empty"></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex md6>
                      <v-text-field label="E-mail" v-model="email" :rules="emailRules" :readonly="isReadOnly" prepend-icon="email"></v-text-field>
                    </v-flex>
                    <v-flex md6>
                      <v-select label="Gender" v-model="gender" :items="genderTypes" :rules="genRules" required :readonly=isReadOnly prepend-icon="supervisor_account"></v-select>
                    </v-flex>
                  </v-layout>
                  <!-- Accounts Table -->
                  <v-card class="mb-3">  
                    <v-app top-toolbar style="min-height: 0;" >
                      <v-toolbar dark class="blue-grey ligthen-1">
                      <v-btn @click.native.stop="callDialog1" icon>
                        <span v-tooltip:bottom="{html:'Add New Account'}"><v-icon >add_circle</v-icon></span>
                      </v-btn>
                      <v-toolbar-title >Accounts</v-toolbar-title>
                        <v-spacer></v-spacer>

                      </v-toolbar>
                      <main>
                      <v-data-table v-bind:headers="headers" v-bind:pagination.sync="pagination" :items="items" class="elevation-1">
                        <template slot="headerCell" scope="props">
                          <span v-tooltip:bottom="{ 'html': props.header.text }">
                            {{ props.header.text }}
                          </span>
                        </template>
                        <template slot="items" scope="props">
                          <td class="text-xs-left"><a v-scroll-to="'#accountDetailsTable'" @click="fetchAccountDetails(props.item.accountnumber)" style="font-size:14px; cursor:pointer;" class="deep-orange--text text--darken-2" to="#">{{ props.item.accountnumber }}</a></td>
                          <td class="text-xs-left">{{ props.item.accounttype }}</td>
                          <td class="text-xs-right">{{ props.item.credit.toFixed(2) }}</td>
                          <td class="text-xs-right">{{ props.item.debit.toFixed(2) }}</td>
                          <td class="text-xs-right">{{ props.item.balance.toFixed(2) }}</td>
                        </template>
                      </v-data-table>
                      </main>
                    </v-app>
                  </v-card>
                  <!-- Account Details Table -->
                  <div id="accountDetailsTable">
                    <v-card class="mb-3" v-if="showAccountDetails" >  
                      <v-app top-toolbar style="min-height: 0;" >
                        <v-toolbar light>
                        <v-btn @click.native.stop="callDialog2" class="deep-orange--text text--darken-2" icon>
                          <span v-tooltip:bottom="{html:'Add New Transaction'}"><v-icon>add_circle_outline</v-icon></span>
                        </v-btn>
                        <v-toolbar-title class="blue-grey--text text--darken-2">Account Details</v-toolbar-title>
                          <v-spacer></v-spacer>
                        <v-btn class="blue-grey--text text--darken-2" icon>
                          <span v-tooltip:bottom="{html:'Close this panel'}"><v-icon @click="showAccountDetails = false">close</v-icon></span>
                        </v-btn>
                        </v-toolbar>
                        <main>
                        <v-data-table v-bind:headers="accountDetailsHeaders" v-bind:pagination.sync="pagination" :items="accountDetailsItems" class="elevation-1">
                          <template slot="headerCell" scope="props">
                            <span v-tooltip:bottom="{ 'html': props.header.text }">
                              {{ props.header.text }}
                            </span>
                          </template>
                          <template slot="items" scope="props">
                            <td class="text-xs-left">{{ props.item.transactiondatetime }}</td>
                            <td class="text-xs-left">{{ props.item.accountnumber }}</td>
                            <td class="text-xs-left">{{ props.item.accounttype }}</td>
                            <td class="text-xs-right">{{ props.item.credit.toFixed(2) }}</td>
                            <td class="text-xs-right">{{ props.item.debit.toFixed(2) }}</td>
                            <td class="text-xs-left">{{ props.item.operator }}</td>
                          </template>
                        </v-data-table>
                        </main>
                      </v-app>
                    </v-card>
                  </div>
                  <v-layout row v-if="showAlert">
                    <v-flex md12>
                      <v-alert :success=successFlag :error=!successFlag value="true">
                        {{alertMessage}}
                      </v-alert>
                    </v-flex>
                  </v-layout>
                  <v-layout v-if="!isReadOnly">
                    <v-flex md12>
                      <v-checkbox class="blue-grey--text" label="Confirm changes" v-model="checkbox" :rules="[(v) => !!v || 'You must agree to continue!']" required></v-checkbox>
                      <v-btn @click="update" class="mb-4" :class="{ 'blue-grey white--text': valid, 'red white--text': !valid }">update</v-btn>
                      <v-btn @click="clear" class="mb-4">clear</v-btn>
                    </v-flex>
                  </v-layout>
                </v-form>
                
                
              <!-- </v-container> -->
            </main>
            <!-- DIALOG1 -->
            <v-layout row justify-center>
              <v-dialog v-model="dialog1" width="50%">
                <!-- <v-btn primary dark slot="activator">Open Dialog</v-btn> -->
                <v-card>
                  <v-toolbar dark class="blue-grey darken-2">
                    <v-toolbar-title class="headline">Add New Account</v-toolbar-title>
                  </v-toolbar> 
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12 sm6 md4>
                          <v-text-field label="Member ID" v-model="memberid" readonly></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field label="Last Name" v-model="lastname" readonly></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field label="Firs Name" v-model="firstname" readonly></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                          <v-select label="Account Type" v-model="accounttype" required :items="['Savings', 'Checking']"></v-select>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                          <v-text-field label="Account Number" required v-model="accountnumber"></v-text-field>
                        </v-flex>
                        <!-- <v-flex xs12 sm6 md6>
                          <v-text-field label="Deposit" type="number" v-model="credit" readonly></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                          <v-text-field label="Withdrawal" type="number" v-model="debit" readonly></v-text-field>
                        </v-flex> -->
                      </v-layout>
                    </v-container>
                    <small>*indicates required field</small>
                  </v-card-text>
                  <v-layout row class="mx-4 my-4" v-if="showAlertDialog1">
                    <v-flex md12>
                      <v-alert :success=successFlag :error=!successFlag value="true">
                        {{alertMessage}}
                      </v-alert>
                    </v-flex>
                  </v-layout>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="blue-grey--text darken-1" flat @click.native="dialog1 = false">Close</v-btn>
                    <v-btn class="blue-grey--text darken-1" flat @click.native="addTransaction">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-layout>
            <!-- DIALOG2 -->
            <v-layout row justify-center>
              <v-dialog v-model="dialog2" width="50%">
                <!-- <v-btn primary dark slot="activator">Open Dialog</v-btn> -->
                <v-card>
                  <v-toolbar dark class="blue-grey darken-2">
                    <v-toolbar-title class="headline">New Account Transaction</v-toolbar-title>
                  </v-toolbar> 
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12 sm6 md4>
                          <v-text-field label="Member ID" v-model="memberid" readonly></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field label="Last Name" v-model="lastname" readonly></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field label="Firs Name" v-model="firstname" readonly></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                          <v-text-field label="Account Type" v-model="accounttype"  readonly></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                          <v-text-field label="Account Number" v-model="accountnumber" readonly></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                          <v-text-field label="Deposit" type="number" v-model="credit"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                          <v-text-field label="Withdrawal" type="number" v-model="debit"></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-container>
                    <small>*indicates required field</small>
                  </v-card-text>
                  <v-layout row class="mx-4 my-4" v-if="showAlertDialog2">
                    <v-flex md12>
                      <v-alert :success=successFlag :error=!successFlag value="true">
                        {{alertMessage}}
                      </v-alert>
                    </v-flex>
                  </v-layout>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="blue-grey--text darken-1" flat @click.native="dialog2 = false">Close</v-btn>
                    <v-btn class="blue-grey--text darken-1" flat @click.native="addTransaction">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-layout>
          </v-app>
        </v-card>
      </v-flex>

    </v-layout>
    
  </v-container>
  </v-app>
</template>

<script>
import dataService from '@/services/DataService'
import alasql from 'alasql'

export default {
  name: 'profile',
  data () {
    return {
      id:'',
      dialog1: false,
      dialog2: false,
      memberid: '',
      lastname: '',
      firstname: '',
      address: '',
      email: '',
      age: '',
      birthdate: '',
      gender: "Male",
      e3: null,
      menu: false,
      modal: false,
      valid: false,
      genRules: [
        (v) => !!v || 'This field is required'
      ],
      email: '',
      emailRules: [
        // (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      select: null,
      genderTypes: [
        'Male',
        'Female'
      ],
      member: '',
      checkbox: false,
      isReadOnly: true,
      items: [],
      accountDetailsItems: [],
      pagination: {rowsPerPage:10},
      headers: [
        { text: 'Account Number', value: 'accountnumber',align: 'left'},
        { text: 'Account Type', value: 'accounttype', align: 'left' },
        { text: 'Total Credit', value: 'credit', align: 'right' },
        { text: 'Total Debit', value: 'debit' , align: 'right'},
        { text: 'Remaining Balance', value: 'balance' , align: 'right'},
      ],
      accountDetailsHeaders: [
        { text: 'Transaction Date/Time', value: 'transactiondatetime',align: 'left'},
        { text: 'Account Number', value: 'accountnumber', align: 'left' },
        { text: 'Account Type', value: 'accounttype', align: 'left' },
        { text: 'Credit', value: 'credit' , align: 'right'},
        { text: 'Debit', value: 'debit' , align: 'right'},
        { text: 'Received By', value: 'operator' , align: 'left'},
      ],
      res: [],
      showAccountDetails: false,
      showAlert: false,
      showAlertDialog1: false,
      showAlertDialog2: false,
      successFlag: true,
      alertMessage: '',
      accounttype: '',
      accountnumber: '',
      credit: 0.00,
      debit: 0.00,
      transactiondatetime: '',
      alertTimeout: 3000
    }
  },
  methods: {
    async update (){
      if (this.$refs.form.validate()) {
        let updateUser = {
          memberid: this.memberid,
          lastname: dataService.capitalize(this.lastname),
          firstname: dataService.capitalize(this.firstname),
          address: this.address,
          birthdate: this.birthdate,
          email: this.email,
          gender: this.gender,
          _id: this.$route.params.id
        }
        const response = await dataService.update(updateUser);
        console.log(response.data)
        if (response.status == "200" && !response.data.errmsg){
          this.successFlag = true
          this.alertMessage = "Success! User has been updated."
          this.showAlert = true
          this.isReadOnly = true;
        } else if (response.data.errmsg){
          this.successFlag = false
          this.alertMessage = "Error: "+response.data.errmsg
          this.alertTimeout = 5000
          this.showAlert = true
        } else {
          this.successFlag = false
          this.alertMessage = "Error:"+response.data.error.message
          this.alertTimeout = 5000
          this.showAlert = true
        }
        setTimeout(() => {
          this.showAlert = false;
        }, this.alertTimeout)
      }
    },
    clear () {
      this.$refs.form.reset()
    },
    async fetchProfile (id) {
      const response  = await dataService.memberProfile(id);
      this.member = response.data;
      this.memberid = this.member.memberid
      this.lastname = this.member.lastname
      this.firstname = this.member.firstname
      this.address = this.member.address
      this.email = this.member.email
      this.birthdate = dataService.convertDate(this.member.birthdate)
      this.age = dataService.getAge(this.birthdate)
      this.gender = this.member.gender
    },
    async fetchAccounts (id){
      const response  = await dataService.memberAccounts(id);
      var res = alasql(`SELECT accountnumber, accounttype, SUM(credit) AS credit, SUM(debit) AS debit, SUM(credit)-SUM(debit) as balance \
       FROM ? \
       GROUP BY accountnumber, accounttype`,[response.data]);
       if (res[0].accountnumber !== undefined){
         this.items = res
       }
       
    },
    async fetchAccountDetails (accountnumber){
      const response = await dataService.accountDetails(this.$route.params.id,accountnumber);
      this.accounttype = response.data[0].accounttype
      this.accountnumber = response.data[0].accountnumber
      const newJSON = await dataService.genJSON(response.data)
      this.accountDetailsItems = newJSON
      this.showAccountDetails = true
    },
    async addTransaction (){
      const now = new Date()
      let newTransaction = {
        transactiondatetime : now.toISOString(),
        accounttype: this.accounttype,
        accountnumber: this.accountnumber,
        credit: this.credit,
        debit: this.debit,
        // TO DO: Use logged in user
        operator: "gytaal",
      }
      console.log(newTransaction)
      const response = await dataService.newTransaction(newTransaction, this.id);
      console.log(response.data)
      if (response.status == "200"){
        this.successFlag = true
        this.alertMessage = "Success! Transaction has been registered to the database"
        this.showAlertDialog1 = true
        this.showAlertDialog2 = true
      } else if (response.status == "422"){
        this.successFlag = false
        this.alertMessage = "Error:"+response.data.error.message
        this.showAlertDialog1 = true
        this.showAlertDialog2 = true
      } else {
        this.successFlag = false
        this.alertMessage = "Error:"+response.data.error.message
        this.showAlertDialog1 = true
        this.showAlertDialog2 = true
      }
      setTimeout(() => {
        this.showAlertDialog1 = false;
        this.showAlertDialog2 = false;
        this.dialog1=false;
        this.dialog2=false;
        this.fetchAccounts(this.id)
        this.fetchAccountDetails(this.accountnumber)
      }, 3000)
    },
    callDialog1 (){
      this.showAccountDetails = false
      this.dialog1 = true;
      this.accounttype = '';
      this.accountnumber = '';
      this.credit = 0;
      this.debit = 0;
    },
    callDialog2 (){
      this.dialog2 = true;
      this.credit = 0;
      this.debit = 0;
    }
  },
  created: function () {
    this.id = this.$route.params.id;
    this.fetchProfile(this.$route.params.id);
    this.fetchAccounts(this.$route.params.id);
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table.datatable thead th span{
    font-size: 14px;
}
table.table tbody td {
    font-size: 14px;
}
</style>
