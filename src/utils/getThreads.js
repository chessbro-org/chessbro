const getThreads = () => {
  const cores = navigator.hardwareConcurrency;
  if (!cores || cores == 0) {
    return 4;
  }
  const useableCores = Math.floor(cores / 2);
  return useableCores;
};
export default getThreads;
