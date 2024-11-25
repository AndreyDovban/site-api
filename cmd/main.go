package main

import (
	"fmt"
	"net/http"
	"site-api/internal/product"
)

func App() http.Handler {

	router := http.NewServeMux()

	// Handlers
	product.NewProductHandler(router, &product.ProductHandlerDeps{})

	return router
}

func main() {

	app := App()

	server := &http.Server{
		Addr:    ":5000",
		Handler: app,
	}
	fmt.Println("http://localhost:5000")
	server.ListenAndServe()
}
