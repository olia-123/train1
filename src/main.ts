import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { fas, faPrint, faFilePdf } from '@fortawesome/free-solid-svg-icons';


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
 