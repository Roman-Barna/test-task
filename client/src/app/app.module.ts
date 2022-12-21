import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactListComponent } from './modules/telephone-directory/components/contact-list/contact-list.component';
import { ClientComponent } from './modules/telephone-directory/components/client/client.component';
import { TelephoneDirectoryComponent } from './modules/telephone-directory/components/telephone-directory/telephone-directory.component';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { ModalFormComponent } from './modules/telephone-directory/modals/modal-form/modal-form.component';
import { ModalEditComponent } from './modules/telephone-directory/modals/modal-edit/modal-edit.component';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    ClientComponent,
    TelephoneDirectoryComponent,
    ModalFormComponent,
    ModalEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MdbModalModule,
    MatTableModule,
    MatIconModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
