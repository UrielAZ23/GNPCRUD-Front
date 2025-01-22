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
  createFolios(folio):Observable<any>{
    let params =JSON.stringify(folio)
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'add',params,{headers:headers});
  }

  updateFolios(folio):Observable<any>{
    let params =JSON.stringify(folio)
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.put(this.url+'update',params,{headers:headers});
  }
  deleteFolios(folio):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.delete(this.url+'delete/'+folio,{headers:headers});
  }
}