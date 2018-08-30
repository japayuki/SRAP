import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Search from '@/components/Search'
import Profile from '@/components/Profile'
import AddMember from '@/components/AddMember'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/profile/:id',
      name: 'Profile',
      component: Profile
    }
    ,
    {
      path: '/addmember',
      name: 'AddMember',
      component: AddMember
    }
  ]
})
