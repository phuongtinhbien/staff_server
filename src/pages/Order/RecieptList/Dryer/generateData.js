import faker from 'faker';

export default (limit = 5, arrayData = false) => {
  const data = [];
  for (let i = 1; i <= limit; i++) {
    let row = null;
    if (arrayData) {
      row = [
        i,
        faker.company.findName(),
        faker.random.boolean(),
        faker.lorem.text(),
        "<button class='btn btn-info'>Action</button>"
      ];
    } else {
      row = {
        sn: i,
        id: (i+1000),
        code: "DRYER_"+(i+1000),
        branch: faker.company.companyName(),
        bought_date : "20/12/2018" ,
        buyer : faker.name.findName(),
        status: faker.random.boolean()?"Active":"Inactive",
        action: "",
      };
    }
    data.push(row);
  }
  return data;
}