const xlsx = require('xlsx');
const Income = require('../models/Income');

//Add Income Source
exports.addIncome = async (req, res) => {
    const userId = req.user.id;

    try{
        const {icon,source,amount,date} = req.body;

        //Validation : Chek for missing fields
        if( !source || !amount || !date){
            return res.status(400).json({message: 'Please fill in all fields'});
        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        });
        

        await newIncome.save();
        res.status(201).json({newIncome});
    }
    catch(err){
        return res.status(500).json({message: "server Error"});
    }
}

//Get All Income Source
exports.getAllIncome = async (req, res) => {
    const userId = req.user.id;
    try{
        const income = await Income.find({userId}).sort({date: -1});
        res.status(200).json({income});
    }
    catch(err){
        return res.status(500).json({message: "server Error"});
    }
}

//Delete Income Source
exports.deleteIncome = async (req, res) => {
 
    try{
        await Income.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Income Source Deleted"});
    }catch(err){
        return res.status(500).json({message: "server Error"});
    }
}

//Download Income Source
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;
    try{
        const income = await Income.find({userId}).sort({date: -1});

        //Prepare data fro excel
        const data = income.map((item) => ({
                Source: item.source,
                Amount: item.amount,
                Date: item.date
            
        }));


        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, 'Income');
        xlsx.writeFile(wb, 'Income.xlsx');
        res.download('Income.xlsx');
    }
    catch(err){
        return res.status(500).json({message: "server Error"});
    }
}    
