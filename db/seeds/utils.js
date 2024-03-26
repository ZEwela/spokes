exports.putDataInArray = (arrayOfObjs) => {
    let arrayOfData = [];

    arrayOfObjs.forEach(object => {
        let thisObjArrToNest = []
        for (let key in object){
            thisObjArrToNest.push(object[key])
        };
        arrayOfData.push(thisObjArrToNest);
    });
    return arrayOfData;
}

exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
    if (!created_at) return { ...otherProperties };
    return { ...otherProperties, created_at: new Date(created_at) };
  };