import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { FormControl, FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ClientService } from 'src/app/modules/telephone-directory/services/client.service';
import { Checkbox } from '../../models/checkbox';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss']
})
export class ModalFormComponent implements OnInit {

  file: any | null = null
  imagesURL: string = ''
  stateClientSelect:Array<string> = []
  notificationChannelLogLevels: Checkbox[] = []
  contactForm: FormGroup 
  constructor(private fb: FormBuilder,
     private clientService: ClientService,
     public modalRef: MdbModalRef<ModalFormComponent>) {
      this.contactForm = this.fb.group({ 
        'lastName': new FormControl ('', Validators.required),
        'firstName': new FormControl ('', Validators.required),
        'surName': new FormControl ('', Validators.required),
        'date': new FormControl ('', Validators.required),
        'image': new FormControl (''),
        phones: this.fb.array([this.fb.group({
          'phone': new FormControl('', [Validators.required])
        })]),
        emails: this.fb.array([this.fb.group({
          'email': new FormControl('', [Validators.required])
        })]),
          "select": new FormControl ('', Validators.required),
        Channel: this.fb.array([], [this.customValidateArrayGroup()])
      })
      
}

  ngOnInit(): void {
    this.stateClientSelect = this.clientService.stateClientSelect
    this.notificationChannelLogLevels = this.clientService.notificationChannelLogLevels
    this.notificationChannelLogLevels.forEach((value: any) => {
      this.channels.push(this.fb.group({
        isActive: value.IsActive,
        name: value.Name
      }))
    })
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

customValidateArrayGroup() {
  return function validate(formArr: AbstractControl): ValidationErrors | null {
    const filtered = (formArr as FormArray).value.filter((chk:any) => chk.isActive);
    return filtered.length ? null : { hasError: true }
  };
}

addPhone(): void { 
  const phoneForm = this.fb.group({'phone': new FormControl('', [Validators.required])});
  this.phones.controls.length < 3 ? this.phones.push(phoneForm) : null
}

addEmail(): void { 
  const emailForm = this.fb.group({'email': new FormControl('', [Validators.required])});
  this.emails.controls.length < 3 ? this.emails.push(emailForm) : null
}

close(): void { 
  const closeMessage = 'Modal closed';
  this.modalRef.close(closeMessage)
}

clearFormArray = (formArray: FormArray, count: number): void => {
  while (formArray.length !== count) {
    formArray.removeAt(0)
  }
}

onChangeFile(event: any) {
  const file = event.target.files[0]
  this.clientService.downloadFiles(file).subscribe((data: any) => {
    this.imagesURL = data
    this.file = file
  })
}

submit(): void {
  if (this.contactForm.valid) {
    const data = this.contactForm.value;
    data.boolean = false
    this.contactForm.reset()
    this.clearFormArray(this.channels, 0)
    this.clearFormArray(this.emails, 1)
    this.clearFormArray(this.phones, 1)
    this.notificationChannelLogLevels.forEach(value => {
      this.channels.push(this.fb.group({
        isActive: false,
        name: value.Name
      }))
    })
    this.clientService.addClient(data, this.file)
    this.file = null
  }
}

}
