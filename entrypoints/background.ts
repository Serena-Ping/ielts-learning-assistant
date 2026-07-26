import { browser } from 'wxt/browser';

export default defineBackground(() => {
  const enableActionClick = async () => {
    try {
      await browser.sidePanel.setPanelBehavior({
        openPanelOnActionClick: true,
      });
    } catch (error) {
      console.error('Failed to configure the IELTS side panel.', error);
    }
  };

  void enableActionClick();
  browser.runtime.onInstalled.addListener(() => {
    void enableActionClick();
  });
});
