import { Component, OnInit } from "@angular/core";
import { ProjectService } from "../project.service";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
    selector: "app-add",
    templateUrl: "./add.component.html",
    styleUrls: ["./add.component.scss"],
})
export class AddComponent implements OnInit {
    clientkeyword = "clientName";
    oppkeyword = "oppName";
    dxpkeyword = "name";
    dxlekeyword = "dxLeadEmail";
    dxpList;
    dxleList;
    srkeyword = "salesRepresentative";
    lists;
    addForm;
    successMssg;
    errorMssg;
    topPosToStartShowing = 100;

    constructor(
        private projectService: ProjectService,
        public fb: FormBuilder
    ) {
        this.addForm = this.fb.group({
            clientName: ["", Validators.required],
            oppName: ["", Validators.required],
            oppDesc: [""],
            dealValue: [""],
            dxValue: [""],
            oppStatus: ["", Validators.required],
            domain: ["", Validators.required],
            probility: [""],
            dealCloseDate: [""],
            estStartDate: [""],
            salesForceURL: [""],
            artifactsURL: [""],
            dxPursuitLead: ["", Validators.required],
            dxLeadEmail: ["", Validators.required],
            salesRepresentative: ["", Validators.required],
            statusUpdate: [""],
        });
    }

    ngOnInit() {
        this.projectService.list("").subscribe(
            (resp) => {
                this.lists = resp;
            },
            (err) => {
                console.log(err);
            }
        );
        this.projectService.leadList("").subscribe(
            (resp) => {
                if(Array.isArray(resp)){
                    this.dxpList = resp.map(a => a.name);
                    this.dxleList = resp.map(a => a.email);
                }
            },
            (err) => {
                console.log(err);
            }
        );        
    }

    gotoTop() {
        window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }

    selectEvent(item) {
        console.log(this.addForm.clientName);
        // do something with selected item
    }

    onChangeSearch(search: string) {
        // fetch remote data from here
        // And reassign the 'data' which is binded to 'data' property.
    }

    onFocused(e) {
        // do something
    }

    onTagsChanged(event) {
        event.preventDefault();
        console.log(event);
    }

    onSubmit() {
        console.log(this.addForm.invalid);
        if (this.addForm.invalid) {
            this.errorMssg = true;
            this.successMssg = false;
            return;
        } else {
            console.log(this.addForm.value);
            let temp = this.addForm.value;
            temp.email = sessionStorage.getItem("LoggedInUser");

            if (this.addForm.value.clientName.clientName) {
                temp.clientName = this.addForm.value.clientName.clientName;
            }
            if (this.addForm.value.oppName.oppName) {
                temp.oppName = this.addForm.value.oppName.oppName;
            }
            if (this.addForm.value.dxPursuitLead.name) {
                temp.dxPursuitLead = this.addForm.value.dxPursuitLead.name;
            }
            if (this.addForm.value.dxLeadEmail.name) {
                temp.dxLeadEmail = this.addForm.value.dxLeadEmail.name;
            }
            if (this.addForm.value.salesRepresentative.salesRepresentative) {
                temp.salesRepresentative = this.addForm.value.salesRepresentative.salesRepresentative;
            }
            console.log(temp);
            this.projectService.add(this.addForm.value).subscribe(
                (resp) => {
                    console.log(resp);
                    //this.addForm.reset();
                    this.errorMssg = false;
                    this.successMssg = true;
                },
                (err) => {
                    console.log(err);
                    this.errorMssg = true;
                    this.successMssg = false;
                }
            );
        }
    }
}
