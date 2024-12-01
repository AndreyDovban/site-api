package mail

import (
	"fmt"
	"site-api/internal/client"
	"site-api/pkg/di"
)

type MailService struct {
	ClientRepository  di.IClientRepository
	LinkRepository    di.ILinkRepository
	ProductRepository di.IProductRepository
	FileRepository    di.IFileRepository
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

// func (service *MailService) FindByData(name, telephone, mail, company string) (*client.Client, error) {
// 	client, err := service.ClientRepository.FindByData(name, telephone, mail, company)
// 	if err != nil {
// 		return nil, err
// 	}
// 	return client, nil
// }

// func (service *MailService) Create(name, telephone, mail, company string) (string, error) {
// 	client := client.NewClient(name, telephone, mail, company)

// 	_, err := service.ClientRepository.Create(client)
// 	if err != nil {
// 		return "", err
// 	}
// 	return mail, nil
// }

func (service *MailService) SendMail(name, telephone, mail, company string, products []string) (string, error) {
	client := client.NewClient(name, telephone, mail, company)
	existedClient, _ := service.ClientRepository.FindByData(name, telephone, mail, company)
	if existedClient == nil {
		client, err := service.ClientRepository.Create(client)
		if err != nil {
			return "", err
		}
		fmt.Println("work mailer 1")
		return client.Mail, nil
	}

	fmt.Println("work mailer 2")
	return mail, nil
}
