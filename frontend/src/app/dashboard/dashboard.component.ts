import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { multi } from './data';
import { EventServiceService } from "../event/event-service.service";
import { ProjectService } from '../project/project.service';

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
    three;
    lists;

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
      PNS  = [];
      CLOSED = [];
      financial = [];
      retail = [];
      media = [];
      telecom = [];
      healthcare = [];
      tnh = [];

    opportunity = [];
    data;

    constructor(public projectService: ProjectService, public eventService: EventServiceService) {
        
    }

  

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
          if(Array.isArray(resp)){
            resp.reverse();
            this.eventSlide1 = resp.slice(0, 3);
            this.eventSlide2 = resp.slice(3,6);
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
            if (resp){
              Object.keys(resp).forEach(key => {​​
                console.log(resp[key]);
                if(resp[key].oppStatus == 'RFP Requested'){​​​​
                   this.RFPR.push(resp[key].oppStatus);
                }​​​​
                if(resp[key].oppStatus == 'RFP in-progress'){​​​​
                  this.RFPIP.push(resp[key].oppStatus)
                }​​​​
                if(resp[key].oppStatus == 'Proposal submitted'){​​​​
                  this.PS.push(resp[key].oppStatus)
                }​​​​
                if(resp[key].oppStatus == 'Proposal under Review'){​​​​
                  this.PUR.push(resp[key].oppStatus)
                }​​​​
                if(resp[key].oppStatus == 'SOW Under Review'){​​​​
                  this.SOWUR.push(resp[key].oppStatus)
                }​​​​
                if(resp[key].oppStatus == 'SOW'){​​​​
                  this.SOW.push(resp[key].oppStatus)
                }​​​​
                if(resp[key].oppStatus == 'Verbal approval'){​​​​
                  this.VA.push(resp[key].oppStatus)
                }​​​​
                if(resp[key].oppStatus == 'Won'){​​​​
                  this.WON.push(resp[key].oppStatus)
                }​​​​
                if(resp[key].oppStatus == 'Business Development'){​​​​
                  this.BD.push(resp[key].oppStatus)
                }​​​​
                if(resp[key].oppStatus == 'Proposal not shortlisted'){​​​​
                  this.PNS.push(resp[key].oppStatus)
                }​​​​
                if(resp[key].oppStatus == 'Closed'){​​​​
                  this.CLOSED.push(resp[key].oppStatus)
                }​​​​
                if(resp[key].domain == 'Financial'){​​​​
                  this.financial.push(resp[key].domain)
                }​​​​
                if(resp[key].domain == 'Media'){​​​​
                  this.media.push(resp[key].domain)
                }​​​​
                if(resp[key].domain == 'Healthcare'){​​​​
                  this.healthcare.push(resp[key].domain)
                }​​​​
                if(resp[key].domain == 'Telecom'){​​​​
                  this.telecom.push(resp[key].domain)
                }​​​​
                if(resp[key].domain == 'Retail'){​​​​
                  this.retail.push(resp[key].domain)
                }​​​​
                if(resp[key].domain == 'Travel & Hospitality'){​​​​
                  this.tnh.push(resp[key].domain)
                }​​​​
            }​​);
            }
            this.renderChart()
        },
        (err) => {
            console.log(err);
        }
    );
}

renderChart(){
  Object.assign(this, { multi });

    this.first = [
        {
            name: "RFP Requested",
            value: this.RFPR.length,
        },
        {
            name: "RFP in-progress",
            value: this.RFPIP.length,
        },
        {
            name: "Proposal submitted",
            value: this.PS.length,
        },
        {
            name: "Proposal under Review",
            value: this.PUR.length,
        },
        {
            name: "SOW under Review",
            value: this.SOWUR.length,
        },
        {
            name: "SOW",
            value: this.SOW.length,
        },
        {
            name: "Verbal approval",
            value: this.VA.length,
        },
        {
            name: "Won",
            value: this.WON.length,
        },
        {
            name: "Business Development",
            value: this.BD.length,
        },
        {
            name: "Proposal not shortlisted",
            value: this.PNS.length,
        },
        {
            name: "Closed",
            value: this.CLOSED.length,
        },
    ];

    this.two = [
        {
            name: "Financial",
            value: this.financial.length,
        },
        {
            name: "Retail",
            value: this.retail.length,
        },
        {
            name: "Media",
            value: this.media.length,
        },
        {
            name: "Healthcare",
            value: this.healthcare.length,
        },
        {
            name: "Telecom",
            value: this.telecom.length,
        },
        {
            name: "Travel & Hospitality",
            value: this.tnh.length,
        },
    ];
    this.three = [
        {
            name: "Samsung",
            value: 1,
        },
        {
            name: "Bosch",
            value: 2,
        },
        {
            name: "Exxon",
            value: 3,
        },
        {
            name: "Citi",
            value: 4,
        },
        {
            name: "Telecom",
            value: 5,
        },
        {
            name: "Microsoft",
            value: 6,
        },
    ];
    this.single = this.first;
}


  onSelect(event) {
    console.log(event);
  }

  change(e) {
      console.log(e);
      if (e == "Vertical Domain") {
          this.single = this.two;
      } else if (e == "By Client") {
          this.single = this.three;
      } else {
          this.single = this.first;
      }
  }
}
