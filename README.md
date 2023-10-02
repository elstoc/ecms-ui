# ecms (ui)

## Configuration

Create configuration by copying the `.env-template` file to `.env` and amending the variables.

- `API_URL`: The URL that can be used from within the a browser to access the API. If you are running with docker this will probably be something like `http://ui-url/api` (since the docker image will automatically redirect api requests). If you are running the api and ui independently in a local environment it will be more like `http://localhost:3101`
- `QUERY_REFETCH_INTERVAL`: The interval between api query refetches. Defaults to 10s if not defined.
- `DOCKER_NGINX_PORT`: The port that the nginx listens on when run via a docker container
- `DOCKER_NGINX_API_URL`: The URL that the docker container will redirect api requests to. This might be a port on localhost or on an internal docker network.

## Building the docker image

To build the docker image run

```
docker build -t <image-name> .
```

or

```
npm run docker-build
```

## Running In Docker

It is recommended that you execute this using a docker compose file that combines the ui and api together (see https://github.com/elstoc/ecms). However, if you choose run the ui and api separately you can use this command to spin up the ui only. Please note that in this case you will need to use `--net=host` in order to allow the container to see the localhost port on which the api is exposed:

```
docker run --net=host --env-file=.env <image-name>
```

or

```
npm run docker-run
```

**Note: ** You must have created a file named `.env` in the root directory, with variables populated as above. Without them, the docker container will fail to start because the default `.env` file contains only keys, without values.

## Running without docker

To run locally without docker, you can just run

```
npm run dev
```

## Building dist files

To build dist files without using docker just run

```
npm run build
```

Note that this will use whatever is in your `.env` file at the point of building the app and does not allow run-time overriding.
