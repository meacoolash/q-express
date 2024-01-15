import mongoose from "mongoose";
const AutoIncrement = require('mongoose-sequence')(mongoose);

const ContactSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
)

ContactSchema.plugin(AutoIncrement, {
    inc_field: 'id',
    id: 'contact_counter',
    start_seq: 1000,
});


export default mongoose.model("Contact", ContactSchema);

