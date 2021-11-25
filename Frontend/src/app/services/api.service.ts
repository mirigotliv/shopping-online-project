import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"

@Injectable()
export class ApiService {

    constructor(private http: HttpClient) { }

    registerUser(user: string) {
        let xhr = new XMLHttpRequest()
        xhr.open('POST', 'http://localhost:3001/register', true)
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
        xhr.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE) {
                console.log(this.status)
                console.log(this)
            }
        }
        xhr.send(`user=${user}`)
    }

}
