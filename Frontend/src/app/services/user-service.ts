import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user.model';


@Injectable()
export class UserService {

    loginError: any = { error: '' };
    // Heroku: https://sleepy-plains-48411.herokuapp.com - DEV: http://localhost:6200
    mainAPIDomain: String = 'http://localhost:6200';

    constructor(private myHttpClient: HttpClient) { }


    loginUser(loginUser: UserModel): void {

        const apiUrl = `${this.mainAPIDomain}/api/users`;
    }
}
