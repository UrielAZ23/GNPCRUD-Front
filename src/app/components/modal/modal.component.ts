import { Component, Input } from '@angular/core';
import { Folio } from '../../models/Folio';
import { FolioService } from '../../service/serviceFolio';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {

  @Input()

  
  folio:Folio= new Folio
  constructor(private folioservice:FolioService){
  }

  async save(folioForm){
    if(folioForm.value.foliotext!="" && folioForm.value.impresortext!="" && folioForm.value.productotext!=""){
    this.folio.folio=folioForm.value.foliotext
    this.folio.catImpresor=folioForm.value.impresortext
    this.folio.cveProducto=folioForm.value.productotext
    this.folio.fecha= new Date
    this.folioservice.createFolios(this.folio).subscribe(async pipe=>{
      console.log(pipe.folio)
      if(pipe.folio!=null){
       await Swal.fire({
          title: "Guardado",
          text: "Se ha guardado el registro con éxito",
          icon: "success"
        });
        window.location.reload();
      }else{
        await Swal.fire({
          title: "No se ha guardado",
          text: "No se ha guardado el registro",
          icon: "warning"
        });
        window.location.reload();
      }
    })
    
  }else{
    await Swal.fire({
      title: "Advertencia",
      text: "Llene todas las casillas",
      icon: "info"
    });
  }
}
}
