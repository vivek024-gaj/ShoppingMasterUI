import { Component, OnInit } from '@angular/core';
import { DockerService } from '../../service/docker.service';

@Component({
  selector: 'app-docker',
  templateUrl: './docker.component.html'
})
export class DockerComponent implements OnInit {

  constructor(private dockerService: DockerService) { }

  dockerInfoList: any = {};

  ngOnInit() {
    this.getDockersInfo();
  }
  getDockersInfo() {
    this.dockerService.getDockersInfo().subscribe((data) => {
      this.dockerInfoList = data;
      console.log('dockerInfoList', this.dockerInfoList);
    }, err => {
      console.log('error', err);
    });
  }


}
