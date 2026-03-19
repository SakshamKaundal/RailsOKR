# Complete Docker Guide for Rails OKR Application

## Table of Contents
1. Docker Basics
2. Understanding Dockerfile
3. Docker Compose for Development
4. Running the OKR App with Docker
5. Common Commands
6. Troubleshooting

---

## 1. Docker Basics

### What is Docker?
Docker is a containerization platform that packages your entire application with all dependencies into a single unit called a **container**.

**Why use Docker?**
- **Consistency**: Works the same on your laptop, team members' machines, and production servers
- **Isolation**: App runs in isolated environment, doesn't affect your system
- **Easy Deployment**: Ship container anywhere without worrying about dependencies
- **Scalability**: Run multiple containers easily

### Key Concepts

**Image**: Blueprint/template for a container (like a class in programming)
**Container**: Running instance of an image (like an object)
**Dockerfile**: Recipe to build an image
**Docker Compose**: Tool to run multiple containers together

### Simple Analogy
```
Dockerfile     → Recipe for a cake
Image          → The baked cake (ready to eat)
Container      → Your plate with the actual slice of cake
Docker Compose → Instructions on how to serve multiple dishes
```

---

## 2. Understanding the Dockerfile

Your OKR app already has a Dockerfile. Let me break it down:

```dockerfile
# syntax=docker/dockerfile:1
FROM docker.io/library/ruby:3.4.8-slim AS base
```
- Starts with official Ruby 3.4.8 image (lightweight version)
- `AS base` = naming this stage, used for multi-stage builds

### Multi-Stage Build Explained

Your Dockerfile has 3 stages:

**Stage 1: base**
```dockerfile
FROM docker.io/library/ruby:3.4.8-slim AS base

WORKDIR /rails
# Install system dependencies
RUN apt-get update && apt-get install -y curl libjemalloc2 libvips sqlite3
```
- Sets up base Ruby environment
- Installs system packages needed by Rails

**Stage 2: build**
```dockerfile
FROM base AS build

# Install build tools
RUN apt-get install -y build-essential git libyaml-dev pkg-config

# Copy Gemfile and install gems
COPY Gemfile Gemfile.lock ./
RUN bundle install

# Copy code and precompile
COPY . .
RUN bundle exec bootsnap precompile -j 1 app/
RUN SECRET_KEY_BASE_DUMMY=1 ./bin/rails assets:precompile
```
- This stage builds everything (heavier)
- Installs gems and precompiles assets
- Gets discarded after building (not in final image)

**Stage 3: Final**
```dockerfile
FROM base

# Create non-root user for security
RUN groupadd --system --gid 1000 rails
RUN useradd rails --uid 1000 --gid 1000

# Copy built artifacts from build stage
COPY --chown=rails:rails --from=build /rails /rails

EXPOSE 80
CMD ["./bin/thrust", "./bin/rails", "server"]
```
- Uses only built artifacts (smaller image)
- Creates non-root user for security
- Exposes port 80
- Starts the app

### Why Multi-Stage?
- **Stage 2** (build) is heavy with build tools (200MB+)
- **Stage 3** (final) is lean, only includes runtime dependencies
- Result: Smaller, faster-to-deploy image

---

## 3. Docker Compose for Development

Docker Compose lets you define and run multiple containers together.

### Why Compose?
Your Rails app needs:
- Rails server
- PostgreSQL/SQLite database
- Maybe Redis for caching
- Maybe Sidekiq for background jobs

Instead of running 3 separate `docker run` commands, one `docker-compose` file handles everything!

### docker-compose.yml Structure

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      RAILS_ENV: development
      DATABASE_URL: sqlite3:./db/development.sqlite3
    volumes:
      - .:/rails
    command: ./bin/rails server -b 0.0.0.0
    
  db:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
      
volumes:
  postgres_data:
```

**Services:**
- `web`: Your Rails app
- `db`: PostgreSQL database

**Key Options:**
- `build: .` = Build from Dockerfile in current directory
- `ports: "3000:3000"` = Map container port 3000 to host port 3000
- `environment:` = Environment variables
- `volumes:` = Mount directories/files
- `command:` = Override default command

---

## 4. Running Your OKR App with Docker

### Step 1: Build the Image
```bash
cd Ruby\ and\ React/Ruby/okr
docker build -t okr-app .
```

**What happens:**
1. Reads Dockerfile
2. Downloads Ruby 3.4.8 image
3. Installs dependencies
4. Installs gems
5. Precompiles assets
6. Creates final image named `okr-app`

**Output should look like:**
```
Step 1/35 : FROM docker.io/library/ruby:3.4.8-slim AS base
 ---> abc123def456
Step 2/35 : WORKDIR /rails
 ---> Running in temp_container
 ---> xyz789uvw012
...
Successfully built abc123xyz789
Successfully tagged okr-app:latest
```

### Step 2: Run Container
```bash
docker run -d \
  -p 3000:3000 \
  -e RAILS_ENV=development \
  -e DATABASE_URL=sqlite3:./db/development.sqlite3 \
  -v $(pwd):/rails \
  --name okr \
  okr-app
```

**Breakdown:**
- `-d` = Detached mode (run in background)
- `-p 3000:3000` = Port mapping (host:container)
- `-e` = Environment variables
- `-v` = Volume mount (your code)
- `--name okr` = Container name

### Step 3: Access the App
```bash
# View logs
docker logs okr

# Access rails console
docker exec -it okr ./bin/rails console

# Run migrations
docker exec okr ./bin/rails db:migrate

# Stop container
docker stop okr

# Start again
docker start okr

# Remove container
docker rm okr
```

### Using Docker Compose (Easier!)
```bash
# Start services
docker-compose up

# Run in background
docker-compose up -d

# View logs
docker-compose logs -f web

# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

---

## 5. Common Docker Commands

### Building
```bash
docker build -t image-name .              # Build image
docker build --no-cache -t image-name .   # Build without cache
docker build -f custom.Dockerfile -t name .  # Use different Dockerfile
```

### Running
```bash
docker run image-name                          # Run container
docker run -it image-name bash                 # Interactive shell
docker run -d image-name                       # Detached (background)
docker run -p 3000:3000 image-name             # Port mapping
docker run -v /local:/container image-name     # Volume mount
docker run -e VAR=value image-name             # Environment variable
```

### Container Management
```bash
docker ps                    # List running containers
docker ps -a                 # List all containers
docker logs container-name   # View logs
docker logs -f container-name # Follow logs (live)
docker exec container-name cmd  # Run command in container
docker exec -it container-name bash  # Get shell in container
docker stop container-name   # Stop container
docker start container-name  # Start stopped container
docker rm container-name     # Delete container
docker rm -f container-name  # Force delete
```

### Images
```bash
docker images                    # List all images
docker rmi image-name            # Delete image
docker tag image-name new-name   # Tag/rename image
docker push image-name           # Push to registry
docker pull image-name           # Pull from registry
```

### Docker Compose
```bash
docker-compose build             # Build services
docker-compose up                # Start services
docker-compose up -d             # Start in background
docker-compose down              # Stop and remove services
docker-compose logs              # View logs
docker-compose logs -f web       # Follow specific service logs
docker-compose exec web bash     # Get shell in service
docker-compose restart web       # Restart service
```

---

## 6. Environment Variables & Secrets

### For Production
Your Dockerfile mentions `RAILS_MASTER_KEY`:

```bash
docker run \
  -e RAILS_MASTER_KEY=$(cat config/master.key) \
  okr-app
```

Or with .env file:
```bash
# Create .env file
cat > .env << EOF
RAILS_ENV=production
RAILS_MASTER_KEY=your-secret-key-here
DATABASE_URL=postgres://user:pass@host/db
EOF

docker run --env-file .env okr-app
```

### For Development (docker-compose)
Create `.env.local`:
```
RAILS_ENV=development
DATABASE_URL=sqlite3:./db/development.sqlite3
REDIS_URL=redis://redis:6379/0
```

### Important: Never commit secrets!
```bash
# Add to .gitignore
.env
.env.local
config/master.key
```

---

## 7. Troubleshooting

### Port Already in Use
```bash
# Kill container using port
docker rm -f $(docker ps -q -f publish=3000)

# Or use different port
docker run -p 3001:3000 okr-app
```

### Out of Disk Space
```bash
# Remove unused images
docker image prune

# Remove unused containers
docker container prune

# Remove everything (careful!)
docker system prune -a
```

### Container Exits Immediately
```bash
# Check logs
docker logs container-name

# Check exit code (0 = clean exit)
docker inspect container-name | grep ExitCode
```

### Permission Denied
```bash
# On Linux/Mac, add user to docker group
sudo usermod -aG docker $USER
newgrp docker

# On Mac with Docker Desktop, already has access
```

### Database Connection Issues
```bash
# Check if database container is running
docker ps

# Check logs
docker logs db-container

# Check network connectivity
docker network ls
docker network inspect bridge
```

---

## 8. Production Deployment

### Building for Production
```bash
docker build -t okr-app:latest .
docker tag okr-app:latest okr-app:v1.0.0

# Push to Docker Hub
docker push username/okr-app:v1.0.0
```

### Running in Production
```bash
docker run -d \
  --name okr-prod \
  --restart always \
  -p 80:80 \
  -e RAILS_ENV=production \
  -e RAILS_MASTER_KEY=$(cat master.key) \
  -e DATABASE_URL=postgres://user:pass@db-host/db \
  username/okr-app:v1.0.0
```

### Using Kamal (Rails Deployment Tool)
Your app has Kamal configured:
```bash
kamal deploy
kamal logs
kamal restart
kamal remove
```

---

## 9. Best Practices

### Dockerfile Best Practices
1. **Use specific versions**: Not `ruby:latest`
2. **Minimize layers**: Combine RUN commands where possible
3. **Use .dockerignore**: Exclude unnecessary files
4. **Non-root user**: Run as non-root for security (your app does this!)
5. **Multi-stage builds**: Reduce final image size (your app does this!)

### Docker Compose Best Practices
1. **Use services**: Don't run everything in one container
2. **Volume mounts**: For development code
3. **Environment files**: Keep secrets separate
4. **Health checks**: Ensure services are healthy
5. **Named volumes**: For persistent data

### Security Best Practices
1. **Never hardcode secrets**: Use environment variables
2. **Use specific image versions**: Avoid latest
3. **Run as non-root**: Default to unprivileged user
4. **Scan images**: Use `docker scan image-name`
5. **Keep base images updated**: Rebuild periodically

---

## 10. Quick Reference

### Local Development
```bash
cd Ruby\ and\ React/Ruby/okr

# First time setup
docker-compose build
docker-compose up
docker-compose exec web ./bin/rails db:create db:migrate

# Subsequent times
docker-compose up

# Stop
docker-compose down
```

### Testing in Container
```bash
docker-compose exec web ./bin/rails test
docker-compose exec web ./bin/rails db:seed
docker-compose exec web ./bin/rails console
```

### View Logs
```bash
docker-compose logs -f web
docker-compose logs -f db
docker-compose logs
```

---

## Resources

- [Docker Documentation](https://docs.docker.com)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Rails with Docker](https://guides.rubyonrails.org/docker.html)
- [Kamal Deployment](https://kamal-deploy.org)

---

Happy Dockerizing! 🐳