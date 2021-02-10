import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { EmailComponent } from './reminder.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    EmailComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports : [
    EmailComponent
  ],
  providers: []
})

export class EmailModule { }
