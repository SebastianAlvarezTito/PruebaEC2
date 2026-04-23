import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app'; // Sin la extensión .ts

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));