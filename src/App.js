import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/Notification/Notification';
import { uiActions } from './redux/ui-slice';

let initialValue = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(
        uiActions.showNotification({
          status: 'pending',
          message: 'On Process',
          title: 'Sending...',
        })
      );
      const response = await fetch(
        'https://resto-app-99fee-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json',
        { method: 'PUT', body: JSON.stringify(cart) }
      );

      if (!response.ok) {
        throw new Error('Failed sending data');
      }

      dispatch(
        uiActions.showNotification({
          status: 'success',
          message: 'item added.',
          title: 'Success!!',
        })
      );
    };

    if (initialValue) {
      initialValue = false;
      return;
    }

    fetchData().catch(() => {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          message: 'Sending item to cart failed',
          title: 'Error',
        })
      );
    });
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
