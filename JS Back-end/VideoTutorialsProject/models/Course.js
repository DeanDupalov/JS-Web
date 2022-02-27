const {Schema, model, Types: {ObjectId}} = require('mongoose');

const URL_PATTERN = /^http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/(.+)/;
const courseSchema = new Schema({
    title: {
        type: String,
        minlength: [4, 'The title should be at least 4 characters']
    },
    description: {
        type: String,
        minlength: [20, 'The description should be at least 20 characters long']
    },
    imageUrl: {
        type: String,
        required: [true, 'Image field is required.'],
        validate: {
            validator(value){
                return URL_PATTERN.test(value)
            },
            message: 'Image must be valid URL.'
        }
    },
    isPublic: {type: Boolean, default: false},
    creator: {type: ObjectId, ref: 'User', required: true},
    usersEnrolled: {type: [ObjectId], default: [], ref: 'User'}

}, {timestamps: true});




const Course = model('Course', courseSchema);

module.exports = Course;