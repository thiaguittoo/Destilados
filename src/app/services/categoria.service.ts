import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Categoria } from '../models/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private firestore: AngularFirestore) { }

  async add(categoria: Categoria): Promise<Categoria> { 

    const docRef = await this.firestore.collection<Categoria>('categorias').add(categoria);
    const doc = await docRef.get();

    return {
      id: doc.id,
      ...doc.data()
    } as Categoria;

  }
  
}
