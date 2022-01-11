import { Component, OnInit } from "@angular/core";
import { ApiService } from "app/service/api.service";
import Swal from "sweetalert2";

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: "app-tables",
  templateUrl: "./tables.component.html",
  styleUrls: ["./tables.component.css"],
})
export class TablesComponent implements OnInit {
  public libros: any = [];
  public blibros;
  public nlibro: any = {};
  public mlibro: any = {};
  public autores: any = [];
  public categorias: any = [];
  public search="";
  public autor = 0;
  public genero = 0;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.getLibros();
    this.getautores();
    this.getCategorias();
  }
  public getLibros() {
    this.api.getLibros().subscribe((res: any) => {
      this.libros = res;
      this.blibros = res;
      this.filtrar();
    });
  }
  public getautores() {
    this.api.getautors().subscribe((res: any) => {
      this.autores = res;
    });
  }
  public getCategorias() {
    this.api.getcategorias().subscribe((res: any) => {
      console.log(res);
      this.categorias = res;
    });
  }
  public crearlibron() {
    console.log(this.nlibro);
    this.api.crearlibro(this.nlibro).subscribe((res: any) => {
      console.log(res);
      this.getLibros();
      this.nlibro = {};
    });
  }
  eliminar(libro) {
    Swal.fire({
      title: "¿Deseas eliminar " + libro.titulo + "?",
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      denyButtonText: `Eliminar`,
      cancelButtonText: "Conservar",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isDenied) {
        this.api.eliminarlibro(libro.id).subscribe((res: any) => {
          Swal.fire("Libro eliminado", "", "success");
          this.getLibros();
        });
      }
    });
  }
  seleccionarlibro(libro) {
    this.mlibro = libro;
  }

  editarlib() {
    if (this.mlibro.Estatus == 1) {
      this.mlibro.Prestado = null;
    }
    this.api.editarLibro(this.mlibro.id, this.mlibro).subscribe((res: any) => {
      Swal.fire("Libro actualizado", "", "success");
      this.getLibros();
    });
  }

  filtrar() {
    console.log(this.search, this.autor, this.genero);

    const word = this.search.toLocaleLowerCase();
    this.libros = this.blibros;
    const gen = this.genero;
    const autor = this.autor;
    let str = "";
    let genero;
    let sautor;
    console.log("Aqui vamos");
    this.libros = this.blibros.filter((elem) => {
      str = "";
      ["titulo", "nombre_autor", "nombre_categoria"].forEach((field) => {
        str += elem[field] + "";
      });
      ["id_genero"].forEach((field) => {
        genero = elem[field] + "";
      });
      ["id_autor"].forEach((field) => {
        sautor = elem[field] + "";
      });
      if (
        str.toLocaleLowerCase().includes(word) &&
        (this.genero == genero || this.genero == 0) &&
        (autor == sautor || this.autor ==0)
      ) {
        return true;
      } else {
        return false;
      }
    });
  }
}
