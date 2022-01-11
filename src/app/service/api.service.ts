import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private libros = environment.api + "libros";
  private autors=environment.api+"autores";
  private categorias = environment.api+"categorias"

  constructor(public http:HttpClient) { 
  }
  public getLibros()
  {
    return this.http.get(this.libros);
  }
  public getLibro(id)
  {
    return this.http.get(this.libros+'/'+id);
  }
  public getLibrocats(id)
  {
    return this.http.get(this.libros+'_cats/'+id);
  }
  public crearlibro(libro)
  {
    return this.http.post(this.libros,libro);
  }
  public crearautor(autor)
  {
    return this.http.post(this.autors,autor);
  }
  public crearcat(cat)
  {
    return this.http.post(this.categorias,cat);
  }

  public editarLibro(id,libro)
  {
    return this.http.put(this.libros+"/"+id,libro);
  }
  public eliminarlibro(id)
  {
    return this.http.delete(this.libros+"/"+id);
  }
  public getautors()
  {
    return this.http.get(this.autors);
  }
  public getautor(id)
  {
    return this.http.get(this.autors+'/'+id);
  }
  public editarautor(id,autor)
  {
    return this.http.put(this.autors+"/"+id,autor);
  }
  public eliminarautor(id)
  {
    return this.http.delete(this.autors+"/"+id);
  }
  public getcategorias()
  {
    return this.http.get(this.categorias);
  }
  public getcategoria(id)
  {
    return this.http.get(this.categorias+'/'+id);
  }
  public editarcategoria(id,categoria)
  {
    return this.http.put(this.categorias+"/"+id,categoria);
  }
  public eliminarcategoria(id)
  {
    return this.http.delete(this.categorias+"/"+id);
  }
  
}
