import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { APP_CONSTS } from '../../_core/const/app.const';
import { GENDER } from '../../_core/enum/gender';
import { IAction } from '../../_core/interface/action.interface';
import { ContactsDataService } from '../../_data/contacts.service';
import { Contact, ContactLocation } from '../../_data/model/contact';
import { RandomUserResponse } from '../../_data/model/random-user-response';
import { LoadNextContactsAction } from '../actions/load-next-contacts.action';
import { AddressBookState } from '../models/address-book.state';
import { ContactModel } from '../models/contact';

@Injectable()
export class AddressBookStateService {
  public state$: BehaviorSubject<AddressBookState>;
  public isLoading$: BehaviorSubject<boolean>;
  private state: AddressBookState;
  private isLoading: boolean;

  constructor(private contactsDataService: ContactsDataService) {
    this.state = new AddressBookState();
    this.state$ = new BehaviorSubject<AddressBookState>(this.state);
    this.isLoading = true;
    this.isLoading$ = new BehaviorSubject<boolean>(this.isLoading);

    this.contactsDataService
      .getAllContactsForUser('123')
      .pipe(take(1))
      .subscribe(this.onGetInitialContactsForUserSuccess);
  }

  public dispatch = (action: IAction) => {
    if (action instanceof LoadNextContactsAction) {
      this.handleLoadNextContactsAction();
    }
  };

  private publishStateUpdate = () => {
    this.state$.next(this.state);
  };

  private publishIsLoadingUpdate = () => {
    this.isLoading$.next(this.isLoading);
  };

  private onGetInitialContactsForUserSuccess = (
    response: RandomUserResponse
  ) => {
    this.state.contacts = response.results.map(this.mapContactToContactModel);
    this.isLoading = false;
    this.publishStateUpdate();
    this.publishIsLoadingUpdate();
  };

  private handleLoadNextContactsAction = () => {
    if (!this.isLoading) {
      this.isLoading = true;

      this.contactsDataService
        .getAllContactsForUser(null)
        .pipe(take(1))
        .subscribe(this.onGetMoreContactsSuccess);
    }
  };

  private onGetMoreContactsSuccess = (response: RandomUserResponse) => {
    this.state.contacts = this.state.contacts.concat(
      response.results.map(this.mapContactToContactModel)
    );
    this.isLoading = false;
    this.publishStateUpdate();
    this.publishIsLoadingUpdate();
  };

  private mapContactToContactModel = (contact: Contact) => {
    return <ContactModel>{
      firstName: contact.name.first,
      lastName: contact.name.last,
      fullName: [contact.name.first, contact.name.last].join(' '),
      cellNumber: contact.cell,
      email: contact.email,
      birthday: new Date(contact.dob.date).toLocaleDateString(
        'en-US',
        APP_CONSTS.BIRTHDAY_LONG_DATE_FORMAT_OPTIONS
      ),
      address: this.getAddressLabel(contact.location),
      profilePictureUrl: contact.picture.thumbnail,
      pictureUrl: contact.picture.large,
      age: contact.dob.age,
      gender: contact.gender,
      shortGenderLabel: this.getShortGenderLabel(contact.gender),
      fullGenderLabel: this.getFullGenderLabel(contact.gender),
      occupation: '',
    };
  };

  private getAddressLabel = (location: ContactLocation) => {
    return `${location.street.number} ${location.street.name}, ${location.city}, ${location.state}, ${location.postcode}`;
  };

  private getShortGenderLabel = (userGender: GENDER) => {
    switch (userGender) {
      case GENDER.MALE:
        return 'M';
      case GENDER.FEMALE:
        return 'F';
      case GENDER.NON_BINARY:
        return 'Non-Binary';
    }
  };

  private getFullGenderLabel = (userGender: GENDER) => {
    switch (userGender) {
      case GENDER.MALE:
        return 'Male';
      case GENDER.FEMALE:
        return 'Female';
      case GENDER.NON_BINARY:
        return 'Non-Binary';
    }
  };
}
