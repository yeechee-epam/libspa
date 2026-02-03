// src/app/core/services/recommendation.service.ts
// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
// import { BookService } from '@app/core';
// import { Observable, of } from 'rxjs';
// import { mergeMap } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root',
// })
// export class RecommendationService {
//   private recommendedBookIds$ = new BehaviorSubject<Set<number>>(new Set());

//   constructor(private bookService: BookService) {}

//   // Fetch recommended books for the current admin once
// loadRecommendedBooks(): Observable<number[]> {
//   return this.bookService.getRecommendedBooks().pipe(
//     mergeMap(books => {
//       const ids = new Set(books.map(b => b.id));
//       this.recommendedBookIds$.next(ids);
//       return of([...ids]); // return array of IDs as observable
//     })
//   );
// }



//   // Observable for components to subscribe
//   getRecommendedBookIds() {
//     return this.recommendedBookIds$.asObservable();
//   }

//   // Update local set when toggling recommendation
//   updateRecommendation(bookId: number, recommended: boolean) {
//     const ids = new Set(this.recommendedBookIds$.value);
//     if (recommended) {
//       ids.add(bookId);
//     } else {
//       ids.delete(bookId);
//     }
//     this.recommendedBookIds$.next(ids);
//   }

//   // Quick check if a book is recommended
//   isRecommended(bookId: number): boolean {
//     return this.recommendedBookIds$.value.has(bookId);
//   }
// }
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { BookService } from '@app/core';
import { BookModel } from '../models';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RecommendationService {
  private recommendedBookIds$ = new BehaviorSubject<Set<number>>(new Set());

  constructor(private bookService: BookService) {}

  loadRecommendedBooks(): Observable<number[]> {
    return this.bookService.getRecommendedBooks().pipe(
      mergeMap((books: BookModel[]) => {
        const ids: Set<number> = new Set(books.map((b: BookModel) => b.id));
        this.recommendedBookIds$.next(ids);
        return of([...ids]);
      })
    );
  }

  getRecommendedBookIds() {
    return this.recommendedBookIds$.asObservable();
  }

  updateRecommendation(bookId: number, recommended: boolean) {
    const ids = new Set(this.recommendedBookIds$.value);
    if (recommended) {
      ids.add(bookId);
    } else {
      ids.delete(bookId);
    }
    this.recommendedBookIds$.next(ids);
  }

  isRecommended(bookId: number): boolean {
    return this.recommendedBookIds$.value.has(bookId);
  }
}
