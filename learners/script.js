import { AssignmentGroup } from "./data/AssignmentGroup.js";
import { CourseInfo } from "./data/CourseInfo.js";
import { LearnerSubmissions } from "./data/LearnerSubmissions.js";
import getLearnerData from "./functions/getLearnerData.js";

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);
