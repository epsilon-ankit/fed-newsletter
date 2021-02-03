import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { MustMatch } from "../../shared/_helpers/custom-validator";
import { User } from '../user';
import { UserServiceService } from "../user-service.service";
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { ProjectService } from "../../project/project.service";
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import jsPDF from 'jspdf';
import { EventServiceService } from 'src/app/event/event-service.service';


@Component({
  selector: "app-admin-dashboard",
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.scss"],
})

export class AdminDashboardComponent implements OnInit {
  @ViewChild('pdfData', {static: false}) pdfData:ElementRef;
  userDialog: boolean;
  userList: User[];
  user: User;
  userRoles: SelectItem[];
  confirmPassword: string;
  submitted: boolean;
  errorMsg;
  clonedUsers: { [s: string]: User; } = {};
  newWinsSigned: any;
  newWinsVerbal: any;
  keyBusinessOpportunities: any;
  upcomingEvents: any;
  @Input() eventsList: any;


  constructor(
    private fb: FormBuilder,
    public userService: UserServiceService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    public projectService: ProjectService,
    public eventService: EventServiceService,
  ) { }

  ngOnInit() {
    this.getUserList();
    this.userRoles = [
      {
        label: 'Admin',
        value: 'admin'
      },
      {
        label: 'Author',
        value: 'author'
      },
      {
        label: 'User',
        value: 'user'
      }];
      this.generateDPF();
  }

  /**
  * @description Get Users
  */
  getUserList() {
    this.userService.getUsers().subscribe(
      (resp: User[]) => {
        this.userList = resp;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  /**
 * @description Add user
 */
  addUser() {
    this.submitted = true;
    let validName = this.user.name && this.user.name.length > 4;
    let validEmail = this.user.email;
    let validPassword = this.user.password && this.user.password.length > 5;
    let validConfirmPassword = this.confirmPassword && this.confirmPassword === this.user.password;
    let validType = this.user.type
    if (validName && validEmail && validPassword && validType && validConfirmPassword) {
      this.userService.addUser(this.user).subscribe(
        (resp) => {
          console.log(resp);
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Created', life: 3000 });
          this.errorMsg = "";
          this.userList.push(this.user);
          this.userList = [...this.userList];
          this.getUserList();
          this.userDialog = false;
          this.user = {};
        },
        (err) => {
          console.log(err);
          this.errorMsg = err;
        }
      );
    }
  }

  /**
  * @description Modal Add User
  */
  addNewUser() {
    this.user = {};
    this.errorMsg = "";
    this.confirmPassword = "";
    this.submitted = false;
    this.userDialog = true;
  }

  /**
   * @description Modal Hide
   */
  hideDialog() {
    this.errorMsg = "";
    this.confirmPassword = "";
    this.submitted = false;
    this.userDialog = false;
  }

  /**
  * @description Edit Row
  */
  onRowEdit(user) {
    this.clonedUsers[user._id] = { ...user };
  }

  /**
  * @description Edit Row Cancel
  */
  onRowEditCancel(user, index: number) {
    this.userList[index] = this.clonedUsers[user._id];
    delete this.userList[user._id];
  }

  /**
   * @description Update user details
   */
  updateUser(user) {
    this.userService.updateUser(user._id, user).subscribe(
      (resp) => {
        console.log(resp);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User details updated', life: 3000 });
      },
      (err) => {
        console.log(err)
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went Wrong. Please try again.', life: 3000 });
      }
    )
    delete this.clonedUsers[user._id];
  }

  /**
   * @description Delete user
   */
  deleteUser(user) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + user.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService.deleteUser(user._id).subscribe(
          (resp) => {
            console.log(resp);
            this.userList = this.userList.filter(val => val._id !== user._id);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User deleted', life: 3000 });
          },
          (err) => {
            console.log(err);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went Wrong. Please try again.', life: 3000 });
          }
        )
        this.user = {};
      }
    });
  }

  /**
  * @description Generate PDF
  */
  public generateDPF():void {

    const requests = forkJoin(
      this.eventService.getEvents().pipe(map(value => ({type: 'events', value : value}))),
      this.projectService.list("").pipe(map(value => ({type: 'projects', value: value})))
    )

    requests.subscribe(
      resp => {
        for(let result of resp) {
          if(result.type === 'events') {
            this.eventsList = result.value;
            this.upcomingEvents = this.eventsList.filter(item => item.eventStatus === 'Upcoming Events');
            this.newWinsSigned = this.eventsList.filter(item => item.eventStatus === 'New Wins - Signed');
            this.newWinsVerbal = this.eventsList.filter(item => item.eventStatus === 'New Wins - Verbal');
            this.keyBusinessOpportunities = this.eventsList.filter(item => item.eventStatus === 'Key Business Opportunities'); 
          } 
        }
      }
    )
    let htmlData = this.pdfData.nativeElement;
      setTimeout(() => {
        let doc = new jsPDF('p','pt', 'a4');
        doc.html(htmlData.innerHTML, {
          callback: function (doc) {
            doc.save('newsletter.pdf');
          },
          x:20,
          y:10
        });
      }, 1000);
  }
}