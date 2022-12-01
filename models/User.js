const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

// hash the user's password before it hits the database

const userSchema = new Schema(
    {
        email: { type: String, required: [true, 'email is required'], unique: true },
        password: { type: String, required: [true, 'password is required'] }
    },
    { timestamps: true }
);

userSchema.pre('save', async function (next) { // wrapped in asynch since it is slow! 
                            //  could not be a arrow function for the this. to work! 
    console.log(this.password);
    try {
        const hash = await bcrypt.hash(this.password, 10); // (10) the more it is the longer it takes and the more secure it is 
        this.password = hash;  // override the password with its hash value
        next();
        /*    Next, is passed into our middleware by Mongoose. We must call it, otherwise our application will hang. 
              The result of our middleware, is that the user's password will be stored in a hashed format. */
    } catch (e) {
        throw Error('could not hash password');
    }
})

module.exports = mongoose.model("User", userSchema);
