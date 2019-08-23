import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OpcaoCotasPage } from './opcao-cotas.page';

const routes: Routes = [
  {
    path: '',
    component: OpcaoCotasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OpcaoCotasPage]
})
export class OpcaoCotasPageModule {}
