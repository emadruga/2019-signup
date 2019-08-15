import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AtualizarCadastroPage } from './atualizar-cadastro.page';

const routes: Routes = [
  {
    path: '',
    component: AtualizarCadastroPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AtualizarCadastroPage]
})
export class AtualizarCadastroPageModule {}
