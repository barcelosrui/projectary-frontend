import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";
import { Headers, RequestOptions } from "@angular/http";
import { ProjectApplicationComponent } from "./project-application.component";
import { ILogin } from "../../menu/login/login";
import { API } from "../../../main";
import { IGroup } from "../../groups/group";


@Injectable()
export class ProjectApplicationService {
    
    headers: Headers;
    options: RequestOptions;
    apiURL = API.url;
    userID: number;

    constructor(private _http: Http) {
        let user_data = <ILogin> JSON.parse(localStorage.getItem('currentUser'));
        this.userID = parseInt(user_data.user_id);
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append("Authorization", "Basic " + btoa(user_data.username + ":" + user_data.password));
        this.options = new RequestOptions({ headers: this.headers });
    }



}