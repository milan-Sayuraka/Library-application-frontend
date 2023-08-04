import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorService } from 'src/app/services/author.service';
import { AuthorModel } from 'src/app/models/author.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-author-form',
  templateUrl: './author-form.component.html',
  styleUrls: ['./author-form.component.css']
})
export class AuthorFormComponent implements OnInit {
  authorForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authorService: AuthorService,
    private router: Router
    ) { 
    this.authorForm = this.formBuilder.group({
      _id: [''],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }


  onSubmit(): void {
    if (this.authorForm.valid) {
      const authorData: AuthorModel = this.authorForm.value;
      this.authorService.createAuthor(authorData).subscribe(
        () => {
          this.authorForm.reset();
          this.router.navigate(['/list-books']);
        },
        (error) => console.log(error)
      );
    }
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
