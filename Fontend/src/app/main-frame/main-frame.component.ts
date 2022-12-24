import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-main-frame',
  templateUrl: './main-frame.component.html',
  styleUrls: ['./main-frame.component.css']
})
export class MainFrameComponent implements OnInit {
  @HostBinding("attr.class") cssClass = "frame";
  constructor() {

  }

  ngOnInit(): void {
  }

}
