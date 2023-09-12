const successRes = (res,list,msg)=> {
    res.status(200).send({success:true,list,msg}).end();
}

const failedRes = (res,data,msg)=> {
    res.status(200).send({success:false,data,msg}).end();
}


module.exports = {
    successRes,
    failedRes
}
