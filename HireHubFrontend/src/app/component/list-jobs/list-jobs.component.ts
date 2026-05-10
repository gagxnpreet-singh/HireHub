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

@Component({
  selector: 'app-list-jobs',
  templateUrl: './list-jobs.component.html',
  styleUrls: ['./list-jobs.component.css']
})

export class ListJobsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  editForm: FormGroup;

  constructor(private authService: AuthService, private route: Router, private router: ActivatedRoute,
    private formBuilder: FormBuilder,private dialog: MatDialog,) { 
    this.editForm = this.formBuilder.group({
      title: ['', Validators.required],
      role: ['', Validators.required],
      experience: ['', Validators.required],
      type: ['', Validators.required],
      skills: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  isExpanded: boolean = false;
  ngOnInit(): void {
    this.list_all_jobs();
  }
  displayedColumns: string[] = ['id', 'userId', 'completed', 'title', 'skills', 'description', 'action'];
  dataSource: any;
  job_data: any = [];


  list_all_jobs() {
    this.authService.getJobsPostedByAnEmployer().subscribe(res => {
      console.log(res)
      this.job_data = res;
      this.dataSource = new MatTableDataSource<Job>(this.job_data)
      this.dataSource.paginator = this.paginator;
    })
  }

 
  editJob(item: any) {
    console.log(item.id);
    
    const dialogRef = this.dialog.open(EditJobFormComponent, {
      width: '500px',
      data: item
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // Handle the edited values here, for example, update the item in the list
        console.log('Updated item:', result);
        this.authService.editJob(result).subscribe(res => {
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
      text: 'You are about to delete this Job Posting',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.deleteJobEmployer(id).subscribe(res => {
          console.log(res);
          this.list_all_jobs();
        });
        Swal.fire({
          title: 'Deleted!',
          text: 'Your Job posting has been deleted.',
          icon: 'success',
        });
      }
    });
  }
}
