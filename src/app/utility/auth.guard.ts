import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const AuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  return token ? true : router.parseUrl('/login');
};
