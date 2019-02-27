import { useState, useEffect, useRef } from "react";

export default function(config) {
  const [message, setMessage] = useState({
    data: undefined,
    error: undefined
  });
  const workerContainer = useRef(null);

  /**
   *
   */
  function createWebWorker() {
    const { url, worker: workerContext, spawn } = config;

    if (url && spawn) {
      workerContainer.current = new Worker(url);
    } else {
      workerContainer.current = !!url
        ? new Worker(url)
        : workerContext.controller || workerContext;
    }
    return workerContainer.current;
  }

  /**
   *
   */
  function setupWebWorker() {
    const worker = createWebWorker();

    if (worker) {
      worker.addEventListener("message", onMessage);
      worker.addEventListener("error", onError);
    }
  }

  /**
   *
   */
  function onMessage(message) {
    const { data } = message;

    setMessage({
      data,
      error: undefined
    });
  }

  /**
   *
   */
  function postData(data) {
    const worker = workerContainer.current;

    if (!worker) {
      setMessage({
        data: undefined,
        error: new Error("Worker not Initialized")
      });
    } else {
      worker.postMessage(data);
    }
  }

  /**
   *
   */
  function onError(error) {
    setMessage({
      data: null,
      error: error
    });
  }

  /**
   *
   */
  function terminateWebWorker() {
    const worker = workerContainer.current;

    if (worker) {
      worker.removeEventListener("message", onMessage);
      worker.removeEventListener("error", onError);

      removeWebWorker();
    }
  }

  /**
   *
   */
  function removeWebWorker() {
    const worker = workerContainer.current;
    if (worker) {
      worker.terminate();
      workerContainer.current = null;
    }
  }

  useEffect(() => {
    setupWebWorker();
    return () => {
      terminateWebWorker();
    };
  }, []);

  return [message.data, postData, message.error];
}
