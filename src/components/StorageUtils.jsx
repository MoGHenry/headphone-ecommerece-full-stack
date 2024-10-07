export const getStorage = (key) => {
  try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
  }
  catch (error) {
      console.error(error);
      return null;
  }
};

export const setStorage = (key, value) => {
  try {
      localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
      console.error(error);
  }
};

export const removeStorage = (key, product_id) => {
  try {
      const item = JSON.parse(localStorage.getItem(key));
      const updatedItem = item.filter(product => product.id !== product_id)
      localStorage.setItem(key, JSON.stringify(updatedItem));
      return true;
  }
  catch (error) {
      console.error(error)
      return false;
  }
};

export const addStorage = (key, value) => {
    try {
        const data = getStorage(key);
        const exist_item = data.find(product => product.id === value.id)
        if (exist_item) {
            exist_item.quantity += 1;
            setStorage(key, data);
            return true;
        }
        else {
            value.quantity = 1;
            data.push(value);
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        }
    }
    catch (error) {
        console.error(error);
        return false;
    }
};

export const getCartTotalCost = () => {
    try {
        const cart = getStorage('cart');
        let total_cost = 0;
        for (let i = 0; i < cart.length; i++) {
            total_cost += cart[i].price * cart[i].quantity;
        }
        return total_cost;
    }
    catch (error) {
        console.error(error);
        return 0;
    }
}

export const updateQuantity = (product_id, quantity) => {
    try {
        const cart = getStorage('cart');
        const exist_item = cart.find(product => product.id === product_id)
        if (exist_item) {
            exist_item.quantity = quantity;
            setStorage('cart', cart);
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.error(error);
        return false;
    }
}