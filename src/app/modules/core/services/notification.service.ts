import { Injectable} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Servicio de notificaciones al usuario.
 * Este servicio permite generar mensajes que serán
 * mostrados al usuario mediante un mensaje flotante
 * en pantalla (snack-bar de material).
 */
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  /* TODO: pasar a config */
  durationInSeconds = 2000;
  successButtonMessage = 'Ok';
  errorButtonMessage = 'Ok';

  constructor(public snackBar: MatSnackBar) { }

  /**
   * Muestra un mensaje de exito.
   * @param message Mensaje a mostrar.
   */
  showSuccess(message: string): void {
    console.debug("# [CORE - NOTIFICATION (NotificationService)] succes displayed");
    this.snackBar.open(message, this.successButtonMessage, {
      duration: this.durationInSeconds,
      panelClass: ['successNotification']
    });
  }

  /**
   * Muestra un mensaje de error.
   * @param message Mensaje a mostrar.
   */
  showError(message: string): void {
    console.debug("# [CORE - NOTIFICATION (NotificationService)] error displayed");
    const ref = this.snackBar.open(message, this.errorButtonMessage, {
      duration: this.durationInSeconds,
      panelClass: ['errorNotification']
    });
    ref.onAction().subscribe(success => {
      console.log('dismiss')
      ref.dismiss();
    },
    error => {
      console.log(error)
    })
  }

  showInformation(message: string): void {
    console.debug("# [CORE - NOTIFICATION (NotificationService)] info displayed");
    this.snackBar.open(message, this.errorButtonMessage, {
      duration: this.durationInSeconds,
      panelClass: ['informationNotification']
    });
  }

  showWarning(message: string): void {
    console.debug("# [CORE - NOTIFICATION (NotificationService)] warn displayed");
    this.snackBar.open(message, this.errorButtonMessage, {
      duration: this.durationInSeconds,
      panelClass: ['warningNotification']
    });
  }

}