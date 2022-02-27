const Course = require('../models/Course');



async function getAllCourses() {
    const courses = await Course.find({}).lean();
    return courses
}

async function getAllPublicCourses() {
    const courses = await Course.find({isPublic: 'true'}).lean();
    return courses
}
async function createCourse(course) {
    const result = new Course(course);
    await result.save();

    return result;
}
async function getCourseById(id) {
    return Course.findById(id).lean();
}
async function update(id, course) {
    const existing = await Course.findById(id);

    existing.title = course.title;
    existing.description = course.description;
    existing.imageUrl = course.imageUrl;
    existing.isPublic = course.isPublic;

    await existing.save();
}
async function deleteCourseById(id) {
    return Course.findByIdAndDelete(id);
}

async function enroll(userId, courseId) {
    const course = await Course.findById(courseId);

    if(course.usersEnrolled.includes(userId)){
        throw new Error('Student already in the course.')
    }

    course.usersEnrolled.push(userId);
    await course.save()

}

module.exports = {
    getAllCourses,
    getAllPublicCourses,
    createCourse,
    getCourseById,
    enroll,
    deleteCourseById,
    update

}