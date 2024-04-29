const bcrypt = require("bcryptjs");
const { Schema, model } = require("mongoose");
const logger = require("../loggers/logger");

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

userSchema.pre("save", async function () {
  try {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 12);
    }
  } catch (error) {
    logger.error(error);
  }
});

userSchema.methods.comparePassword = async function (password) {
  if (this.password) {
    return await bcrypt.compare(password, this.password);
  } else {
    return;
  }
};

const User = model("User", userSchema);

module.exports = User;
