
import {Subscription} from "rxjs";

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
}
