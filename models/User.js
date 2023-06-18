// import mongoose from "mongoose";
// import validator from "validator";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
// import crypto from "crypto";

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, "Please enter your name"],
//   },
//   email: {
//     type: String,
//     required: [true, "Please enter your email"],
//     unique: true,
//     validate: validator.isEmail,
//   },
//   password: {
//     type: String,
//     required: [true, "Please enter your password"],
//     minLength: [6, "Password must be 6 characters"],
//     select: false,
//   },
//   role: {
//     type: Number,
//     enum: [0, 1],
//     default: 0,
//   },
//   subscription: {
//     id: String,
//     statue: String,
//   },
//   avatar: {
//     public_id: {
//       type: String,
//       required: true,
//     },
//     url: {
//       type: String,
//       required: true,
//     },
//   },
//   playlist: [
//     {
//       course: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Course",
//       },
//       poster: String,
//     },
//   ],
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   resetPasswordToken: String,
//   resetPasswordExpire: Date,
// });

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// userSchema.methods.getJWTToken = function () {
//   return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: "15d" });
// };

// userSchema.methods.comparePassword = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

// userSchema.methods.getResetToken = function () {
//     const resetToken = crypto.randomBytes(20).toString("hex");
  
//     this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
//     this.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes
  
//     console.log("Reset Token:", resetToken);
//     console.log("Hashed Reset Password Token:", this.resetPasswordToken);
//     console.log("Reset Password Expire:", this.resetPasswordExpire);
  
//     return resetToken;
//   };
  

// export default mongoose.model("User", userSchema);
import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: validator.isEmail,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [6, "Password must be 6 characters"],
    select: false,
  },
  role: {
    type: Number,
    enum: [0, 1],
    default: 0,
  },
  subscription: {
    id: String,
    status: String,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  playlist: [
    {
      course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
      poster: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date, // Changed the type to Date
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: "15d" });
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.getResetToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes

  console.log("Reset Token:", resetToken);
  console.log("Hashed Reset Password Token:", this.resetPasswordToken);
  console.log("Reset Password Expire:", this.resetPasswordExpire);

  return resetToken;
};

export default mongoose.model("User", userSchema);
