/* eslint-disable no-console */
import { get } from 'axios';
import { promises as fs } from 'fs';

const productsFile = 'products.txt';
const searchPath = '/search/typeahead/?q=';
const baseURL = 'https://www.vsgamers.es';

const productToURL = async (product) => {
  const response = await get(`${baseURL}${searchPath}${product}`);

  return `${baseURL}${response.data.items[0].url}`;
};

const fileToProducts = async (file) => {
  const response = await fs.readFile(file);

  return response
    .toString()
    .split('\n')
    .map((str) => str.trim());
};

const productsMap = async () => {
  const products = await fileToProducts(productsFile);

  return Promise.all(products.map(productToURL));
};

productsMap().then((res) => console.log(res.join('\n')));
