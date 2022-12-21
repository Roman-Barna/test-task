import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/modules/telephone-directory/services/client.service';
import { Client } from '../../models/client';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  contactsClient: Client[] = []
  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.clientService.getAllClient().subscribe((data: Client[]) => this.contactsClient = data)
    this.clientService.contactsClient.subscribe(data => this.contactsClient = data)
  }

}
