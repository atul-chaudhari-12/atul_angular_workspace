import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular_project_1';
  name = "Atul"
  loadedFeature: string = "recipe";

  onNavigate = (feature) => {
    this.loadedFeature = feature;
  }
}
