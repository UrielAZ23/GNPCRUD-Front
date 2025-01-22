import { Component } from '@angular/core';
import { FolioService } from '../../service/serviceFolio';
import { Folio } from '../../models/Folio';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

    public list:any[]=[];
    public fecha:Folio;
    public slip:string[]=[]

  constructor(private folioservice:FolioService){

  }

  ngOnInit(): void {

    console.log("funcionando");
    this.folioservice.getFolios().subscribe(pipe=>{
      this.list=pipe;
      this.fecha=pipe
          this.fecha.forEach(pip=>{
            this.slip=pip.fecha.split("T")
            pip.fecha=this.slip[0];
            console.log(this.fecha)
          })
    })
  }

  delete(item){
    

    this.folioservice.deleteFolios(item.folio).subscribe(pipe=>{
      window.location.reload();
    })

  }


}