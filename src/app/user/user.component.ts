import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/service/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public autores: any=[];
  public libros: any =[];
  public autors: any = {};
  public autorn;
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getautores();
  }
  public getautores() {
    this.api.getautors().subscribe((res: any) => {
      this.autores = res;
    });
  }
  autor(autor)
  {
    this.autors= autor;
    this.api.getLibro(autor.id).subscribe((res: any)=>
    {
      this.libros = res;
    })
  }
  crearnuevo()
  {
   this.api.crearautor({nombre_autor: this.autorn}).subscribe((res:any)=>{
     console.log(res);
      this.getautores();
      Swal.fire("Autor agregado", "", "success");
      this.autorn = "";
   }) 
  }
  editar()
  {
   this.api.editarautor(this.autors.id, this.autors).subscribe((res:any)=>{
     console.log(res);
      this.getautores();
      Swal.fire("Autor actualizado", "", "success");

   }) 
  }
  eliminar() {
    if(this.libros.length > 0)
    {

      Swal.fire("El no se puede eliminar porque tiene libros asignados", "Por favor elimina o reasigna los libros de la lista", "error");
      return
    }
    this.api
      .eliminarautor(this.autors.id)
      .subscribe((res: any) => {
        console.log(res);
        this.getautores();
        Swal.fire("Autor eliminado", "", "success");
        this.autors = {};
        this.libros = [];
      });
  }

}
