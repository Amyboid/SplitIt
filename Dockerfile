FROM oven/bun:1
WORKDIR /usr/src/app

COPY ./backend/src ./src
COPY ./backend/database.sqlite ./
COPY ./backend/package.json ./

RUN bun install

# run the app
USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "run", "src/index.ts" ]