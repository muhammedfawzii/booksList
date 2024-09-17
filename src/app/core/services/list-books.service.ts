import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListBooksService {

  constructor(private _HttpClient:HttpClient) { }
  getListOfBooks(page: number = 1, pageSize: number = 10):Observable<any>{
    return this._HttpClient.get(`https://gutendex.com/books?page=${page}&page_size=${pageSize}`)
  }
  
  bookSearch(author:any):Observable<any>{
    return this._HttpClient.get(`https://gutendex.com/books/?search=${author}`)
  }
  bookTopic(topic:any):Observable<any>{
    return this._HttpClient.get(`https://gutendex.com/books/?topic=${topic}`)
  }
  bookDetails(id:string | null):Observable<any>{
    return this._HttpClient.get(`https://gutendex.com/books/?ids=${id}`)
  }
}
