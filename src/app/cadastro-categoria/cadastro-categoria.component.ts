import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { CategoriaService } from '../services/categoria.service';
import { Categoria } from '../models/categoria.model';

@Component({
  selector: 'app-cadastro-categoria',
  templateUrl: './cadastro-categoria.component.html',
  styleUrls: ['./cadastro-categoria.component.scss']
})
export class CadastroCategoriaComponent implements OnInit {

  formulario = this.formBuilder.group({
    nome: ['', Validators.required]
  });

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  constructor(
    private formBuilder: FormBuilder,
    private categoriasService: CategoriaService
    ) { }

  ngOnInit(): void {
  }

  async submit(){

    if (!this.formulario.valid) {
      return;
    }

    this. formulario.disable();

    const categoria = this.formulario.value as Categoria;
    const categoriaRetorno = await this. categoriasService.add(categoria);

    this.formulario.enable();
    this.formGroupDirective.resetForm();

  }

}
