import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent implements OnInit {

  constructor(private logger: NGXLogger,
              private titleService: Title) { }

  ngOnInit() {
    this.logger.log('Icons loaded');
    this.titleService.setTitle('Icons');
  }

}
