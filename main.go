package main

import (
	"main/view"

	"github.com/carbonyde/tungsten"
)

func main() {
	tungsten.StartServer(view.App)
}
