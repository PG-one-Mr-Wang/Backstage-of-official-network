import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/Login';
import Home from '@/views/Home';
import Navigation from '@/views/Module/navigation';
import Banner from '@/views/Module/banner';
import Imgtext from '@/views/Module/imgtext';
import News from '@/views/Module/news';
import Journal from '@/views/Module/journal';
import Staylanguage from '@/views/Module/staylanguage';
import Users from '@/views/Users/users';
import Password from '@/views/Password/password';
// import Backups from '@/views/data/backups';
// import Reduction from '@/views/data/reduction';

import { Message } from 'element-ui';

Vue.use(Router);

const router = new Router({
  routes: [
    {name: 'Login', path: '/login', component: Login},
    {name: 'Home',
      path: '/',
      component: Home,
      children:[
        {name: 'Navigation', path: '/navigation', component: Navigation},
        {name: 'Banner', path: '/banner', component: Banner},
        {name: 'Imgtext', path: '/imgtext', component: Imgtext},
        {name: 'News', path: '/news', component: News},
        {name: 'Users', path: '/users', component: Users},
        {name: 'Password', path: '/password', component: Password},
        {name: 'Journal', path: '/journal', component: Journal},
        {name: 'Staylanguage', path: '/staylanguage', component: Staylanguage}
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  // console.log(to);
  // console.log(from);
  // next();
  // 如果是登录的时候不判断token ，不是登录才判断token
  // console.log(to);
  if (to.name && to.name.toLocaleLowerCase() !== 'login') {
    // 判断token
    const token = sessionStorage.getItem('token');
    if (!token) {
      // 没有token,跳转到登录页面
      // this.$router.push('/login')
      router.push('/login');
      // 提示
      // this.$message.warning('请先登录');
      Message.warning('请先登录');
      return;
    }
  }
  next();
});

export default router;
