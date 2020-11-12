import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LibraryService } from '../../../service/library.service';
import { ConfirmationModalComponent } from '../../modal/confirmation-modal/confirmation-modal.component';
import { LibraryPropertiesService } from '../../../service/library-properties.service';

@Component({
  selector: 'app-libraries-properties',
  templateUrl: './libraries-properties.component.html'
})
export class LibrariesPropertiesComponent implements OnInit {
  
  constructor(private libService: LibraryService,
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private libProService: LibraryPropertiesService) { }

  @ViewChild('confirmModal', { static: false }) public confirmModal: ConfirmationModalComponent;

  libraryProForm: FormGroup;
  libraryList: any;

  operationMode = 'add';

  isSubmitted: boolean = false;
  isSuccess: any;
  _statusMsg: any;


  ngOnInit() {
    this.validateLibrary();
    this.loadLibs();
  }

  validateLibrary() {
    this.libraryProForm = this.fb.group({
        id: [''],
        libraryId: ['', Validators.required],
        attrKey: ['', Validators.required],
        attrValue: ['', Validators.required]

    });
  }
  loadLibs() {
    this.libService.getAllLibs().subscribe((data) => {
      this.libraryList = data;
      console.log('lib list', this.libraryList);
    }, err => {
      console.log('error');
    });
  }

  submitForm() {
    for (let controller in this.libraryProForm.controls) {
        this.libraryProForm.get(controller).markAsTouched();
    }
    if (this.libraryProForm.invalid) {
        return;
    }
    if (this.operationMode === 'edit') {
        this.updateProLib();
    } else {
        this.addProLib();
    }
}

editLib(data) {
    this.operationMode = 'edit';
    this.libraryProForm.patchValue(data);
}

addProLib() {
    this.libProService.addPropertyLibrary(this.libraryProForm.value).subscribe((res: any) => {
        this.isSubmitted = true;
        if (res) {
            this.isSuccess = res.success;
            if (res.success) {
                this.loadLibs();
                this._statusMsg = res.message;
                this.libraryProForm.reset();
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

updateProLib() {
    this.libService.updateLibraries(this.libraryProForm.value.id, this.libraryProForm.value).subscribe((res: any) => {
        this.isSubmitted = true;
        if (res) {
            this.isSuccess = res.success;
            if (res.success) {
                this.loadLibs();
                this._statusMsg = res.message;
                this.libraryProForm.reset();
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
        this.libService.deleteLibraries(event.id).subscribe((res: any) => {
            this.isSubmitted = true;
            if (res) {
                this.isSuccess = res.success;
                if (res.success) {
                    this.libraryList.splice(event.index, 1);
                    this._statusMsg = res.message;
                    this.libraryProForm.reset();
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
