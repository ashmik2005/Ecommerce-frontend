import { FormControl, ValidationErrors } from "@angular/forms";

export class Luv2ShopValidators {

  // whitespace validation
  static onlyWhitespace(control: FormControl): ValidationErrors | null {

    // check if control(string) consists of only whitespaces
    if ((control != null) && (control.value.toString().trim().length === 0 )) {
      return { 'onlyWhitespace': true };
    } else {
      return null;
    }

  }

}
