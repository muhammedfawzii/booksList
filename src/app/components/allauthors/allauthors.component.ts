import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ScrollDirective } from '../../core/directive/scroll.directive';
import { NgxPaginationModule } from 'ngx-pagination';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { FormsModule } from '@angular/forms';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ListBooksService } from '../../core/services/list-books.service';
import { ToastrService } from 'ngx-toastr';
import { IBooks } from '../../core/interfaces/ibooks';

@Component({
  selector: 'app-allauthors',
  standalone: true,
  imports: [ScrollDirective, NgxPaginationModule , RouterLink , NgFor , PaginatorModule , FormsModule , CarouselModule],
  templateUrl: './allauthors.component.html',
  styleUrl: './allauthors.component.css'
})
export class AllauthorsComponent implements OnInit {
private readonly _ListBooksService = inject(ListBooksService)
private readonly _ToastrService = inject(ToastrService)
private readonly _ActivatedRoute = inject(ActivatedRoute)
bookList:WritableSignal<IBooks[]> = signal([])
bookSearch:WritableSignal<IBooks[]> = signal([])
searchList:WritableSignal<IBooks[]> = signal([])
subject:WritableSignal<[]> = signal([])
bookShelves:WritableSignal<[]> = signal([])
bookName:string = ''
pageCount:number = 0
  currentPage: number = 1;
  pageSize: number = 32;
  totalRecords: number = 74232
  customOptionsAuthor: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    items: 1,
    nav: true
  }
ngOnInit(): void {
  this.authorBook()
}
authorBook():void{
this._ActivatedRoute.paramMap.subscribe({
  next:(p)=>{
    console.log(p.get('author'));
    let authorName = p.get('author')
    this._ListBooksService.bookSearch(authorName).subscribe({
    next:(res)=>{
      console.log(res);
      this.bookList.set(res.results)
    },
    error:(err)=>{
      console.log(err);
    }
  })
  }
})
  
}
searchAuthorBook(nameBook:string):void{
  this._ListBooksService.bookSearch(nameBook).subscribe({
    next:(res)=>{
      console.log(res);
      this.searchList.set(res.results)
      if(this.bookName){
        if(this.searchList.length >= 1){
          this.searchList()
        }else if(this.searchList().length === 0){
          this._ToastrService.error('There is no book with this name')
        }
      }else{
        this._ToastrService.error('please enter a book name')
      }
    }
  })
}


}
