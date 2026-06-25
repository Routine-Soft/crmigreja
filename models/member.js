import mongoose, { Schema } from 'mongoose';

const memberSchema = new Schema({
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
    status: {
        type: String,
    },

    // Dono da igreja que cadastrou o membro
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
}, {
    timestamps: true,
});

const memberModel =
    mongoose.models.member ||
    mongoose.model('member', memberSchema);

export default memberModel;