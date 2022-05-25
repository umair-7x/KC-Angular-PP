import { InjectionToken } from '@angular/core';

export class APP_CONSTS {
  public static get BIRTHDAY_LONG_DATE_FORMAT_OPTIONS(): any {
    return { year: 'numeric', month: 'long', day: 'numeric' };
  }
}
