import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GruFieldsPage } from './gru-fields.page';

const routes: Routes = [
  {
    path: '',
    component: GruFieldsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GruFieldsPage]
})
export class GruFieldsPageModule {}
