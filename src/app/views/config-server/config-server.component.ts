import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../service/config.service';

@Component({
  selector: 'app-config-server',
  templateUrl: './config-server.component.html'
})
export class ConfigServerComponent implements OnInit {

  constructor(private configService: ConfigService) { }

  applications: any = {};
  appProperties: any = {};

  ngOnInit() {
    this.getApplications();
    this.getAppPropertiesById(this.applications.id);
  }

  getApplications() {
    this.configService.getApplicationsList().subscribe((data) => {
      this.applications = data;
      console.log('application list ', this.applications);
    }, err => {
      console.log('error', err);
    });
  }
  getAppPropertiesById(id) {
    this.configService.getApplicationPropertiesById(id).subscribe((data) => {
    this.appProperties = data;
    console.log('appProperties :; ' + this.appProperties);
    }, err => {
      console.log('error :; ' + err);
    });
  }

}
