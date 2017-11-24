import Home from 'page/home/app'
import Dashboard from 'page/home/pages/dashboard/app'
import Login from 'page/home/pages/login/app'
// import TableReset from 'page/home/pages/tablereset/app'
// import ResetPin from 'page/home/pages/tablereset/subpages/reset/app'
import TopUp from 'page/home/pages/topup/app'

const config = {
  api: {
    timeout: 150000,
    url: {
      paymentaux: {
        dev: 'http://dev-micro.mentimun.co.id/paymentaux',
        prod: 'https://www.mentimun.co.id/paymentaux'
      }
    }
  },
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      redirect: '/home/dashboard'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'login',
          name: 'M-Pay Dashboard',
          component: Login
        },
        // {
        //   path: 'tablereset',
        //   name: 'Data Request Reset PIN',
        //   component: TableReset
        // }
        // {
        //   path: 'reset',
        //   name: 'Reset PIN',
        //   component: ResetPin
        // },
        {
          path: 'topup',
          name: 'Data Top Up',
          component: TopUp
        }
      ]
    }
  ],
  toolbar: [
    {
      title: 'Dashboard',
      icon: 'dashboard',
      route: 'dashboard'
    },
    // {
    //   title: 'Reset PIN',
    //   icon: 'fiber_pin',
    //   route: 'tablereset'
    // },
    {
      title: 'Top Up',
      icon: 'account_balance_wallet',
      route: 'topup'
    }
  ]
}

const getConfig = (env) => {
  return {
    ...config,
    api: {
      timeout: config.api.timeout,
      url: {
        paymentaux: config.api.url.paymentaux[env]
      }
    }
  }
}

export default getConfig('dev')
