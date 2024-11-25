FROM oven/bun:1
WORKDIR /usr/src/app

COPY ./backend/src ./src
COPY ./backend/scripts/ ./scripts
COPY ./backend/package.json ./

RUN bun install
RUN bun dbinit all
RUN chmod 600 database.sqlite

# run the app
USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "run", "src/index.ts" ]