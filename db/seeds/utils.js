exports.putDataInArray = (arrayOfObjs) => {
    let arrayOfData = [];

    arrayOfObjs.forEach((object) => {
        let thisObjArrToNest = []
        for (let key in object){
            thisObjArrToNest.push(object[key])
        };
        arrayOfData.push(thisObjArrToNest);
    });
    return arrayOfData;
}