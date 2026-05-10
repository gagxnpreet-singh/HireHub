import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Job } from 'src/app/model/jobs.model';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';
import { EditStudentFormComponent } from '../edit-student-form/edit-student-form.component';

@Component({
  selector: 'app-admin-list-student',
  templateUrl: './admin-list-student.component.html',
  styleUrls: ['./admin-list-student.component.css']
})
export class AdminListStudentComponent implements OnInit {
  isExpanded: boolean = false;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  editForm: FormGroup;
  constructor(private authService: AuthService, private route: Router,
    private formBuilder: FormBuilder,private dialog: MatDialog) { 
      this.editForm = this.formBuilder.group({
        title: ['', Validators.required],
        role: ['', Validators.required],
        experience: ['', Validators.required],
        type: ['', Validators.required],
        skills: ['', Validators.required],
        description: ['', Validators.required]
      });
    }

  ngOnInit(): void {
    this.list_all_jobs()
  }
  logout() {
    localStorage.clear();
    this.route.navigate(['/']);
  }
  displayedColumns: string[] = ['id', 'name', 'email', 'qualification', 'experience','school','action'];
  dataSource: any;
  job_data: any = [];

  list_all_jobs() {
    this.authService.getAllStudentsAdmin().subscribe(res => {
      console.log(res)
      this.job_data = res;
      this.dataSource = new MatTableDataSource<Job>(this.job_data)
      this.dataSource.paginator = this.paginator;
    })
  }

 
  editJob(item: any) {
    const dialogRef = this.dialog.open(EditStudentFormComponent, {
      width: '500px',
      data: item
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // Handle the edited values here, for example, update the item in the list

        this.authService.editStudentAdmin(result).subscribe(res => {
          console.log(res);
          this.list_all_jobs();
        });
      }
    });
  }

  openComponentInNewTab(data: any) {
    const componentRoute = '/employer/list-student';
    const queryParams = { job_id: data.id };
    const url = this.route.createUrlTree([componentRoute], { queryParams: queryParams }).toString();
    window.open(url, '_blank');
  }

  deleteJob(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this Student',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.deleteStudentAdmin(id).subscribe(res => {
          console.log(res);
          this.list_all_jobs();
        });
        Swal.fire({
          title: 'Deleted!',
          text: 'Student has been deleted.',
          icon: 'success',
        });
      }
    });
  }

}
