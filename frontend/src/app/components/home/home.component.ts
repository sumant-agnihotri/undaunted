import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  Renderer2,
} from '@angular/core';
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
  success: string;
  danger: string;
  audioPlayer: HTMLElement;

  constructor(private http: HttpClient, private renderer: Renderer2) {
    this.success = 'success';
    this.danger = 'danger';
  }

  @ViewChild('loginDiv') logindiv: ElementRef;
  @ViewChild('successAlert') s_alert: ElementRef;
  @ViewChild('failAlert') f_alert: ElementRef;

  login(username, password) {
    // let headers = new Headers();
    // headers.append('Access-Control-Allow-Origin', '*');
    this.loginURL = 'http://127.0.0.1:8000/judge/login';
    this._username = username;
    this._password = password;

    var body = { username: username, password: password };
    // var csrftoken = getCookie('csrftoken');

    // let header = new HttpHeaders();
    // header.set('Access-Control-Allow-Origin', '*');

    this.http.post(this.loginURL, body).subscribe((resp) => {
      if (resp['status'] == true) {
        this.renderer.setStyle(this.logindiv.nativeElement, 'display', 'none');
        this.renderer.setStyle(this.s_alert.nativeElement, 'display', 'block');
        this.renderer.setStyle(this.f_alert.nativeElement, 'display', 'none');
      } else {
        this.renderer.setStyle(this.f_alert.nativeElement, 'display', 'block');
      }
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
