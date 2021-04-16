import {
  Component,
  OnInit,
  ViewChildren,
  ElementRef,
  Renderer2,
  QueryList,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import * as $ from 'jquery';
@Component({
  selector: 'app-judge',
  templateUrl: './judge.component.html',
  styleUrls: ['./judge.component.css'],
})
export class JudgeComponent {
  currentRate = 1;
  closeResult = '';
  subs: string[];
  _sub: string;
  _num: string;
  rate: string[];
  success: string;
  danger: string;

  constructor(
    private modalService: NgbModal,
    private renderer: Renderer2,
    private http: HttpClient
  ) {
    this.success = 'success';
    this.danger = 'danger';

    this.subs = [
      'Ancano-Necro',
      'Autumn_Equinox-NB',
      'ceregorn_eso-Socr',
      'FVLegacy-DK',
      'Jodagon_Drago-DK',
      'Nezzy-NB',
      'Quiest-Temp',
      'Sheep-Socr',
      'Taleon_Zero-NB',
      'Zahmbi-Necro',
      'Zass-Ward',
      'Ziggie-Necro',
    ];

    this.rate = [
      'How well does the outfit represent its class:',
      'You thought it was',
      'the rating parameters',
      'for the contest but',
      'it was me Dio!',
    ];
  }

  @ViewChildren('button') buttons: QueryList<ElementRef>;
  @Input() isLast: boolean;
  @Output('ngInit') initEvent: EventEmitter<any> = new EventEmitter();
  @ViewChild('successAlert') s_alert: ElementRef;
  @ViewChild('failAlert') f_alert: ElementRef;
  @ViewChild('loginDiv') logindiv: ElementRef;

  openXl(content, sub, num) {
    this._sub = sub;
    this._num = num;
    // console.log(body)
    this.modalService.open(content, { size: 'xl' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  openLg(longContent) {
    this.modalService.open(longContent, { size: 'lg' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  login(username, password) {
    const loginURL = 'http://127.0.0.1:8000/judge/login';

    let body = { username: username, password: password };

    this.http.post(loginURL, body).subscribe((resp) => {
      if (resp['status'] == true) {
        this.renderer.setStyle(this.logindiv.nativeElement, 'display', 'none');
        this.buttons.forEach((button) =>
          this.renderer.setStyle(button.nativeElement, 'pointer-events', 'auto')
        );
        this.renderer.setStyle(this.s_alert.nativeElement, 'display', 'block');
        this.renderer.setStyle(this.f_alert.nativeElement, 'display', 'none');
      } else {
        this.buttons.forEach((button) =>
          this.renderer.setStyle(button.nativeElement, 'pointer-events', 'none')
        );
        this.renderer.setStyle(this.f_alert.nativeElement, 'display', 'block');
      }
    });
  }

  ngAfterViewInit() {
    this.buttons.forEach((button) =>
      this.renderer.setStyle(button.nativeElement, 'pointer-events', 'none')
    );

    // console.log(this.buttons);
  }
}
