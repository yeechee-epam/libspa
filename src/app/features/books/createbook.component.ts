import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '@app/core';
import { BookModel } from '@app/core';
import { AuthService } from '@auth0/auth0-angular';
import { FormBuilder, ReactiveFormsModule, Validators,FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-book',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="content-layout">
      <h2>Create a New Book</h2>
      <form [formGroup]="bookForm" (ngSubmit)="onSubmit()" *ngIf="isAdmin">
        <label>
          Book Name:
          <input formControlName="name" />
        </label>
        <label>
          Author Name:
          <input formControlName="authorName" />
        </label>
        <button type="submit" [disabled]="bookForm.invalid || loading">Create Book</button>
      </form>
      <div *ngIf="!isAdmin">
        <p>You must be logged in as an admin to create books.</p>
      </div>
      <div *ngIf="success">{{ success }}</div>
      <div *ngIf="error">{{ error.message }}</div>
    </div>
  `,
})
export class CreateBookComponent {
//   bookForm = this.fb.group({
//     name: ['', Validators.required],
//     authorName: ['', Validators.required],
//   });
bookForm:FormGroup;
  loading = false;
  success = '';
  error: any = null;
  isAdmin = false;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private auth: AuthService
  ) {
    this.bookForm=this.fb.group({
        name:['',Validators.required],
        authorName:['',Validators.required],
    })
  }

  ngOnInit(): void {
    this.auth.user$.subscribe(user => {
        console.log(user)
      // Check for admin role in user claims
      // Adjust this check based on your Auth0 roles setup
      this.isAdmin = user && user['https://spring-boot.example.com/roles']?.includes('admin');
    });
  }

  onSubmit() {
    if (this.bookForm.invalid) return;
    this.loading = true;
    this.success = '';
    this.error = null;

    const book: BookModel = this.bookForm.value;
    this.bookService.createBook(book).subscribe(response => {
      this.loading = false;
      if (response.data) {
        this.success = 'Book created successfully!';
        this.bookForm.reset();
      }
      if (response.error) {
        this.error = response.error;
      }
    });
  }
}