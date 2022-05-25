import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ContactCardModule } from '../contact-card/contact-card.module';
import { ContactsDataService } from '../_data/contacts.service';
import { AddressBookComponent } from './address-book.component';
import { AddressBookRoutingModule } from './address-book.routing-module';
import { AddressBookStateService } from './services/address-book.state-service';

@NgModule({
  declarations: [AddressBookComponent],
  imports: [
    CommonModule,
    ContactCardModule,
    AddressBookRoutingModule,
    HttpClientModule,
  ],
  providers: [AddressBookStateService, ContactsDataService],
})
export class AddressBookModule {}
