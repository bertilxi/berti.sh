package main

import (
	"main/lib"

	"github.com/carbonyde/tungsten"
)

func main() {
	go tungsten.Start(tungsten.Config{})

	lib.Generate()
}
