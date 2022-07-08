const User = require('../models/user')
const Expense = require('../models/expense')
const bcrypt = require('bcrypt');
const { json } = require('body-parser');
const saltRounds = 10;
const jwt = require('jsonwebtoken')


exports.postExpense = (req,res,next)=>{
    const expense = req.body.expense
    req.user.createExpense({
        amount: expense.amount,
        description: expense.description,
        category: expense.category
    })
    .then(result=>{
        res.status(200).json({result, msg: "Expense Added"})
    })
    .catch(err=>{
        console.log(err)
        res.status(402).json({msg: "Not added"})
    })
   
}

exports.getAllExpenses = (req, res, next)=>{
    req.user.getExpenses()
    .then(expenses=>{
        res.json({expenses})
    })
}


exports.getUserDetails = (req, res, next)=>{
    let premium = req.user.dataValues.isPremium
    res.json({premium})
}

