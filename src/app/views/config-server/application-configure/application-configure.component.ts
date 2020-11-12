import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigService } from '../../../service/config.service';

@Component({
  selector: 'app-application-configure',
  templateUrl: './application-configure.component.html'
})
export class ApplicationConfigureComponent implements OnInit {

  applicationForm: FormGroup;
  applicationsList: any = {};
  operationMode = 'add';

  isSubmitted: boolean = false;
  isSuccess: any;
  _statusMsg: any;

  ngOnInit() {
      this.loadApplications();
      this.addApplication();
  }

  constructor(
      public fb: FormBuilder,
      private ngZone: NgZone,
      private router: Router,
      private configService: ConfigService,
  ) { }

  addApplication() {
      this.applicationForm = this.fb.group({
          id: [''],
          name: ['', Validators.required]

      });
  }

  
  loadApplications() {
      this.configService.getApplicationsList().subscribe((data: any) => {
          this.applicationsList = data;
      }, err => {
          alert(err);
      });
  }

  submitForm() {
      for (let controller in this.applicationForm.controls) {
          this.applicationForm.get(controller).markAsTouched();
      }
      if (this.applicationForm.invalid) {
          return;
      }
      if (this.operationMode === 'edit') {
          this.updateApp();
      } else {
          this.addApp();
      }
  }

  addApp() {
    this.configService.addApplication(this.applicationForm.value).subscribe((res: any) => {
        this.isSubmitted = true;
        if (res) {
            this.isSuccess = res.success;
            if (res.success) {
                this.loadApplications();
                this._statusMsg = res.message;
                this.applicationForm.reset();
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

updateApp() {
    this.configService.updateApplication(this.applicationForm.value.id, this.applicationForm.value).subscribe((res: any) => {
        this.isSubmitted = true;
        if (res) {
            this.isSuccess = res.success;
            if (res.success) {
                this.loadApplications();
                this._statusMsg = res.message;
                this.applicationForm.reset();
                this.operationMode = 'add';
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

}
