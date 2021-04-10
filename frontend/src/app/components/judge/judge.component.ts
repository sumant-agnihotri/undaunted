import { Component, OnInit } from '@angular/core';
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

  constructor(private modalService: NgbModal) {
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
      'How shiny is this outfit:',
      'Different styles used and how well they come together:',
      'How cheap is this outfit (1=cheap & 10=expensive):',
      'Rate based purely on looks:',
    ];
  }

  // ngAfterViewInit() {
  //   $('img').each(function () {
  //     var image = $(this);
  //     if (
  //       image.context.naturalWidth == 0 ||
  //       image.readyState == 'uninitialized'
  //     ) {
  //       $(image).unbind('error').hide();
  //     }
  //   });
  // }

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

  ngOnInit(): void {}
}
