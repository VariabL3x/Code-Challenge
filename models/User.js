const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const SALT_ROUNDS = 10;

const UserSchema = new Schema(
    {
        username: { type: String, required: true },
        email: {
            type: String,
            unique: true,
            required: true,
            index: true,
            lowercase: true,
            trim: true,
        },
        password: { type: String },
    },
    { timestamps: true }
);

UserSchema.pre('save', function (next) {
    const user = this;
    if (!this.isModified('password')) return next();
    user.password = bcrypt.hashSync(user.password, SALT_ROUNDS);
    next();
});

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
