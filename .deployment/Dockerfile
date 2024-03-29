FROM node:18-alpine AS base-node

# Install dependencies only when needed
FROM base-node AS deps-node
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY frontend/package.json frontend/yarn.lock* frontend/package-lock.json* frontend/pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi


# Rebuild the source code only when needed
FROM base-node AS builder-node
WORKDIR /app
COPY --from=deps-node /app/node_modules ./node_modules
COPY frontend .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn build

# If using npm comment out above and use below instead
# RUN npm run build

# Obsolete with Spring Static
# Production image, copy all the files and run next
# FROM base-node AS runner-node
# WORKDIR /app

ARG TARGET_ENV_ARG=production
# ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1
ENV TARGET_ENV $TARGET_ENV_ARG

# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs

# COPY --from=builder-node /app/public ./public

# Set the correct permission for prerender cache
# RUN mkdir .next
# RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
# COPY --from=builder-node --chown=nextjs:nodejs /app/.next/standalone ./
# COPY --from=builder-node --chown=nextjs:nodejs /app/.next/static ./.next/static

# USER nextjs

# EXPOSE 3000

# ENV PORT 3000
# set hostname to localhost
# ENV HOSTNAME "0.0.0.0"

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
# CMD ["node", "server.js"]

# Spring
FROM gradle:8.5.0-jdk17-alpine AS build
COPY --chown=gradle:gradle backend /home/gradle/src
COPY --from=builder-node --chown=gradle:gradle /app/out /home/gradle/src/src/main/resources/static
WORKDIR /home/gradle/src
RUN gradle bootJar --no-daemon

# Runner
FROM amazoncorretto:20-alpine
VOLUME /tmp
COPY --from=build /home/gradle/src/build/libs/*.jar app.jar
RUN addgroup --system --gid 1001 spring
RUN adduser --system --uid 1001 votes
RUN chown votes:spring /app.jar
USER votes
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]