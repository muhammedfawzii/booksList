import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { AuthorsComponent } from './components/authors/authors.component';
import { TopicsComponent } from './components/topics/topics.component';
import { AllBooksComponent } from './components/all-books/all-books.component';
import { DetailsComponent } from './components/details/details.component';
import { AllauthorsComponent } from './components/allauthors/allauthors.component';

export const routes: Routes = [
    {path:'' , redirectTo:'home' , pathMatch:'full'},
    {path:'home' , component:HomeComponent, title: 'home'},
    {path:'author' , component:AuthorsComponent, title: 'author'},
    {path:'topic' , component:TopicsComponent, title: 'topic'},
    {path:'allbooks' , component:AllBooksComponent, title: 'allbooks'},
    {path:'details/:id' , component:DetailsComponent, title: 'details'},
    {path:'allauthors/:author' , component:AllauthorsComponent, title: 'allauthors'},
    
    
];
