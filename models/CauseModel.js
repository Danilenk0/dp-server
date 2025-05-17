import mongoose from 'mongoose'

const causeSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
})

const CauseModel = mongoose.model('Cause', causeSchema);
export default CauseModel;