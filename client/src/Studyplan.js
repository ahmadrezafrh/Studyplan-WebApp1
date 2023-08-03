
/**
 * Constructor function for new Exam objects
 * @param {string} code course code (e.g., '01ABC')
 * @param {string} name course name
 * @param {number} credits number of credits (e.g., 6)
 * @param {number} maxstudents maximum capacity of the course
 * @param {string} incourses courses that are incompatible with this courese
 * @param {string} precourses preparatory coursers related to this course
 * @param {number} enrolled number of students enrolled in this course
 */

 function courses (code, name, credits, maxstudents, incourses, precourses, enrolled) {
    this.code = code;
    this.name = name;
    this.credits = credits;
    this.maxstudents = maxstudents;
    this.incourses = incourses;
    this.precourses = precourses;
    this.enrolled = enrolled;
}

function studyPlan (code, name, credits, maxstudents, incourses, precourses) {
    this.code = code;
    this.name = name;
    this.credits = credits;
    this.maxstudents = maxstudents;
    this.incourses = incourses;
    this.precourses = precourses;
}



export default {courses, studyPlan};