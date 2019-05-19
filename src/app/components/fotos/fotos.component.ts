import { Component, OnInit } from "@angular/core";

import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
//interface
import { fileDescription } from "./../../interface/file-description";
import { Observable } from "rxjs";

@Component({
  selector: "app-fotos",
  templateUrl: "./fotos.component.html",
  styles: []
})
export class FotosComponent implements OnInit {
  private itemsCollection: AngularFirestoreCollection<fileDescription>;
  items: Observable<fileDescription[]>;

  constructor(private afs: AngularFirestore) {
    // this.itemsCollection = afs.collection<fileDescription>("img");
    this.itemsCollection = afs.collection<fileDescription>("files");
    this.items = this.itemsCollection.valueChanges();
  }

  ngOnInit() {}
}
