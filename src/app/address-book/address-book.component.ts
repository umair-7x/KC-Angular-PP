import { Component, OnInit } from '@angular/core';
import { Subscribable } from 'rxjs';
import { LoadNextContactsAction } from './actions/load-next-contacts.action';
import { AddressBookState } from './models/address-book.state';
import { AddressBookStateService } from './services/address-book.state-service';

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.css'],
})
export class AddressBookComponent implements OnInit {
  public state: AddressBookState;
  public isLoading$: Subscribable<boolean>;

  constructor(private addressBookStateService: AddressBookStateService) {}

  ngOnInit() {
    this.addressBookStateService.state$.subscribe(this.onStateUpdate);

    this.isLoading$ = this.addressBookStateService.isLoading$;
  }

  public onScrollToBottom = () => {
    this.addressBookStateService.dispatch(new LoadNextContactsAction());
  };

  private onStateUpdate = (updatedState: AddressBookState) => {
    this.state = updatedState;
  };
}
