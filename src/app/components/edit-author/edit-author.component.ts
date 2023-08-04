import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorService } from 'src/app/services/author.service';
import { AuthorModel } from 'src/app/models/author.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-author',
  templateUrl: './edit-author.component.html',
  styleUrls: ['./edit-author.component.css']
})
export class EditAuthorComponent implements OnInit {
  authorForm: FormGroup;
  authors: AuthorModel[] = [];
  authorId: any;

  constructor(
    private formBuilder: FormBuilder,
    private authorService: AuthorService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.authorForm = this.formBuilder.group({
      _id: [''],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.authorId = this.route.snapshot.paramMap.get('id');
    if (this.authorId) {
      this.fetchAuthorDetails();
    }
    this.fetchAuthors();
  }

  fetchAuthors(): void {
    this.authorService.getAuthors().subscribe(
      (authors: AuthorModel[]) => {
        this.authors = authors;
      },
      (error: any) => {
        console.error('Error fetching authors:', error);
      }
    );
  }

  fetchAuthorDetails(): void {
    this.authorService.getAuthorById(this.authorId).subscribe(
      (author: AuthorModel) => {
        this.authorForm.patchValue({
          _id: author._id,
          first_name: author.first_name,
          last_name: author.last_name
        });
      },
      (error: any) => {
        console.error('Error fetching author details:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.authorForm.valid) {
      const formData = this.authorForm.value;
      this.authorService.updateAuthor(this.authorId, {
        first_name: formData.first_name,
        last_name: formData.last_name,
        _id: formData._id
      }).subscribe(
        () => {
          this.authorForm.reset();
          this.router.navigate(['/list-authors']);
        },
        (error: any) => {
          console.error('Error updating author:', error);
        }
      );
    }
  }

  goBack(): void {
    this.router.navigate(['/list-books']);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.authorForm.get(controlName);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  isControlTouched(controlName: string): boolean {
    const control = this.authorForm.get(controlName);
    return !!control && (control.touched || control.dirty);
  }

}