import {Phone} from "./phone";

export interface User {
  _id:string,
  name:string,
  username:string,
  password:string,
  token: string,
  profile:string,
  language:string,
  endpoints:Phone[],
  xids:Phone[]
}
