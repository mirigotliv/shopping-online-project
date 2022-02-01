import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"

@Injectable()

export class ApiService {

    constructor(private http: HttpClient) { }

    registerUser(user: string) {
        this.http.post('http://localhost:3000/register', user)
            .subscribe(response => {
                console.log(response)
            })
    }
}