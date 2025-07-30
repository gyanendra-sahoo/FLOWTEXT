import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
  },
  avatar: {
    type: String, // URL to the profile picture
  },
  lastActive: {
    type: Date,
    default: Date.now,
  },
  subscription: {
    plan: {
      type: String,
      enum: ['free', 'premium', 'enterprise'],
      default: 'free'
    },
    status: {
      type: String,
      enum: ['active', 'cancelled', 'expired'],
      default: 'active'
    },
    expiresAt: Date,
    aiTokensUsed: {
      type: Number,
      default: 0
    },
    aiTokensLimit: {
      type: Number,
      default: 1000 // Example default monthly quota
    }
  },
  preferences: {
    theme: {
      type: String,
      enum: ['light', 'dark'],
      default: 'light'
    },
    language: {
      type: String,
      default: 'en'
    },
    aiAssistanceLevel: {
      type: String,
      enum: ['minimal', 'moderate', 'aggressive'],
      default: 'moderate'
    },
    autoSave: {
      type: Boolean,
      default: true
    },
    notifications: {
      email: {
        type: Boolean,
        default: true
      },
      inApp: {
        type: Boolean,
        default: true
      },
      collaboration: {
        type: Boolean,
        default: true
      }
    }
  }
}, {
  timestamps: true
});

export const User = mongoose.model("User", userSchema);
