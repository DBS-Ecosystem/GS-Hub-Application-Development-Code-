import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent, NewDTODialog, FindDTODialog } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NewsComponent } from './news/news.component';
import { MainFrameComponent } from './main-frame/main-frame.component';
import { NewComponent } from './new/new.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { SignComponent } from './sign/sign.component';
import { RegComponent } from './reg/reg.component';
import { CabinetComponent } from './cabinet/cabinet.component';
import { FinancesComponent } from './finances/finances.component';
import { PrivateComponent } from './private/private.component';
import { SettingsComponent } from './settings/settings.component';
import { SupportComponent } from './support/support.component';
import { BidsComponent } from './bids/bids.component';
import { ConversationComponent } from './conversation/conversation.component';
import { ProfileComponent, PortfolioDialog } from './profile/profile.component';
import { NavComponent } from './nav/nav.component';
import { httpInterceptorProviders } from './auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    NewsComponent,
    MainFrameComponent,
    NewComponent,
    SignComponent,
    RegComponent,
    CabinetComponent,
    FinancesComponent,
    PrivateComponent,
    SettingsComponent,
    SupportComponent,
    BidsComponent,
    ConversationComponent,
    ProfileComponent,
    PortfolioDialog,
    NewDTODialog,
    FindDTODialog,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
