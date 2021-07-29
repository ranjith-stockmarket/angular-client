import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import { NavComponent } from './nav/nav.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import { TabsComponent } from './tabs/tabs.component';
import {MatTabsModule} from "@angular/material/tabs";
import { ImportComponent } from './tabs/import/import.component';
import { CompanyComponent } from './tabs/company/company.component';
import { ExchangeComponent } from './tabs/exchange/exchange.component';
import { IpoComponent } from './tabs/ipo/ipo.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { SectorComponent } from './tabs/sector/sector.component';
import {MatChipsModule} from "@angular/material/chips";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './login/login.component';
import {AuthInterceptor} from "./auth.interceptor";
import {AuthService} from "./service/auth/auth.service";
import {LoginService} from "./service/login/login.service";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { MatSnackBarModule} from "@angular/material/snack-bar";

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    TabsComponent,
    ImportComponent,
    CompanyComponent,
    ExchangeComponent,
    IpoComponent,
    SectorComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    FlexLayoutModule,
    MatInputModule,
    MatTableModule,
    FormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    HttpClientModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatSnackBarModule,
  ],
  providers: [
    AuthService,
    LoginService,
    {
    provide : HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi   : true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
