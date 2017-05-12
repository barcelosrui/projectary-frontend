import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Rx';

import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";

import { ISignInStudent} from "./signIn";
import { ISchool, ICourse } from "../schools/schools";
import { ILogin } from "../menu/login/login";
import { API } from '../main';


@Injectable()
export class SignInStudentService {
    
    constructor(private _http: Http) {

    }
    apiURL = API.url;

   getSchool(): Observable<ISchool[]>{
        return this._http.get(this.apiURL+'/school')
            .map((response: Response) => <ISchool[]> response.json().data)
            .catch(this.handleError);
    }
    getCourse(id:string): Observable<ICourse[]>{
        return this._http.get(this.apiURL+'/course/'+id)
            .map((response: Response) => <ICourse[]> response.json().data)
            .catch(this.handleError);
    }

    private handleError(error: Response){
        return Observable.throw(error.json().error || "Server error");
    }
    postJSON(data: ISignInStudent) {
        console.log(data);
        return this._http.post(this.apiURL+'/user', JSON.stringify(data))
            .map(res => res.json());
    }
}