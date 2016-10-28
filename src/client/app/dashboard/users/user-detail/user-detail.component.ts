import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {UserService} from "../../../shared/services/user.service";
import {User} from "../../../shared/classes/user";

@Component({
  moduleId: module.id,
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html'
})
export class UserDetailComponent implements OnInit, OnDestroy {
  selectedUser: User;
  private user_id:string;
  private subscription: Subscription;

  constructor(private userService:UserService,
              private route:ActivatedRoute,
              private router:Router ) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params:any) => {
        this.user_id = params['id'];
        this.userService.getUser(this.user_id).subscribe(
          data => this.selectedUser = data
        );
      }
    )
  }
  onDelete(userid:string){
    this.userService.deleteUser(userid).subscribe(
      data => {
        if(userid == this.userService.getUserLogin()._id) this.userService.logout();
        else this.router.navigate(['/dashboard', 'user']);
      },
      error => console.log(error)

    )
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
