import { Component, OnInit } from '@angular/core';
import { EurekaService } from '../../service/eureka.service';

@Component({
  selector: 'app-eureka',
  templateUrl: './eureka.component.html'
})
export class EurekaComponent implements OnInit {

  constructor(private eurekaService: EurekaService) { }
  applications: any = {};
  status: any = {};
  runningInstaces: any = {};
  generalStats: any = {};
  apps: any = {};
  lastn: any = {};

  ngOnInit() {
    this.getEurekaStatus();
    this.getEurekaApplications();
    this.getEurekaApps();
    this.getEurekaLastn();
  }

  getEurekaStatus() {
    this.eurekaService.getEurekaServerStatus()
    .subscribe(res => {
        this.applications = res;
        this.status = res.status;

        let obj = this.applications.status.generalStats;
        let appStat = this.applications.status.applicationStats;
        console.log('appStat', appStat);
       let  keys = Object.keys(obj);
       let statVal = Object.keys(appStat);

       for (let key of keys) {
        this.applications.status.generalStats[key.replace(/-/g, '')] = obj[key];
       }
       for (let stat of statVal) {
        this.applications.status.applicationStats[stat.replace(/-/g, '')] = obj[stat];
       }
        console.log('eureka status', this.status);
        console.log('generalStats', this.status);
        console.log('applicationStats', this.status.applicationStats);
    }, err => {
      console.log('error', err);
    });
  }
  getEurekaApplications() {
    this.eurekaService.getEurekaServerApplications()
    .subscribe(res => {
      this.runningInstaces = res.applications;
      console.log('applications', this.runningInstaces);
    }, err => {
      console.log('error', err);
    });
  }
  getEurekaApps() {
    this.eurekaService.getEurekaApp().subscribe((data) => {
      this.apps = data.apps;
      console.log('apps', this.apps);
      
    }, err => {
      console.log('error', err);
    });
  }
  getEurekaLastn() {
    this.eurekaService.getEurekaLastn().subscribe((data) => {
      this.lastn = data.apps;
      console.log('apps', this.lastn);
      
    }, err => {
      console.log('error', err);
    });
  }

}
