package main

import (
	"fmt"
	"net/http"
	"site-api/configs"
	"site-api/internal/client"
	"site-api/internal/file"
	"site-api/internal/link"
	"site-api/internal/mail"
	"site-api/internal/product"
	"site-api/pkg/db"
	"site-api/pkg/middleware"
)

/**
TODO
[x] Прописать нужные поля таблицам
[] Реализовать динамическое создание структур ответа
[] Добавить связность
[] Добавить сортировку по колонкам
[] Добавить фильтрацию по значению полей
[] Добавить выбор колонок
[x] Изменить формат передачи параметров талицы на JSON
[x] Добавить таблицу ссылок
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

	// Services
	mailService := mail.NewMailService(clientRepository, linkRepository, prodRepository, fileRepository, config)
	linkService := link.NewLinkService(linkRepository)

	// Handlers
	product.NewProductHandler(router, &product.ProductHandlerDeps{
		ProductRepository: prodRepository,
	})
	file.NewFileHandler(router, &file.FileHandlerDeps{
		FileRepository: fileRepository,
		Config:         config,
	})
	link.NewLinkHandler(router, &link.LinkHandlerDeps{
		LinkRepository: linkRepository,
		LinkService:    linkService,
	})
	client.NewClientHandler(router, &client.ClientHandlerDeps{
		ClientRepository: clientRepository,
	})
	mail.NewMailHandler(router, &mail.MailHandlerDeps{
		MailService: mailService,
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
	fmt.Print("\033[H\033[2J")
	fmt.Println("http://localhost:5000")
	server.ListenAndServe()
}
