# Docker Learning Flow: Complete Understanding

## What is Docker? (Start Here)

### The Problem Docker Solves
```
WITHOUT Docker:
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Developer A    │     │  Developer B    │     │  Production     │
│  Mac M1         │     │  Windows 11     │     │  Linux Server   │
├─────────────────┤     ├─────────────────┤     ├─────────────────┤
│ Ruby 3.4.8      │     │ Ruby 3.2.0      │     │ Ruby 3.4.1      │
│ PostgreSQL 14   │     │ PostgreSQL 15   │     │ PostgreSQL 16   │
│ Node 18         │     │ Node 20         │     │ Node 18         │
│ Redis 6         │     │ Redis 7         │     │ Redis 6         │
│ Works on mine!  │     │ Doesn't work ❌ │     │ Works, sort of  │
└─────────────────┘     └─────────────────┘     └─────────────────┘

Result: "It works on my machine" - everyone's nightmare!

WITH Docker:
┌──────────────────────────────────────────────────┐
│  SAME CONTAINER EVERYWHERE                       │
│  ├── Ruby 3.4.8                                  │
│  ├── PostgreSQL 14                               │
│  ├── Node 18                                     │
│  ├── Redis 6                                     │
│  └── Your Code                                   │
└──────────────────────────────────────────────────┘
        ↓                    ↓                    ↓
    Developer A         Developer B          Production
     Mac M1             Windows 11           Linux Server
    Works ✅            Works ✅              Works ✅
```

---

## Core Docker Concepts

### 1. Image vs Container

Think of it like a recipe:

```
Dockerfile (Recipe):
┌──────────────────────────────┐
│ FROM ruby:3.4.8              │
│ RUN apt-get install ...      │
│ COPY Gemfile* ./             │
│ RUN bundle install           │
│ CMD ["rails", "server"]      │
└──────────────────────────────┘
            ↓
        docker build
            ↓
   Image (Baked Cake):
┌──────────────────────────────┐
│ Ruby 3.4.8 with all deps     │
│ All gems installed           │
│ Code copied in               │
│ Ready to run                 │
└──────────────────────────────┘
            ↓
     docker run (eat cake)
            ↓
   Container (Running Instance):
┌──────────────────────────────┐
│ Rails server running on :3000│
│ Database connected           │
│ Accepting requests           │
│ Memory/CPU allocated         │
└──────────────────────────────┘
```

**KEY POINT**: Image = Static (like a photo). Container = Running (like a person living).

### 2. Layers in Docker

```
Dockerfile:
┌─────────────────────────────────┐
│ FROM ruby:3.4.8                 │  Layer 1: Base OS + Ruby
└─────────────────────────────────┘
             ↓
┌─────────────────────────────────┐
│ RUN apt-get install postgresql  │  Layer 2: System deps
└─────────────────────────────────┘
             ↓
┌─────────────────────────────────┐
│ COPY Gemfile Gemfile.lock ./    │  Layer 3: Your Gemfile
└─────────────────────────────────┘
             ↓
┌─────────────────────────────────┐
│ RUN bundle install              │  Layer 4: Gems installed
└─────────────────────────────────┘
             ↓
┌─────────────────────────────────┐
│ COPY . .                        │  Layer 5: Your code
└─────────────────────────────────┘
             ↓
        Final Image
      (All layers stacked)
```

**Smart Caching**: If you change only layer 5 (code), Docker rebuilds only from that layer, not from the beginning!

### 3. Multi-Stage Builds (Your OKR App Uses This!)

```
Stage 1: Builder (Heavy - 500MB)
┌─────────────────────────────────┐
│ FROM ruby:3.4.8                 │
│ RUN apt-get install build-tools │
│ RUN bundle install              │
│ RUN rails assets:precompile     │
│ (All compilation happens here)  │
└─────────────────────────────────┘
            ↓
   Copy only ARTIFACTS
            ↓
Stage 2: Runtime (Lean - 150MB)
┌─────────────────────────────────┐
│ FROM ruby:3.4.8-slim            │
│ COPY --from=builder /artifacts  │
│ (No build tools, only output)   │
└─────────────────────────────────┘
            ↓
        Final Image (150MB)
      Instead of (500MB) ✅
```

---

## Your OKR Dockerfile Explained Line by Line

```dockerfile
# syntax=docker/dockerfile:1
→ Use Docker BuildKit (faster, better error messages)

FROM docker.io/library/ruby:3.4.8-slim AS base
→ Start with official Ruby 3.4.8 lightweight image
→ AS base = naming this stage (used later)

WORKDIR /rails
→ Set working directory inside container
→ All future commands run from /rails

RUN apt-get update -qq && \
    apt-get install -y curl libjemalloc2 libvips sqlite3
→ Install system packages (C libraries needed by Ruby)
→ curl: download things
→ libjemalloc2: memory optimizer
→ libvips: image processing
→ sqlite3: database library

ENV RAILS_ENV="production" \
    BUNDLE_DEPLOYMENT="1" \
    BUNDLE_PATH="/usr/local/bundle" \
    BUNDLE_WITHOUT="development" \
    LD_PRELOAD="/usr/local/lib/libjemalloc.so"
→ Environment variables for production optimizations

# Stage 2: Builder
FROM base AS build
→ Start new stage based on 'base'
→ Inherits everything from base

RUN apt-get install build-essential git libyaml-dev pkg-config
→ Install compilation tools needed for gems
→ Only in builder stage (not in final image)

COPY Gemfile Gemfile.lock ./
→ Copy your gem list into container

RUN bundle install
→ Install all gems

RUN bundle exec bootsnap precompile -j 1 app/
→ Pre-warm Ruby cache for faster startup

# Stage 3: Final
FROM base
→ Start fresh from base (drops the builder stage!)

RUN groupadd --system --gid 1000 rails && \
    useradd rails --uid 1000 --gid 1000 --shell /bin/bash
→ Create non-root user for security
→ Never run apps as root!

USER 1000:1000
→ Switch to rails user

COPY --chown=rails:rails --from=build /rails /rails
→ Copy everything from builder stage
→ Set ownership to rails user

EXPOSE 80
→ Document that app listens on port 80
→ (Note: Dockerfile doesn't actually expose - just documentation)

CMD ["./bin/thrust", "./bin/rails", "server"]
→ Default command when container starts
```

---

## Understanding docker-compose.yml

```yaml
version: '3.8'
→ Docker Compose file format version

services:
→ Define multiple services (containers)

  web:
  → Service name: "web" (you use this to reference)
  
    build:
      context: .
      dockerfile: Dockerfile
    → Build image from Dockerfile in current directory
    
    container_name: okr-web
    → Friendly name for the container
    
    command: ./bin/rails server -b 0.0.0.0
    → Override default CMD from Dockerfile
    → -b 0.0.0.0 = bind to all interfaces (so host can access)
    
    ports:
      - "3000:3000"
    → Map host port 3000 → container port 3000
    → Format: host_port:container_port
    
    environment:
      RAILS_ENV: development
      DATABASE_URL: postgresql://okr_user:okr_password@db:5432/okr_development
    → Environment variables inside container
    → Note: "db" = other service name (Docker resolves DNS)
    
    volumes:
      - .:/rails
      - /rails/node_modules
      - /rails/tmp
    → Mount directories
    → .:/rails = sync your code live into /rails
    → /rails/node_modules = use container's node_modules (don't sync)
    
    depends_on:
      db:
        condition: service_healthy
    → Don't start web until db is healthy
    
    stdin_open: true
    tty: true
    → Keep container running even if no input

  db:
    image: postgres:15-alpine
    → Use pre-built image (don't build, just download)
    
    environment:
      POSTGRES_USER: okr_user
      POSTGRES_PASSWORD: okr_password
      POSTGRES_DB: okr_development
    → PostgreSQL configuration
    
    volumes:
      - postgres_data:/var/lib/postgresql/data
    → Persist database between restarts
    
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U okr_user"]
      interval: 10s
      timeout: 5s
      retries: 5
    → Check if database is ready
    → Run "pg_isready" every 10 seconds
    → If fails 5 times, mark unhealthy

  redis:
    image: redis:7-alpine
    → Redis for caching/background jobs

volumes:
  postgres_data:
  redis_data:
→ Define named volumes (persistent storage)
```

---

## Step-by-Step Flow: What Happens When You Run `docker-compose up`

```
1. You type: docker-compose up
                    ↓
2. Docker Compose reads docker-compose.yml
                    ↓
3. Creates network called "okr_default"
   (so services can talk to each other)
                    ↓
4. Starts db service:
   ├─ Checks for postgres:15-alpine image
   ├─ If not exists, pulls from registry
   ├─ Creates container: okr-db
   ├─ Sets environment variables
   ├─ Mounts postgres_data volume
   ├─ Waits for healthcheck to pass
   └─ Database ready ✅
                    ↓
5. Starts redis service:
   ├─ Pulls redis:7-alpine
   ├─ Creates container: okr-redis
   ├─ Mounts redis_data volume
   └─ Redis ready ✅
                    ↓
6. Starts web service:
   ├─ Builds image from Dockerfile (first time)
   ├─ Creates container: okr-web
   ├─ Sets environment variables
   ├─ Mounts volumes (your code syncs live!)
   ├─ Waits for db healthcheck
   ├─ Runs command: ./bin/rails server -b 0.0.0.0
   └─ Rails server starts
                    ↓
7. You see logs from all 3 services:
   okr-db    | LOG: database system is ready
   okr-redis | * Ready to accept connections
   okr-web   | * Listening on http://0.0.0.0:3000
                    ↓
8. You open browser → http://localhost:3000
   Your app appears! 🎉
```

---

## Network Communication Inside Docker

```
Inside Docker Network: okr_default

┌─────────────────────────────────────────────────┐
│  Docker Network "okr_default"                   │
│                                                 │
│  ┌────────────┐   ┌────────────┐   ┌─────────┐ │
│  │  okr-web   │   │  okr-db    │   │ okr-redis
│  │ :3000      │   │  :5432     │   │ :6379   │ │
│  └────────────┘   └────────────┘   └─────────┘ │
│        │                │               │       │
│        └────────────────┼───────────────┘       │
│         (All connected  │ via hostname)         │
└─────────────────────────────────────────────────┘
           ↓
        DNS Resolution:
        "db" → 172.20.0.2
        "redis" → 172.20.0.3
        "web" → 172.20.0.4

Inside container, you can:
- Connect to "db:5432" (not localhost:5432!)
- Connect to "redis:6379"
- Rails finds database via DATABASE_URL=postgresql://okr_user:...@db:5432/...
```

---

## Volume Mounts Explained

```
Your Laptop                    Container
────────────────────────────────────────

src/                    ──────→  /rails/src/
  models/                        models/
  controllers/                   controllers/

Gemfile             ──────→  /rails/Gemfile
Gemfile.lock        ──────→  /rails/Gemfile.lock

Changes on BOTH sides sync immediately! ↔️

BUT: node_modules and tmp are NOT synced:

/rails/node_modules (excluded)
  ↓
  Stays in container only (independent)
  Prevents Mac/Linux incompatibilities

Why?
- You run node on Mac
- Container runs on Linux
- Binary npm packages are different!
- So we keep container's node_modules isolated
```

---

## Common Workflows

### Workflow 1: Development

```
1. docker-compose up
   (start all services)

2. Edit code in your IDE
   (changes sync live to container)

3. Refresh browser
   (Rails detects changes, reloads)

4. View logs:
   docker-compose logs -f web

5. Debug:
   docker-compose exec web ./bin/rails console

6. Stop:
   docker-compose down
```

### Workflow 2: Add a New Gem

```
1. Edit Gemfile
   add gem 'devise'

2. Rebuild container:
   docker-compose build

3. Restart:
   docker-compose up

4. That's it! New gem is installed
```

### Workflow 3: Reset Database

```
1. docker-compose exec web ./bin/rails db:drop
2. docker-compose exec web ./bin/rails db:create
3. docker-compose exec web ./bin/rails db:migrate
4. docker-compose exec web ./bin/rails db:seed

Or one-liner:
   docker-compose exec web ./bin/rails db:reset db:seed
```

### Workflow 4: Deploy to Production

```
1. Build image:
   docker build -t okr-app:v1.0.0 .

2. Push to registry:
   docker push myregistry/okr-app:v1.0.0

3. Run on server:
   docker run -d \
     -p 80:80 \
     -e RAILS_MASTER_KEY=xxx \
     -e DATABASE_URL=postgresql://prod-db \
     myregistry/okr-app:v1.0.0
```

---

## Why Each Part Exists

```
Dockerfile                           Why?
─────────────────────────────────────────────────
FROM ruby:3.4.8                      Don't reinvent OS
RUN apt-get install ...              Get system libraries
COPY Gemfile* ./                     Tell which gems needed
RUN bundle install                   Install gems once (cached)
COPY . .                             Copy code
CMD ["rails", "server"]              Default startup

docker-compose.yml                   Why?
─────────────────────────────────────────────────
version: '3.8'                       Define format
services:                            Multiple containers
  web:                               Your app
  db:                                Database
  redis:                             Cache
ports:                               Access from laptop
volumes:                             Live code reload
environment:                         Configuration
depends_on:                          Start order
healthcheck:                         Wait for readiness
```

---

## Docker vs Traditional Setup

```
Traditional Setup:
1. Install Ruby 3.4.8 → Oops, need 3.2.0 for another project
2. Install PostgreSQL → Global, affects everything
3. Install Node.js → Version conflicts everywhere
4. Start/stop services manually
5. Team members struggle with setup
6. Production is different environment ❌

Docker Setup:
1. One laptop, multiple Ruby versions (in different containers)
2. PostgreSQL isolated in container
3. Node.js isolated in container
4. docker-compose up (everything starts)
5. New team member: just run docker-compose up 🎉
6. Exact same on laptop and production ✅
```

---

## Quick Reference

```
Building:
docker build -t okr-app .           Build image
docker-compose build                Build with Compose

Running:
docker run okr-app                  Run container
docker-compose up                   Run all services
docker-compose up -d                Background mode

Accessing:
docker exec -it container bash      Shell in container
docker-compose exec web bash        Shell via Compose
docker logs container               View output

Managing:
docker ps                           List containers
docker images                       List images
docker rm container                 Delete container
docker rmi image                    Delete image
docker-compose down                 Stop everything

Debugging:
docker logs -f container            Follow logs
docker stats                        Resource usage
docker inspect container            Details about container
```

---

## Key Takeaways

1. **Dockerfile** = Recipe for building an image
2. **Image** = Static snapshot with all dependencies
3. **Container** = Running instance of an image
4. **Compose** = Orchestrate multiple containers
5. **Volumes** = Persistent data and live code sync
6. **Networks** = Containers talk to each other
7. **Multi-stage builds** = Smaller final images
8. **Non-root user** = Security best practice

---

## Next Steps

1. Run: `docker-compose up`
2. Open: http://localhost:3000
3. Edit code in your editor
4. Watch changes reload in browser
5. Run: `docker-compose exec web bash`
6. Explore inside container!

Happy Dockerizing! 🐳