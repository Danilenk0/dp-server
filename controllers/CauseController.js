import CauseModel from '../models/CauseModel.js'

export default class CauseController{
    static async getAll(req, res) {
        try {
            const causes = await CauseModel.find();
            return res.status(200).json(causes);
            
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
     static async  create(req, res){
           try {
                const cause = new CauseModel(req.body)
                cause.save();
                res.status(201).json({
                    message:"Причина неявки успешно добавлена успешно добавлен!"
                })
            } catch (error) {
                res.status(500).json({message:error.message})
            }
        }
}