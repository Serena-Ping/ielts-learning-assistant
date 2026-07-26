# IELTS Learning Assistant

A local-first browser extension for capturing IELTS learning material while
practising on websites such as online mock-test and intensive-listening
platforms.

## Current milestone

The first product shell replaces the starter popup with a native browser side
panel.

It currently supports:

- opening the side panel from the extension toolbar icon;
- showing the current page title and URL;
- capturing selected text from normal web pages;
- recording notes, error reasons, and IELTS skill tags;
- saving notes in the browser's local extension storage;
- reviewing recent notes in a lightweight library.

## Development

```bash
npm install
npm run dev
```

For an Edge-targeted development build:

```bash
npm run dev -- -b edge
```

Validation commands:

```bash
npm run compile
npm run build
```

## Privacy

Version 0.1 stores learning notes locally in the browser. It does not upload
notes or connect to an AI service.
