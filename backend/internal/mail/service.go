package mail

import (
	"fmt"
	"os"
	"site-api/internal/client"
	"site-api/internal/link"
	"site-api/internal/product"
	"site-api/pkg/di"
	"site-api/pkg/mailer"

	"github.com/joho/godotenv"
)

type MailService struct {
	ClientRepository  di.IClientRepository
	LinkRepository    di.ILinkRepository
	ProductRepository di.IProductRepository
	FileRepository    di.IFileRepository
}

type MailResponse struct {
	Name     string
	Protocol string
	Domain   string
	Links    []*link.LinkMailResponse
	Products []*product.Product
}

func NewMailService(
	clientRepository di.IClientRepository,
	linkRepository di.ILinkRepository,
	productRepository di.IProductRepository,
	fileRepository di.IFileRepository,
) *MailService {
	return &MailService{
		ClientRepository:  clientRepository,
		LinkRepository:    linkRepository,
		ProductRepository: productRepository,
		FileRepository:    fileRepository,
	}
}

func (service *MailService) CreateLink(name, telephone, mail, company string, productUids []string) (string, error) {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error loading .env file? using default config")
	}

	var config = &mailer.Config{
		Sender:   os.Getenv("LOGIN"),
		Password: os.Getenv("PASSWORD"),
		Host:     os.Getenv("HOST"),
		Port:     os.Getenv("PORT"),
	}

	client := client.NewClient(name, telephone, mail, company)
	existedClient, _ := service.ClientRepository.FindByData(name, telephone, mail, company)
	if existedClient == nil {
		_, err := service.ClientRepository.Create(client)
		if err != nil {
			return "", err
		}
	} else {
		client.Uid = existedClient.Uid
	}

	var data MailResponse

	data.Name = name
	data.Protocol = os.Getenv("PROTOCOL")
	data.Domain = os.Getenv("DOMAIN")

	fmt.Println(data.Domain, data.Protocol)

	files, err := service.FileRepository.GetFilesByProdUid(productUids)
	if err != nil {
		return "", err
	}

	for _, file := range files {
		l := link.NewLink(1, 0)
		l.ClientUid = client.Uid
		l.FileUid = file.Uid
		l.ProductUid = file.ProductUid

		_, err := service.LinkRepository.Create(l)
		if err != nil {
			return "", err
		}

		data.Links = append(data.Links, &link.LinkMailResponse{
			Hash:            l.Hash,
			FileName:        file.Name,
			FileDescription: file.Description,
			ProductUid:      file.ProductUid,
		})

	}

	products, err := service.ProductRepository.CetProdsByUids(productUids)
	if err != nil {
		return "", err
	}

	data.Products = products

	mailer.Mailer(mail, *config, data)

	return mail, nil
}

// func (service *MailService) SendMail(mail string) error {
// 	fmt.Println("send mail")
// 	links, _ := service.LinkRepository.GetMailLinks()
// 	for _, v := range links {
// 		fmt.Println(v.FileName, v.FileDescription)
// 	}
// 	mailer.Mailer(mail, links)
// 	return nil
// }
