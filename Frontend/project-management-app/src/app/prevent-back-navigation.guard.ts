import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PreventBackNavigationGuard
  implements CanDeactivate<unknown>
{
  canDeactivate(): boolean {
    // Prevent back navigation
    return false;
  }
}
