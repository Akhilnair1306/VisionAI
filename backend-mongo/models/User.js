const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    passWord: {type: String, required: true}
})

const feedbackSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    name: { type: String, required: true},
    age: { type: String, required: true},
    responseData: { type: mongoose.Schema.Types.Mixed, required: true },
    prediction: { type: mongoose.Schema.Types.Mixed, required: true },
    createdAt: { type: Date, default: Date.now}
})

const appointmentSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // Reference to the User model
        required: true 
    },
    appointmentName: { 
        type: String, 
        required: true 
    },
    appointmentDate: { 
        type: Date, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

userSchema.pre('save',async function(next){
    if(!this.isModified('passWord')) return next;
    const salt = await bcrypt.genSalt(10);
    this.passWord = await bcrypt.hash(this.passWord, salt);
    next();
})

userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.passWord)
}

const User = mongoose.model("User", userSchema);
const Feedback = mongoose.model("Feedback", feedbackSchema);
const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = { User, Feedback, Appointment }