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
  _username: string;

  body = {};
  judgeUsername: string = '';
  activeParticipant: string;
  ratings = {};
  ratingsData = {};
  tempRatings = {};
  userRatings = [];

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

    // this.rate = [
    //   'How well does the outfit represent its class:',
    //   'You thought it was',
    //   'the rating parameters',
    //   'for the contest but',
    //   'it was me Dio!',
    // ];

    // "ratingsData" object needs to be fetched from server on first time when app bootstraps
    // Comment below object after ratings APIs implemented
    // this.ratingsData = {
    //   judge: 'abs',
    //   ratings: {
    //     'Ancano-Necro': {
    //       'How well does the outfit represent its class:': 1,
    //       'You thought it was':2,
    //       'the rating parameters':3,
    //       'for the contest but':4,
    //       'it was me Dio!':5
    //     },
    //     'Autumn_Equinox-NB': {
    //       'How well does the outfit represent its class:': 5,
    //       'You thought it was':6,
    //       'the rating parameters':7,
    //       'for the contest but':8,
    //       'it was me Dio!':2
    //     }
    //   }
    // }
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

  openLg(longContent, participant) {
    this.activeParticipant = participant;
    this.clearTempRatings();
    this.setUserRatings(participant);

    this.modalService.open(longContent, { size: 'lg' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  clearTempRatings() {
    this.tempRatings = {};
  }

  setUserRatings(participant) {
    // Sets previously set "Ratings" in the UI
    this.userRatings = Object.keys(
      this.ratingsData['ratings'][participant]
    ).map((ratingLabel) => {
      return {
        label: ratingLabel,
        rating: this.ratingsData['ratings'][participant][ratingLabel],
      };
    });
  }

  storeUserRatings() {
    // Updates the "ratings" object on star click, which then can be stored in DB
    if (Object.keys(this.tempRatings).length > 0) {
      // If any rating is changed
      Object.keys(this.tempRatings).map((label) => {
        this.ratingsData['ratings'][this.activeParticipant][
          label
        ] = this.tempRatings[label];
      });
    }

    this.clearTempRatings();

    // Store updated "ratings" obj in DB
    this.saveRatingsData();
  }

  tempStoreNewUserRatings(newRating, ratingObj) {
    this.tempRatings[ratingObj['label']] = newRating;
  }

  fetchRatingsData() {
    const endpoint = 'http://127.0.0.1:8000/judge/fetch_data',
      reqBody = { judge_username: this.judgeUsername };

    this.http.post(endpoint, reqBody).subscribe((res) => {
      this.ratingsData = res;
    });
  }

  saveRatingsData() {
    const endpoint = 'http://127.0.0.1:8000/judge/save_data',
      reqBody = this.ratingsData;
    reqBody['judge'] = this.judgeUsername;

    this.http.post(endpoint, reqBody).subscribe((res) => {
      const status = res['status'];

      if (status === true) {
        console.log('Ratings saved!');
      } else {
        console.log('Error!');
      }
    });
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

    this.body = { username: username, password: password };

    this.http.post(loginURL, this.body).subscribe((resp) => {
      if (resp['status'] == true) {
        this.judgeUsername = username;
        this.fetchRatingsData(); // Now LoggedIn, so fetch Ratings Data

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
