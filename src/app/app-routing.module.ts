import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroCategoriaComponent } from './cadastro-categoria/cadastro-categoria.component';
import { CadastroProdutoComponent } from './cadastro-produto/cadastro-produto.component';
import { EdicaoCategoriaComponent } from './edicao-categoria/edicao-categoria.component';

const routes: Routes = [

  {path: 'categorias/cadastro', component: CadastroCategoriaComponent},
  {path: 'produtos/cadastro', component: CadastroProdutoComponent},
  {path: 'categorias/:id/edicao', component: EdicaoCategoriaComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
