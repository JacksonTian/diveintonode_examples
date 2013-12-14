try {
  var foo = 'hehe';
  throw new Error('just throw.');
} catch (ex) {
  console.log(foo);
}
