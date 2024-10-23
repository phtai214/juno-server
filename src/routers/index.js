import user from './user.js';
import auth from './auth.js';
import product from './product.js';
import cart from './cart.js';
import cartItem from './cartItem.js';
import order from './order.js';
import orderItem from './orderItem.js';
import shop from './shop.js';
import review from './review.js';
import statistic from './statistic.js';
import transaction from './transaction.js';
const initRouter = (app) => {
    app.use('/api/v1/user', user);
    app.use('/api/v1/auth', auth);
    app.use('/api/v1/product', product);
    app.use('/api/v1/cart', cart);
    app.use('/api/v1/cartItem', cartItem);
    app.use('/api/v1/order', order);
    app.use('/api/v1/orderItem', orderItem);
    app.use('/api/v1/shop', shop);
    app.use('/api/v1/review', review);
    app.use('/api/v1/statistic', statistic);
    app.use('/api/v1/transaction', transaction);

}

module.exports = initRouter