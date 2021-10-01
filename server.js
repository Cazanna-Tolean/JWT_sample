require('dotenv').config()

const express=require('express')
const app=express()
const jwt= require('jsonwebtoken')

app.use(express.json())

const postsnews=[
    {
        username:'John',
        title:'Posts 1'
    },
    {
        username:'Kim',
        title:'Posts 2'
    },
]

app.get('/postsnews', authenticateToken,(req,res)=>{
    res.json(postsnews.filter(postsnew=>postsnew.username === req.user.name))
})

app.post('/login', (req,res)=>{
    //使用者驗證，產生accessToken

    const username=req.body.username
    const user={ name: username }

    const accessToken= jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({ accessToken: accessToken })
})

//驗證token
function authenticateToken( req, res, next){
    const authHeader= req.headers['authorization']
    const token= authHeader && authHeader.split(' ')[1]
    if (token==null) return res.sendStatus(401)
    //驗證jwt
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user)=>{
        if(err) return res.sendStatus(403) //token超時、不正確等情況
        req.user=user
        next()
    })
}

app.listen(3000)