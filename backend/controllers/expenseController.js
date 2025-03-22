    const xlsx = require('xlsx');
    const Expense = require('../models/Expense');
    
    //Add Income Source
    exports.addExpense = async (req, res) => {
        const userId = req.user.id;
    
        try{
            const {icon,category,amount,date} = req.body;
    
            //Validation : Chek for missing fields
            if( !category || !amount || !date){
                return res.status(400).json({message: 'Please fill in all fields'});
            }
    
            const newExpense = new Expense({
                userId,
                icon,
                category,
                amount,
                date: new Date(date)
            });
            
    
            await newExpense.save();
            res.status(201).json({newIncome});
        }
        catch(err){
            return res.status(500).json({message: "server Error"});
        }
    }
    
    //Get All Income Source
    exports.getAllExpense = async (req, res) => {
        const userId = req.user.id;
        try{
            const expense = await Expense.find({userId}).sort({date: -1});
            res.status(200).json({expense});
        }
        catch(err){
            return res.status(500).json({message: "server Error"});
        }
    }
    
    //Delete Income Source
    exports.deleteExpense = async (req, res) => {
     
        try{
            await Expense.findByIdAndDelete(req.params.id);
            res.status(200).json({message: "Income Source Deleted"});
        }catch(err){
            return res.status(500).json({message: "server Error"});
        }
    }
    
    //Download Income Source
    exports.downloadExpenseExcel = async (req, res) => {
        const userId = req.user.id;
        try{
            const expense = await Expense.find({userId}).sort({date: -1});
    
            //Prepare data fro excel
            const data = expense.map((item) => ({
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
    