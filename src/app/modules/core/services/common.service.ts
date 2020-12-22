import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ValidationErrors } from '@angular/forms';
import { NavItem } from '../models/nav-item';
import { Observable } from 'rxjs';
import { AppConfigService } from './app-config.service';

/**
 * Servicios globales a la aplicación.
 */
@Injectable(
  {providedIn: 'root'}
)
export class CommonService {

  constructor(
    private http: HttpClient,
    @Inject('env') private ENV,
  ) { }

  /**
   * Servicio que devuelve toda la estructura del menú de navegación.
   *
   * @returns Observable<NavItem[]>: Array de elementos de navegación
   * correspondientes a todo el menú de navegación para el usuario actual.
   */
  getNavigationItems(): Observable<NavItem[]> {
    console.log('GET NAVIGATION ITEMS');
    return this.http.get<NavItem[]>(this.ENV.APIS.MENU + AppConfigService.settings.ws.menu);
  }

  /**
   * Validación de los <mat-extension-panels>.
   * TODO: Crear modelo formState para el retorno de este método.
   *
   * @param formList: Array de objetos de formulario a evaluar.
   * @returns Objeto con los estados del formulario.
   */
  hasFormValidationErrors(formList: any[] ): {touch: boolean, dirty: boolean, error: boolean} {
    // console.log(formList);
    const state = {
      touch: false,
      dirty: false,
      error: false
    };
    let controlErrors: ValidationErrors;
    // console.log(' # hasFormValidationErrors - ', formList);
    formList.forEach(form => {
      if (form.controls != null) {
        Object.keys(form.controls).forEach(key => {
          if (form.get(key).get('text') != null) {
            // console.log(form.get(key).get('text'));
            controlErrors = form.get(key).get('text').errors;  // For inputs that have CodeAndText interface
            state.touch = state.touch || form.get(key).get('text').touched ? true : false;
            state.dirty = state.dirty || form.get(key).get('text').dirty ? true : false;
          } else {
            controlErrors = form.get(key).errors;
            state.touch = state.touch || form.get(key).touched ? true : false;
            state.dirty = state.dirty || form.get(key).dirty ? true : false;
          }
          if (controlErrors != null) {
            Object.keys(controlErrors).forEach(keyError => {
              state.error = true;
              return;
            });
          }

        });
      }
    });
    return state;
  }

  /**
   * Validación que indica si debe mostrarse el icono para indicar que todo esta correcto.
   *
   * @param forms TODO
   * @returns Indica si se debe mostrar el icono que
   * marca que todo esta correcto.
   */
  isSuccessIcons(forms): boolean {
    const hasFormValidationErrors = this.hasFormValidationErrors(forms);
    if (hasFormValidationErrors.error) {
      return false;
    } else if (!hasFormValidationErrors.error) {
      return true;
    }
  }
}
