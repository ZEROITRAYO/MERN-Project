const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    fullName: { type: String, required: true }, // Fixed typo
    email: { type: String, required: true },   // Fixed typo
    password: { type: String, required: true }, // Fixed typo
    profileImageUrl: { type: String, default: "" }, // This is fine
},
{timestamps:true});

//Hash password before saving
UserSchema.pre('save',async function (next) {
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password,10);
    next();
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}


module.exports = mongoose.model('User',UserSchema);