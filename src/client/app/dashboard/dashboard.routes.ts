import { Route } from '@angular/router';

import { HomeRoutes } from './home/index';

import { DashboardComponent } from './index';
import {AuthGuard} from "../shared/guards/auth.guard";
import {UserRoutes} from "./users/user.route";

export const DashboardRoutes: Route[] = [
  	{
    	path: 'dashboard',
    	component: DashboardComponent,
    	children: [
	    	...HomeRoutes,
        ...UserRoutes
    	],
      canActivate: [AuthGuard]
  	}
];
