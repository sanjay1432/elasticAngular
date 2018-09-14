import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import {MatChipsModule} from '@angular/material/chips';
import {MatSliderModule} from '@angular/material/slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { MainComponent } from './main/main.component';
import { GoogleMapService } from './google-map.service';
import {HttpModule} from '@angular/http';
import {AgmCoreModule} from '@agm/core';
import { SubMainComponent } from './sub-main/sub-main.component';
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SubMainComponent
  ],
  imports: [
    HttpModule,
    AngularFireDatabaseModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyDz9UIddlXqbhsG1K2wz22MsxqkPNWfQJ8'}),
    AngularFireModule.initializeApp(environment.firebaseConfig, 'Oevent'),
    BrowserModule,
    NgbModule.forRoot(),
    MatButtonModule,
    BrowserAnimationsModule,
    MatChipsModule,
    AppRoutingModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSliderModule
  ],
  providers: [GoogleMapService],
  bootstrap: [AppComponent]
})
export class AppModule { }
