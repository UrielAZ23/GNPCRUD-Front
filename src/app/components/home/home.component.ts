import { Component } from '@angular/core';
import { FolioService } from '../../service/serviceFolio';
import { Folio } from '../../models/Folio';
import Swal from 'sweetalert2';
import { pipe } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
    public folio:Folio= new Folio
    public list:any[]=[];
    public sea:any[]=[]
    public fecha:Folio;
    public slip:string[]=[]

  constructor(private folioservice:FolioService){

  }

  ngOnInit(): void {

    console.log("funcionando");
    this.folioservice.getFolios().subscribe(pipe=>{
      this.list=pipe;
      this.fecha=pipe
          pipe.forEach(pip=>{
            this.slip=pip.fecha.split("T")
            pip.fecha=this.slip[0];
            console.log(this.fecha)
          })
    })
  }

  async delete(item){
   await Swal.fire({
      title: "Estas seguro?",
      text: "Desea borrar el registro!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, Borrar!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.folioservice.deleteFolios(item.folio).subscribe(async pipe=>{
          
            await Swal.fire({
              title: "Borrado",
              text: "Se ha borrado el registro.",
              icon: "success"
            })
            window.location.reload();
          
      });
      }
    });
  }
  update2(item){
    this.folio=item
  }
    
  async save(folioForm2){
    console.log(folioForm2.value)
    this.folio.catImpresor=folioForm2.value.impresortext
    this.folio.cveProducto=folioForm2.value.productotext
    this.folio.fecha= new Date
    console.log(this.folio)
    if(this.folio.folio!="" && this.folio.catImpresor!="" && this.folio.cveProducto!=""){
    this.folioservice.updateFolios(this.folio).subscribe(async pipe=>{
      if(pipe.folio!=null){
       await Swal.fire({
          title: "Guardado",
          text: "Se ha guardado el registro con éxito",
          icon: "success"
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

  async search(folioBus){
    console.log(folioBus.value.folioV)

    if(folioBus.value.folioV.trim().length != 0){
    this.folioservice.getFolio(folioBus.value.folioV).subscribe(async pipe=>{
      console.log(pipe)
      if(pipe!=null){
        this.list=null
        this.list=[]
        this.list.push(pipe)
        console.log(this.list)
        this.folio.fecha=new Date
        this.fecha=pipe
        
        this.list.forEach(pip=>{
          this.slip=pip.fecha.split("T")
          pip.fecha=this.slip[0];
          console.log(pip.fecha)
        })
      }
      else{
        await Swal.fire({
          title: "Advertencia",
          text: "No se encontro Folio",
          icon: "info"
        });
        window.location.reload();
      }
    })
  }else{
    await Swal.fire({
      title: "Advertencia",
      text: "Introduzca Folio",
      icon: "info"
    });
    window.location.reload();
}}

}