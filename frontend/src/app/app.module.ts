import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import {ReactiveFormsModule} from "@angular/forms";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Pages
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

//Components
import { ListUrlComponent } from './components/urls/list/list.component';
import { AddUrlComponent } from './components/urls/add/add.component';
import { EditUrlComponent } from './components/urls/edit/edit.component';

//Libs Module
import {MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    DashboardComponent,
    ListUrlComponent,
    AddUrlComponent,
    EditUrlComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
