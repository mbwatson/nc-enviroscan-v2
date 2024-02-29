# NC Enviroscan

## Development

This application is developed and built with Node 20.11.1.
Manage Node versions on your development machine with
[Nvm](https://github.com/nvm-sh/nvm) or [n](https://www.npmjs.com/package/n).
Install dependencies with `npm i`, and spin up a development server with `npm start`.
The app should be viewable at [http://localhost:8080/](http://localhost:8080/).

### Environment Variables

Create `.env` from `sample.env` and fill in the missing values.

### React Context

There is a bit of complexity we are isolating with React's Context API.
There are three contexts and associated providers:
- **AppContext** is responsible for site-wide configuration, user preferences, loading state, and window size
- **DataContext** is responsible for fetching, massaging, assembling, and reconciling data for the map to consume
- **MapContext** is responsible for layer orchestration and associated interactions

## Building for Production

### Manually

Execute `npm ci` to install locked dependencies,
and `npm run build` to build a production bundle.
The bundle will export to the `dist` directory.

### With Docker

There's a Dockerfile for easy deployment.
Commands similar to the following should suffice to build an image
and run an NGINX container that serves only the application bundle on port 80.

```bash
docker build -t nc-enviroscan/ui:0.0.1 . \
docker run --rm -p 80:80 nc-enviroscan/ui:0.0.1
```
