import { AddressBookStateService } from './address-book/services/address-book.state-service';
import { ContactsDataService } from './_data/contacts.service';

export const APP_PROVIDERS = [ContactsDataService, AddressBookStateService];
