import { Component, OnInit } from '@angular/core';
import { DeopsService } from '../../service/deops.service';

@Component({
  selector: 'app-vm',
  templateUrl: './vm.component.html'
})
export class VmComponent implements OnInit {

  vmsList: any;

  constructor(
    private devopSservice: DeopsService
    ) { }

  ngOnInit() {
    this.getVmList();
  }

  getVmList() {
    this.devopSservice.getVmList().subscribe((data: any) => {
      this.vmsList = data;
      console.log('vmlist ' + data);
    }, error => {
      console.log('error occured while getting vm lists');
    });
  }
}
