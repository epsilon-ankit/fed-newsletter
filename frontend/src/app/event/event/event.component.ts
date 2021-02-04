import { Component, OnInit } from "@angular/core";
import { EventServiceService } from "../event-service.service";
import { ConfirmationService } from "primeng/api";
import { MessageService } from "primeng/api";
import { AuthService } from "src/app/login/auth.service";

@Component({
    selector: "app-event",
    templateUrl: "./event.component.html",
    styleUrls: ["./event.component.scss"],
})
export class EventComponent implements OnInit {
    eventList;
    event;
    eventDialog: boolean;
    submitted: boolean;
    errorMsg;
    isAdmin: any = false;

    constructor(
        public eventService: EventServiceService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        public authSerive: AuthService
    ) {}

    ngOnInit() {
        this.getEventList();
        if (
            this.authSerive.getRole() === "admin" ||
            this.authSerive.getRole() === "author"
        ) {
            this.isAdmin = true;
        } else {
            this.isAdmin = false;
        }
    }

    /**
     * @description Get Events
     */
    getEventList() {
        this.eventService.getEvents().subscribe(
            (resp) => {
                this.eventList = resp;
            },
            (err) => {
                console.log(err);
            }
        );
    }

    /**
     * @description Add Event
     */
    addEvent() {
        this.submitted = true;
        let validName = this.event.name && this.event.name.length > 4;
        let validDesc = this.event.description;
        if (validName && validDesc) {
            this.eventService.addEvent(this.event).subscribe(
                (resp) => {
                    console.log(resp);
                    this.messageService.add({
                        severity: "success",
                        summary: "Successful",
                        detail: "Event Created",
                        life: 3000,
                    });
                    this.errorMsg = "";
                    this.eventList.push(this.event);
                    this.eventList = [...this.eventList];
                    this.getEventList();
                    this.eventDialog = false;
                    this.event = {};
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
    addNewEvent() {
        this.event = {};
        this.errorMsg = "";
        this.submitted = false;
        this.eventDialog = true;
    }

    /**
     * @description Modal Hide
     */
    hideDialog() {
        this.errorMsg = "";
        this.submitted = false;
        this.eventDialog = false;
    }

    /**
     * @description Delete Event
     */
    deleteEvent(event) {
        this.confirmationService.confirm({
            message: "Are you sure you want to delete " + event.name + "?",
            header: "Confirm",
            icon: "pi pi-exclamation-triangle",
            accept: () => {
                this.eventService.deleteEvent(event._id).subscribe(
                    (resp) => {
                        console.log(resp);
                        this.eventList = this.eventList.filter(
                            (val) => val._id !== event._id
                        );
                        this.messageService.add({
                            severity: "success",
                            summary: "Successful",
                            detail: "Event deleted",
                            life: 3000,
                        });
                    },
                    (err) => {
                        console.log(err);
                        this.messageService.add({
                            severity: "error",
                            summary: "Error",
                            detail: "Something went Wrong. Please try again.",
                            life: 3000,
                        });
                    }
                );
                this.event = {};
            },
        });
    }
}
