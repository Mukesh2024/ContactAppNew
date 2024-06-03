import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UserService, User } from '../../services/user.service';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import {UserFormComponent} from '../../components/user-form/user-form.component'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'edit', 'delete'];
  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.dataSource.data = users;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editUser(user: User): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '300px',
      data: { ...user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.editUser(result).subscribe(() => {
          this.loadUsers();
          this.snackBar.open('User updated successfully', 'Close', {
            duration: 2000,
          });
        });
      }
    });
  }

  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '300px', // Set the width of your dialog
      data: {} // You can pass data to your dialog if needed
    });

    dialogRef.afterClosed().subscribe((result: User) => {
      // Handle the data returned from the dialog
      if (result) {
        // Logic to add the new user to your data source or perform any other action
        this.userService.addUser(result).subscribe(() => {
          this.loadUsers();
          this.snackBar.open('User added successfully', 'Close', {
            duration: 2000,
          });
        });
      }
    });
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(() => {
      this.loadUsers();
      this.snackBar.open('User deleted successfully', 'Close', {
        duration: 2000,
      });
    });
  }
}
