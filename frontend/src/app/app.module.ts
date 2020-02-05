import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

//Pages
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { LoginComponent } from "./pages/login/login.component";
import { TemplateComponent } from "./pages/template/template.component";

//Components
import { ListUrlComponent } from "./components/urls/list/list.component";
import { AddUrlComponent } from "./components/urls/add/add.component";
import { EditUrlComponent } from "./components/urls/edit/edit.component";

import { ListUserComponent } from "./components/users/list/list.component";
import { AddUserComponent } from "./components/users/add/add.component";
import { EditUserComponent } from "./components/users/edit/edit.component";

import { PreviewUrlComponent } from "./components/urls/preview/preview.component";

import { FooterComponent } from "./components/footer/footer.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { NavbarComponent } from "./components/navbar/navbar.component";

//Libs Module
import {
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatIconModule,
  MatMenuModule,
  MatTableModule,
  MatDialogModule,
  MatToolbarModule,
  MatTooltipModule
} from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { DialogConfirmComponent } from "./components/dialog-confirm/dialog-confirm.component";

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    DashboardComponent,
    ListUrlComponent,
    AddUrlComponent,
    EditUrlComponent,
    ListUserComponent,
    AddUserComponent,
    EditUserComponent,
    PreviewUrlComponent,
    LoginComponent,
    FooterComponent,
    SidebarComponent,
    NavbarComponent,
    TemplateComponent,
    DialogConfirmComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressSpinnerModule,

    ToastrModule.forRoot({
      timeOut: 3000,
      progressBar: true,
      positionClass: "toast-bottom-right",
      preventDuplicates: true
    })
  ],
  providers: [],
  entryComponents: [DialogConfirmComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
