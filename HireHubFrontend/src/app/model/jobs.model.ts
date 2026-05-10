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

// Backward-compatible alias for existing imports.
export class Jobs extends Job {}
