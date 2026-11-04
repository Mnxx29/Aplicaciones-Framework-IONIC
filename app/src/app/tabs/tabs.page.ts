import { Component, EnvironmentInjector, inject } from '@angular/core';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  AlertController,
  ToastController,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { triangle, ellipse, square, logOutOutline } from 'ionicons/icons';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);
  private authService = inject(AuthService);
  private alertCtrl = inject(AlertController);
  private toastCtrl = inject(ToastController);

  constructor() {
    addIcons({ triangle, ellipse, square, logOutOutline });
  }

  /**
   * Muestra confirmación para cerrar sesión y redirige al login
   */
  async logout() {
    const alert = await this.alertCtrl.create({
      header: 'Cerrar Sesión',
      message: '¿Estás seguro de que deseas salir del sistema?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Sí, Salir',
          role: 'destructive',
          handler: async () => {
            this.authService.logout();
            const toast = await this.toastCtrl.create({
              message: 'Sesión finalizada con éxito',
              duration: 2000,
              position: 'bottom',
              color: 'dark',
            });
            await toast.present();
          },
        },
      ],
    });

    await alert.present();
  }
}
