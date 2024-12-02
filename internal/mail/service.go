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

func (service *MailService) SendMail(name, telephone, mail, company string, productIds []string) (string, error) {
	client := client.NewClient(name, telephone, mail, company)
	existedClient, _ := service.ClientRepository.FindByData(name, telephone, mail, company)
	if existedClient == nil {
		_, err := service.ClientRepository.Create(client)
		if err != nil {
			return "", err
		}
		// return client.Mail, nil
	}

	filesUids, err := service.FileRepository.GetUidsByProdUid(productIds)
	if err != nil {
		return "", err
	}

	for _, v := range filesUids {
		fmt.Println(v)
	}

	// fmt.Println("work mailer 2")
	return mail, nil
}
