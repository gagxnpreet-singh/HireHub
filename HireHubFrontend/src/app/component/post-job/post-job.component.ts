import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Job } from 'src/app/model/jobs.model';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.css']
})
export class PostJobComponent implements OnInit {
  jobTitle : string = '';
  skills : string = '';
  roles : string = '';
  experience : string=''
  jobType : string='';
  description : string='';
  id: number|undefined ;
  postedBy: any;
  jobTypes: string[]
  experiences:number[]

  postJobs!: Job; 

  constructor(private authService:AuthService , private route: Router) { 
    this.jobTypes = ['Internship', 'Contract', 'Full Time', 'Part Time'];
    this.experiences = [0,1,2,3,4,5,6,7,8]
  }
  isExpanded: boolean = false;

  ngOnInit(): void {
    this.postJobs= new Job();
    this.jobTitle = '';
    this.skills = '';
    this.roles='';
    this.experience='';
    this.jobType='';
    this.description='';
    this.id = undefined;

  }
 submit_job(){
 this.postJobs.id= this.id;
 this.postJobs.postedBy = localStorage.getItem('employer_email');
 this.postJobs.description = this.description;
 this.postJobs.experience = this.experience;
 this.postJobs.role = this.roles;
 this.postJobs.title= this.jobTitle;
 this.postJobs.skills = this.skills;
 this.postJobs.type = this.jobType;
 console.log(this.postJobs)

 this.authService.postJobs(this.postJobs).subscribe(res => {

  if(res==true){
    alert("Job Posted")
    this.ngOnInit()
  }
 })
}
logout(){
  localStorage.clear();
  this.route.navigate(['/']);
 }
}

