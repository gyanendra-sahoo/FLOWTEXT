import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    // Basic Auth Info
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "", 
    },

    // User Preferences
    preferences: {
      theme: {
        type: String,
        enum: ["light", "dark"],
        default: "light",
      },
      language: {
        type: String,
        default: "en",
      },
      aiAssistanceLevel: {
        type: String,
        enum: ["minimal", "moderate", "aggressive"],
        default: "moderate",
      },
      autoSave: {
        type: Boolean,
        default: true,
      },
      notifications: {
        email: { type: Boolean, default: true },
        inApp: { type: Boolean, default: true },
        collaboration: { type: Boolean, default: true },
      },
    },

    // Subscription Info
    subscription: {
      plan: {
        type: String,
        enum: ["free", "premium", "enterprise"],
        default: "free",
      },
      status: {
        type: String,
        enum: ["active", "cancelled", "expired"],
        default: "active",
      },
      expiresAt: {
        type: Date,
      },
      aiTokensUsed: {
        type: Number,
        default: 0,
      },
      aiTokensLimit: {
        type: Number,
        default: 1000,
      },
    },

    // Activity Tracking
    lastActive: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
); // includes createdAt and updatedAt

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  // Hash password using bcryptjs
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.generateAccessToken = function () {
  // Generate a JWT token for the user
  return jwt.sign(
    { id: this._id, email: this.email, fullName: this.fullName },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

export const User = mongoose.model("User", userSchema);
