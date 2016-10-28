import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";

import {UserService} from "./user.service";
import {Config} from "../config/env.config";

@Injectable()
export class ApiCallsService{
  constructor(private http:Http, private userService:UserService){}

  getApiCalls(){
    const headers = this.userService.getHeadersDefault();
    return this.http.get(Config.API+ '/apiCalls?start=0', {headers:headers}).map(
      (data:Response)=> data.json()
    ).catch(this.handleError);
  }

  getUsersCalls(){
    const headers = this.userService.getHeadersDefault();
    return this.http.get(Config.API + '/apiCalls/users', {headers:headers}).map(
      (data:Response) => data.json()
    ).catch(this.handleError);
  }

  private handleError(error:any){
    console.log(error);
    return Observable.throw(error.json());
  }
}
