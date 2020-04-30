const express = require('express');
const app = express();
const axios = require('axios');
var bodyParser = require('body-parser')
const getPostDetail = require('./get_post_details');
const port =  process.env.PORT || 3030;

const apiUrl = 'https://cryptopanic.com/api/v1/posts/?auth_token=f856962ef8e8651d078317072d4667b829f4e3dd&public=true';
//const apiUrl = 'https://cryptopanic.com/';

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req , res) => {
    axios.get(apiUrl)
    .then(response => {
        res.render('index',{data: response.data.results});
    })
    .catch(error => {
        console.log('error');
    })
});

app.post('/getpostdata',  async (req,res) => {
  /*   const url = req.body.url; */
  console.log(req.body);
    const info = await getPostDetail(req.body.link);
    res.send(info)
});

/*  app listen*/
app.listen(port , port => {
    console.log(`server running on port ${port}`);
});
