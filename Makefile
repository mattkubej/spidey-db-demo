run: start-spidey start-webapp

start-spidey:
	docker-compose up --remove-orphans --build -d

stop-spidey:
	docker-compose down

install:
	cd packages/webapp && npm install

start-webapp:
	cd packages/webapp && npm run dev

.PHONY: run start-spidey stop-spidey install start-webapp
