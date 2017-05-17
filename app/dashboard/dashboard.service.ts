// Imports
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


import { IStudent } from '../users/users';
import { ILogin } from "../menu/login/login";
import { API } from '../main';

@Injectable()
export class DashboardService {

    headers: Headers;
    options: RequestOptions;

    constructor(private _http: Http) { 
        let user_data = <ILogin> JSON.parse(localStorage.getItem('currentUser'));
        this.headers = new Headers();
        this.headers.append("Authorization", "Basic " + btoa(user_data.username + ":" + user_data.password));
        this.options = new RequestOptions({ headers: this.headers });
    }
    apiURL = API.url;

    getStudent(id: number): Observable<IStudent> {
        return this._http
            .get(this.apiURL+`/user/${id}`, this.options)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
    getStudents(): Observable<IStudent[]> {
        return this._http
            .get(this.apiURL+'/user', this.options)
            .map((response: Response) =><IStudent[]> response.json().data )
            .catch(this.handleError);
    }
    getPendingStudents(): Observable<IStudent[]> {
        return this._http
            .get(this.apiURL+'/user/pending', this.options)
            .map((response: Response) =><IStudent[]> response.json().data )
            .catch(this.handleError);
    }
    putActiveJSON(id: string, data: IStudent) {
        let user_data = <ILogin> JSON.parse(localStorage.getItem('currentUser'));
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("Authorization", "Basic " + btoa(user_data.username + ":" + user_data.password));
        return this._http.post(this.apiURL+'/user/'+id+'/approve', JSON.stringify(data), { headers: headers })
            .map(res => res.json());
    }
    putBlockJSON(id: string, data: IStudent) {
        let user_data = <ILogin> JSON.parse(localStorage.getItem('currentUser'));
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("Authorization", "Basic " + btoa(user_data.username + ":" + user_data.password));
        return this._http.put(this.apiURL+'/user/'+id+'/swlock', JSON.stringify(data), { headers: headers })
            .map(res => res.json());
    }
    private handleError(error: Response){
        console.error(error);
        return Observable.throw(error.json().error || "Server error");
    }
}