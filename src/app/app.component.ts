import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListBooksService } from './core/services/list-books.service';
import { IBooks } from './core/interfaces/ibooks';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgFor } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { trigger, transition, style, animate } from '@angular/animations';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from './core/pipes/search.pipe';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FooterComponent } from "./components/footer/footer.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxPaginationModule, NgFor, PaginatorModule, FormsModule, SearchPipe, NgxSpinnerComponent, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('overlayContentAnimation', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(300, style({ opacity: 1 }))
      ]),
      // Define additional transitions here if needed
    ]),
  ],
})
export class AppComponent  {
  title = 'listofbooks';
  // step:number = 1
  // searchTerm = ""
  // pageCount:number = 0
  // currentPage: number = 1;
  // pageSize: number = 32;
  // totalRecords: number = 74232
  // private readonly _ListBooksService = inject(ListBooksService)
  // booksList:IBooks[] = []
  // data:string = ""
  // ngOnInit(): void {
  //   this.loadBooks(this.currentPage , this.pageSize)
  // }
// loadBooks(page:number , size:number):void{
//   this._ListBooksService.getListOfBooks( page ,  size).subscribe({
//     next:(res)=>{
//       console.log(res.results);
//       this.booksList = res.results
//       this.pageCount += 1
//       console.log(this.pageCount);
      
//       this.totalRecords = res.count
//       console.log(res.count);
      
//     },
//     error:(err)=>{
//       console.log(err);
      
//     }
//   })
// }
// searchBooks():void{
//   this._ListBooksService.bookSearch(this.searchTerm).subscribe({
//     next:(res)=>{
//       console.log(res.data);
//       this.step = 2
      
//     }
//   })
// }

  // prevPaes(page:number):void{
  //   this._ListBooksService.getListOfBooks(this.pageCount , this.pageSize).subscribe({
  //     next:(res)=>{
  //       console.log(res.results);
  //       this.booksList = res.results
  //       if(this.pageCount > 1){
  //         this.pageCount -= 1
  //       }       
  //       console.log(this.pageCount);
        
  //       this.totalItems = res.count
  //       console.log(res.count);  
  //     },
  //     error:(err)=>{
  //       console.log(err); 
  //     }
  //   })
  // }
  // nextPaes(page:number):void{
  //   this._ListBooksService.getListOfBooks(page , this.pageSize).subscribe({
  //     next:(res)=>{
  //       console.log(res.results);
  //       this.booksList = res.results
  //       this.pageCount += 1
  //       console.log(this.pageCount);
  //       this.totalItems = res.count
  //       console.log(res.count);     
  //     },
  //     error:(err)=>{
  //       console.log(err);     
  //     }
  //   })
  // }

  // onPageChange(event: any) {
  //   this.currentPage = event.page;
  //   this.pageSize = event.rows;
  //   this.loadBooks(this.currentPage , this.pageSize)
  // }
  
}
