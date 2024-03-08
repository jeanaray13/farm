import { Routes } from '@angular/router';
import { MainComponent } from './modules/main/main.component';
import { PenComponent } from './modules/pen/pen.component';
import { AnimalComponent } from './modules/animal/animal.component';
import { AnimalsReportComponent } from './modules/animals-report/animals-report.component';
import { SettingsComponent } from './modules/settings/settings.component';
import { LoginComponent } from './modules/login/login.component';
import { SignUpComponent } from './modules/sign-up/sign-up.component';

export const routes: Routes = [
    //Establecimiento de las rutas
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'sign-up',
        component: SignUpComponent
    },
    {
        path: 'farm',
        component: MainComponent
    },
    {
        path: 'pens',
        component: PenComponent
    },
    {
        path: 'animals',
        component: AnimalComponent
    },
    {
        path: 'view-animals',
        component: AnimalsReportComponent
    },
    {
        path: 'settings',
        component: SettingsComponent
    }
];
