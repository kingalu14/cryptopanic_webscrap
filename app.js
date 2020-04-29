const express = require('express');
const app = express();
const axios = require('axios');
const getPostDetail = require('./get_post_details');
const port =  8080;

const apiUrl = 'https://cryptopanic.com/api/v1/posts/?auth_token=f856962ef8e8651d078317072d4667b829f4e3dd&public=true';
//const apiUrl = 'https://cryptopanic.com/';

app.get('/', (req , res) => {
    // Make a request for a user with a given ID
    axios.get(apiUrl)
    .then(async (response) => {
            var newsSize = 20;
           for(i=0;i<newsSize;i++){
                res.write('Title:');
                res.write(response.data['results'][i]['title']);
                res.write('\n');
                var details = await getPostDetail(response.data['results'][i]['url']);
                console.log(details);
                res.write('Detail:');
                res.write(details);
                res.write('\n');

                res.write('Created at:');
                res.write(response.data['results'][i]['created_at']);
                res.write('\n')
                res.write('\n');
                res.write('\n');
                
           }
            
         
            res.end();
     
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    });
    
});

/*  app listen*/
app.listen(port , port => {
    console.log(`server running on port ${port}`);
});
