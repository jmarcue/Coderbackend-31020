import { faker } from '@faker-js/faker';

faker.locale = "es";

const getFaker = (req, res) => {
  const dataRandom = [];
  const data = {
    dataRandom: dataRandom
  };

  for (let i = 0; i < 5; i++) {
    dataRandom.push({
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      thumbnail: faker.image.image()
    });
  }
  res.render('faker', data);
}

export { getFaker }