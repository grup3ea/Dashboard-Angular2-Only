import {Route} from "@angular/router";
import {UserStartComponent} from './user-start.component';
import {UserDetailComponent} from './user-detail/user-detail.component';
import {UsersComponent} from "./users.component";
import {UserEditComponent} from "./user-edit/user-edit.component";

export const UserRoutes: Route[] = [
  {path: 'users', component:UsersComponent, children:[
    {path: '', component:UserStartComponent},
    { path:'new', component:UserEditComponent},
    {path: ':id', component: UserDetailComponent},
    {path:':id/edit', component:UserEditComponent}
  ]}
];

