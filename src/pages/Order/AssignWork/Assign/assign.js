const calColorGroup = (data)=>{
    let result=[];
  
    if (data){
      data.forEach(element => {
       let a = {
          id: element.colorGroupId,
          name: element.colorGroupName,
        };
        if (!result.includes(a))
        result.push(a);
      });
    }
    return result;
   
  }
  
  const setWashBag = (data, ind) => {
      for (let i =0; i<data.length;i++){
        data[i].washbagCode = ind;
      }
      return data;
  }
  const sortByServiceAndColorGroup= (serviceArrays,data)=>{
      let result = [];
      let washBagind = 0;
      serviceArrays.forEach(element => {
          let filter = data.filter( item => item.serviceTypeId === element.id);
          let colorGroup = calColorGroup(filter);
          colorGroup.forEach(e =>{
              let colorFilter = filter.filter(item => item.colorGroupId === e.id);
              result.push(setWashBag(colorFilter, washBagind));
          });
      });
      return result;
  } 