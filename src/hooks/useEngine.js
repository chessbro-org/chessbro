const STOCKFISH_URL =
  "https://cdn.jsdelivr.net/npm/stockfish.js@10.0.2/stockfish.js";

const setupEngine = () => {
  let worker = null;
  const initializeEngine = async () => {
    try {
      const response = await fetch(STOCKFISH_URL);
      if (!response.ok) {
        showErrorMessage(`(Error: ${response.status})`);
      }
      const engineCode = await response.text();
      const blob = new Blob([engineCode], {
        type: "application/javascript",
      });
      const blobURL = URL.createObjectURL(blob);
      worker = new Worker(blobURL);
      worker.onmessage = (event) => {
        onMessage(event);
      };
      worker.onerror = (err) => {
        setError(` error: ${err.message || "Unknown error"}`);
      };
      setPostMessage((message) => worker.postMessage(message));
      postMessage("uci");
      postMessage("isready");
      setEngine(worker);
    } catch (err) {
      setError(`error: ${err.message || "Unknown error"}`);
    }
  };
  initializeEngine();
};
