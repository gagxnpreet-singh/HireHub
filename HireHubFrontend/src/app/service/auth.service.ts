import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employer } from '../model/employer.model';
import { Student } from '../model/student.model';
import { Job } from '../model/jobs.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  employerLoginUrl: string = '';
  studentLoginUrl: string = '';
  employerSignUpUrl: string = '';
  studentSignUpUrl: string = '';
  url: string = '';
  postJobUrl: string = ' '
  getJobsUrl: string = ' '
  getStudentUrl: string = ''
  getAllAvailableJobsUrl: string = ''
  applyJobUrl: string = ''
  getAppliedJobsUrl: string = ''
  getListOfSudentsForAJob: string = ''
  deleteJobEmployerUrl: string = ''
  editJobUrlAdmin: string = ''
  getAllJobsAdminUrl: string = ''
  getAllEmployersAdminUrl: string = ''
  getAllStudentsAdminUrl: string = ''
  editEmployerAdminUrl: string = ''
  editStudentAdminUrl: string = ''
  deleteEmployerAdminUrl: string = ''
  deleteStudentAdminUrl: string = ''
  acceptApplicationUrl: string = ''
  declineApplicationUrl: string = ''
  getLoginStudentUrl:string='';
  selectForInterviewUrl:string='';

  constructor(private http: HttpClient) {

    this.employerLoginUrl = "http://localhost:5001/employer/login";
    this.employerSignUpUrl = "http://localhost:5001/employer/signup";
    this.url = "https://jsonplaceholder.typicode.com/todos";
    this.postJobUrl = "http://localhost:5001/employer/postjob"
    this.getJobsUrl = "http://localhost:5001/employer/getjobs";
    this.studentSignUpUrl = "http://localhost:5001/student/signup"
    this.studentLoginUrl = "http://localhost:5001/student/login"
    this.getStudentUrl = "http://localhost:5001/employer/getstudents"
    this.getAllAvailableJobsUrl = "http://localhost:5001/student/getAllAvailableJobs"
    this.applyJobUrl = "http://localhost:5001/student/applyjob"
    this.getAppliedJobsUrl = "http://localhost:5001/student/getAppliedJobs"
    this.getListOfSudentsForAJob = "http://localhost:5001/employer/getListOfStudentsForAJob"
    this.deleteJobEmployerUrl = "http://localhost:5001/employer/Deletejob"
    this.editJobUrlAdmin = "http://localhost:5001/admin/updatejob"
    this.getAllJobsAdminUrl = "http://localhost:5001/admin/alljobs"
    this.getAllEmployersAdminUrl = "http://localhost:5001/admin/allEmployers"
    this.getAllStudentsAdminUrl = "http://localhost:5001/admin/allStudents"
    this.editEmployerAdminUrl = "http://localhost:5001/admin/editEmployer"
    this.editStudentAdminUrl = "http://localhost:5001/admin/editStudent"
    this.deleteEmployerAdminUrl = "http://localhost:5001/admin/DeleteEmployer"
    this.deleteStudentAdminUrl = "http://localhost:5001/admin/DeleteStudent"
    this.acceptApplicationUrl = "http://localhost:5001/employer/AcceptApplication?studentId="
    this.declineApplicationUrl = "http://localhost:5001/employer/DeclineApplication?studentId="
    this.getLoginStudentUrl="http://localhost:5001/student/GetStudent?email="
    this.selectForInterviewUrl="http://localhost:5001/employer/SelectApplicationForInterview?studentId="
  }

  loginStudent(student: Student): Observable<any> {
    console.log(student)
    return this.http.get<any>(this.studentLoginUrl + "?email=" + student.email + "&password=" + student.password);
  }

  loginEmployer(employer: Employer): Observable<any> {
    console.log(employer)
    return this.http.get<any>(this.employerLoginUrl + "?email=" + employer.companyEmail + "&password=" + employer.companyPassword);
  }

  signUpStudent(student: Student): Observable<any> {
    console.log(student)
    return this.http.post<any>(this.studentSignUpUrl, student);
  }

  signUpEmployer(employer: Employer): Observable<any> {
    console.log(employer)
    return this.http.post<any>(this.employerSignUpUrl, employer);
  }

  getJobsPostedByAnEmployer(): Observable<any> {

    return this.http.get<Job>(this.getJobsUrl + "?email=" + localStorage.getItem('employer_email'))
  }

  postJobs(job: Job): Observable<any> {
    return this.http.post(this.postJobUrl, job)
  }

  getStudentList(): Observable<any> {
    return this.http.get<Student>(this.getStudentUrl)
  }

  getAllJobs(): Observable<any> {
    return this.http.get<Job>(this.getAllAvailableJobsUrl + "?email=" + localStorage.getItem('student_email'))
  }
  applyJob(id: number) {
    console.log(localStorage.getItem('student_email'))
    return this.http.get(this.applyJobUrl + "?email=" + localStorage.getItem('student_email') + "&jobId=" + id)
  }

  getAppliedJobs(): Observable<any> {
    return this.http.get<Job>(this.getAppliedJobsUrl + "?email=" + localStorage.getItem('student_email'))
  }

  getStudentsAppliedForJob(id: string): Observable<any> {
    return this.http.get<Student>(this.getListOfSudentsForAJob + "?id=" + id);
  }

  deleteJobEmployer(id: string) {
    return this.http.delete(this.deleteJobEmployerUrl + "?id=" + id);
  }

  editJob(job: Job): Observable<any> {
    console.log(job);
    return this.http.put<Job>(this.editJobUrlAdmin, job)
  }

  getAllJobsAdmin(): Observable<any> {
    return this.http.get<Job>(this.getAllJobsAdminUrl);
  }

  getAllStudentsAdmin(): Observable<any> {
    return this.http.get<Job>(this.getAllStudentsAdminUrl);
  }

  deleteStudentAdmin(id: string) {
    return this.http.delete(this.deleteStudentAdminUrl + "?id=" + id);
  }

  editStudentAdmin(student: Student): Observable<any> {
    console.log(student)
    return this.http.post<Student>(this.editStudentAdminUrl, student)
  }

  getAllEmployerAdmin(): Observable<any> {
    return this.http.get<Job>(this.getAllEmployersAdminUrl);
  }

  deleteEmployerAdmin(id: string) {
    return this.http.delete(this.deleteEmployerAdminUrl + "?id=" + id);
  }

  editEmployerAdmin(employer: Employer): Observable<any> {
    console.log(employer)
    return this.http.post<Student>(this.editEmployerAdminUrl, employer)
  }

  acceptJob(studentId:string, jobId:any){
    return this.http.get(this.acceptApplicationUrl+studentId+"&jobId="+jobId)
  }
  declineJob(studentId:string, jobId:any){
    return this.http.get(this.declineApplicationUrl+studentId+"&jobId="+jobId)
  }

  getLoginStudent(){
    return this.http.get(this.getLoginStudentUrl+ localStorage.getItem('student_email'))
  }

  selectForInterview(studentId:string, jobId:any){
    return this.http.get(this.selectForInterviewUrl+studentId+"&jobId="+jobId)
  }
}
