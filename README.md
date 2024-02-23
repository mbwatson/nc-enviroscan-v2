# PFAS Dashboard

## Development

This application is developed with Node 18.18.2.
Install dependencies with `npm i`, and spin up the development server with `npm start`.
The app should be running at [http://localhost:8080/](http://localhost:8080/).

### Environment Variables

Create `.env` from `sample.env` and fill in the missing values.

## Building for Production

### Manually

Execute `npm ci` to install locked dependencies, and `npm run build` to build a production bundle. The bundle will export to the `dist` directory.

### With Docker

There's a Dockerfile for easy deployment.
Commands similar to the following should suffice to build an image
and run an NGINX container that serves only the application bundle on port 80.

```bash
docker build -t pfas-dashboard/client:1.0.4 . \
docker run --rm -p 80:80 pfas-dashboard/client:1.0.4
```
