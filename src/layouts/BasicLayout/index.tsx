import React, { Suspense, useState } from 'react';
import {
  Navigate,
  NonIndexRouteObject,
  Outlet,
  useLoaderData,
  useLocation,
  useMatches,
  useNavigate,
} from 'react-router-dom';
import { ConfigProvider, Layout, Menu, MenuProps, Spin, theme } from 'antd';
import HeaderComp from './components/Header';
import NoAuthPage from '@pages/NoAuth';
import 'antd/dist/reset.css';
import useUserinfoStore from '@stores/userinfo';
import { mapPermissionToMenu } from './utils';
import zhCN from 'antd/locale/zh_CN';

type RouteType = NonIndexRouteObject & {
  title: string;
  icon: React.ReactElement;
};

const { Header, Content, Footer, Sider } = Layout;

const BasicLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { userinfo } = useUserinfoStore();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { menuList } = useLoaderData() as any;
  const route = useMatches();

  const isAdmin = true;

  const menuItems: MenuProps['items'] = mapPermissionToMenu(menuList);

  const onMenuClick: MenuProps['onClick'] = ({ key }) => {
    navigate(key);
  };

  if (!userinfo) {
    return <Navigate to="/login" replace={true} />;
  }

  const renderOpenKeys = () => {
    const arr = pathname.split('/').slice(0, -1);
    const result = arr.map((_, index) => '/' + arr.slice(1, index + 1).join('/'));
    return result;
  };

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: 'red',
        },
      }}
    >
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
          }}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div
            style={{
              height: 32,
              margin: 16,
              background: 'rgba(255, 255, 255, 0.2)',
            }}
          />
          <Menu
            theme="dark"
            defaultSelectedKeys={[pathname]}
            defaultOpenKeys={renderOpenKeys()}
            mode="inline"
            items={menuItems}
            onClick={onMenuClick}
          />
        </Sider>
        <Layout className="site-layout">
          <Header style={{ padding: '0 10px', background: colorBgContainer }}>
            <HeaderComp />
          </Header>
          {/* height：Header和Footer的默认高度是64 */}
          <Content
            style={{
              padding: 16,
              overflow: 'auto',
              height: `calc(100vh - 128px)`,
            }}
          >
            {isAdmin ? (
              <Suspense fallback={<Spin size="large" className="content_spin" />}>
                <Outlet />
              </Suspense>
            ) : (
              <NoAuthPage />
            )}
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            react template admin ©2023 Created by Jade
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default BasicLayout;
