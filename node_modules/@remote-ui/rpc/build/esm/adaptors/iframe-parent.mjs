function fromIframe(target, {
  terminate: shouldTerminate = true,
  targetOrigin = '*'
} = {}) {
  if (typeof window === 'undefined') {
    throw new Error(`You can only run fromIframe() in a browser context, but no window was found.`);
  } // We need to store the listener, because we wrap it to do some origin checking. Ideally,
  // we’d instead store an `AbortController`, and use its signal to cancel the listeners,
  // but that isn’t widely supported.


  const listenerMap = new WeakMap();
  let resolveIFrameReadyPromise;

  function onMessage(event) {
    if (event.source !== target.contentWindow) return;

    if (event.data === 'remote-ui::ready') {
      window.removeEventListener('message', onMessage);
      resolveIFrameReadyPromise();
    }
  }

  const iframeReadyPromise = new Promise(resolve => {
    resolveIFrameReadyPromise = resolve;
    window.addEventListener('message', onMessage);
  });
  return {
    async postMessage(message, transfer) {
      await iframeReadyPromise;
      target.contentWindow.postMessage(message, targetOrigin, transfer);
    },

    addEventListener(event, listener) {
      const wrappedListener = event => {
        if (event.source !== target.contentWindow) return;
        listener(event);
      };

      listenerMap.set(listener, wrappedListener);
      self.addEventListener(event, wrappedListener);
    },

    removeEventListener(event, listener) {
      const wrappedListener = listenerMap.get(listener);
      if (wrappedListener == null) return;
      listenerMap.delete(listener);
      self.removeEventListener(event, wrappedListener);
    },

    terminate() {
      window.removeEventListener('message', onMessage);
      if (shouldTerminate) target.remove();
    }

  };
}

export { fromIframe };
