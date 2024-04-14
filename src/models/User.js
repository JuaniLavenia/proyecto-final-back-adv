const bcrypt = require("bcryptjs");
const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: { type: String },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    index: { unique: true },
  },
  password: {
    type: String,
    //required: true,
  },
  googleId: {
    type: String,
  },
  githubId: {
    type: String,
  },
  subscription: {
    type: String,
    enum: ["Free", "Iron", "Gold", "Platinum"],
    default: "Free",
  },
  loanHistory: [
    {
      bookId: { type: Schema.Types.ObjectId, ref: "Book" },
      date: { type: Date, default: Date.now },
    },
  ],
  purchaseHistory: [
    {
      bookId: { type: Schema.Types.ObjectId, ref: "Book" },
      date: { type: Date, default: Date.now },
    },
  ],
});

if (this.password) {
  userSchema.pre("save", async function () {
    try {
      this.password = await bcrypt.hash(this.password, 12);
    } catch (error) {
      console.log(error);
    }
  });

  userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
}

const User = model("User", userSchema);

module.exports = User;
