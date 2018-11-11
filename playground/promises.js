const iPromise = new Promise((resolve, reject) => {
    resolve('it worked man');
});

iPromise.then((message) => {
    console.log(message);
});