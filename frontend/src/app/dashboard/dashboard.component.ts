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

    constructor(public projectService: ProjectService, public eventService: EventServiceService) {
        Object.assign(this, { multi });

        this.first = [
            {
                name: "RFP requested",
                value: 8940000,
            },
            {
                name: "RFP in-progress",
                value: 5000000,
            },
            {
                name: "Proposal submitted",
                value: 7200000,
            },
            {
                name: "Proposal under Review ",
                value: 5200000,
            },
            {
                name: "SOW under Review",
                value: 7700000,
            },
            {
                name: "SOW",
                value: 4300000,
            },
            {
                name: "Verbal approval",
                value: 4300000,
            },
            {
                name: "Won",
                value: 4300000,
            },
            {
                name: "Business Development",
                value: 4300000,
            },
            {
                name: "Proposal not shortlisted",
                value: 4300000,
            },
            {
                name: "Closed",
                value: 4300000,
            },
        ];

        this.two = [
            {
                name: "Financial",
                value: 8940000,
            },
            {
                name: "Retail",
                value: 5000000,
            },
            {
                name: "Media",
                value: 7200000,
            },
            {
                name: "Healthcare",
                value: 5200000,
            },
            {
                name: "Telecom",
                value: 7700000,
            },
            {
                name: "Travel & Hospitality",
                value: 4300000,
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
    }

  

  ngOnInit() {
    this.single = this.first;
    this.getEventList();
  }

  /**
   * @description Get Events
   */
  getEventList() {
    this.eventService.getEvents().subscribe(
        (resp) => {
          if(Array.isArray(resp)){
            //resp.reverse();
            this.eventSlide1 = resp.slice(0, 3);
            this.eventSlide2 = resp.slice(3,6);
          }            
        },
        (err) => {
            console.log(err);
        }
    );
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
