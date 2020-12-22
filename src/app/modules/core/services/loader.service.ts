import { Injectable } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatSpinner } from '@angular/material/progress-spinner';
import { Subject } from 'rxjs';
import { scan, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  /** @ignore */
  private spinnerTopRef = this.cdkSpinnerCreate();
  /** @ignore */
  private visibleSpinner = false;
  /** @ignore */
  spin$: Subject<boolean> = new Subject();

  private counter = 0;

  constructor(
      private overlay: Overlay,
  ) {
    this.spin$
      .asObservable()
      .pipe(
        map(val => val ? 1 : -1 ),
        scan((acc, one) => (acc + one) >= 0 ? acc + one : 0, 0)
      )
      .subscribe(
        (res) => {
          if (res === 1) {
            this.show();
          } else if ( res === 0 && this.spinnerTopRef.hasAttached() ) {
            this.hide();
            // this.spinnerTopRef.hasAttached() ? this.stopSpinner() : null;
          }
        }
      );
  }

  /** @ignore */
  private cdkSpinnerCreate() {
      return this.overlay.create({
          hasBackdrop: true,
          // backdropClass: 'dark-backdrop',
          positionStrategy: this.overlay.position()
              .global()
              .centerHorizontally()
              .centerVertically()
      });
  }

  /**
   * Método que muestra el loader.
   */
  public show() {
    console.debug('# [CORE - LOADER (LoaderService)] show');
    this.counter++;
    if (this.counter === 1) {
      this.visibleSpinner = true;
      this.spinnerTopRef.attach(new ComponentPortal(MatSpinner));
    }
  }

  /**
   * Método que oculta el loader.
   */
  public hide() {
    console.debug('# [CORE - LOADER (LoaderService)] hide');
    this.counter--;
    if (this.counter === 0) {
      this.visibleSpinner = false;
      this.spinnerTopRef.detach();
    }
  }

  /**
   * Método que modifica el estado de visualización del loader.
   */
  public toogle() {
    if (this.visibleSpinner) {
      this.hide();
    } else {
      this.show();
    }
  }
}
