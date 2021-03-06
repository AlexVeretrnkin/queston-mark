import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChooseTestComponent } from './portal/choose-test/choose-test.component';

import { EditTestComponent } from './portal/edit-test/edit-test.component';
import { HomeComponent } from './portal/home/home.component';
import { PassTestComponent } from './portal/pass-test/pass-test.component';

import { PortalComponent } from './portal/portal.component';
import { ProfileComponent } from './portal/profile/profile.component';
import { StatsComponent } from './portal/stats/stats.component';
import { StudentPermissionComponent } from './portal/student-permission/student-permission.component';

const routes: Routes = [
  {
    path: '', component: PortalComponent, children: [
      {path: '', component: HomeComponent},
      {path: 'create-test', component: EditTestComponent},
      {path: 'choose-test', component: ChooseTestComponent},
      {path: 'student-permission', component: StudentPermissionComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'stats', component: StatsComponent},
      {path: 'pass/:id', component: PassTestComponent},
      {path: '**', redirectTo: ''}
    ]
  }
];

@NgModule(
  {
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class PortalRoutingModule {
}
