import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
  {
    id: 'p1',
    price: 6,
    title: 'My First book',
    description: 'Lorem ipsum bla bla bla blaa',
  },
  {
    id: 'p2',
    price: 4,
    title: 'My Second book',
    description: 'Lorem ipsum bla bla bla blaa',
  },
  {
    id: 'p3',
    price: 4.5,
    title: 'My thrid book',
    description: 'Lorem ipsum bla bla bla blaa',
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((val, i) => (
          <ProductItem
            key={i}
            id={val.id}
            title={val.title}
            price={val.price}
            description={val.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
