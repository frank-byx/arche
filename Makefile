# Thanks to https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
.PHONY: help

help: ## This help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

demo: clean build up ## Build and run project with example dataset (NOTE: This deletes currently stored data)

build: ## Build or rebuild services
	docker-compose build

up: ## Create and start containers
	docker-compose up

down: ## Stop and remove containers
	docker-compose down

clean: ## Delete stored data
	-docker volume rm arche_pg_data



