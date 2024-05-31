import React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import 'antd/dist/reset.css';
import 'uno.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes/router';
import { getMenuList } from '@services/auth';
import { mapPermissionToRoute, UserPermission } from '@layouts/BasicLayout/utils';

dayjs.locale('zh-cn');

const App: React.FC = () => {
  useEffect(() => {
    getMenuList().then((menuList) => {
      const subRoutes = router.routes[0].children![0];
      const routes = mapPermissionToRoute(menuList as UserPermission[]);

      if (subRoutes.children && subRoutes.children.length <= 1) {
        subRoutes.children = routes.concat(subRoutes.children ?? []);
      }
    });
    setTimeout(() => {
      console.log('>>>>routes:', router.routes);
    });
  }, []);

  return <RouterProvider router={router} />;
};

export default App;
