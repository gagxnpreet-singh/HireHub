export class Job {
    id: number | undefined;
    title: string = '';
    skills: string = '';
    role: string = '';
    type: string = '';
    experience: string = '';
    description: string = '';
    postedBy: any;
    studentsApplied: any[] | undefined;
}
