import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'Intro', loadChildren: './intro/intro.module#IntroPageModule' },
  { path: 'NovoCadastro', loadChildren: './novo-cadastro/novo-cadastro.module#NovoCadastroPageModule' },
  { path: 'CadastroSenha', loadChildren: './cadastro-senha/cadastro-senha.module#CadastroSenhaPageModule' },
  { path: 'AtualizarCadastro', loadChildren: './atualizar-cadastro/atualizar-cadastro.module#AtualizarCadastroPageModule' },
  { path: 'FazerLogin', loadChildren: './fazer-login/fazer-login.module#FazerLoginPageModule' },
  { path: 'Perfil', loadChildren: './perfil/perfil.module#PerfilPageModule' },
  { path: 'Settings', loadChildren: './settings/settings.module#SettingsPageModule' },
  { path: 'pagamento', loadChildren: './pagamento/pagamento.module#PagamentoPageModule' },
  { path: 'info-gru', loadChildren: './info-gru/info-gru.module#InfoGruPageModule' },
  { path: 'info-isencao', loadChildren: './info-isencao/info-isencao.module#InfoIsencaoPageModule' },
  { path: 'gru-fields', loadChildren: './gru-fields/gru-fields.module#GruFieldsPageModule' },
  { path: 'opcao-cotas', loadChildren: './opcao-cotas/opcao-cotas.module#OpcaoCotasPageModule' },
  { path: 'quero-cotas', loadChildren: './quero-cotas/quero-cotas.module#QueroCotasPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
