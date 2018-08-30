<template>
  <v-container fluid grid-list-xl>
    <v-layout row wrap class="ma-0" >
      <v-flex xs12 sm12 md12>
        <v-card>  
          <v-app top-toolbar id="addMemberCard" style="min-height: 0;" standalone>
            <v-toolbar class="blue-grey darken-2">
            <v-toolbar-title class="white--text text--darken-4">Add Member</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <main>
              <!-- <v-container> -->
                <v-form v-model="valid" ref="form" class="mx-4 my-4">
                  <v-layout row>
                    <v-flex md12>
                      <v-text-field label="Member ID" v-model="memberid" :rules="genRules" required prepend-icon="class"></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex md6>
                      <v-text-field label="Last Name" v-model="lastname" :rules="genRules" required prepend-icon="label"></v-text-field>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field label="First Name" v-model="firstname" :rules="genRules" required prepend-icon="label_outline"></v-text-field>
                    </v-flex>
                  </v-layout>   
                  <v-layout row>
                    <v-flex md12>
                      <v-text-field label="Address" v-model="address" :rules="genRules" required prepend-icon="mail_outline"></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex md6>
                      <v-menu lazy :close-on-content-click="true" v-model="menu" transition="scale-transition" offset-y full-width :nudge-left="40" max-width="290px">
                        <v-text-field slot="activator" label="Date of Birth" v-model="birthdate" prepend-icon="event"></v-text-field>
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
                      
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex md6>
                      <v-text-field label="E-mail" v-model="email" :rules="emailRules" prepend-icon="supervisor_account"></v-text-field>
                    </v-flex>
                    <v-flex md6>
                      <v-select label="Gender" v-model="gender" :items="items" :rules="genRules" required prepend-icon="supervisor_account"></v-select>
                    </v-flex>
                  </v-layout>
                  <v-layout row dismissable v-if="showAlert">
                    <v-flex md12>
                      <v-alert :success=successFlag :error=!successFlag value="true">
                        {{alertMessage}}
                      </v-alert>
                    </v-flex>
                  </v-layout>
                  <v-checkbox class="blue-grey--text" label="Confirm information" v-model="checkbox" :rules="[(v) => !!v || 'You must agree to continue!']" required></v-checkbox>
                  <v-btn @click="submit" class="mb-4" :class="{ 'blue-grey white--text': valid, 'red white--text': !valid }">submit</v-btn>
                  <v-btn @click="clear" class="mb-4">clear</v-btn>
                </v-form>
              <!-- </v-container> -->
            </main>
          </v-app>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import dataService from '@/services/DataService'

  export default {
    name: 'addmember',
    data () {
      return {
        memberid: '',
        lastname: '',
        firstname: '',
        address: '',
        email: '',
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
        items: [
          'Male',
          'Female'
        ],
        checkbox: false,
        showAlert: false,
        successFlag: true,
        alertMessage: '',
        alertTimeout: 3000
      }
    },
    methods: {
      async submit () {
        if (this.$refs.form.validate()) {
          let newUser = {
            memberid: this.memberid,
            lastname: dataService.capitalize(this.lastname),
            firstname: dataService.capitalize(this.firstname),
            address: this.address,
            birthdate: this.birthdate,
            email: this.email,
            gender: this.gender
          }
          const response = await dataService.register(newUser);
          if (response.status == "200" && !response.data.errmsg){
            this.successFlag = true
            this.alertMessage = "Success! User has been registered."
            this.alertTimeout = 3000
            this.showAlert = true
            this.$refs.form.reset()
          } else if (response.data.errmsg){
            this.successFlag = false
            this.alertMessage = "Error:"+response.data.errmsg
            this.alertTimeout = 5000
            this.showAlert = true
          } else {
            this.successFlag = false
            this.alertMessage = "Error:"+response.data.error.message
            this.showAlert = true
          }
          setTimeout(() => {
            this.showAlert = false;
          }, this.alertTimeout)
        }
      },
      clear () {
        this.$refs.form.reset()
      }
    }

  }
</script

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
