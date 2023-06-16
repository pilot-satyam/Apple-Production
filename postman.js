var axios = require('axios');
var data = '';

var config = {
  method: 'get',
  url: 'https://api.storekit.itunes.apple.com/inApps/v1/lookup/{{orderId}}',
  headers: { 
    'Content-Type': 'application/json', 
    'Authorization': 'Bearer '
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
