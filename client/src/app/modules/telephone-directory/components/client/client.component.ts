import { Component, Input, OnInit } from '@angular/core';
import { ModalEditComponent } from '../../modals/modal-edit/modal-edit.component';
import { ClientService } from '../../services/client.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Client } from '../../models/client';

@Component({
  selector: '[app-client]',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  modalRef: MdbModalRef<ModalEditComponent> | null = null;

  @Input()client: any | null = null
  constructor(
    private clientService: ClientService,
    private modalService: MdbModalService
  ) {}

  ngOnInit(): void {}

  openModal(date: Client, boolean: boolean) {
    this.modalRef = this.modalService.open(ModalEditComponent, {
      modalClass: 'modal-xl ', // modal-dialog-scrollable
      data: { date, boolean },
    });
  }

  deleteClient(_id: string): void {
    this.clientService.deleteClient(_id);
  }
}
