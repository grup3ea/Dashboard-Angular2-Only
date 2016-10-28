import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Router} from '@angular/router';
import 'rxjs/Rx';
import {Observable} from 'rxjs';
import { CoolLocalStorage } from 'angular2-cool-storage';
import {User} from '../classes/user';
import {Config} from '../config/env.config';

@Injectable()
export class UserService {
  user:User = null;
  constructor(private http:Http,
              private router:Router,
              private localStorage:CoolLocalStorage){
    this.user = this.localStorage.getObject('user');
  }

  isLogin(){
    if(this.user === null) return false;
    else return true;
  }

  logout(){
    this.user = null;
    this.localStorage.clear();
    this.router.navigate(['']);
  }

  login(user:User){
    const body = JSON.stringify({username:user.username, password:user.password});
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(Config.API + '/login', body, {headers:headers}).map(
      (data:Response) => {
        let user = data.json();
        this.user = user.user;
        this.user.token = user.token;
        this.localStorage.setObject('user', this.user);
        return true;
      }
    ).catch(this.handleError);
  }

  getUserLogin(){
    return this.user;
  }

  getUsers(search:string, page:number){
    const headers = this.getHeadersDefault();
    let url:string = Config.API + '/users?count=10&page='+page;
    if(search) url = url + '&search=' + search;
    return this.http.get(url, {headers:headers}).map(
      (data:Response) => data.json()
    ).catch(this.handleError);

  }

  getHeadersDefault():Headers{
    const headers = new Headers();
    if(this.user){
      headers.append('Authorization', 'TOKEN ' + this.user.token);
    }
    return headers;
  }
  getUser(userid:string){
    const headers = this.getHeadersDefault();
    return this.http.get(Config.API + '/users/' + userid, {headers:headers}).map(
      (data:Response) => data.json()
    ).catch(this.handleError);
  }

  saveUser(user:User){
    const headers = this.getHeadersDefault();
    return this.http.put(Config.API + '/users/' + user._id, user, {headers:headers}).map(
      (data:Response) => data.json()
    ).catch(this.handleError);
  }

  createUser(user:User){
    const headers = this.getHeadersDefault();
    return this.http.post(Config.API + '/users', user, {headers:headers}).map(
      (data:Response) => data.json()
    ).catch(this.handleError);
  }

  deleteUser(userid:string){
    const headers = this.getHeadersDefault();
    return this.http.delete(Config.API + '/users/' + userid, {headers:headers}).map(
      (data:Response) => data.json()
    ).catch(this.handleError);
  }

  private handleError(error:any){
    console.log(error);
    return Observable.throw(error.json());
  }
}
