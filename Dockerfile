# STAGE: deps
# Install Dependencies only when needes (stage: deps)
# Node: we could think of using FROM node:lts-alpine instead
FROM node:14 AS deps

WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn

# STAGE: builder
# Rebuild the source code only when needed (stage: builder)
# This is where because may be the case that you would try
# to build the app based on some `X_TAG` in my case (Git commit hash)
# but the code hasn't changed.
FROM node:14 AS builder

ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY . .
COPY --from=deps /usr/src/app/node_modules ./node_modules
RUN yarn build

# STAGE: runner
# Production image, copy all the files and run next
FROM node:14 AS runner

ARG X_TAG
WORKDIR /usr/src/app
ENV NODE_ENV=production
COPY --from=builder /usr/src/app/next.config.js ./
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/node_modules ./node_modules
EXPOSE 3000
CMD ["node_modules/.bin/next", "start"]
