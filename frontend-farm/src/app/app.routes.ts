import { Routes } from '@angular/router';
import { MainComponent } from './modules/main/main.component';
import { PenComponent } from './modules/pen/pen.component';
import { AnimalComponent } from './modules/animal/animal.component';
import { AnimalsReportComponent } from './modules/animals-report/animals-report.component';
import { SettingsComponent } from './modules/settings/settings.component';

export const routes: Routes = [
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
