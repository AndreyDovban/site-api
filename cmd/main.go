package main

import (
	"fmt"
	"net/http"
	"site-api/configs"
	"site-api/internal/product"
	"site-api/pkg/db"
	"site-api/pkg/middleware"
)

func App() http.Handler {

	config := configs.LoadConfig()
	db := db.NewDb(config)
	router := http.NewServeMux()

	// Repositories
	prodRepository := product.NewProductRepository(db)

	// Handlers
	product.NewProductHandler(router, &product.ProductHandlerDeps{
		ProductRepository: prodRepository,
	})

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
