function filter(list, serviveType, colorId,ind ){
    let res=[];
    for (let i = ind+1;i<list.length-1;i++){
        res.push(list[i]);
    }
    return res;

}

const sortByServiceAndSameColorGroup = data =>{
    let res=[]
    data.forEach((element, index) => {
        res.push({
            serviveTypeId: element.serviveTypeId,
            colorGroupId : element.colorGroupId,
            content: filter(data,element.serviveTypeId, element.colorGroupId )
        })
    });
    return res;

}

const sortByServiceAndDiffColorGroup = data =>{

}


