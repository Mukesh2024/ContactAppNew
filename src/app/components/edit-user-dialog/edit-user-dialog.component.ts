import { Component,OnInit,  Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../services/user.service';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss']
})
export class EditUserDialogComponent implements OnInit  {
  userForm!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    alert(1);
    this.userForm = this.fb.group({
      id: [this.data ? this.data.id : null],
      firstName: [this.data ? this.data.firstName : '', Validators.required],
      lastName: [this.data ? this.data.lastName : '', Validators.required],
      email: [this.data ? this.data.email : '', [Validators.required, Validators.email]]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit(): void {
    alert(2);
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.value);
    }
  }
}
