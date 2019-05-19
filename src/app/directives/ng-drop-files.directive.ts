import {
  Directive,
  EventEmitter,
  ElementRef,
  HostListener,
  Input,
  Output
} from "@angular/core";
//model file
import { FileItem } from "./../models/file-item";

@Directive({
  selector: "[appNgDropFiles]"
})
export class NgDropFilesDirective {
  //archivos que se necesitan controlar
  @Input() archivos: FileItem[] = [];
  @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();
  @Output() message: EventEmitter<string> = new EventEmitter();
  constructor() {}
  //emite cuando el mouse esta sobre la imagen
  @HostListener("dragover", ["$event"])
  public onDragEnter(event: any) {
    this.mouseSobre.emit(true);
    this._prevenirDetener(event);
  }

  //emite cuando el mouse se quita de la imagen
  @HostListener("dragleave", ["$event"])
  public onDragLeave(event: any) {
    this.mouseSobre.emit(false);
  }

  //cuando suelta y cae el archivo en caja imagen
  @HostListener("drop", ["$event"])
  public onDrop(event: any) {
    //this.mouseSobre.emit(false);
    const transferencia = this._getTransferencia(event);
    if (!transferencia) {
      return;
    }

    this._extraerArchivos(transferencia.files);

    this._prevenirDetener(event);
    this.mouseSobre.emit(false);
  }

  //change input
  @HostListener("input", ["$event"])
  public onInput(event: any) {
    this._extraerArchivos(event.target.files);

    this._prevenirDetener(event);
  }

  /*ayuda a la compatibilidad de los navegadores */
  private _getTransferencia(event: any) {
    return event.dataTransfer
      ? event.dataTransfer
      : event.originalEvent.dataTransfer;
  }

  private _extraerArchivos(archivosLista: FileList) {
    // console.log(archivosLista);
    for (const propiedad in Object.getOwnPropertyNames(archivosLista)) {
      const archivoTemporal = archivosLista[propiedad];
      if (this._archivoPuedeSerCargado(archivoTemporal)) {
        //crear un nuevo elemento a archivos
        const nuevoArchivo = new FileItem(archivoTemporal);
        this.archivos.push(nuevoArchivo);
      }
    }
    console.log(this.archivos);
  }

  //validaciones
  /* que el archivo ya este agregado y que sea una imagen */
  private _archivoPuedeSerCargado(archivo: File): boolean {
    console.log("tipoarchivo:", archivo.type);
    if (
      !this._archivoYaEstaAgregado(archivo.name) &&
      this.validateFileExtension(archivo)
      //this._esImagen(archivo.type)
    ) {
      this.message.emit("");
      return true;
    } else {
      this.message.emit("Archivo no permitido!.");
      return false;
    }
  }

  /* Evitar que Chrome abra la imagen por defecto */
  private _prevenirDetener(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  /* valida que el archivo ya no exista en el arreglo de archivos */
  private _archivoYaEstaAgregado(nombreArchivo: string): boolean {
    for (const archivo of this.archivos) {
      if (archivo.nombreArchivo == nombreArchivo) {
        console.log("El archivo " + nombreArchivo + " ya esta agregado");
        return true;
      }
    }
    return false;
  }

  /* verificar que solo sean imagenes las agregadas */
  private _esImagen(tipoArchivo: string): boolean {
    return tipoArchivo == "" || tipoArchivo === undefined
      ? false
      : tipoArchivo.startsWith("image");
  }

  private validateFileExtension(typeFile): boolean {
    var fileName = typeFile.name;
    var extension = fileName.split(".").pop();
    if (extension == "zip") {
      return true;
    } else {
      return false;
    }
  }
}
