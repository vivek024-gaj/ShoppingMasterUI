import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { ConfigService } from '../../../service/config.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationModalComponent } from '../../modal/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html'
})
export class ApplicationComponent implements OnInit {

  @ViewChild('confirmModal', { static: false }) public confirmModal: ConfirmationModalComponent;

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

  editApp(data) {
      this.operationMode = 'edit';
      this.applicationForm.patchValue(data);
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



  deleteFieldValue(data, i) {
      data.index = i;
      this.confirmModal.showModal('Delete Data', 'Do you want to delete this data?', data);
  }

  modalConfirmation(event) {
      console.log(event);
      if (event) {
          this.configService.deleteAppliction(event.id).subscribe((res: any) => {
              this.isSubmitted = true;
              if (res) {
                  this.isSuccess = res.success;
                  if (res.success) {
                      this.applicationsList.splice(event.index, 1);
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
  }

}
