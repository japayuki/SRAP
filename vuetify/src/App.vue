<template>
  <v-app id="contacts">
    <v-navigation-drawer
      class="pb-0"
      persistent
      enable-resize-watcher
      clipped
      height="100%"
      light
      v-model="drawer">
      <!-- <v-list dense>
        <v-list-group v-if="item.children" v-model="item.model" no-action>
          <v-list-tile slot="item">
            <v-list-action>
              <v-icon class="mr-3">{{item.icon}}</v-icon>
            </v-list-action>
            <v-list-content>{{item.text}}</v-list-content>
          </v-list-tile>
        </v-list-group>
        
      </v-list> -->
      <v-list dense>
        <template v-for="(item, i) in sidebarItems">
          <!-- <v-layout
            row
            v-if="item.heading"
            align-center
            :key="i"
            
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout> -->
          <v-list-group v-if="item.children" v-model="item.model" no-action>
            <v-list-tile slot="item" @click="">
              <v-list-tile-action>
                <v-icon>{{ item.model ? item.icon : item['icon-alt'] }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content  >
                <v-list-tile-title> 
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i"
              @click=""
              router :to="child.link"
            >
              <v-list-tile-action v-if="child.icon">
                <v-icon class="deep-orange--text">{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile router :to="item.link" v-else @click="">
            <v-list-tile-action>
              <v-icon class="deep-orange--text">{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content >
              <v-list-tile-title  class="blue-grey--text text--darken-4">
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="blue-grey darken-3" dark fixed>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>SRAP-MPC</v-toolbar-title>
    </v-toolbar>
    <main>
      <!-- <v-container fluid> -->
        <router-view></router-view>
      <!-- </v-container> -->
    </main>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: true,
      sidebarItems: [
        { icon: 'home', text: 'Home', link: '/' },
        // { icon: 'search', text: 'Search', link: '/search' },
        // { icon: 'content_copy', text: 'Duplicates' },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Members',
          model: true,
          children: [
            { icon: 'search', text: 'Search', link: '/search' },
            { icon: 'add', text: 'Add Member', link: '/search' }
          ]
        },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'More' ,
          model: false,
          children: [
            { text: 'Import' },
            { text: 'Export' },
            { text: 'Print' },
            { text: 'Undo changes' },
            { text: 'Other contacts' }
          ]
        },
        { icon: 'settings', text: 'Settings' },
        { icon: 'chat_bubble', text: 'Send feedback' },
        { icon: 'help', text: 'Help' },
        { icon: 'phonelink', text: 'App downloads' },
        { icon: 'keyboard', text: 'Got to the old version' }
      ]
    })
  }
</script>

<style lang="stylus">
  body, html
    font-size: 15px
  #contacts
    main .container
      height: 660px

  .list__tile--active, 
  .navigation-drawer > .list .list__tile--active > *:first-child .icon,
  .navigation-drawer > .list .list--group__header--active .list__tile__action:first-of-type .icon,
  .navigation-drawer > .list .list--group__container .list__tile--active .list__tile__title   
    color: #111
  .list--dense .list__tile 
    font-size: 15px;

</style>
