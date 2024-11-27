package main

import (
	"fmt"
	"net/http"
	"site-api/configs"
	"site-api/internal/client"
	"site-api/internal/file"
	"site-api/internal/link"
	"site-api/internal/product"
	"site-api/pkg/db"
	"site-api/pkg/middleware"
)

/**
TODO
[] Прописать нужные поля таблицам
[] Добавить связность
[] Добавить сортировку по колонкам
[] Добавить фильтрацию по значению полей
[] Добавить выбор колонок
[] Изменить формат передачи параметров талицы на JSON
[] Добавить таблицу ссылок
[] Добавить горутину слушатель события перехода по ссылке
[] Добавить почтовый сервис
*/

func App() http.Handler {

	config := configs.LoadConfig()
	db := db.NewDb(config)
	router := http.NewServeMux()

	// Repositories
	prodRepository := product.NewProductRepository(db)
	fileRepository := file.NewFileRepository(db)
	linkRepository := link.NewLinkRepository(db)
	clientRepository := client.NewClientRepository(db)

	// Handlers
	product.NewProductHandler(router, &product.ProductHandlerDeps{
		ProductRepository: prodRepository,
	})
	file.NewFileHandler(router, &file.FileHandlerDeps{
		FileRepository: fileRepository,
	})
	link.NewLinkHandler(router, &link.LinkHandlerDeps{
		LinkRepository: linkRepository,
	})
	client.NewClientHandler(router, &client.ClientHandlerDeps{
		ClientRepository: clientRepository,
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
