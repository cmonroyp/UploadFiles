import { Injectable } from "@angular/core";

//model file
import { FileItem } from "./../models/file-item";
//firebase
import { AngularFirestore } from "@angular/fire/firestore";
import * as firebase from "firebase";
//interface
import { fileDescription } from "./../interface/file-description";

@Injectable({
  providedIn: "root"
})
export class CargaImagenesService {
  //private CARPETA_IMAGENES = "img";
  private CARPETA_IMAGENES = "files";
  constructor(private db: AngularFirestore) {}

  private guardarImagen(imagen: fileDescription) {
    this.db.collection(`/${this.CARPETA_IMAGENES}`).add(imagen);
  }

  cargarImagenesFirebase(imagenes: FileItem[]) {
    //console.log(imagenes);
    const storageRef = firebase.storage().ref();

    for (const item of imagenes) {
      item.estaSubiendo = true;
      if (item.progreso >= 100) {
        continue;
      }

      //subir archivos a firebase
      const uploadTask: firebase.storage.UploadTask = storageRef
        //carpeta temporal para subir los archivos a firebase
        .child(`${this.CARPETA_IMAGENES}/${item.nombreArchivo}`)
        .put(item.archivo);

      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot: firebase.storage.UploadTaskSnapshot) =>
          (item.progreso =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100),
        error => console.error("Error al subir", error),
        () => {
          console.log("Imagen cargada correctamente");

          const urlPromise = uploadTask.snapshot.ref.getDownloadURL();
          urlPromise.then(url => {
            item.url = url;
            console.log(item.url);
            item.estaSubiendo = false;
            this.guardarImagen({
              nombre: item.nombreArchivo,
              url: item.url
            });
          });
        }
      );
    }
  }
}
