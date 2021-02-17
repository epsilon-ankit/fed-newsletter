import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {DialogModule} from 'primeng/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
	imports: [
		CommonModule,
        DialogModule,
		NgbModule,
		RouterModule
	],
	declarations: [
		DashboardComponent
	]
})
export class DashboardModule {}