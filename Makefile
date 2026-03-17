.PHONY: install dev build lint clean

## install: Install project dependencies
install:
	npm ci

## dev: Start development server
dev:
	npm run dev

## build: Create production build
build:
	npm run build

## lint: Run ESLint
lint:
	npm run lint

## start: Start production server (requires build first)
start:
	npm run start

## clean: Remove build artifacts and node_modules
clean:
	rm -rf .next node_modules

## help: Show this help message
help:
	@echo "Available commands:"
	@grep -E '^## ' $(MAKEFILE_LIST) | sed 's/## /  /'
