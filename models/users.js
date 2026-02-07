import mongoose, { Schema } from 'mongoose';
import argon2 from 'argon2';
import { type } from 'os';

// Definindo o Schema
const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'O nome é obrigatório']
    },
    phone: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
    },
    birthdate: { 
        type: Date,
    },
    gender: {
        type: String,
    },
    church: {
        type: String,
    }, 
    cep: {
        type: String,
    },
    address: {
        type: String,
    },
    neighborhood: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    invitationofgrace: {
        type: String,
    },
    baptized: {
        type: Boolean,
    },
    password: {
        type: String,
        required: [true, 'A senha é obrigatória'],
    },
    token: {
        type: String,
        select: false
    },
    resetPasswordToken: {
        type: String,
        select: false
    },
    resetPasswordExpires: {
        type: Date,
        select: false
    },
    permissions: {
        type: [String],
        default: []
    },
    status: {
        type: String,
    },
    churchId: {
        type: [String],
        default: []
    }
}, { 
    timestamps: true,
});

// Middleware de hashing de senha antes de salvar
userSchema.pre('save', async function () {
    // Só faz hash se a senha foi modificada
    if (!this.isModified('password')) return;
    
    try {
        this.password = await argon2.hash(this.password, {
            type: argon2.argon2id
        });
    } catch (error) {
        throw error;
    }
});

const userModel = mongoose.models.user || mongoose.model('user', userSchema);
export default userModel;