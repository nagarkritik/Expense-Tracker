const User = require('../models/user')
const Expense = require('../models/expense')
const Sequelize = require('sequelize')
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
    }).catch(err=>console.log(err))
}


exports.getUserDetails = (req, res, next)=>{
    let user = req.user.dataValues
    res.json({user})
}

exports.getExpenseTotals = async (req, res, next)=>{
    
    const totalAmount = await Expense.findAll({
        attributes: [
          'userId',
          [Sequelize.fn('sum', Sequelize.col('amount')), 'total_amount'],
        ],
        group: ['userId'],
        raw: true
      })

    totalAmount.sort((a,b)=> b.total_amount-a.total_amount)
    
    for(let i=0; i<totalAmount.length; i++){
        let user = await User.findAll({

            attributes:['name'],
            where: {id: totalAmount[i].userId}
        })

        //console.log(user[0].name)

        totalAmount[i] = {...totalAmount[i], name: user[0].name}
    }

    console.log(totalAmount)
    res.json({totalAmount})
      
}

exports.postDeleteExpense = (req, res, next)=>{
    let expId = req.body.id

    Expense.destroy({where:{id:expId}})
    .then(()=>{
        res.send("Removed")
    }).catch(err=> console.log(err))
}