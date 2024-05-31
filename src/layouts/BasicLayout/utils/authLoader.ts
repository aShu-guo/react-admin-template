const getMenuList = () =>
  new Promise((resolve) => {
    setTimeout(
      () =>
        resolve([
          {
            name: 'Index',
            path: '/',
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

const authLoader = async () => {
  // const data = await get(AuthApis.getMenuList);
  const menuList = await getMenuList();
  console.log('>>menuList:', menuList);
  return { menuList };
};

export default authLoader;
