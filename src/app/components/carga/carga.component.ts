import { Component, OnInit } from "@angular/core";
//service
import { CargaImagenesService } from "./../../services/carga-imagenes.service";
//model file
import { FileItem } from "./../../models/file-item";

@Component({
  selector: "app-carga",
  templateUrl: "./carga.component.html",
  styles: []
})
export class CargaComponent implements OnInit {
  estaSobreElemento: boolean = false;
  msg: string = "";
  archivos: FileItem[] = [];

  public mensajeArchivo = "No hay un archivo seleccionado";
  public datosFormulario = new FormData();
  public nombreArchivo = "";

  constructor(public _serviceFiles: CargaImagenesService) {}

  //[archivos] = "archivos" en el html
  //la propiedad [archivos] se refiere a los archivos de la directiva appNgDropFiles
  //archivos corresponden al del componente CargaComponent
  ngOnInit() {}

  cargarImagenes() {
    this._serviceFiles.cargarImagenesFirebase(this.archivos);
  }

  limpiarArchivos() {
    this.archivos = [];
    this.msg = "";
  }

  mensaje(event) {
    this.msg = event;
  }

  // cambioArchivo(event) {
  //   // console.log(archivosLista);
  //   for (let i = 0; i < event.target.files.length; i++) {
  //     const nuevoArchivo = new FileItem(event.target.files[i]);
  //      this.archivos.push(nuevoArchivo);
  //     /// console.log("data", event.target.files[i]);
  //     }

  // }
}
