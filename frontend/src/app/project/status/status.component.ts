import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ProjectService } from "../project.service";

@Component({
    selector: "app-status",
    templateUrl: "./status.component.html",
    styleUrls: ["./status.component.scss"],
})
export class StatusComponent implements OnInit {
    layoutShow: boolean = null;
    editForm;
    datas;
    dealCloseDate;
    dxpList;
    dxleList;
    dxpkeyword = "name";
    dxlekeyword = "dxLeadEmail";
    successMssg;
    errorMssg;
    srkeyword = "salesRepresentative";
    lists;

    constructor(
        public fb: FormBuilder,
        private projectService: ProjectService
    ) {
        this.editForm = this.fb.group({
            clientName: ["", Validators.required],
            oppName: [{ value: "", disabled: true }, Validators.required],
            dealValue: ["", Validators.required],
            oppDesc: ["", Validators.required],
            dxValue: ["", Validators.required],
            oppStatus: ["", Validators.required],
            domain: ["", Validators.required],
            probility: ["", Validators.required],
            dealCloseDate: ["", Validators.required],
            estStartDate: ["", Validators.required],
            salesForceURL: ["", Validators.required],
            artifactsURL: ["", Validators.required],
            dxPursuitLead: ["", Validators.required],
            dxLeadEmail: ["", Validators.required],
            salesRepresentative: ["", Validators.required],
            statusUpdate: ["", Validators.required],
        });
    }

    ngOnInit() {
        this.projectService
            .list("?email=" + sessionStorage.getItem("LoggedInUser"))
            .subscribe(
                (resp) => {
                    this.datas = resp;
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
    noForm() {
        this.layoutShow = false;
    }
    yesForm() {
        this.layoutShow = true;
    }

    setValue(dataValue) {
        console.log(dataValue.history.length);
        if (dataValue.history != 0) {
            let length = dataValue.history.length;
            dataValue.oppDesc = dataValue.history[length - 1].oppDesc;
            dataValue.dxValue = dataValue.history[length - 1].dxValue;
            dataValue.dealValue = dataValue.history[length - 1].dealValue;
            dataValue.oppStatus = dataValue.history[length - 1].oppStatus;
            dataValue.domain = dataValue.history[length - 1].domain;
            dataValue.dealStatus = dataValue.history[length - 1].dealStatus;
            dataValue.probility = dataValue.history[length - 1].probility;
            dataValue.salesForceURL =
                dataValue.history[length - 1].salesForceURL;
            dataValue.artifactsURL =
                dataValue.history[length - 1].artifactsURL;
            dataValue.dealCloseDate =
                dataValue.history[length - 1].dealCloseDate;
            dataValue.estStartDate = dataValue.history[length - 1].estStartDate;
            dataValue.dxPursuitLead =
                dataValue.history[length - 1].dxPursuitLead;
            dataValue.salesRepresentative =
                dataValue.history[length - 1].salesRepresentative;
            dataValue.statusUpdate = dataValue.history[length - 1].statusUpdate;
        }
        this.editForm.patchValue({
            oppName: dataValue.oppName,
            oppDesc: dataValue.oppDesc,
            dxValue: dataValue.dxValue,
            dealValue: dataValue.dealValue,
            oppStatus: dataValue.oppStatus,
            domain: dataValue.domain,
            dealStatus: dataValue.dealStatus,
            probility: dataValue.probility,
            salesForceURL: dataValue.salesForceURL,
            artifactsURL: dataValue.artifactsURL,
            dealCloseDate: dataValue.dealCloseDate,
            estStartDate: dataValue.estStartDate,
            dxPursuitLead: dataValue.dxPursuitLead[0].name,
            dxLeadEmail: dataValue.dxPursuitLead[0].email,
            salesRepresentative: dataValue.salesRepresentative,
            statusUpdate: dataValue.statusUpdate,
        });
    }

    populateValue() {
        this.setValue(this.editForm.value.clientName);
    }

    onSubmit() {
        console.log(this.editForm);
        let id = this.editForm.value.clientName["_id"];
        let data = this.editForm.value;

        if (this.editForm.value.dxPursuitLead.name) {
            data.dxPursuitLead = this.editForm.value.dxPursuitLead.name;
        }
        if (this.editForm.value.salesRepresentative.salesRepresentative) {
            data.salesRepresentative = this.editForm.value.salesRepresentative.salesRepresentative;
        }
        delete data["clientName"];

        this.projectService.update(id, data).subscribe(
            (resp) => {
                console.log(resp);
                this.errorMssg = false;
                this.successMssg = true;
            },
            (err) => {
                this.errorMssg = true;
                this.successMssg = false;
                console.log(err);
            }
        );
    }
}
