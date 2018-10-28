import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';

import {NavbarComponent} from './navbar/navbar.component';
import {MilestoneListComponent} from './milestone-list/milestone-list.component';
import {AvatarSummaryListComponent} from './avatar-summary-list/avatar-summary-list.component';
import {AvatarInfoSummaryComponent} from './avatar-info-summary/avatar-info-summary.component';
import {AvatarStatSummaryComponent} from './avatar-stat-summary/avatar-stat-summary.component';
import {AvatarExpSummaryComponent} from './avatar-exp-summary/avatar-exp-summary.component';
import {CollectExpComponent} from './collect-exp/collect-exp.component';
import {AvatarComponent} from './avatar/avatar.component';
import {MilestoneComponent} from './milestone/milestone.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MilestoneListComponent,
    AvatarSummaryListComponent,
    AvatarInfoSummaryComponent,
    AvatarStatSummaryComponent,
    AvatarExpSummaryComponent,
    CollectExpComponent,
    AvatarComponent,
    MilestoneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // Angular Material Modules
    MatToolbarModule,
    MatIconModule,
    MatProgressBarModule,
    MatListModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
