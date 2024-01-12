package template

import (
	"bytes"

	"github.com/yuin/goldmark"
	highlighting "github.com/yuin/goldmark-highlighting/v2"

	"github.com/yuin/goldmark/extension"
	"github.com/yuin/goldmark/parser"
	"github.com/yuin/goldmark/renderer/html"
	"go.abhg.dev/goldmark/frontmatter"
)

type ConvertMarkdownResult struct {
	Frontmatter
	Result string
}

func ConvertMarkdown(post []byte) (Frontmatter, string, error) {
	md := goldmark.New(
		goldmark.WithExtensions(
			extension.GFM,
			&frontmatter.Extender{},
			highlighting.NewHighlighting(highlighting.WithStyle("nord")),
		),
		goldmark.WithParserOptions(
			parser.WithAutoHeadingID(),
		),
		goldmark.WithRendererOptions(
			html.WithHardWraps(),
			html.WithXHTML(),
		),
	)

	ctx := parser.NewContext()
	var result bytes.Buffer
	if err := md.Convert(post, &result, parser.WithContext(ctx)); err != nil {
		return Frontmatter{}, "", err
	}

	d := frontmatter.Get(ctx)
	var meta Frontmatter

	if err := d.Decode(&meta); err != nil {
		return Frontmatter{}, "", err
	}

	return meta, result.String(), nil
}
