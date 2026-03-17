.PHONY: build start docker-build docker-run help

## build: Create production build (npm run build)
build:
	npm run build

## start: Start production server — requires build first
start:
	npm run start

## docker-build: Build Docker image
docker-build:
	docker build -t adamenko-landing-page:latest .

## docker-run: Run Docker container on port 3000 (requires docker-build)
docker-run:
	docker run -p 3000:3000 adamenko-landing-page:latest

## help: Show this help message
help:
	@echo "Build targets (Makefile):"
	@grep -E '^## ' $(MAKEFILE_LIST) | sed 's/## /  /'
	@echo ""
	@echo "Dev/tooling tasks → use: task <name>"
	@echo "  install   lint   dev   test   clean"
