import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  const _ToastrService = inject(ToastrService)
  return next(req)
   
};
