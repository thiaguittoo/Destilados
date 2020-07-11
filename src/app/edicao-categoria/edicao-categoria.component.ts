import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoriasService } from '../services/categoria.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { Categoria } from '../models/categoria.model';

@Component({
    selector: 'app-edicao-categoria',
    templateUrl: './edicao-categoria.component.html',
    styleUrls: ['./edicao-categoria.component.scss']
})
export class EdicaoCategoriaComponent implements OnInit {

    idCategoria: string;
    categoria: Categoria;

    formulario = this.formBuilder.group({
        nome: ['', Validators.required]
    });

    constructor(
        private formBuilder: FormBuilder,
        private CategoriasService: CategoriasService,
        private activedRoute: ActivatedRoute,
        private snackBar: MatSnackBar,
        private location: Location,
    ) { }

    async ngOnInit() {

        this.formulario.disable();

        this.idCategoria = this.activedRoute.snapshot.paramMap.get('id');
        this.categoria = await this.CategoriasService.get(this.idCategoria);

        this.formulario.patchValue(this.categoria);

        this.formulario.enable();

    }

    async submit() {

        if (!this.formulario.valid || !this.categoria) {
            return;
        }

        this.formulario.disable();

        const categoriaEditado = this.formulario.value as Categoria;
        categoriaEditado.dataEdicao = new Date();

        await this.categoriasService.update(this.idCategoria, categoriaEditado);

        console.log('Uma categoria foi editado -------------------------');
        console.log('Categoria:');
        console.log(this.categoria);
        console.log('Campos atualizados:');
        console.log(categoriaEditado);


        Object.assign(this.categoria, categoriaEditado);

        this.formulario.enable();

        this.snackBar.open('Categoria atualizada com sucesso!');

    }

    voltar() {
        this.location.back();
    }

}
