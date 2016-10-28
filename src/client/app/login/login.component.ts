import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../shared/services/user.service";

/**
*	This class represents the lazy loaded LoginComponent.
*/

@Component({
	moduleId: module.id,
	selector: 'login-cmp',
	templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
  userForm : FormGroup;
  constructor(private fb:FormBuilder, private userService:UserService, private router:Router) { }

  ngOnInit():any{
    if(this.userService.isLogin()) this.router.navigate(['dashboard', 'home']);
    this.userForm = this.fb.group({
      username:['', Validators.required],
      password:['', Validators.required]
    });
  }

  onLogin(){
    this.userService.login(this.userForm.value).subscribe(
      data => this.router.navigate(['dashboard', 'home']),
      error => console.log(error)
    )
  }
}
