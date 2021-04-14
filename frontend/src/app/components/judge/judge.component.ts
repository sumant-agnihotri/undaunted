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
} from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
// import * as $ from 'jquery';
@Component({
  selector: 'app-judge',
  templateUrl: './judge.component.html',
  styleUrls: ['./judge.component.css'],
})
export class JudgeComponent implements OnInit {
  currentRate = 1;
  closeResult = '';
  subs: string[];
  _sub: string;
  _num: string;
  rate: string[];

  constructor(private modalService: NgbModal, private renderer: Renderer2) {
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

  openXl(content, sub, num) {
    this._sub = sub;
    this._num = num;
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

  ngOnInit() {
    if (this.isLast) {
      console.log(this.buttons);
      this.buttons.forEach((button) =>
        this.renderer.setStyle(button.nativeElement, 'display', 'none')
      );
    }
  }
}
