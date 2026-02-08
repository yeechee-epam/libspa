// import { Injectable } from '@angular/core';
// import { mergeMap, Observable, of } from 'rxjs';
// import { environment as env } from '../../../environments/environment';
// import { ApiResponseModel, BookModel, RequestConfigModel } from '../models';
// import { ExternalApiService } from './external-api.service';
// import { AuthService } from '@auth0/auth0-angular';
// // import { HttpHeaders } from '@angular/common/http';

// @Injectable({
//     providedIn: 'root'
// })
// export class BookService {
//     constructor(public externalApiService: ExternalApiService,
//         private auth: AuthService
//     ) {}

//     getBooks = (): Observable<ApiResponseModel> => {
//         console.log('getbooks')
//         const config: RequestConfigModel = {
//             url: `${env.api.serverUrl}/books`,
//             method: 'GET',
//             headers: {
//                 'content-type': 'application/json',
//             },

//         };

//         return this.externalApiService.callExternalApi(config).pipe(
//             mergeMap((response) => {
//                 const { data, error } = response;
//                 console.log(response)
//                 return of({
//                     data: data ? (data as BookModel[]) : null,
//                     error,
//                 });
//             })
//         );
//     };
// getBookById = (id: number): Observable<ApiResponseModel> => {
//     return this.auth.getAccessTokenSilently().pipe(
//         mergeMap(token => {
//             const headers: { [key: string]: string } = {
//                 'Content-Type': 'application/json'
//             };
//              if (token) {
//                 headers['Authorization'] = `Bearer ${token}`;
//             }

//             const config: RequestConfigModel = {
//                 url: `${env.api.serverUrl}/books/${id}`,
//                 method: 'GET',
//                 headers,
//             };

//             return this.externalApiService.callExternalApi(config);
//         })
//     );
// };
//   getBookById(id: number): Observable<ApiResponseModel> {
//     return this.auth.isAuthenticated$.pipe(
//       mergeMap(isAuth => {
//         const headers: { [key: string]: string } = { 'content-type': 'application/json' };

//         if (isAuth) {
//           // Admin or logged-in user: get token for protected endpoints
//           return this.auth.getAccessTokenSilently({ 
//             authorizationParams:{
//             audience: 'http://localhost:6060' }}).pipe(
//             mergeMap(token => {
//               headers['Authorization'] = `Bearer ${token}`;
//               return this.callBookApi(id, headers);
              
              
// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { BookService, BookModel } from '@app/core';
// import { AuthService } from '@auth0/auth0-angular';
// import { PageLayoutComponent } from '@app/shared';

// @Component({
//   standalone: true,
//   imports: [CommonModule, PageLayoutComponent],
//   selector: 'app-book-detail',
//   templateUrl: './book-detail.component.html',
// })
// export class BookDetailComponent implements OnInit {
//   book?: BookModel;
//   error: any;
//   isAdmin = false;

//   constructor(
//     private route: ActivatedRoute,
//     private bookService: BookService,
//     private auth: AuthService
//   ) {}

//   ngOnInit(): void {
//     const id = Number(this.route.snapshot.paramMap.get('id'));
// // check if user is logged in admin
//     this.auth.user$.subscribe(user => {
//       this.isAdmin =
//         !!user &&
//         user['https://spring-boot.example.com/roles']?.includes('admin');
//     });
// // fetch book data from backend
//   this.fetchBook(id);
//   }

// //     this.bookService.getBookById(id).subscribe(res => {
// //       this.book = res.data as BookModel;
// //       this.error = res.error;
// //     });
// //   }
//   private fetchBook(id: number): void {
//     this.bookService.getBookById(id).subscribe({
//       next: res => {
//         this.book = res.data as BookModel;
//         this.error = res.error;
//       },
//       error: err => {
//         console.error('Failed to fetch book:', err);
//         this.error = err;
//       },
//     });
//   }
  
//   toggleRecommend(): void {
//     if (!this.book) return;

//     this.bookService.toggleRecommend(this.book.id).subscribe(res => {
//       if (res.data) {
//         this.book!.recommendedByMe = (res.data as any).recommended;
//       }
//     });
//   }
// }
// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { BookService, BookModel } from '@app/core';
// import { AuthService } from '@auth0/auth0-angular';
// import { PageLayoutComponent } from '@app/shared';
// import { RecommendationService } from '@app/core';

// @Component({
//   standalone: true,
//   imports: [CommonModule, PageLayoutComponent],
//   selector: 'app-book-detail',
//   templateUrl: './book-detail.component.html',
// })
// export class BookDetailComponent implements OnInit {
//   book?: BookModel;
//   error: any;
//   isAdmin = false;

//   constructor(
//     private route: ActivatedRoute,
//     private bookService: BookService,
//     private auth: AuthService,
//     private recService: RecommendationService
//   ) {}

//   ngOnInit(): void {
//     const id = Number(this.route.snapshot.paramMap.get('id'));

//     // Check if user is an admin
//     this.auth.user$.subscribe(user => {
//       this.isAdmin =
//         !!user &&
//         user['https://spring-boot.example.com/roles']?.includes('admin');

//       // If admin, load recommended books once
//       if (this.isAdmin) {
//         this.recService.loadRecommendedBooks();
//       }
//     });

//     // Fetch book info (public)
//     this.bookService.getBookById(id).subscribe({
//       next: res => {
//         this.book = res.data as BookModel;
//         this.updateRecommended();
//         // Set recommendedByMe based on local RecommendationService
//         // if (this.book && this.isAdmin) {
//         //   this.book.recommendedByMe = this.recService.isRecommended(this.book.id);
//         // }
//       },
//       error: err => (this.error = err),
//     });
//       // Check if user is admin and load recommendations
//   this.auth.user$.subscribe(user => {
//     this.isAdmin =
//       !!user &&
//       user['https://spring-boot.example.com/roles']?.includes('admin');

//     if (this.isAdmin) {
//       this.recService.loadRecommendedBooks().subscribe(() => {
//         this.updateRecommended();
//       });
//     }
//   });

//   }
//   // Helper to update the heart after data is ready
// private updateRecommended(): void {
//   if (this.book && this.isAdmin) {
//     this.book.recommendedByMe = this.recService.isRecommended(this.book.id);
//   }
// }

//   toggleRecommend(): void {
//     if (!this.book) return;

//     this.bookService.toggleRecommend(this.book.id).subscribe({
//       next: res => {
//         const recommended = (res.data as any)?.recommended;
//         if (recommended !== undefined) {
//           this.book!.recommendedByMe = recommended;
//           this.recService.updateRecommendation(this.book!.id, recommended);
//         }
//       },
//       error: err => console.error('Failed to toggle recommendation:', err),
//     });
//   }
// }

//             })
//           );
//         } else {
//           // Public user: call API without token
//           return this.callBookApi(id, headers);
//         }
//       })
//     );
//   }

// //     createBook(book: BookModel): Observable<ApiResponseModel> {
// //   const config: RequestConfigModel = {
// //     url: `${env.api.serverUrl}/books`,
// //     method: 'POST',
// //     headers: {
// //       'content-type': 'application/json',
// //     },
// //     body: book, // You may need to add 'body' to RequestConfigModel if not present
// //   };
// //   return this.externalApiService.callExternalApi(config).pipe(
// //     mergeMap((response) => {
// //       const { data, error } = response;
// //       return of({ data, error });
// //     })
// //   );
// // }
// createBook(book: Partial<BookModel>): Observable<ApiResponseModel> {
//   const config: RequestConfigModel = {
//     url: `${env.api.serverUrl}/books`,
//     method: 'POST',
//     headers: {
//       'content-type': 'application/json',
//     },
//     body: book, //new
//   };
//   return this.externalApiService.callExternalApi(config).pipe(
//     mergeMap((response) => {
//       const { data, error } = response;
//       return of({ data, error });
//     })
//   );
// }

// // getBookById = (id: number): Observable<ApiResponseModel> => {
  
// //     const config: RequestConfigModel = {
// //     url: `${env.api.serverUrl}/books/${id}`,
// //     method: 'GET',
// //     headers: {
// //       'content-type': 'application/json',
// //     },
// //   };

// //   return this.externalApiService.callExternalApi(config);
// // };

// // toggleRecommend = (id: number): Observable<ApiResponseModel> => {
// //   const config: RequestConfigModel = {
// //     url: `${env.api.serverUrl}/books/${id}/recommend`,
// //     method: 'POST',
// //     headers: {
// //       'content-type': 'application/json',
// //     },
// //   };

// //   return this.externalApiService.callExternalApi(config);
// // };
//   toggleRecommend(id: number): Observable<ApiResponseModel> {
//     // Only logged-in users can toggle, so token required
//     return this.auth.getAccessTokenSilently({ 
//         authorizationParams:{
//         audience: 'http://localhost:6060' }}).pipe(
//       mergeMap(token => {
//         const config: RequestConfigModel = {
//           url: `${env.api.serverUrl}/books/${id}/recommend`,
//           method: 'POST',
//           headers: {
//             'content-type': 'application/json',
//             Authorization: `Bearer ${token}`
//           }
//         };
//         return this.externalApiService.callExternalApi(config);
//       })
//     );
//   }

// getRecommendedBooks(): Observable<BookModel[]> {
//   const config: RequestConfigModel = {
//     url: `${env.api.serverUrl}/books/me/recommended-books`, // backend admin-only endpoint
//     method: 'GET',
//     headers: {
//       'content-type': 'application/json',
//     },
//   };

//   return this.externalApiService.callExternalApi(config).pipe(
//     mergeMap((response) => {
//       const { data, error } = response;
//       if (error) {
//         console.error('Failed to fetch recommended books', error);
//         return of([]); // return empty array on error
//       }
//       return of(data ? (data as BookModel[]) : []);
//     })
//   );
// }

//   private callBookApi(id: number, headers: { [key: string]: string }): Observable<ApiResponseModel> {
//     const config: RequestConfigModel = {
//       url: `${env.api.serverUrl}/books/${id}`,
//       method: 'GET',
//       headers
//     };
//     return this.externalApiService.callExternalApi(config);
//   }


// }
// // import { Component, OnInit } from '@angular/core';
// // import { ActivatedRoute } from '@angular/router';
// // import { CommonModule } from '@angular/common';
// // import { BookService, BookModel } from '@app/core';
// // import { AuthService } from '@auth0/auth0-angular';
// // import { PageLayoutComponent } from '@app/shared';

// // @Component({
// //   standalone: true,
// //   imports: [CommonModule, PageLayoutComponent],
// //   selector: 'app-book-detail',
// //   templateUrl: './book-detail.component.html',
// // })
// // export class BookDetailComponent implements OnInit {
// //   book?: BookModel;
// //   error: any;
// //   isAdmin = false;

// //   constructor(
// //     private route: ActivatedRoute,
// //     private bookService: BookService,
// //     private auth: AuthService
// //   ) {}

// //   ngOnInit(): void {
// //     const id = Number(this.route.snapshot.paramMap.get('id'));
// // // check if user is logged in admin
// //     this.auth.user$.subscribe(user => {
// //       this.isAdmin =
// //         !!user &&
// //         user['https://spring-boot.example.com/roles']?.includes('admin');
// //     });
// // // fetch book data from backend
// //   this.fetchBook(id);
// //   }

// // //     this.bookService.getBookById(id).subscribe(res => {
// // //       this.book = res.data as BookModel;
// // //       this.error = res.error;
// // //     });
// // //   }
// //   private fetchBook(id: number): void {
// //     this.bookService.getBookById(id).subscribe({
// //       next: res => {
// //         this.book = res.data as BookModel;
// //         this.error = res.error;
// //       },
// //       error: err => {
// //         console.error('Failed to fetch book:', err);
// //         this.error = err;
// //       },
// //     });
// //   }
  
// //   toggleRecommend(): void {
// //     if (!this.book) return;

// //     this.bookService.toggleRecommend(this.book.id).subscribe(res => {
// //       if (res.data) {
// //         this.book!.recommendedByMe = (res.data as any).recommended;
// //       }
// //     });
// //   }
// // }
// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { BookService, BookModel } from '@app/core';
// import { AuthService } from '@auth0/auth0-angular';
// import { PageLayoutComponent } from '@app/shared';
// import { RecommendationService } from '@app/core';

// @Component({
//   standalone: true,
//   imports: [CommonModule, PageLayoutComponent],
//   selector: 'app-book-detail',
//   templateUrl: './book-detail.component.html',
// })
// export class BookDetailComponent implements OnInit {
//   book?: BookModel;
//   error: any;
//   isAdmin = false;

//   constructor(
//     private route: ActivatedRoute,
//     private bookService: BookService,
//     private auth: AuthService,
//     private recService: RecommendationService
//   ) {}

//   ngOnInit(): void {
//     const id = Number(this.route.snapshot.paramMap.get('id'));

//     // Check if user is an admin
//     this.auth.user$.subscribe(user => {
//       this.isAdmin =
//         !!user &&
//         user['https://spring-boot.example.com/roles']?.includes('admin');

//       // If admin, load recommended books once
//       if (this.isAdmin) {
//         this.recService.loadRecommendedBooks();
//       }
//     });

//     // Fetch book info (public)
//     this.bookService.getBookById(id).subscribe({
//       next: res => {
//         this.book = res.data as BookModel;
//         this.updateRecommended();
//         // Set recommendedByMe based on local RecommendationService
//         // if (this.book && this.isAdmin) {
//         //   this.book.recommendedByMe = this.recService.isRecommended(this.book.id);
//         // }
//       },
//       error: err => (this.error = err),
//     });
//       // Check if user is admin and load recommendations
//   this.auth.user$.subscribe(user => {
//     this.isAdmin =
//       !!user &&
//       user['https://spring-boot.example.com/roles']?.includes('admin');

//     if (this.isAdmin) {
//       this.recService.loadRecommendedBooks().subscribe(() => {
//         this.updateRecommended();
//       });
//     }
//   });

//   }
//   // Helper to update the heart after data is ready
// private updateRecommended(): void {
//   if (this.book && this.isAdmin) {
//     this.book.recommendedByMe = this.recService.isRecommended(this.book.id);
//   }
// }

//   toggleRecommend(): void {
//     if (!this.book) return;

//     this.bookService.toggleRecommend(this.book.id).subscribe({
//       next: res => {
//         const recommended = (res.data as any)?.recommended;
//         if (recommended !== undefined) {
//           this.book!.recommendedByMe = recommended;
//           this.recService.updateRecommendation(this.book!.id, recommended);
//         }
//       },
//       error: err => console.error('Failed to toggle recommendation:', err),
//     });
//   }
// }
import { Injectable } from '@angular/core';
import { mergeMap, Observable, of } from 'rxjs';
import { environment as env } from '../../../environments/environment';
import { ApiResponseModel, BookModel, RequestConfigModel } from '../models';
import { ExternalApiService } from './external-api.service';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(
    public externalApiService: ExternalApiService,
    private auth: AuthService
  ) {}

  getBooks(): Observable<ApiResponseModel> {
    const config: RequestConfigModel = {
      url: `${env.api.serverUrl}/books`,
      method: 'GET',
      headers: { 'content-type': 'application/json' }
    };
    return this.externalApiService.callExternalApi(config)
    // .pipe(
    //   mergeMap((response) => {
    //     const { data, error } = response;
    //     return of({
    //       data: data ? (data as BookModel[]) : null,
    //       error,
    //     });
    //   })
    // );
  }

  getBookById(id: number): Observable<ApiResponseModel> {
    return this.auth.isAuthenticated$.pipe(
      mergeMap(isAuth => {
        const headers: { [key: string]: string } = { 'content-type': 'application/json' };
        if (isAuth) {
          return this.auth.getAccessTokenSilently({
            authorizationParams: { audience: env.auth0.authorizationParams.audience }
          }).pipe(
            mergeMap(token => {
              headers['Authorization'] = `Bearer ${token}`;
              return this.callBookApi(id, headers);
            })
          );
        } else {
          return this.callBookApi(id, headers);
        }
      })
    );
  }

  private callBookApi(id: number, headers: { [key: string]: string }): Observable<ApiResponseModel> {
    const config: RequestConfigModel = {
      url: `${env.api.serverUrl}/books/${id}`,
      method: 'GET',
      headers
    };
    return this.externalApiService.callExternalApi(config);
  }

  toggleRecommend(id: number): Observable<ApiResponseModel> {
    return this.auth.getAccessTokenSilently({
      authorizationParams: { audience: env.auth0.authorizationParams.audience }
    }).pipe(
      mergeMap(token => {
        const config: RequestConfigModel = {
          url: `${env.api.serverUrl}/books/${id}/recommend`,
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        };
        return this.externalApiService.callExternalApi(config);
      })
    );
  }

  createBook(book: Partial<BookModel>): Observable<ApiResponseModel> {
    const config: RequestConfigModel = {
      url: `${env.api.serverUrl}/books`,
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: book,
    };
    return this.externalApiService.callExternalApi(config).pipe(
      mergeMap((response) => {
        const { data, error } = response;
        return of({ data, error });
      })
    );
  }

  getRecommendedBooks(): Observable<BookModel[]> {
    return this.auth.getAccessTokenSilently({
      authorizationParams: { audience: env.auth0.authorizationParams.audience }
    }).pipe(
      mergeMap(token => {
        const config: RequestConfigModel = {
          url: `${env.api.serverUrl}/books/me/recommended-books`,
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        };
        return this.externalApiService.callExternalApi(config).pipe(
          mergeMap((response) => {
            const { data, error } = response;
            if (error) {
              console.error('Failed to fetch recommended books', error);
              return of([]);
            }
            return of(data ? (data as BookModel[]) : []);
          })
        );
      })
    );
  }
}

