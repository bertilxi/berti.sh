package main

import (
	"main/lib"
)

func main() {
	go lib.StartServer()

	lib.Generate()
}
