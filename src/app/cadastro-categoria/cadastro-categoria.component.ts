import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { CategoriasService } from '../services/categorias.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
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
        private categoriasService: CategoriasService,
        private snackBar: MatSnackBar,
        private location: Location,
    ) { }

    ngOnInit(): void { }

    async submit() {

        if (!this.formulario.valid) {
            return;
        }

        this.formulario.disable();

        const novoCategoria = this.formulario.value as Categoria;
        novoCategoria.dataCadastro = new Date();

        const categoria = await this.categoriaService.add(novoCategoria);

        console.log('Uma nova categoria foi salvo ----------------------');
        console.log(categoria);

        this.formulario.enable();
        this.formGroupDirective.resetForm();

        this.snackBar.open('Nova categoria cadastrado com sucesso!');

    }

    voltar() {
        this.location.back();
    }

}
