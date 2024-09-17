import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ListBooksService } from '../../core/services/list-books.service';
import { ToastrService } from 'ngx-toastr';
import { IBooks } from '../../core/interfaces/ibooks';
import { ScrollDirective } from '../../core/directive/scroll.directive';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-authors',
  standalone: true,
  imports: [ScrollDirective, NgxPaginationModule , RouterLink , NgFor , PaginatorModule , FormsModule , CarouselModule],
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.css'
})
export class AuthorsComponent implements OnInit {
private readonly _ListBooksService = inject(ListBooksService)
private readonly _ToastrService = inject(ToastrService)
searchBooks:WritableSignal<IBooks[]> = signal([])
authorName:string = ''
// searchAuthor
pageCount:number = 0
  currentPage: number = 1;
  pageSize: number = 32;
  totalRecords: number = 74232
ngOnInit(): void {
  this.allAuthors(this.currentPage , this.pageSize)
}
allAuthors(page:number , size:number):void{
  this._ListBooksService.getListOfBooks(page , size).subscribe({
    next:(res)=>{
      console.log(res);
      this.searchBooks.set(res.results)
    }
  })
}
onPageChange(event: any) {
  this.currentPage = event.page;
  this.pageSize = event.rows;
  this.allAuthors(this.currentPage , this.pageSize)
}
authorSearch(nameAuthor:string):void{
  this._ListBooksService.bookSearch(nameAuthor).subscribe({
    next:(res)=>{
      console.log(res);
      this.searchBooks.set(res.results)
      if(this.authorName){
        if(this.searchBooks().length >= 1){
          this.searchBooks()
        }else if(this.searchBooks().length == 0){
          this._ToastrService.error('There is No Author with this name')
          
        }
      }else{
        this._ToastrService.error('please enter author name')
      }
    }
  })
}

}
