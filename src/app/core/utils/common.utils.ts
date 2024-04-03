
import {Subscription} from "rxjs";
import {FormArray, FormControl, FormGroup} from "@angular/forms";

export class CommonUtils {
  public static unsubscribeAll(...subscriptions: Subscription[]) {
    if (subscriptions && subscriptions.length > 0) {
      subscriptions.forEach(subscription => {
        if (subscription) {
          subscription.unsubscribe();
        }
      });
    }
  }

  static clone(object: any): any {
    return JSON.parse(JSON.stringify(object));
  }


  /**
   * A metódus a paraméterben megadott FormGroup-ot, vagy FormArray-t járja be rekurzió módszerével
   * és az összes FormControl példányt touched státuszra állítja.
   * @param {FormGroup | FormArray} (@link FormGroup) vagy (@link FormArray)
   */
  static markFormAsTouched(group: FormGroup | FormArray) {
    Object.keys(group.controls).forEach(key => {
      if (group.get(key) instanceof FormControl) {
        group.get(key).markAsTouched();
        group.get(key).markAsDirty();
      }
      if (group.get(key) instanceof FormGroup) {
        this.markFormAsTouched(<FormGroup>group.get(key));
      }
      if (group.get(key) instanceof FormArray) {
        this.markFormAsTouched(<FormArray>group.get(key));
      }
    });
  }
}
