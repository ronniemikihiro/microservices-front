import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-about-home',
  templateUrl: './about-home.component.html',
  styleUrls: ['./about-home.component.css']
})
export class AboutHomeComponent implements OnInit {

  constructor(private logger: NGXLogger,
              private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('About');
    this.logger.log('About loaded');
  }

}
