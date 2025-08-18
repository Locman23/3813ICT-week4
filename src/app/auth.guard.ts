import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const hasUser = !!localStorage.getItem('currentUser');
  if (!hasUser) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
