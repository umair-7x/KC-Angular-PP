import { Component, Input } from '@angular/core';
import { ContactModel } from '../address-book/models/contact';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.css'],
})
export class ContactCardComponent {
  @Input() contact: ContactModel;
}
