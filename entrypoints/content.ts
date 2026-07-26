import { browser } from 'wxt/browser';

interface ExtensionMessage {
  type?: string;
}

export default defineContentScript({
  matches: ['<all_urls>'],

  main() {
    const getSelectionPayload = () => ({
      selectedText: window.getSelection()?.toString().trim() ?? '',
      title: document.title,
      url: window.location.href,
    });

    const notifySelectionChanged = () => {
      const payload = getSelectionPayload();

      if (!payload.selectedText) return;

      void browser.runtime
        .sendMessage({
          type: 'IELTS_SELECTION_CHANGED',
          payload,
        })
        .catch(() => {
          // The side panel may be closed. No action is needed in that case.
        });
    };

    browser.runtime.onMessage.addListener((message: ExtensionMessage) => {
      if (message?.type === 'IELTS_GET_SELECTION') {
        return Promise.resolve(getSelectionPayload());
      }

      return undefined;
    });

    document.addEventListener('mouseup', notifySelectionChanged);
    document.addEventListener('keyup', notifySelectionChanged);
  },
});
