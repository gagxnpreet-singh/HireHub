import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Job } from 'src/app/model/jobs.model';
import { Student } from 'src/app/model/student.model';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-student-jobs',
  templateUrl: './student-jobs.component.html',
  styleUrls: ['./student-jobs.component.css'],
})
export class StudentJobsComponent implements OnInit {

  constructor(private authService: AuthService, private route: Router) { }
  isExpanded: boolean = false;
  ngOnInit(): void {
    this.getLoggedInStudent()
    this.listAllJobs()
  }
  
  job_data: any = [];
  student:any;


  listAllJobs() {
    this.authService.getAppliedJobs().subscribe(res => {
       res.forEach((element: any) => {
        console.log(element);
        
        element["companyName"]=this.extractDomainFromEmail(element.postedBy);
        this.student.jobsApplied.forEach((elem: { jobId: string ; status: any; })=>{
          if(element.id==elem.jobId){
            console.log("kida");
            element["status"]=elem.status
          }
        })
      });
      this.job_data=res;
    })
  }

  extractDomainFromEmail(email: string): string {
    const atIndex = email.indexOf('@');
    const dotIndex = email.lastIndexOf('.');

    if (atIndex !== -1 && dotIndex !== -1 && dotIndex > atIndex) {
      const domain = email.slice(atIndex + 1, dotIndex);
      return domain.charAt(0).toUpperCase() + domain.slice(1);
    }

    return '';
  }
  apply_job(data: any) {
    console.log(data.id);
    
  this.authService.applyJob(data.id).subscribe(res=>{
    Swal.fire('Thank you...', 'Job applied succesfully!', 'success');
    this.listAllJobs();
  })

}
  logout() {
    localStorage.clear();
    this.route.navigate(['/']);
  }

  getLoggedInStudent(){
    this.authService.getLoginStudent().subscribe(res=>{
      console.log(res);
      this.student=res;
    })
  }
}
