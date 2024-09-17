import { NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginatorModule } from 'primeng/paginator';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ListBooksService } from '../../core/services/list-books.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { ITopic } from '../../core/interfaces/itopic';
import { ToastrService } from 'ngx-toastr';
import { ScrollDirective } from '../../core/directive/scroll.directive';

@Component({
  selector: 'app-topics',
  standalone: true,
  imports: [NgxPaginationModule , ScrollDirective , RouterLink , NgFor , PaginatorModule , FormsModule , SearchPipe , CarouselModule],
  templateUrl: './topics.component.html',
  styleUrl: './topics.component.css',
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
export class TopicsComponent implements OnInit {
private readonly _ListBooksService = inject(ListBooksService)
private readonly _ToastrService = inject(ToastrService)
pageCount:number = 0
  currentPage: number = 1;
  pageSize: number = 32;
  totalRecords: number = 74173
  topicName:string = ''
  topicList:ITopic[] = []
  
ngOnInit(): void {
  this._ListBooksService.getListOfBooks().subscribe({
    next:(res)=>{
      console.log(res);
      
    }
  })
}
searchByTopic(topicName:string):void{
  this._ListBooksService.bookTopic(topicName).subscribe({
    next:(res)=>{
      console.log(res);
      this.topicList = res.results
      if(this.topicName){
        if(this.topicList.length >=1){
          this.topicList
        }else if(this.topicList.length ==0){
          this._ToastrService.error('this book is not available in our store')
          this.topicList = []
          
        }
      }else{
        this._ToastrService.error('please enter a topic of the book')
        this.topicList = []
        

      }
    },
    error:(err)=>{
    this._ToastrService.error('this book is not available in our store')
    console.log(err);
    
    }
  })
  
}

}
