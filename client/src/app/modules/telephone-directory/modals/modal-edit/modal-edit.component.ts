import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { FormControl, FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ClientService } from 'src/app/modules/telephone-directory/services/client.service';

@Component({
    selector: 'app-modal-form',
    templateUrl: './modal-edit.component.html',
    styleUrls: ['./modal-edit.component.scss']
})
export class ModalEditComponent implements OnInit {
    date: any | null = null
    boolean: boolean | null = null
    contactForm: FormGroup = new FormGroup({})
    stateClientSelect: Array<string> = []
    // file
    file: any | null = null
    fileImg = ''

    constructor(public modalRef: MdbModalRef<ModalEditComponent>,
        private fb: FormBuilder,
        private clientService: ClientService) {
    }

    ngOnInit(): void {
      
      this.contactForm = this.fb.group({ 
        'lastName': new FormControl (this.date.lastName, Validators.required),
        'firstName': new FormControl (this.date.firstName, Validators.required),
        'surName': new FormControl (this.date.surName, Validators.required),
        'date': new FormControl (this.date.date, Validators.required),
        'file': new FormControl (''),
        phones: this.fb.array([]),
        emails: this.fb.array([]),
        "select": new FormControl (this.date.select, Validators.required),
        Channel: this.fb.array([], [this.customValidateArrayGroup()])
      })
      
        this.date.emails.forEach((value: any) => {
          this.emails.push(this.fb.group({
            email: new FormControl(value.email, [Validators.required])
          }))
        })
        this.date.phones.forEach((value: any) => {
          this.phones.push(this.fb.group({
            phone: new FormControl(value.phone, [Validators.required])
          }))
        })
        this.date.Channel.forEach((value: any) => {
          this.channels.push(this.fb.group({
            isActive: value.isActive ? true : false,
            name: value.name
          }))
        })
      this.stateClientSelect = this.clientService.stateClientSelect
      this.fileImg = this.date.image
    }

    get phones() { 
        return this.contactForm.controls["phones"] as FormArray;
    }
    get emails() { 
        return this.contactForm.controls["emails"] as FormArray;
    }
    get channels() {
      return this.contactForm.get('Channel') as FormArray;
    }

    onChangeFile(event: any) {
      const file = event.target.files[0]
      this.clientService.downloadFiles(file).subscribe((data: any) => {
        this.fileImg = data
        this.file = file
      })
    }

    customValidateArrayGroup() {
        return function validate(formArr: AbstractControl): ValidationErrors | null {
          const filtered = (formArr as FormArray).value.filter((chk:any) => chk.isActive);
          return filtered.length ? null : { hasError: true }
        };
      }
      
      addPhone(): void  { 
        const phoneForm = this.fb.group({'phone': new FormControl('', [Validators.required])});
        this.phones.controls.length < 3 ? this.phones.push(phoneForm) : null
      }
      
      addEmail(): void  { 
        const emailForm = this.fb.group({'email': new FormControl('', [Validators.required])});
        this.emails.controls.length < 3 ? this.emails.push(emailForm) : null
      }

      close(): void { 
        const closeMessage = 'Modal closed';
        this.modalRef.close(closeMessage)
      }
      
      openEdit(): void  {
        this.boolean = true
      }

      submit(): void {
        if (this.contactForm.valid) {
          const data = this.contactForm.value;
          data._id = this.date._id
          this.clientService.editClient(data, this.file === null ? this.fileImg : this.file)
          this.close()
        }
      }

}
