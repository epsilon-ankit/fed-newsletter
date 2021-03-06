import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from "@angular/forms";

import { ProjectModule } from '../project/project.module';
import { LoginComponent } from "../login/login/login.component";
import { MainComponent } from "./main/main.component";
import { SearchModule } from '../search/search.module';
import { SharedModule } from "../shared/shared.module";
import { AngularFontAwesomeModule } from 'angular-font-awesome';
// import { DashboardComponent } from '../dashboard/dashboard.component';
import { DashboardModule } from '../dashboard/dashboard.module';
import { EventModule } from "../event/event.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouteModule } from '../route/route.module';
import { ArtifactsComponent } from '../artifacts/artifacts.component';
import { EmailModule } from "../reminder/reminder.module";

@NgModule({
  declarations: [MainComponent, LoginComponent, ArtifactsComponent],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, SharedModule, AngularFontAwesomeModule, DashboardModule, NgbModule, NgxChartsModule, BrowserAnimationsModule, RouteModule, ProjectModule, EventModule, SearchModule, EmailModule],
  exports: [MainComponent, LoginComponent]
})
export class MainModule { }
