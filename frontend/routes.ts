import {Route} from '@vaadin/router';
import {appStore} from './stores/app-store';
import './views/helloworld/hello-world-view';
import './views/main-layout';
import Role from 'Frontend/generated/ch/martinelli/demo/entity/Role';

export type ViewRoute = Route & {
  title?: string;
  icon?: string;
  requiresLogin?: boolean;
  rolesAllowed?: Role[];
  children?: ViewRoute[];
};

export const hasAccess = (route: Route) => {
  const viewRoute = route as ViewRoute;
  if (viewRoute.requiresLogin && !appStore.loggedIn) {
    return false;
  }

  if (viewRoute.rolesAllowed) {
    return viewRoute.rolesAllowed.some((role) => appStore.isUserInRole(role));
  }
  return true;
};

export const views: ViewRoute[] = [
  // place routes below (more info https://hilla.dev/docs/routing)
  {
    path: '',
    component: 'hello-world-view',
    icon: '',
    title: '',
  },
  {
    path: 'hello-world',
    component: 'hello-world-view',
    icon: 'la la-globe',
    title: 'Hello World',
  },
  {
    path: 'master-detail',
    component: 'master-detail-view',
    rolesAllowed: [Role.ADMIN],
    icon: 'la la-columns',
    title: 'Master-Detail',
    action: async (_context, _command) => {
      if (!hasAccess(_context.route)) {
        return _command.redirect('login');
      }
      await import('./views/masterdetail/master-detail-view');
      return;
    },
  },
];
export const routes: ViewRoute[] = [
  {
    path: 'login',
    component: 'login-view',
    icon: '',
    title: 'Login',
    action: async (_context, _command) => {
      await import('./views/login/login-view');
      return;
    },
  },

  {
    path: '',
    component: 'main-layout',
    children: [...views],
  },
];
