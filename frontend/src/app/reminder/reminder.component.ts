import { Component } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {EmailService} from './services/email.service';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class EmailComponent {
  title = 'MailerApp';
  MailerForm :FormGroup;

  constructor(private formBuilder:FormBuilder,private emailService:EmailService){}

  ngOnInit(){
    this.MailerForm = this.formBuilder.group({
       email:[null,[Validators.required]]
    });
  }

  sendMail(){
    let email  = this.MailerForm.value.email;
    let reqObj = {
      email:email
    }
    this.emailService.sendMessage(reqObj).subscribe(data=>{
      console.log(data);
    })
  }
}
