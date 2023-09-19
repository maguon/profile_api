const axios = require('axios');
const config = require('../config')

const objectToUrl = (obj) => {
  let url = ''
  for (key in obj) {
      if (obj[key] || obj[key] == 0) {
          url = url === '' ? url : `${url}&`
          url = `${url}${key}=${obj[key]}`
      }
  }
  return url
}

const post = async(url, params ,headers) =>{
    return axios( {
      url,
      method: 'POST',
      headers: headers,
      data: params,
      baseURL: config.pushServer,
    }).then((response) => {
      if (response.status ==200) {
          return response.data;
      } else {
          return response.data;
      }
    }).catch(function (error) {
        return error;
    });
}

const get = async(url,headers) => {
  
  return axios( {
    url,
    method: 'GET',
    headers: headers,
  }).then((response) => {
    if (response.status ==200) {
        return response.data;
    } else {
        return response.data;
    }
  }).catch(function (error) {
      console.log(error)
      return error;
  });
}

const asyncRequest = async(url,method,params,headers) => {
  try {
    const response = await axios({
      method: method,
      url: url,
      headers: headers,
      data: params,
    })
    return response.data
  }catch(e){
    return e
  }
}
const asyncGet = async(url) => {
  return await asyncRequest(url,'get',{},{})
}

const asyncPost = async(url,params) => {
  return await asyncRequest(url,'post',params,{})
}


const asyncPut = async(url,params) => {
  return await asyncRequest(url,'put',params,{})
}

const asyncDel = async(url,params) => {
  return await asyncRequest(url,'del',params,{})
}


module.exports = {
  objectToUrl ,
  post ,
  get,
  asyncRequest ,
  asyncGet ,
  asyncPost ,
  asyncPut ,
  asyncDel ,
}
