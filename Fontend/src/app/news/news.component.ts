import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})

export class NewsComponent implements OnInit {
  @HostBinding("attr.class") cssClass = "news";
  constructor() { }

  ngOnInit(): void {
  }

}
