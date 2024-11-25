package main

import (
	"fmt"
	"net/http"
	"site-api/internal/product"
	"site-api/pkg/middleware"
)

func App() http.Handler {

	// config := configs.LoadConfig()
	router := http.NewServeMux()

	// Handlers
	product.NewProductHandler(router, &product.ProductHandlerDeps{})

	// Middlewars
	stack := middleware.Chain(
		middleware.CORS,
		middleware.Logging,
	)

	return stack(router)
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
