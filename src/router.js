import Vue from 'vue';
import Router from 'vue-router';
//Views
// import Home from './views/Home.vue';
// import Users from './views/Users.vue';
// import UsersPosts from './views/UsersPosts.vue';
// import UsersProfile from './views/UsersProfile.vue';
// import HeaderHome from './views/HeaderHome.vue';
// import HeaderUsers from './views/HeaderUsers.vue';

const Home = () => import('./views/Home.vue');
const Users = () => import('./views/Users.vue');
const UsersPosts = () => import('./views/UsersPosts.vue');
const UsersProfile = () => import('./views/UsersProfile.vue');
const HeaderHome = () => import('./views/HeaderHome.vue');
const HeaderUsers = () => import('./views/HeaderUsers.vue');

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      components: {
        default: Home,
        header: HeaderHome,
      },
      beforeEnter(to, from, next) {
        next();
      },
    },
    {
      path: '/users/:id',
      components: {
        default: Users,
        header: HeaderUsers,
      },
      props: {
        default: true,
        header: false,
      },
      children: [
        { path: 'posts', component: UsersPosts },
        { path: 'profile', component: UsersProfile, name: 'users-id-profile' },
      ],
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
  scrollBehavior(to, from, savedPotition) {
    // return new Promise(resolve => {
    //   this.app.$root.$once('triggerScroll', () => {
    //     resolve({ x: 0, y: 100 });
    //   });
    // });
    if (savedPotition) {
      return savedPotition;
    }
    if (to.hash) {
      return { selector: to.hash };
    }
    return { x: 0, y: 0 };
  },
});
