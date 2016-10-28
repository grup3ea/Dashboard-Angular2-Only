import {Component, OnInit, OnDestroy} from "@angular/core";
import { FormGroup, FormArray, FormControl, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

import {UserService} from "../../../shared/services/user.service";
import {User} from "../../../shared/classes/user";
import {ApiInfoService} from "../../../shared/services/api-info.service";

@Component({
  moduleId:module.id,
  selector:'user-edit',
  templateUrl:'./user-edit.component.html'
})
export class UserEditComponent implements OnInit, OnDestroy{
  userForm:FormGroup;
  private user_id:string;
  private user:User;
  private isNew = true;
  private subscription:Subscription;
  private nodes: Node[];

  constructor(private route:ActivatedRoute,
              private userService:UserService,
              private router:Router,
              private apiInfoService:ApiInfoService){
  }
  ngOnInit(){
    this.nodes = this.apiInfoService.getNodes();
    let endpoints: FormArray = new FormArray([]);
    let xids: FormArray = new FormArray([]);
    this.userForm = new FormGroup({
      name: new FormControl('', Validators.required),
      username:new FormControl('', Validators.required),
      password:new FormControl(''),
      profile: new FormControl('user', Validators.required),
      endpoints:endpoints,
      xids: xids
    });

    this.subscription = this.route.params.subscribe(
      (params:any) => {
        if(params.hasOwnProperty('id')){
          this.isNew = false;
          this.user_id = params['id'];
          this.userService.getUser(this.user_id).subscribe(
            data => {
              this.user = data;
              this.setValues();
            }
          );
        } else {
          this.isNew = true;
          this.user = null;
        }
      }
    )
  }
  onSubmit(){
    const newUser:User = this.userForm.value;
    if(this.isNew){
      this.userService.createUser(newUser).subscribe(
        data => this.router.navigate(['/dashboard', 'users', data._id]),
        error => console.log(error)
      )
    } else{
      newUser._id = this.user_id;
      this.userService.saveUser(newUser).subscribe(
        data => this.router.navigate(['/dashboard', 'users', data._id]),
        error => console.log(error)
      )
    }
  }


  onCancel(){
    this.navigateBack()
  }

  private navigateBack(){
    this.router.navigate(['/dashboard', 'users']);
  }

  onAddEndpoint(tag:string, phone:string, node:string){
    (<FormArray>this.userForm.controls['endpoints']).push(
      new FormGroup({
        tag: new FormControl(tag),
        phone: new FormControl(phone, Validators.required),
        node: new FormControl(node, Validators.required)
      })
    );
  }

  onAddXID(tag:string, phone:string, node:string){
    (<FormArray>this.userForm.controls['xids']).push(
      new FormGroup({
        tag: new FormControl(tag),
        phone: new FormControl(phone, Validators.required),
        node: new FormControl(node, Validators.required)
      })
    )
  }
  onRemoveEndpoint(index:number){
    (<FormArray>this.userForm.controls['endpoints']).removeAt(index);
  }
  onRemoveXID(index:number){
    (<FormArray>this.userForm.controls['xids']).removeAt(index);
  }
  setValues(){
    (<FormControl>this.userForm.controls['name']).setValue(this.user.name);
    (<FormControl>this.userForm.controls['username']).setValue(this.user.username);
    (<FormControl>this.userForm.controls['profile']).setValue(this.user.profile);
    if(this.user.hasOwnProperty('endpoints')){
      for(let i = 0; i<this.user.endpoints.length;i++){
        (<FormArray>this.userForm.controls['endpoints']).push(
          new FormGroup({
            tag: new FormControl(this.user.endpoints[i].tag),
            phone: new FormControl(this.user.endpoints[i].phone, Validators.required),
            node: new FormControl(this.user.endpoints[i].node, Validators.required)
          })
        );
      }
    }
    if(this.user.hasOwnProperty('xids')){
      for(let i = 0; i<this.user.xids.length;i++){
        (<FormArray>this.userForm.controls['xids']).push(
          new FormGroup({
            tag: new FormControl(this.user.xids[i].tag),
            phone: new FormControl(this.user.xids[i].phone, Validators.required),
            node: new FormControl(this.user.xids[i].node, Validators.required)
          })
        );
      }
    }
  }


  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
