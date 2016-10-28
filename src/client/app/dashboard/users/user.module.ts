import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import {UsersComponent} from "./users.component";
import {UserListComponent} from "./user-list/user-list.component";
import { UserItemComponent } from './user-list/user-item.component';
import { UserStartComponent } from './user-start.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import {UserEditComponent} from "./user-edit/user-edit.component";

@NgModule({
declarations:[UsersComponent, UserListComponent, UserItemComponent, UserStartComponent, UserDetailComponent, UserEditComponent],
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule, InfiniteScrollModule],
  exports:[RouterModule]
})
export class UserModule{}
