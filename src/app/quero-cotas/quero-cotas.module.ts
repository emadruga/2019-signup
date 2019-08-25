import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { QueroCotasPage } from './quero-cotas.page';

const routes: Routes = [
  {
    path: '',
    component: QueroCotasPage
  }
];

@NgModule({
  imports: [
      CommonModule,
      ReactiveFormsModule,
      IonicModule,
      RouterModule.forChild(routes)
  ],
  declarations: [QueroCotasPage]
})
export class QueroCotasPageModule {}
