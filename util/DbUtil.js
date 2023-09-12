const getUpdateString = (paramObj) => {
    const strArray = []
    for (let [key, value] of Object.entries(paramObj)) {  
        strArray.push(key +" = " + value)
    }
    return strArray.join(" , ")
}

module.exports = {
    getUpdateString
}
