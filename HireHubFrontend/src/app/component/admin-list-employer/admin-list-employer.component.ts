import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { Job } from 'src/app/model/jobs.model';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditJobFormComponent } from '../edit-job-form/edit-job-form.component';
import { EditEmployerFormComponent } from '../edit-employer-form/edit-employer-form.component';

@Component({
  selector: 'app-admin-list-employer',
  templateUrl: './admin-list-employer.component.html',
  styleUrls: ['./admin-list-employer.component.css']
})
export class AdminListEmployerComponent implements OnInit {
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  editForm: FormGroup;
  isExpanded: boolean = false;

  constructor(private authService: AuthService, private route: Router,
    private formBuilder: FormBuilder,private dialog: MatDialog) { this.editForm = this.formBuilder.group({
      id: ['', Validators.required],
      companyName: ['', Validators.required],
      companyEmail: ['', Validators.required],
      companyPassword:['',Validators.required],
      address: ['', Validators.required],
      about: ['', Validators.required],
      email:['',Validators.required]
    }); }

  ngOnInit(): void {
    this.list_all_jobs()
  }
  displayedColumns: string[] = ['companyName', 'companyEmail', 'address', 'about', 'action'];
  dataSource: any;
  job_data: any = [];

  list_all_jobs() {
    this.authService.getAllEmployerAdmin().subscribe(res => {
      console.log(res)
      this.job_data = res;
      this.dataSource = new MatTableDataSource<Job>(this.job_data)
      this.dataSource.paginator = this.paginator;
    })
  }

 
  editJob(item: any) {
    const dialogRef = this.dialog.open(EditEmployerFormComponent, {
      width: '500px',
      data: item
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // Handle the edited values here, for example, update the item in the list
        console.log('Updated item:', result);
        this.authService.editEmployerAdmin(result).subscribe(res => {
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

  logout() {
    localStorage.clear();
    this.route.navigate(['/']);
  }

  deleteJob(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this Employer?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.deleteEmployerAdmin(id).subscribe(res => {
          console.log(res);
          this.list_all_jobs();
        });
        Swal.fire({
          title: 'Deleted!',
          text: 'Employer has been deleted.',
          icon: 'success',
        });
      }
    });
  }

}
