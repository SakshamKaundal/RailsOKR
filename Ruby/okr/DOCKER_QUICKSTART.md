# Docker Quick Start Guide for OKR Rails App

## Prerequisites
- Docker installed ([Download here](https://www.docker.com/products/docker-desktop))
- Docker Compose installed (comes with Docker Desktop)
- Git

## Quick Setup (5 minutes)

### 1. Clone/Navigate to Project
```bash
cd "Ruby and React/Ruby/okr"
```

### 2. Build Docker Image
```bash
docker-compose build
```
This creates a Docker image with all dependencies. First time takes 2-5 minutes.

### 3. Start Services
```bash
docker-compose up
```

You should see:
```
okr-web    | => Booting Puma
okr-web    | => Rails 8.0.0 application starting in development
okr-web    | => Run `./bin/rails server -h` for startup options
okr-web    | * Listening on http://0.0.0.0:3000
```

### 4. Create & Migrate Database
Open a NEW terminal:
```bash
docker-compose exec web ./bin/rails db:create db:migrate
```

### 5. Visit Your App
Open browser: http://localhost:3000

Done! Your app is running! 🎉

---

## Common Tasks

### View Logs
```bash
# All services
docker-compose logs

# Only web service
docker-compose logs -f web

# Only database
docker-compose logs -f db
```

### Stop Services
```bash
docker-compose down
```

### Restart Services
```bash
docker-compose restart
```

### Access Rails Console
```bash
docker-compose exec web ./bin/rails console
```

### Run Migrations
```bash
docker-compose exec web ./bin/rails db:migrate
```

### Run Tests
```bash
docker-compose exec web ./bin/rails test
```

### Seed Database
```bash
docker-compose exec web ./bin/rails db:seed
```

### View Running Containers
```bash
docker ps
```

### Get Shell Access
```bash
docker-compose exec web bash
```

### Clean Everything (Start Fresh)
```bash
docker-compose down -v
docker-compose build --no-cache
docker-compose up
docker-compose exec web ./bin/rails db:create db:migrate
```

---

## What's Running?

### Web Service
- Rails app on http://localhost:3000
- Container name: okr-web
- Mounted volume: your code syncs live

### Database Service (PostgreSQL)
- Container name: okr-db
- Port: 5432 (accessible on localhost:5432)
- Username: okr_user
- Password: okr_password
- Database: okr_development

### Redis Service
- Container name: okr-redis
- Port: 6379
- For caching and background jobs

---

## Troubleshooting

### Port 3000 Already in Use
```bash
# Kill existing container
docker rm -f okr-web

# Or use different port in docker-compose.yml
# Change "3000:3000" to "3001:3000"
```

### Database Connection Error
```bash
# Check if DB is healthy
docker-compose logs db

# Recreate database
docker-compose exec web ./bin/rails db:drop db:create db:migrate
```

### Container Won't Start
```bash
# Check logs
docker-compose logs web

# Rebuild
docker-compose build --no-cache
```

### Out of Disk Space
```bash
docker system prune -a
docker volume prune
```

### Volume Mount Issues (on Mac/Windows)
```bash
# Rebuild
docker-compose down
docker-compose build --no-cache
docker-compose up
```

---

## Next Steps

- Check DOCKER_GUIDE.md for detailed explanations
- Modify code - changes sync live in container
- Add new gems - update Gemfile, run `docker-compose build`
- Deploy - see DOCKER_GUIDE.md Production section

---

## Useful Links

- [View Rails App](http://localhost:3000)
- [Postgres Connection](localhost:5432)
- [Redis Connection](localhost:6379)
- [Docker Documentation](https://docs.docker.com)

Happy coding! 🐳