import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

//rutas
import { AppRoutingModule } from "./app-routing.module";
//componentes
import { AppComponent } from "./app.component";
import { FotosComponent } from "./components/fotos/fotos.component";
import { CargaComponent } from "./components/carga/carga.component";
//services
import { CargaImagenesService } from "./services/carga-imagenes.service";
//modules firebase
import { environment } from "./../environments/environment";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireAuthModule } from "@angular/fire/auth";
//directives
import { NgDropFilesDirective } from "./directives/ng-drop-files.directive";

@NgModule({
  declarations: [
    AppComponent,
    FotosComponent,
    CargaComponent,
    NgDropFilesDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule // imports firebase/storage only needed for storage features
  ],
  providers: [CargaImagenesService],
  bootstrap: [AppComponent]
})
export class AppModule {}
