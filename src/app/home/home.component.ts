import { Component, inject, OnInit } from '@angular/core';
import { ListBooksService } from '../core/services/list-books.service';
import { IBooks } from '../core/interfaces/ibooks';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgFor } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../core/pipes/search.pipe';
import { trigger, transition, style, animate } from '@angular/animations';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { NgxSpinnerService } from 'ngx-spinner';
import { ISearch } from '../core/interfaces/isearch';
import { ITopic } from '../core/interfaces/itopic';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ NgxPaginationModule , RouterLink , NgFor , PaginatorModule , FormsModule , SearchPipe , CarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
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
export class HomeComponent implements OnInit {
 
  
  pageCount:number = 0
  currentPage: number = 1;
  pageSize: number = 32;
  totalRecords: number = 74232
  bookName:string = ''
  searchList:ISearch[] = []
  topicName:string = ''
  topicBook:ITopic[]  = []
  dataNotFound:boolean = true
  private readonly _ListBooksService = inject(ListBooksService)
  private readonly _NgxSpinnerService = inject(NgxSpinnerService)
  
  booksList:IBooks[] = []
  data:string = ""
  ngOnInit(): void {
this._NgxSpinnerService.show()
    this.loadBooks(this.currentPage , this.pageSize)
    

  }
loadBooks(page:number , size:number):void{

  this._ListBooksService.getListOfBooks( page ,  size).subscribe({
    next:(res)=>{
      console.log(res.results);
      this.booksList = res.results
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
// searchBooks():void{
//   this._ListBooksService.bookSearch(this.searchTerm).subscribe({
//     next:(res)=>{
//       console.log(res.data);
      
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
  customOptionsPhotos: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    autoplay:true,
    autoplayTimeout: 3000,
    autoplaySpeed: 2000,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  }

  customOptionsBooks: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay:true,
    autoplayTimeout:2000,
    navSpeed: 700,
    navText: [`<i class="fa-solid fa-hand-point-left fa-xl"></i>`, `<i class="fa-solid fa-hand-point-right fa-xl"></i>`],
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
        items: 6
      }
    },
    nav: true
  }

  onPageChange(event: any) {
    this.currentPage = event.page;
    this.pageSize = event.rows;
    this.loadBooks(this.currentPage , this.pageSize)
  }

  searchBooks(bookName:string):void{
    this._ListBooksService.bookSearch(bookName).subscribe({
      next:(res)=>{
        console.log(res);
        this.searchList = res.results
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  topicBooks(topicName:string):void{
    this._ListBooksService.bookTopic(topicName).subscribe({
      next:(res)=>{
        console.log(res.results);
        
        this.topicBook = res.results
        this.dataNotFound = this.topicBook && this.topicBook.length > 0
        this.dataNotFound = this.topicBook && this.topicBook.length === 0

      }
    })
  }
}
