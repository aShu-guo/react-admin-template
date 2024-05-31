import React, { lazy } from 'react';
import NotFound from '@pages/NotFound';

const Dashboard = lazy(() => import('@pages/Dashboard'));
const FormPage = lazy(() => import('@pages/Form'));
const TablePage = lazy(() => import('@pages/Table'));
const AccountCenter = lazy(() => import('@pages/Account/AccountCenter'));
const AccountSettings = lazy(() => import('@pages/Account/AccountSettings'));
const DetailPage = lazy(() => import('@pages/Detail'));

const PageMap = new Map([
  ['Dashboard', Dashboard],
  ['FormPage', FormPage],
  ['TablePage', TablePage],
  ['AccountCenter', AccountCenter],
  ['AccountSettings', AccountSettings],
  ['DetailPage', DetailPage],
]);

const lazyLoadPage = (moduleName: string) => {
  const Module = PageMap.get(moduleName);
  return Module ? <Module /> : <NotFound />;
};

const getNavigatorPath = (moduleName: string) => {
  // todo 根据模块名称返回path
};

export { getNavigatorPath };

export default lazyLoadPage;
