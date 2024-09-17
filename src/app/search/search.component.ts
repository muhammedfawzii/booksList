import { Component, inject, OnInit } from '@angular/core';
import { ListBooksService } from '../core/services/list-books.service';
import { Search } from '../core/interfaces/search';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [PaginatorModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent  {
  
}
