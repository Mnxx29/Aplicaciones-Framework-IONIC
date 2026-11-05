import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonMenuButton,
  IonCard,
  IonCardContent,
  IonIcon,
  IonBadge,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  warningOutline,
  heartOutline,
  alertCircleOutline,
  checkmarkDoneOutline,
  shieldCheckmarkOutline,
  notificationsOutline,
  watchOutline,
} from 'ionicons/icons';

interface AuraAlert {
  id: number;
  title: string;
  detail: string;
  time: string;
  icon: string;
  level: 'danger' | 'warning';
  resolved: boolean;
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonMenuButton,
    IonCard,
    IonCardContent,
    IonIcon,
    IonBadge,
  ],
})
export class Tab2Page {
  features = [
    {
      icon: 'watch-outline',
      title: 'Monitoreo con Pulsera Aura',
      desc: 'Detecta caídas bruscas y anomalías de pulso en tiempo real.',
    },
    {
      icon: 'notifications-outline',
      title: 'Aviso Inmediato a Cuidadores',
      desc: 'Envía alertas automáticas y botón SOS a familiares y médicos.',
    },
  ];

  alerts: AuraAlert[] = [
    {
      id: 1,
      title: 'Caída brusca detectada',
      detail: 'Sensor de movimiento • Alerta enviada a María',
      time: 'Hace 15 min',
      icon: 'warning-outline',
      level: 'danger',
      resolved: false,
    },
    {
      id: 2,
      title: 'Anomalía de ritmo cardíaco',
      detail: 'Pulsera Aura registró 118 BPM en reposo',
      time: 'Hoy, 10:20 AM',
      icon: 'heart-outline',
      level: 'warning',
      resolved: false,
    },
    {
      id: 3,
      title: 'Botón SOS presionado',
      detail: 'Solicitud de asistencia rápida atendida',
      time: 'Ayer, 18:40 PM',
      icon: 'alert-circle-outline',
      level: 'danger',
      resolved: true,
    },
  ];

  constructor() {
    addIcons({
      warningOutline,
      heartOutline,
      alertCircleOutline,
      checkmarkDoneOutline,
      shieldCheckmarkOutline,
      notificationsOutline,
      watchOutline,
    });
  }

  toggleResolved(alert: AuraAlert) {
    alert.resolved = !alert.resolved;
  }
}
