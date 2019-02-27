const workerScript = `
    const fib = (n) => n < 2 ? n : fib(n-1) + fib(n-2)
    self.onmessage = function(e) {
      // console.log(e);
      // if(e.data === 3) {
      //   throw new Error();
      // }

  

      
    // self.postMessage(e.data * 100);
    console.log(e.data);
    self.postMessage(fib(e.data));
  };
`;

export default () => {
  const blob = new Blob([workerScript], { type: "text/javascript" });
  return window.URL.createObjectURL(blob);
};
