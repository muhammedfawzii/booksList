import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ListBooksService } from '../../core/services/list-books.service';
import { ActivatedRoute } from '@angular/router';
import { IDetails } from '../../core/interfaces/idetails';
import { ScrollDirective } from '../../core/directive/scroll.directive';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ScrollDirective],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  private readonly _ListBooksService = inject(ListBooksService)
  private readonly _ActivatedRoute = inject(ActivatedRoute)
detailsList:WritableSignal<IDetails[]> = signal([])
subject:WritableSignal<[]> = signal([])
bookShelves:WritableSignal<[]> = signal([])
ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next:(p)=>{
      console.log(p.get('id'));
      let idBook = p.get('id')
      this._ListBooksService.bookDetails(idBook).subscribe({
        next:(res)=>{
          console.log(res.results);
          this.detailsList.set(res.results)
          this.subject.set(res.results[0].subjects)
          this.bookShelves.set(res.results[0].bookshelves)
        }
      })
    }
  })
}
}
