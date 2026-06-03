import { CanDeactivateFn } from '@angular/router';
import { CanDeactivateComponent } from './can-deactivate.interface';

export const pendingChangesGuard: CanDeactivateFn<CanDeactivateComponent> =
(component) => {
  return component.canDeactivate();
};