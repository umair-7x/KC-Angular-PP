import { GENDER } from '../../_core/enum/gender';

export class ContactName {
  public title: string;
  public first: string;
  public last: string;
}

export class ContactLocation {
  public street: ContactLocationStreet;
  public city: string;
  public state: string;
  public postcode: string;
  public coordinates: Location;
}

export class ContactLocationStreet {
  public name: string;
  public number: number;
}

export class ContactDob {
  public date: string;
  public age: number;
}

export class ContactPicture {
  public large: string;
  public medium: string;
  public thumbnail: string;
}

export class Contact {
  public name: ContactName;
  public location: ContactLocation;
  public dob: ContactDob;
  public picture: ContactPicture;
  public email: string;
  public cell: string;
  public gender: GENDER;
}
