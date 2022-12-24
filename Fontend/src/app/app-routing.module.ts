import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignComponent } from './sign/sign.component';
import { RegComponent } from './reg/reg.component';
import { CabinetComponent } from './cabinet/cabinet.component';
import { FinancesComponent } from './finances/finances.component';
import { PrivateComponent } from './private/private.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { SupportComponent } from './support/support.component';
import { BidsComponent } from './bids/bids.component';
import { ConversationComponent } from './conversation/conversation.component';
import { LoggedInGuard } from './logged-in.guard';

const routes: Routes = [
  //guest routes
  {path: '', redirectTo: 'sign', pathMatch: 'full'},
  {path: 'sign', component: SignComponent},
  {path: 'reg', component: RegComponent},
  //protected routes
  {path: 'cabinet', component: CabinetComponent, canActivate: [LoggedInGuard]},
  {path: 'finances', component: FinancesComponent, canActivate: [LoggedInGuard]},
  {path: 'private', component: PrivateComponent, canActivate: [LoggedInGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [LoggedInGuard]},
  {path: 'settings', component: SettingsComponent, canActivate: [LoggedInGuard]},
  {path: 'support', component: SupportComponent, canActivate: [LoggedInGuard]},
  {path: 'bids', component: BidsComponent, canActivate: [LoggedInGuard]},
  {path: 'conversation', component: ConversationComponent, canActivate: [LoggedInGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
