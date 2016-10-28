import {Component, OnInit, ElementRef} from '@angular/core';
import {Observable} from "rxjs";
import {UserService} from "../../../shared/services/user.service";
import {User} from "../../../shared/classes/user";

@Component({
  moduleId: module.id,
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styles:[`.search-results {height: 600px;overflow: scroll;}`]
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  private totalUsers:number;
  public inputValue:string;
  private delay:number = 200;
  private page:number = 1;
  constructor(private userService:UserService,
              private elementRef: ElementRef) {
    const eventStream = Observable.fromEvent(elementRef.nativeElement, 'keyup')
      .map(() => this.inputValue).debounceTime(this.delay).distinctUntilChanged();
    eventStream.subscribe(input => this.getUsers(true)
    );
  }

  ngOnInit() {
    this.getUsers(false);
  }
  onScrollDown() {
    if(this.users.length < this.totalUsers){
      this.page++;
      this.getUsers(false);
    }
  }
  getUsers(op:boolean){
    if(op) this.page = 1;
    this.userService.getUsers(this.inputValue, this.page).subscribe(
      data => {
        if(data.hasOwnProperty('count') && data.count){
          this.totalUsers = data.total;
          if(op){
            this.users = data.result;
          } else{
            this.users.push(...data.result);
          }
        }
      }
    );
  }

}
