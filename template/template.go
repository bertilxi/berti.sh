package template

import (
	"errors"
	"io"

	"github.com/a-h/templ"
	"github.com/labstack/echo/v4"
)

type Template struct{}

func (t *Template) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	component, valid := data.(templ.Component)

	if !valid {
		return errors.New("data value is not valid templ component")
	}

	return component.Render(c.Request().Context(), w)
}