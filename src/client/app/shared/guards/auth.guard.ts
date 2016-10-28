import {Injectable} from "@angular/core";
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {UserService} from "../services/user.service";
import {ApiInfoService} from "../services/api-info.service";

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(private userService:UserService, private router:Router, private apiInfoService: ApiInfoService){}

  canActivate(route:ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if(this.userService.isLogin()){
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
