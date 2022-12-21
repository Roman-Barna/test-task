import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Checkbox } from '../models/checkbox';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  URL: string = "http://localhost:8218/api/client"
  contactsClient: Subject<Client[]> = new Subject()
  stateClientSelect: Array<string> = [
    "Вибрати варіант",
    "Має ділянку",
    "Має гроші",
    "Має мийку на оновлення",
    "Спілкуємось",
    "Заключили договір",
    "Власник мийки"
  ]
  notificationChannelLogLevels: Checkbox[] = [
    {
      isActive: false,
      Name: 'Поговорив про кредит набрати наступного місяця'
    },
    {
      isActive: false,
      Name: 'Набрав коли домовились надіслав договір'
    },
    {
      isActive: false,
      Name: 'Обговорили умови'
    }
  ]
  constructor(private http: HttpClient) { }

  getAllClient():Observable<Client[]> {
    return this.http.get(this.URL) as Observable<Client[]>; 
  }

  editClient(client: Client, file: File): void {
    const formData = new FormData()
    formData.append('filedata', file);
    formData.append('lastName', client.lastName);
    formData.append('firstName', client.firstName);
    formData.append('surName', client.surName);
    formData.append('select', client.select);
    formData.append('date', client.date);
    formData.append('phones', JSON.stringify(client.phones));
    formData.append('emails', JSON.stringify(client.emails));
    formData.append('Channel', JSON.stringify(client.Channel));

    this.http.put(`${this.URL}/${client._id}`, formData).subscribe(() => {
    this.getAllClient().subscribe(data=> this.contactsClient.next(data))
    })
  }

  deleteClient(_id: string){
    this.http.delete(`${this.URL}/${_id}`).subscribe(() => {
      this.getAllClient().subscribe(data=> this.contactsClient.next(data))
    })
  }

  addClient(client: Client, file: File): void {
    const formData = new FormData()
    formData.append('filedata', file);
    formData.append('lastName', client.lastName);
    formData.append('firstName', client.firstName);
    formData.append('surName', client.surName);
    formData.append('select', client.select);
    formData.append('date', client.date);
    formData.append('phones', JSON.stringify(client.phones));
    formData.append('emails', JSON.stringify(client.emails));
    formData.append('Channel', JSON.stringify(client.Channel));
    this.http.post(this.URL, formData).subscribe(() => {
      this.getAllClient().subscribe(data=> this.contactsClient.next(data))
    })
  }

  downloadFiles(file: File) {
    const formData = new FormData()
    formData.append('filedata', file);
    return this.http.post(`${this.URL}/download`, formData)
  }
}
