import faker from 'faker';

export default (limit = 5, arrayData = false) => {
  const data = [];
  for (let i = 1; i <= limit; i++) {
    let row = null;
    if (arrayData) {
      row = [
        i,
        faker.company.findName(),
        faker.random.boolean()
      ];
    } else {
      row = {
        sn: i,
        id: (i+1000),
        name: faker.name.findName(),
        status: faker.random.boolean()?"Active":"Inactive"
      };
    }
    data.push(row);
  }
  return data;
}