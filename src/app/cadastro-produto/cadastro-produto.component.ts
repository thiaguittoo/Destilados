import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { CategoriaService } from '../services/categoria.service';
import { ProdutoService } from '../services/produto.service';
import { Categoria } from '../models/categoria.model';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto.model';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.scss']
})
export class CadastroProdutoComponent implements OnInit {

  categorias: Observable<Categoria[]>;

  formulario = this.formBuilder.group({
    nome: ['', Validators.required],
    descricao: ['', Validators.required],
    idCategoria: ['', Validators.required]
  });

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  constructor(
    private formBuilder: FormBuilder,
    private categoriasService: CategoriaService,
    private produtosService: ProdutoService
    ) { }

  ngOnInit(): void {
    this.categorias = this.categoriasService.getObservable();
    
  }

  async submit(){

    if (!this.formulario.valid) {
      return;
    }

    this. formulario.disable();

    const novoProduto = this.formulario.value as Produto;
    const produtoRetorno = await this.produtosService.add(novoProduto);

    this.formulario.enable();
    this.formGroupDirective.resetForm();

  }
}
