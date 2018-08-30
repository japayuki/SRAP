<template>
  <v-container fluid grid-list-xl>
    <v-layout row wrap class="ma-1">
      <v-flex xs12 sm12 md12  v-if="showSearch">
        <v-card>  
          <v-app top-toolbar id="searchCard" style="min-height: 0;" standalone>
            <v-toolbar class="blue-grey darken-2">
            <v-toolbar-title class="white--text">Search</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon class="white--text">search</v-icon>
              </v-btn>
            </v-toolbar>
            <main>
              <v-form @keyup.native.enter="searchMember">
                <v-layout row wrap class="mx-4 my-4">
                  <v-flex xs12>
                    <v-text-field label="Member ID" v-model="memberid"></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field label="Last Name" v-model="lastname"></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-btn class="deep-orange darken-2 white--text mb-4" @click="searchMember">Search</v-btn>
                  </v-flex>
                </v-layout>
              </v-form>  
            </main>
          </v-app>
        </v-card>
      </v-flex>
      <v-flex xs12 sm12 md12 v-if="showTable">
        <v-card>
          <v-app top-toolbar id="tableCard" style="min-height: 0">
            <v-toolbar class="blue-grey darken-2">
              <v-btn icon @click="backToSearch">
                <v-icon class="white--text" >arrow_back</v-icon>
              </v-btn>
            <v-toolbar-title class="white--text">Search Results</v-toolbar-title>
            </v-toolbar>
            <main>
              <v-card>
                <v-data-table
                    v-bind:headers="headers"
                    v-bind:pagination.sync="pagination"
                    :items="items"
                    class="elevation-1"
                  >
                  <template slot="headerCell" scope="props">
                    <span v-tooltip:bottom="{ 'html': props.header.text }">
                      {{ props.header.text }}
                    </span>
                  </template>
                  <template slot="items" scope="props">
                    <td class="text-xs-left"><router-link style="font-size:14px" class="deep-orange--text text--darken-2" v-bind:to="'/profile/'+props.item.id">{{ props.item.memberid }}</router-link></td>
                    <td class="text-xs-left">{{ props.item.lastname }}</td>
                    <td class="text-xs-left">{{ props.item.firstname }}</td>
                    <td class="text-xs-left">{{ props.item.address }}</td>
                  </template>
                </v-data-table>
              </v-card>
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
    name: 'search',
     data () {
      return {
        memberid: '',
        lastname: '',
        showTable: false,
        showSearch: true,
        max25chars: (v) => v.length <= 25 || 'Input too long!',
        tmp: '',
        search: '',
        pagination: {rowsPerPage:10},
        headers: [
          {
            text: 'Member ID',
            align: 'left',
            value: 'memberid'
          },
          { text: 'Last Name', value: 'lastname', align: 'left' },
          { text: 'First Name', value: 'firstname', align: 'left' },
          { text: 'Address', value: 'address' , align: 'left'}
        ],
        items: []
      }
    },
    methods: {
      async searchMember () {
      if (this.memberid && !this.lastname){
        const response = await dataService.search({
          type: 'memberId',
          memberid: this.memberid
        });
        this.items = response.data
      } else if (!this.memberid && this.lastname) {
        const response = await dataService.search({
          type: 'lastName',
          lastname: dataService.capitalize(this.lastname)
        })
        this.items = response.data
      } else if (!this.memberid && !this.lastname) {
        const response = await dataService.search({
          type: 'none'
        })
        this.items = response.data
      }
        this.showSearch = false;
        this.showTable = true;
    },
      backToSearch (){
        this.showSearch = true;
        this.showTable = false;
      }
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


