import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  @HostBinding("attr.class") cssClass = "footer";
  year:number;

  constructor() {
    this.year = new Date().getFullYear();
  }

  ngOnInit(): void {
  }

}
