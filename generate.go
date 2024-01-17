package main

import (
	"main/lib"
	"main/view"

	"github.com/carbonyde/tungsten"
)

func main() {
	go tungsten.StartServer(view.App)

	lib.Generate()
}
