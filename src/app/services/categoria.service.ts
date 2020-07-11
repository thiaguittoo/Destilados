import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Categoria } from '../models/categoria.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private firestore: AngularFirestore) { }

  getObservable(): Observable<Categoria[]> {
    return this.firestore.collection<Categoria>('categorias').valueChanges({ idField: 'id' });
  }

  async add(categoria: Categoria): Promise<Categoria> { 

    const docRef = await this.firestore.collection<Categoria>('categorias').add(categoria);
    const doc = await docRef.get();

    return {
      id: doc.id,
      ...doc.data()
    } as Categoria;

  }

  async get(id: string): Promise<Categoria> {

    const doc = await this.firestore.collection<Categoria>('categorias').doc(id).get().toPromise();

    return {
      id: doc.id,
      ...doc.data()
    } as Categoria;
    
  }
  
}
