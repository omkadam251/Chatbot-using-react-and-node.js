const express=require('express');
const app=express();

app.get('/',(req,res) =>{
	res.send({'Hello':'there'});
});

const PORT=process.env.PORT || 5000;
process.env.PORT || 5000;

app.listen(PORT);