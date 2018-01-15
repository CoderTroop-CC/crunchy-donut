import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-submitting',
  template: `<img src="/assets/images/Double Ring.svg">`,
  styles: [`:host { display: block;} img { display: block; margin: 20px auto; width: 50px; }`]
})
export class SubmittingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
