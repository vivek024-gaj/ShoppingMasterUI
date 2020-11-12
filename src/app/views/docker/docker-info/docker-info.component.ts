import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DockerService } from '../../../service/docker.service';

@Component({
  selector: 'app-docker-info',
  templateUrl: './docker-info.component.html'
})
export class DockerInfoComponent implements OnInit {

  constructor(private actRoute: ActivatedRoute,
    private dockerService: DockerService,
    private router: Router,
    private formBuilder: FormBuilder) { }


  dockerForm: FormGroup;
  operationMode = 'add';

  isSubmitted: boolean = false;
  isSuccess: any;
  _statusMsg: any;
  fieldError: any;

  portArr: any = [];
  userArr: any = [];
  apiArr: any = [];

  type: any;

  dockerInfoList: any = [];

  ngOnInit() {
    this.dockerFormValidate();
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

  dockerFormValidate(){
    this.dockerForm = this.formBuilder.group({
      dockerId: [''],
      dockerType: ['', Validators.required],
      dockerName: ['', Validators.required],
      image: ['', Validators.required],
      ipAddress: ['', Validators.required],
      protocol: [''],
      internalPort: [''],
      externalPort: [''],
      username: [''],
      password: [''],
      databaseName: [''],
      endpointUrl: [''],
      methodType: ['']
    });
  }

  addDocker() {
    let formdata = this.dockerForm.value;
    // formdata.id=this.dockerId;
    formdata.portArr = this.portArr;
    formdata.userArr = this.userArr;
    formdata.apiArr = this.apiArr;
    this.dockerService.addDocker(formdata).subscribe((res: any) => {
      this.isSubmitted = true;
      if (res) {
        this.isSuccess = res.success;
        if (res.success) {
            this._statusMsg = res.message;
            this.dockerForm.reset();
            setTimeout(() => {
                this.isSubmitted = false;
                this.isSuccess = false;
            }, 4000);
        } else {
            this._statusMsg = res.error;
        }
    }
    }, err => {
      console.log(err);
  });
  }

  getImageTypeValue(value:string){
    this.portArr.length = 0;
    this.userArr.length = 0;
    this.apiArr.length = 0;
    this.type = value;
  }

  addPort(event) {
    console.log(this.dockerForm.value);

    if (this.dockerForm.get('protocol').value === null || this.dockerForm.get('protocol').value === '' ||
    this.dockerForm.get('internalPort').value === null ||
    this.dockerForm.get('externalPort').value === '' || this.dockerForm.get('externalPort').value === null ||
    this.dockerForm.get('protocol').value === '') {
       this.fieldError = 'Please Enter Min 1 Row';
       setTimeout(() => {
        this.fieldError = false;
      }, 2000);
    } else {
      this.portArr.push({protocol: this.dockerForm.value.protocol, internalPort: this.dockerForm.value.internalPort
        , externalPort: this.dockerForm.value.externalPort});
    }
    this.dockerForm.get('protocol').reset();
    this.dockerForm.get('internalPort').reset();
    this.dockerForm.get('externalPort').reset();
    console.log(this.portArr);
  }
  addApi(event) {

    if (this.dockerForm.get('endpointUrl').value === null || this.dockerForm.get('endpointUrl').value === '' ||
    this.dockerForm.get('methodType').value === null || this.dockerForm.get('methodType').value === '') {
      this.fieldError = 'EndPoint Url or Method Type Cannot be blank';
      setTimeout(() => {
       this.fieldError = false;
     }, 2000);
   } else {
     this.apiArr.push({endpointUrl: this.dockerForm.value.endpointUrl, methodType: this.dockerForm.value.methodType});
    }
    this.dockerForm.get('endpointUrl').reset();
    this.dockerForm.get('methodType').reset();
  }

  addUser(event) {

    console.log(this.dockerForm.value.username, this.dockerForm.value.password);

    if (this.dockerForm.get('username').value === null || this.dockerForm.get('username').value === '' ||
    this.dockerForm.get('password').value === null || this.dockerForm.get('password').value === '' ||
    this.dockerForm.get('databaseName').value === null || this.dockerForm.get('databaseName').value === ''){
      this.fieldError = 'Username or Password or Database Cannot be blank';
      setTimeout(() => {
       this.fieldError = false;
     }, 2000);
   } else {
     this.userArr.push({username: this.dockerForm.value.username, password: this.dockerForm.value.password
      , databaseName: this.dockerForm.value.databaseName});
    }
    this.dockerForm.get('username').reset();
    this.dockerForm.get('password').reset();
    this.dockerForm.get('databaseName').reset();

  }
  removePort(i: number) {
    console.log(i);
    this.portArr.splice(i, 1);
  }
  removeUser(i: number) {
    console.log(i);
    this.userArr.splice(i, 1);
  }

  removeApi(i: number) {
    console.log(i);
    this.apiArr.splice(i, 1);
  }
  submitForm() {
    for (let controller in this.dockerForm.controls) {
        this.dockerForm.get(controller).markAsTouched();
    }
    if (this.dockerForm.invalid) {
        return;
    }
    if (this.operationMode === 'edit') {
        // this.updateGroup();
    } else {
        this.addDocker();
    }
}



}
