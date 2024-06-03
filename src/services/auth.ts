const AuthApis = {
  doLogin: '/doLogin',
  getMenuList: '/uavShareManage/sysUser/getCurrentUserMenuList',
};

export const getMenuList = () =>
  new Promise((resolve) => {
    setTimeout(
      () =>
        resolve([
          {
            name: 'Index',
            path: '/',
            index: true,
            component: 'Dashboard',
            title: 'Dashboard',
            icon: 'DashboardOutlined',
          },
          {
            name: 'Form',
            path: '/form',
            title: '表单页',
            component: 'FormPage',
            icon: 'EditOutlined',
          },
          {
            name: 'Table',
            path: '/table',
            title: '列表页',
            component: 'TablePage',
            icon: 'TableOutlined',
          },
          {
            name: 'Detail',
            path: '/detail',
            title: '详情页',
            component: 'DetailPage',
            icon: 'BarsOutlined',
          },
          {
            name: 'Person',
            path: '/account',
            title: '个人页',
            component: 'DetailPage',
            icon: 'UserOutlined',
            children: [
              {
                name: 'Center',
                path: '/account/center',
                title: '个人中心',
                component: 'AccountCenter',
                icon: 'BarsOutlined',
              },
              {
                name: 'Settings',
                path: '/account/settings',
                title: '个人设置',
                component: 'AccountSettings',
                icon: 'BarsOutlined',
              },
            ],
          },
        ]),
      1000,
    );
  });

export default AuthApis;
