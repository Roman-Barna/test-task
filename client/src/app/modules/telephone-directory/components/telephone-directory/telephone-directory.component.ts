import { Component, OnInit } from '@angular/core';
import { ModalFormComponent } from '../../modals/modal-form/modal-form.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client';

@Component({
  selector: 'app-telephone-directory',
  templateUrl: './telephone-directory.component.html',
  styleUrls: ['./telephone-directory.component.scss']
})
export class TelephoneDirectoryComponent implements OnInit {
  modalRef: MdbModalRef<ModalFormComponent> | null = null;

  contactsClient: Client[] = []
  constructor(private modalService: MdbModalService, private clientServise: ClientService) { }

  ngOnInit(): void {
    this.clientServise.getAllClient().subscribe(data => this.contactsClient = data)
    this.clientServise.contactsClient.subscribe(data => this.contactsClient = data)
  }

  openModal(): void {
    this.modalRef = this.modalService.open(ModalFormComponent, {
      modalClass: 'modal-xl ' // modal-dialog-scrollable
    })
  }


}
