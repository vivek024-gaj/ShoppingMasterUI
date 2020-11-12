import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { ConfigService } from '../../../service/config.service';
import { LibraryService } from '../../../service/library.service';
import { ConfirmationModalComponent } from '../../modal/confirmation-modal/confirmation-modal.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html'
})
export class LibraryComponent implements OnInit {

  
  constructor(private libService: LibraryService,
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router) { }

  @ViewChild('confirmModal', { static: false }) public confirmModal: ConfirmationModalComponent;

  libraryForm: FormGroup;
  libraryList: any = [];

  operationMode = 'add';

  isSubmitted: boolean = false;
  isSuccess: any;
  _statusMsg: any;

  ngOnInit() {

   this.loadLibs();
   this.validateLibrary();
  }


  validateLibrary() {
    this.libraryForm = this.fb.group({
        id: [''],
        name: ['', Validators.required]

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
    for (let controller in this.libraryForm.controls) {
        this.libraryForm.get(controller).markAsTouched();
    }
    if (this.libraryForm.invalid) {
        return;
    }
    if (this.operationMode === 'edit') {
        this.updateLib();
    } else {
        this.addLib();
    }
}

editLib(data) {
    this.operationMode = 'edit';
    this.libraryForm.patchValue(data);
}

addLib() {
    this.libService.addLibrary(this.libraryForm.value).subscribe((res: any) => {
        this.isSubmitted = true;
        if (res) {
            this.isSuccess = res.success;
            if (res.success) {
                this.loadLibs();
                this._statusMsg = res.message;
                this.libraryForm.reset();
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

updateLib() {
    this.libService.updateLibraries(this.libraryForm.value.id, this.libraryForm.value).subscribe((res: any) => {
        this.isSubmitted = true;
        if (res) {
            this.isSuccess = res.success;
            if (res.success) {
                this.loadLibs();
                this._statusMsg = res.message;
                this.libraryForm.reset();
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
                    this.libraryForm.reset();
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
