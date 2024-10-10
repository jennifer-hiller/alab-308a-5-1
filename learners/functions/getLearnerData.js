export default function getLearnerData(course, ag, submissions) {
  function findAssignmentById(id) {
    const assignment = ag.assignments.find((assignment) => assignment.id == id); // == because it's a string compared with number
    if (!assignment) {
      throw "Invalid assignment ID";
    }
    return assignment;
  }
  const learnerData = [];
  try {
    if (course.id !== ag.course_id) {
      throw "Invalid course information";
    }
    submissions.forEach((submission) => {
      const assignment = findAssignmentById(submission.assignment_id);
      let score = submission.submission.score;
      if (typeof score !== "number") {
        throw "Invalid score";
      }
      // deduct points for late submission
      if (submission.submission.submitted_at > assignment.due_at) {
        score *= 0.9;
      }
      // find learner by id
      let learner = learnerData.find(
        (item) => item.id === submission.learner_id
      );
      // if not found, create new learner
      if (!learner) {
        learner = {
          id: submission.learner_id,
        };
        learnerData.push(learner);
      }
      // do not log if assignment is not due yet
      if (assignment.due_at > new Date().toISOString()) {
        return;
      }
      // handle when possible points is 0, therefore handling division by 0
      if (assignment.points_possible === 0) {
        learner[submission.assignment_id] = 0;
        return;
      }
      learner[submission.assignment_id] = score / assignment.points_possible;
    });
    learnerData.forEach((learner) => {
      let total = 0;
      let numberOfAssignments = 0;
      Object.keys(learner).forEach((key) => {
        if (key !== "id") {
          numberOfAssignments++;
          total += learner[key];
        }
      });
      learner.avg = total / numberOfAssignments;
    });
  } catch (e) {
    console.error(e);
  }
  return learnerData;
}
