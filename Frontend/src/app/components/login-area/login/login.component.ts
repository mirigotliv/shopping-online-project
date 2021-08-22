import { Component, OnInit } from '@angular/core';
import { CredentialsModel } from 'src/app/models/credentials.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public login = new CredentialsModel();

  constructor() { 

  }

  ngOnInit(): void {
  }


public send() {
        
        // homework: 
        // send the data to "http://localhost:3030/api/contact-us"
        // and then redirect to home

        console.log(this.login);

    }

}
