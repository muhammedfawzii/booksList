import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ListBooksService } from '../../core/services/list-books.service';
import { IBooks } from '../../core/interfaces/ibooks';
import { ScrollDirective } from '../../core/directive/scroll.directive';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { FormsModule } from '@angular/forms';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ButtonModule } from 'primeng/button';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-all-books',
  standalone: true,
  imports: [ ButtonModule,ScrollDirective, NgxPaginationModule , RouterLink , NgFor , PaginatorModule , FormsModule , CarouselModule],
  templateUrl: './all-books.component.html',
  styleUrl: './all-books.component.css'
})
export class AllBooksComponent implements OnInit {
private readonly _ListBooksService = inject(ListBooksService)
private readonly _ToastrService = inject(ToastrService)
pageCount:number = 0
  currentPage: number = 1;
  pageSize: number = 32;
  totalRecords: number = 74232
  bookName:string = ''
  dataNotFound:boolean = true
booksList:WritableSignal<IBooks[]> = signal([])
searchBooks:WritableSignal<IBooks[]> = signal([])
customOptionsSlide: OwlOptions = {
  loop: true,
  mouseDrag: false,
  touchDrag: false,
  pullDrag: false,
  dots: true,
  navSpeed: 700,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 4
    }
  },
  nav: false
}
  ngOnInit(): void {
    this.loadBooks(this.currentPage , this.pageSize)
  }
  loadBooks(page:number , size:number):void{

    this._ListBooksService.getListOfBooks( page ,  size).subscribe({
      next:(res)=>{
        console.log(res.results);
        this.booksList.set(res.results)
        
        this.pageCount += 1
        console.log(this.pageCount);
        
        this.totalRecords = res.count
        console.log(res.count);
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  onPageChange(event: any) {
    this.currentPage = event.page;
    this.pageSize = event.rows;
    this.loadBooks(this.currentPage , this.pageSize)
  }
  searchByBookName(bookName:string):void{
    this._ListBooksService.bookSearch(bookName).subscribe({
      next:(res)=>{
        console.log(res);
        this.searchBooks.set(res.results)
        // this.dataNotFound = this.searchBooks()&& this.searchBooks().length > 0
        // this.dataNotFound = this.searchBooks()&& this.searchBooks().length === 0
        if(this.bookName){
          if(this.searchBooks() && this.searchBooks().length > 0){
            this.dataNotFound = false
          }
          else if(this.searchBooks() && this.searchBooks().length === 0){
            this.dataNotFound = false
            this._ToastrService.error('this book is not available in our store')
          }
        }else{
          this.dataNotFound = false
          this._ToastrService.error('please enter a book name')
        }
      }
    })
    }
}
