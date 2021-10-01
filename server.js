const express=require('express')
const app=express()

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

app.get('/postsnews',(req,res)=>{
    res.json(postsnews)
})

app.listen(3000)