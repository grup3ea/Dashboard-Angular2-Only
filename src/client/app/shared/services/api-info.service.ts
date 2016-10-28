import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {UserService} from "./user.service";
import {Config} from "../config/env.config";
import {CoolLocalStorage} from "angular2-cool-storage";

@Injectable()
export class ApiInfoService {
  nodes:Node[] = null;

  constructor(private http:Http,
              private userService:UserService,
              private localStorage:CoolLocalStorage){
    this.nodes = this.localStorage.getObject('nodes');
  }

  getApiNodes(){
    console.log("nodes", this.nodes == null);
    if(this.nodes == null){
      const headers = this.userService.getHeadersDefault();
      console.log("HEADERS", headers);
      this.http.get(Config.API + '/nodes', {headers:headers}).map(
        (data:Response) => {
          console.log("data", data);
          this.nodes = data.json();
          console.log("NODES", this.nodes);
          this.localStorage.setObject('nodes', this.nodes);
        }
      ).catch(this.handleError);
    }
  }

  getNodes(){
    return this.nodes;
  }

  private handleError(error:any){
    console.log(error);
    return Observable.throw(error.json());
  }

}
