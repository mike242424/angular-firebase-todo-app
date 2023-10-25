import { Component } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  updateDoc,
  deleteDoc,
  orderBy,
  query
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Todo App';
  userData: Observable<any> = new Observable();

  constructor(private fs: Firestore) {}

  ngOnInit() {
    this.getData();
  }

  addData(form: any) {
    const collectionRef = collection(this.fs, 'users');
    addDoc(collectionRef, form.value)
      .then((res) => {
        form.reset();
        console.log('Data Saved Successfully');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getData() {
    const collectionReference = collection(this.fs, 'users');
    const querySorted = query(collectionReference, orderBy('name', 'asc'));

    collectionData(querySorted, { idField: 'id' }).subscribe((res) => {
      console.log(res);
    });

    this.userData = collectionData(querySorted, { idField: 'id' });
  }

  updateData(data: any) {
    if (typeof data.editedName === 'string') {
      const docInstance = doc(this.fs, 'users', data.id);
      const updateData = {
        name: data.editedName,
      };
      updateDoc(docInstance, updateData)
        .then((res) => {
          console.log('Data Updated Successfully');
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log('Invalid data.editedName:', data.editedName);
    }
  }

  deleteData(id: string) {
    const docInstance = doc(this.fs, 'users', id);
    deleteDoc(docInstance)
      .then((res) => {
        console.log('Data Deleted Successfully');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
