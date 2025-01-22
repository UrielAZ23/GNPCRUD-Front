import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Global } from "./global";

@Injectable({
  providedIn:"root"
})
export class FolioService{
  public url:string;
  constructor(private _http:HttpClient){
    this.url=Global.url;
  }

  getFolios():Observable<any>{

    return this._http.get(this.url+'all')
  }
}