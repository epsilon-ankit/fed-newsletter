import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {DialogModule} from 'primeng/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
	imports: [
		CommonModule,
        DialogModule,
		NgbModule
	],
	declarations: [
		DashboardComponent
	]
})
export class DashboardModule {}