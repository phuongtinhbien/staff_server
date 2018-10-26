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
        name: faker.name.findName(),
        category: faker.commerce.productAdjective(),
        desc: faker.lorem.text(),
        status: faker.random.boolean()?"Active":"Inactive",
        action: "",
        image: faker.image.food(50,50)
      };
    }
    data.push(row);
  }
  return data;
}