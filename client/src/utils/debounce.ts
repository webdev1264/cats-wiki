const debounce = function <T extends (...args: Parameters<T>) => void>(
  callback: T,
  timer = 500
) {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback(...args);
      clearTimeout(timeoutId);
    }, timer);
  };
};

export default debounce;
