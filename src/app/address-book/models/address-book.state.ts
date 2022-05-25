import { ContactModel } from './contact';

export class AddressBookState {
  public contacts: ContactModel[];
  public searchTerm: string;

  constructor() {
    this.contacts = [];
    this.searchTerm = '';
  }
}
