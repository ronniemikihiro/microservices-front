import { Component, OnInit } from '@angular/core';

@Component({
  template: `
  <div class="container">
    <h1 class="text-center" style="color: red;">Unauthorized! :(</h1>
  </div>
  `,
})
export class UnauthorizedComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
