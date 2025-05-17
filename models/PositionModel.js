import mongoose from 'mongoose'

const positionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

})

const PositionModel = mongoose.model('Position', positionSchema);
export default PositionModel