import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  _username: string;
  _password: string;
  loginURL: string;

  constructor(private http: HttpClient) {}

  login(username, password) {
    // let headers = new Headers();
    // headers.append('Access-Control-Allow-Origin', '*');
    this.loginURL = 'http://127.0.0.1:8000/judge/login';
    this._username = username;
    this._password = password;
    console.log(this._username, this._password);

    var body = { username: username, password: password };
    // var csrftoken = getCookie('csrftoken');

    // let header = new HttpHeaders();
    // header.set('Access-Control-Allow-Origin', '*');

    this.http.post(this.loginURL, body).subscribe((resp) => {
      console.log(resp);
    });
  }

  // downloadPDF(pdfName) {
  //   const url = `${this.ENDPOINT}download-pdf?pdf_name=${pdfName}`;
  //   return this.http
  //     .get(url, {
  //       responseType: 'blob',
  //     })
  //     .pipe(catchError(this.errorHandler));
  // }

  ngOnInit(): void {}
}
