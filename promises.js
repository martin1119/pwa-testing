/* addExtra = (price, callback) => {
  if (price > 2) {
    callback(false, 'price cannot exceed 3');
    return;
  }
  setTimeout(() => {
    callback(price + 1);
  }, 300);
};

addExtra(1, (newPrice, error) => {
  if (error) {
    console.log(error);
    return;
  }
  addExtra(newPrice, (newPrice2, error) => {
    if (error) {
      console.log(error);
      return;
    }
    addExtra(newPrice2, (newPrice3, error) => {
      if (error) {
        console.log(error);
        return;
      }
      console.log(newPrice3);
    });
  });
});
 */

var price = new Promise((resolve, reject) => {
  //if (price > 2) reject('price cannot exceed 3');

  setTimeout(() => {
    resolve('Price A');
  }, 300);
});

//return p (if var p = new Promise(...))
var slowprice = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Price B');
  }, 200);
});

greet = () => {
  return 'hello';
};

var promises = [price, slowprice, 344, greet()];
Promise.all(promises).then((resolvedPromises) => {
  console.log(resolvedPromises);
});

var twopromisses = [price, slowprice];
Promise.race(twopromisses)
  .then((price) => {
    //resolves the fastest promise
    console.log(price);
  })
  .catch((err) => {
    console.log(err);
  });

/* addExtra(1)
  .then(addExtra)
  .then((newPrice) => console.log(newPrice))
  .catch((error) => console.log(error)); */
