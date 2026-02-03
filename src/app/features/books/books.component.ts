import { Component, OnInit } from '@angular/core';
import { BookService } from '@app/core';
import { BookModel } from '@app/core';
import {CommonModule, NgForOf} from "@angular/common";
import {PageFooterComponent, PageLayoutComponent} from "@app/shared";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  standalone: true,
  imports: [PageLayoutComponent,CommonModule, RouterModule],
})
export class BooksComponent implements OnInit {
  books: BookModel[] = [];
  error: any = null;
  message=''

  constructor(public bookService: BookService) {}
// non-paginated
  // ngOnInit(): void {
  //   console.log('ngOnInit running')
  //   this.bookService.getBooks().subscribe((response:any) => {


  //     const { data, error } = response;
  //     if (data) {

  //       // console.log(data.content)
  //       this.books=data.content;

  //       // this.books = data as BookModel[];

  //     }
  //     if (error) {
  //       this.error = error;
  //       this.message=JSON.stringify(error,null,2)
  //     }
  //     console.log('end of ngoninit')
  //   });
  // }
  // paginated
  ngOnInit(): void {
  console.log('ngOnInit running');
  this.bookService.getBooks().subscribe({
    next: (response: any) => {
      console.log('raw resp: ',response);
      // if (response && response.content) {
      //   this.books = response.content; // array of books
      if(response?.data?.content){
        this.books=response.data.content;
      } else {
        this.books = [];
      }
      console.log('Books loaded:', this.books);
    },
    error: (err) => {
      this.error = err;
      this.message = JSON.stringify(err, null, 2);
      console.error('Error fetching books:', err);
    }
  });
}

}