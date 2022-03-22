const configurationOptions = {
  debug: true
};

function debugMe(...args) {
  if (__DEV__) {
     console.log(args) // ToDo: comment this line for production.
  }
}
export { debugMe }
