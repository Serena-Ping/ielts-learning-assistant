import { defineConfig } from 'wxt';

export default defineConfig({
  modules: ['@wxt-dev/module-react'],

  manifest: {
    name: 'IELTS Learning Assistant',
    description:
      'Capture selected IELTS text, record notes, and review learning points in a browser side panel.',
    permissions: ['storage', 'tabs'],
    icons: {
      16: 'icon/16.png',
      32: 'icon/32.png',
      48: 'icon/48.png',
      96: 'icon/96.png',
      128: 'icon/128.png',
    },
    action: {
      default_title: 'Open IELTS Learning Assistant',
      default_icon: {
        16: 'icon/16.png',
        32: 'icon/32.png',
        48: 'icon/48.png',
      },
    },
  },
});
