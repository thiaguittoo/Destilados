import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Produto } from '../models/produto.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private firestore: AngularFirestore) { }

  getObservable(): Observable<Produto[]> {
    return this.firestore.collection<Produto>('produtos').valueChanges({ idField: 'id' });
  }

  async add(produto: Produto): Promise<Produto> { 

    const docRef = await this.firestore.collection<Produto>('produtos').add(produto);
    const doc = await docRef.get();

    return {
      id: doc.id,
      ...doc.data()
    } as Produto;

  }
}
