import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../services/user.service';
import { strictEmailValidator } from '../../validators/email-validator.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']

})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      id: [this.data ? this.data.id : null],
      firstName: [this.data ? this.data.firstName : '', Validators.required],
      lastName: [this.data ? this.data.lastName : '', Validators.required],
      email: [this.data ? this.data.email : '', [Validators.required, strictEmailValidator()]]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.value);
    }
  }
}
