# alpaca-map π¦ πΊ

Accessible Alpaca map app with search, React.js UI

## Purpose π

To go from [alpaca-map-prototype](https://github.com/purplebugs/alpaca-map-prototype) to production ready

## Install app π£

```
npm install
```

## First time users only πͺ΄

1. Indexes should be created in Elasticsearch. Tip: this [elastic-data-tool](https://github.com/purplebugs/elastic-data-tool)
   was used
2. Create an .env file in the root of your project containing the keys

```
ELASTIC_CLOUD_ID="UPDATE-ME"
ELASTIC_USERNAME="UPDATE-ME"
ELASTIC_PASSWORD="UPDATE-ME"
```

## Start app π

- Back end

```
npm start
```

- Front end

Navigate to [client](./client) folder and run

```
npm start
```

## Use app π·

Back end

- http://localhost:3001/api - see message

Frond end

- http://localhost:3037/

## Status π

Done:

- Scaffold back end (BE)
- Scaffold front end (FE) that calls BE
- Basic version of alpaca map prototype as React app

Not done:

- More details of alpacas per farm when click map location
- Much nice styling

## LicenseΒ π

The work is under exclusive copyright by default.
