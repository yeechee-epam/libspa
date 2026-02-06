import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService, BookModel } from '@app/core';
import { AuthService } from '@auth0/auth0-angular';
import { RecommendationService } from '@app/core';
import { CommonModule } from '@angular/common';
import { PageLayoutComponent } from '@app/shared';

@Component({
  standalone: true,
  imports: [CommonModule, PageLayoutComponent],
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
})
export class BookDetailComponent implements OnInit {
  book?: BookModel;
  error: any;
  isAdmin = false;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private auth: AuthService,
    private recService: RecommendationService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.auth.user$.subscribe(user => {
      this.isAdmin =
        !!user &&
        user['https://spring-boot.example.com/roles']?.includes('admin');

      if (this.isAdmin) {
        this.recService.loadRecommendedBooks().subscribe(() => {
          this.fetchBookAndUpdateHeart(id);
        });
      } else {
        this.fetchBookAndUpdateHeart(id);
      }
    });
  }

  private fetchBookAndUpdateHeart(id: number): void {
    this.bookService.getBookById(id).subscribe({
      next: res => {
        this.book = res.data as BookModel;
        this.updateRecommended();
      },
      error: err => (this.error = err),
    });
  }

  private updateRecommended(): void {
    if (this.book && this.isAdmin) {
      this.book.recommendedByMe = this.recService.isRecommended(this.book.id);
    }
  }

  toggleRecommend(): void {
    if (!this.book) return;

    this.bookService.toggleRecommend(this.book.id).subscribe({
      next: res => {
        const recommended = (res.data as any)?.recommended;
        if (recommended !== undefined) {
          this.book!.recommendedByMe = recommended;
          this.recService.updateRecommendation(this.book!.id, recommended);
        }
      },
      error: err => console.error('Failed to toggle recommendation:', err),
    });
  }
}