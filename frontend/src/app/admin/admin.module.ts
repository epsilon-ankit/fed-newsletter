import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";

import {TabViewModule} from 'primeng/tabview';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import {ToastModule} from 'primeng/toast';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {ButtonModule} from 'primeng/button';
import {RadioButtonModule} from 'primeng/radiobutton';

@NgModule({
    declarations: [AdminDashboardComponent],
    imports: [
        CommonModule, 
        FormsModule,
        ReactiveFormsModule, 
        TabViewModule, 
        TableModule, 
        DialogModule,
        ConfirmDialogModule,
        MessagesModule,
        MessageModule,
        ToastModule,
        InputTextModule, 
        PasswordModule,
        ButtonModule,
        RadioButtonModule
    ],
})

export class AdminModule {}
