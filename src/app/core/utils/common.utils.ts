
import {Subscription} from "rxjs";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

export class CommonUtils {

  /**
   * Leiratkozás Subscription példányokról, a komponens onDestroy metódusában használatos.
   * @param {Subscription, Subscription...} subscriptions egy, vagy több Subscription példány
   */
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

  /**
   * Generates UUID based on the actual timestamp
   * @returns {string}
   */
  static generateUUId(): string {
    let time: number = new Date().getTime();
    const uuid: string = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (char) {
      const rand = (time + Math.random() * 16) % 16 | 0;
      time = Math.floor(time / 16);
      return (char === "x" ? rand : (rand & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

  /**
   * A kapott url string alapján eldönti, hogy belső oldalra kell navigálni (pl: "/bejelentkezes") vagy külső oldalra (pl: "http://valami.hu")
   * @param {Router} router Router példány
   * @param {string} url betöltendő oldal
   */
  public static navigatePageOrUrl(router: Router, url: string): void {
    if (!router || !url) {
      return;
    }

    if (url.startsWith("http")) {
      window.location.href = url;
      return;
    }

    router.navigate([url]);
  }

}
