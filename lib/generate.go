package lib

import (
	"io"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
)

type Route struct {
	Name string
	Path string
}

func Generate() {
	routes := []Route{
		{Name: "home", Path: "/"},
		{Name: "blog", Path: "/blog"},
	}

	posts, err := os.ReadDir("./content")

	if err != nil {
		panic(err)
	}

	for _, post := range posts {
		name := strings.Split(post.Name(), ".")[0]
		routes = append(routes, Route{
			Name: name,
			Path: "/blog/" + name,
		})
	}

	for _, route := range routes {
		response, err := http.Get("http://localhost:8080" + route.Path)

		if err != nil {
			panic(err)
		}

		body, err := io.ReadAll(response.Body)

		if err != nil {
			panic(err)
		}

		if err := os.MkdirAll(filepath.Join("dist", route.Path), os.ModePerm); err != nil {
			panic(err)
		}

		if err := os.WriteFile(filepath.Join("dist", route.Path, "index.html"), body, 0666); err != nil {
			panic(err)
		}
	}

	cmd := exec.Command("cp", "-rf", "./static/*", "./dist")
	cmd.Run()
}
