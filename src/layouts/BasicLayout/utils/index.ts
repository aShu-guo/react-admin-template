import { RouteObject } from 'react-router-dom';
import { MenuProps } from 'antd';
import * as Icons from '@ant-design/icons';
import React from 'react';
import lazyLoadPage from '@routes/modules';

const iconList: any = Icons;

export type UserPermission = {
  name: string;
  path: string;
  component: string;
  title: string;
  icon: string;
  children?: UserPermission[];
};

export function createMenuIcon(name: string) {
  // todo 降级策略
  return React.createElement(iconList[name]);
}

// RouteObject[]

export const mapPermissionToMenu = (userPermissionList: UserPermission[]): MenuProps['items'] => {
  function loop(permissions: UserPermission[]): MenuProps['items'] {
    const raw: MenuProps['items'] = [];

    for (let i = 0; i < permissions.length; i++) {
      const permission = permissions[i];
      if (permission.children && permission.children.length > 0) {
        raw.push({
          key: permission.path,
          label: permission.title,
          icon: createMenuIcon(permission.icon),
          children: loop(permission.children),
        });
      } else {
        raw.push({
          key: permission.path,
          label: permission.title,
          icon: createMenuIcon(permission.icon),
        });
      }
    }
    return raw;
  }

  return loop(userPermissionList);
};

export const mapPermissionToRoute = (userPermissionList: UserPermission[]): RouteObject[] => {
  function loop(permissions: UserPermission[]): RouteObject[] {
    const raw: RouteObject[] = [];

    for (let i = 0; i < permissions.length; i++) {
      const permission = permissions[i];
      if (permission.children && permission.children.length > 0) {
        raw.push({
          path: permission.path,
          element: lazyLoadPage(permission.component),
          children: loop(permission.children),
        });
      } else {
        raw.push({
          path: permission.path,
          element: lazyLoadPage(permission.component),
        });
      }
    }
    return raw;
  }

  return loop(userPermissionList);
};
