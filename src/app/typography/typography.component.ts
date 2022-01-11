import { Component, OnInit } from "@angular/core";
import { ApiService } from "app/service/api.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-typography",
  templateUrl: "./typography.component.html",
  styleUrls: ["./typography.component.css"],
})
export class TypographyComponent implements OnInit {
  public categorias: any = [];
  public libros: any = [];
  public autors: any = {};
  public autorn: any = {};

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.getcategorias();
  }
  public getcategorias() {
    this.api.getcategorias().subscribe((res: any) => {
      this.categorias = res;
    });
  }
  autor(autor) {
    this.autors = autor;
    console.log(autor);
    this.api.getLibrocats(autor.id).subscribe((res: any) => {
      this.libros = res;
      console.log(res);
    });
  }
  crearnuevo() {
    this.api.crearcat(this.autorn).subscribe((res: any) => {
      console.log(res);
      Swal.fire("Categoria creada", "", "success");
      this.getcategorias();
      this.autorn = {};
    });
  }
  editar() {
    this.api
      .editarcategoria(this.autors.id, this.autors)
      .subscribe((res: any) => {
        console.log(res);
        this.getcategorias();
        Swal.fire("Categoria actualizada", "", "success");
      });
  }
  eliminar() {
    if(this.libros.length > 0)
    {

      Swal.fire("La categoria no se puede eliminar porque tiene libros asignados", "Por favor elimina o reasigna los libros de la lista", "error");
      return
    }
    this.api
      .eliminarcategoria(this.autors.id)
      .subscribe((res: any) => {
        console.log(res);
        this.categorias = [];
        this.libros = [];
        this.autors = {};
        Swal.fire("Categoria eliminada", "", "success");
        this.api.getcategorias().subscribe((res: any) => {
          this.categorias = res;
        });
      });
  }
}
