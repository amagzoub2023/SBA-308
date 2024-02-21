// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript",
};

// The provided assignment group.
const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
        {
            id: 1,
            name: "Declare a Variable",
            due_at: "2023-01-25",
            points_possible: 50,
        },
        {
            id: 2,
            name: "Write a Function",
            due_at: "2023-02-27",
            points_possible: 150,
        },
        {
            id: 3,
            name: "Code the World",
            due_at: "3156-11-15",
            points_possible: 500,
        },
    ],
};


// The provided learner submission data.
const LearnerSubmissions = [
    {
        learner_id: 125,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-25",
            score: 47,
        },
    },
    {
        learner_id: 125,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-02-12",
            score: 150,
        },
    },
    {
        learner_id: 125,
        assignment_id: 3,
        submission: {
            submitted_at: "2023-01-25",
            score: 400,
        },
    },
    {
        learner_id: 132,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-24",
            score: 39,
        },
    },
    {
        learner_id: 132,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-03-07",
            score: 140,
        },
    },
];


function calculateAverage(scoreSum, maxPossible) {
    if (maxPossible === 0) {
        throw new Error("Cannot divide by zero.");
    }
    return scoreSum / maxPossible;
}

function getLearnerData(course, ag, submissions) {


    function validateAssignmentGroup(ag, course) {
        if (ag.course_id !== course.id) {
            throw new Error("AssignmentGroup does not belong to the course.");
        }
    }


    /*
     Parse submission data.
     console.log(`Submission Data:`, submissions );
     Check to see if the submission was late; if so, deduct 10% of the maximum possible points.
     Find existing data for this learner, if any.
     If the learner already has data, add the new score to the existing data.
     Calculate the average score for each learner and remove the extra data
     */
    
    try {

        //Define the array of results as function return  
        const results = [];
        validateAssignmentGroup(ag, course);
        //const submissionGrouped = groupSubmissionsByLearner(submissions);
        //console.log(submissions);

        // grouping the Learner Submissioin data by learner id 
        // usingthe groupBy object method
        const submissionGrouped = Object.groupBy(LearnerSubmissions, ({ learner_id }) => learner_id);

        for (let learnerId in submissionGrouped) {


            // Define results item object..
            const learnerData = {
                id: learnerId,
                avg: 0,
                assignments: {}
            };

            console.log(learnerId);

            // Declaration and initialization of numeratorSum and DenomenatorSum
            // for Average grade calculation
            let numeratorSum = 0;
            let denominatorSum = 0;

            //console.log(submissionGrouped)


            // using for forEach and find methods to match assignements of 
            // assignment group to corresonding learner submissioins using
            // match assignment ids
            submissionGrouped[learnerId].forEach(assignmentSubmission => {
                const assignment = ag.assignments.find(a => a.id === assignmentSubmission.assignment_id);
                //console.log(assignmentSubmission);

                //console.log(assignmentSubmission.assignment_id);

                //console.log(assignment);
                //console.log(submissions);
                
                const pointsPossible = assignment.points_possible;
                if (pointsPossible === 0 || isNaN(pointsPossible)) {
                    throw new Error("Invalid points_possible value.");
                }
                
                if (new Date(assignmentSubmission.submission.submitted_at) <= new Date(assignment.due_at))
                    score = assignmentSubmission.submission.score;
                else 
                    score -= pointsPossible * 0.1; // Deduct 10% if late
                
                if (typeof score !== 'number') {
                    score = parseFloat(score); // Convert score to a number
                    if (isNaN(score)) {
                        throw new Error("Invalid score value.");
                    }
                }
                learnerData.assignments[assignmentSubmission.assignment_id] = Math.max(score / pointsPossible, 0);
                // Ensure score is not negative
                numeratorSum += score;
                denominatorSum += pointsPossible;
                //}
            });

            // calculate ad assign avage
            learnerData.avg = calculateAverage(numeratorSum, denominatorSum);


            results.push(learnerData);
        }

        return results;
    } catch (error) {
        throw new Error(`Error occurred: ${error.message}`);
    }
}


const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);
