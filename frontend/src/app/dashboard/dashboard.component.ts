import { Component, OnInit } from "@angular/core";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { multi } from "./data";
import { EventServiceService } from "../event/event-service.service";
import { ProjectService } from "../project/project.service";

@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
    single: any[];
    two: any[];
    multi: any[];
    // view: any[] = [, 300];
    view: any[] = [1100, 400];
    eventSlide1: any[];
    eventSlide2: any[];
    // options
    legend: boolean = false;
    showLabels: boolean = true;
    animations: boolean = true;
    xAxis: boolean = true;
    yAxis: boolean = true;
    showYAxisLabel: boolean = false;
    showXAxisLabel: boolean = false;
    xAxisLabel: string = "Profit";
    yAxisLabel: string = "Project";
    timeline: boolean = true;
    first;
    three = [];
    lists;
    display: boolean = false;

    showDialog() {
        this.display = true;
    }

    colorScheme = {
        domain: [
            "#5AA454",
            "#E44D25",
            "#CFC0BB",
            "#7aa3e5",
            "#a8385d",
            "#aae3f5",
        ],
    };
    cardColor: string = "#232837";

    RFPR = [];
    RFPIP = [];
    PS = [];
    PUR = [];
    SOWUR = [];
    SOW = [];
    VA = [];
    WON = [];
    BD = [];
    PNS = [];
    CLOSED = [];
    financial = [];
    retail = [];
    media = [];
    telecom = [];
    healthcare = [];
    tnh = [];

    opportunity = [];
    data;

    constructor(
        public projectService: ProjectService,
        public eventService: EventServiceService
    ) {}

    ngOnInit() {
        this.single = this.first;
        this.getEventList();
        this.getOpportunityCount();
    }

    /**
     * @description Get Events
     */
    getEventList() {
        this.eventService.getEvents().subscribe(
            (resp) => {
                if (Array.isArray(resp)) {
                    resp.reverse();
                    this.eventSlide1 = resp.slice(0, 3);
                    this.eventSlide2 = resp.slice(3, 6);
                }
            },
            (err) => {
                console.log(err);
            }
        );
    }

    getOpportunityCount() {
        this.projectService.list("").subscribe(
            (resp) => {
                if (resp) {
                    Object.keys(resp).forEach((key) => {
                        console.log(resp[key]);
                        if (resp[key].oppStatus == "RFP Requested") {
                            this.RFPR.push(resp[key].oppStatus);
                        }
                        if (resp[key].oppStatus == "RFP In Progress") {
                            this.RFPIP.push(resp[key].oppStatus);
                        }
                        if (resp[key].oppStatus == "Proposal Submitted") {
                            this.PS.push(resp[key].oppStatus);
                        }
                        if (resp[key].oppStatus == "Proposal Under Review") {
                            this.PUR.push(resp[key].oppStatus);
                        }
                        if (resp[key].oppStatus == "SOW Under Review") {
                            this.SOWUR.push(resp[key].oppStatus);
                        }
                        if (resp[key].oppStatus == "SOW") {
                            this.SOW.push(resp[key].oppStatus);
                        }
                        if (resp[key].oppStatus == "Verbal Approval") {
                            this.VA.push(resp[key].oppStatus);
                        }
                        if (resp[key].oppStatus == "Won") {
                            this.WON.push(resp[key].oppStatus);
                        }
                        if (resp[key].oppStatus == "Business Development") {
                            this.BD.push(resp[key].oppStatus);
                        }
                        if (resp[key].oppStatus == "Proposal not shortlisted") {
                            this.PNS.push(resp[key].oppStatus);
                        }
                        if (resp[key].oppStatus == "Closed") {
                            this.CLOSED.push(resp[key].oppStatus);
                        }
                        if (resp[key].domain == "Financial") {
                            this.financial.push(resp[key].domain);
                        }
                        if (resp[key].domain == "Media") {
                            this.media.push(resp[key].domain);
                        }
                        if (resp[key].domain == "Healthcare") {
                            this.healthcare.push(resp[key].domain);
                        }
                        if (resp[key].domain == "Telecom") {
                            this.telecom.push(resp[key].domain);
                        }
                        if (resp[key].domain == "Retail") {
                            this.retail.push(resp[key].domain);
                        }
                        if (resp[key].domain == "Travel & Hospitality") {
                            this.tnh.push(resp[key].domain);
                        }
                        if(resp[key].clientName)
                        {
                          this.three.push(​​resp[key].clientName);
                        }
                    });
                }
                this.renderChart();
            },
            (err) => {
                console.log(err);
            }
        );
    }

    renderChart() {
        Object.assign(this, { multi });

        this.first = [
            {
                id: "won",
                name: "Won",
                value: this.WON.length,
            },
            {
                id: "verba",
                name: "Verbal approval",
                value: this.VA.length,
            },
            {
                id: "Rfpr",
                name: "RFP Requested",
                value: this.RFPR.length,
            },
            {
                id: "Rfpi",
                name: "RFP in-progress",
                value: this.RFPIP.length,
            },
            {
                id: "Pros",
                name: "Proposal submitted",
                value: this.PS.length,
            },
            {
                id: "Prour",
                name: "Proposal under Review",
                value: this.PUR.length,
            },
            {
                id: "Sowu",
                name: "SOW under Review",
                value: this.SOWUR.length,
            },
            {
                id: "Sow",
                name: "SOW",
                value: this.SOW.length,
            },

            {
                id: "Bda",
                name: "Business Development",
                value: this.BD.length,
            },
            {
                id: "propNotShort",
                name: "Proposal not shortlisted",
                value: this.PNS.length,
            },
            {
                id: "closed",
                name: "Closed",
                value: this.CLOSED.length,
            },
        ];

        this.two = [
            {
                id: "financial",
                name: "Financial",
                value: this.financial.length,
            },
            {
                id: "retail",
                name: "Retail",
                value: this.retail.length,
            },
            {
                id: "media",
                name: "Media",
                value: this.media.length,
            },
            {
                id: "healthcare",
                name: "Healthcare",
                value: this.healthcare.length,
            },
            {
                id: "telecom",
                name: "Telecom",
                value: this.telecom.length,
            },
            {
                id: "Travel",
                name: "Travel & Hospitality",
                value: this.tnh.length,
            },
        ];
        this.single = this.first;
    }

    onSelect(event) {
        console.log(event);
    }

    change(e) {
      let countClient = {};
      let result =[];
      this.three.forEach(function(x){
      countClient[x] = (countClient[x] || 0) + 1;
      });
      
       for (var num in countClient) {
      result.push({'name': num, 'value': countClient[num]});
      }
      
       if (e == "Vertical Domain") {
      this.single = this.two;
      } else if (e == "By Client") {
      this.single = result;
      } else {
      this.single = this.first;
      }
      }
}
