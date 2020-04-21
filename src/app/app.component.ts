import { Component } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';

  constructor() {
    console.log(environment.production); // Logs false for default environment
  }
}
