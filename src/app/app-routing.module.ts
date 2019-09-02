import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'Intro', loadChildren: './intro/intro.module#IntroPageModule' },
  { path: 'NovoCadastro', loadChildren: './novo-cadastro/novo-cadastro.module#NovoCadastroPageModule', canActivate: [AuthGuardService] },
  { path: 'CadastroSenha', loadChildren: './cadastro-senha/cadastro-senha.module#CadastroSenhaPageModule' },
  { path: 'AtualizarCadastro', loadChildren: './atualizar-cadastro/atualizar-cadastro.module#AtualizarCadastroPageModule' },
  { path: 'FazerLogin', loadChildren: './fazer-login/fazer-login.module#FazerLoginPageModule', canActivate: [AuthGuardService] },
  { path: 'Perfil', loadChildren: './perfil/perfil.module#PerfilPageModule', canActivate: [AuthGuardService]},
  { path: 'Settings', loadChildren: './settings/settings.module#SettingsPageModule', canActivate: [AuthGuardService]},
  { path: 'pagamento', loadChildren: './pagamento/pagamento.module#PagamentoPageModule', canActivate: [AuthGuardService]},
  { path: 'info-gru', loadChildren: './info-gru/info-gru.module#InfoGruPageModule', canActivate: [AuthGuardService]},
  { path: 'info-isencao', loadChildren: './info-isencao/info-isencao.module#InfoIsencaoPageModule', canActivate: [AuthGuardService]},
  { path: 'gru-fields', loadChildren: './gru-fields/gru-fields.module#GruFieldsPageModule'},
  { path: 'opcao-cotas', loadChildren: './opcao-cotas/opcao-cotas.module#OpcaoCotasPageModule', canActivate: [AuthGuardService]},
  { path: 'quero-cotas', loadChildren: './quero-cotas/quero-cotas.module#QueroCotasPageModule', canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
