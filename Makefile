
install:
	npm install
	go install github.com/a-h/templ/cmd/templ@latest
	go install github.com/cosmtrek/air@latest

run:
	go run main.go

serve:
	go run serve.go

deploy:
	make clean
	make generate
	fly deploy

air:
	make templ
	make css_dev
	go build -o ./tmp/main main.go
	clear

dev:
	WATCH=true air

generate:
	make prepare
	make css
	make templ
	go run generate.go

prepare:
	mkdir -p ./dist/static
	cp -rf ./static/* ./dist/static

css:
	npx tailwindcss -i styles.css -o ./static/styles.css -m

css_dev:
	npx tailwindcss -i styles.css -o ./static/styles.css

templ:
	templ generate

clean:
	rm -rf **/*_templ.go dist/

fmt:
	templ fmt .
	go fmt .