const express = require('express');
const morgan = require('morgan');
const taskRoutes= require('./routes/tasks.routes.js');
const app=express();
const cors= require('cors');

app.listen(4000)
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(taskRoutes);
app.use((err,req,res,next)=>{
    return res.json({
        message: err.message
    })
})

console.log('Server on port 4000')