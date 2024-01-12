package lib

import (
	"main/components"
	"main/pages"
	"main/template"
	"net/http"
	"os"
	"path/filepath"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func StartServer() {
	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	e.Static("/static", "static")

	e.Renderer = &template.Template{}

	e.GET("/", func(c echo.Context) error {
		content := components.Html("es", "Fernando Berti", "Comparto mis ideas sobre programación y tecnología", "https://berti.sh", pages.IndexPage())
		return c.Render(http.StatusOK, "", content)
	})

	e.GET("/blog", func(c echo.Context) error {
		posts := template.GetPosts(c.Path())
		content := components.Html("es", "Fernando Berti", "Comparto mis ideas sobre programación y tecnología", "https://berti.sh", pages.BlogPage(posts))
		return c.Render(http.StatusOK, "", content)
	})

	e.GET("/blog/:slug", func(c echo.Context) error {
		slug := c.Param("slug")

		posts := template.GetPosts(c.Path())
		post, err := os.ReadFile(filepath.Join("content", slug+".md"))

		if err != nil {
			panic(err)
		}

		meta, result, err := template.ConvertMarkdown(post)

		if err != nil {
			panic(err)
		}

		var fullPost template.FullPost
		for _, value := range posts {
			if value.Title == meta.Title {
				fullPost = value
			}
		}

		content := components.Html(
			"es",
			meta.Title+" | Fernando Berti",
			meta.Description+" | Mis ideas sobre programación y tecnología",
			"https://berti.sh",
			components.Post(result, fullPost.Prev, fullPost.Next),
		)

		return c.Render(http.StatusOK, "", content)
	})

	e.Logger.Fatal(e.Start("0.0.0.0:8080"))

}
