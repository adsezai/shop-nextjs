# Next.js Shop Project


[![test](https://github.com/adsezai/shop-nextjs/actions/workflows/test.yml/badge.svg)](https://github.com/adsezai/shop-nextjs/actions/workflows/test.yml)

## Introduction

This repository is the frontend code of a online shop project.

The backend code can be found here: [NodeJs Backend](https://github.com/adsezai/shop-backend)

[<img src="https://adsezaistorage.blob.core.windows.net/adsezai/shop-index.PNG">](https://adsezaistorage.blob.core.windows.net/adsezai/shop-index.PNG)

[<img src="https://adsezaistorage.blob.core.windows.net/adsezai/shop-item.PNG">](https://adsezaistorage.blob.core.windows.net/adsezai/shop-index.PNG)

[<img src="https://adsezaistorage.blob.core.windows.net/adsezai/shop-login.PNG">](https://adsezaistorage.blob.core.windows.net/adsezai/shop-index.PNG)

[<img src="https://adsezaistorage.blob.core.windows.net/adsezai/shop-verkaufen.PNG">](https://adsezaistorage.blob.core.windows.net/adsezai/shop-index.PNG)

## Installation

To run the project clone this repository

Run `npm install` to install all dependencies

Add a `.env.local` file to the project root.

```bash
NEXT_PUBLIC_API_MOCKING=enabled
BACKEND_URL=http://localhost:7070
```

`NEXT_PUBLIC_API_MOCKING` enables the API Mocking.\
Backend Request will be send to `BACKEND_URL` but they will be intercepted by the msw service worker in the browser.\
To disable the mocked data set `NEXT_PUBLIC_API_MOCKING` to `disabled`.

Run `npm run dev` to start the app.

The app runs on [http://localhost:3000](http://localhost:3000)
