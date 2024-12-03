package mail

import (
	"fmt"
	"site-api/internal/client"
	"site-api/internal/link"
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

func (service *MailService) CreateLink(name, telephone, mail, company string, productUids []string) (string, error) {
	client := client.NewClient(name, telephone, mail, company)
	existedClient, _ := service.ClientRepository.FindByData(name, telephone, mail, company)
	if existedClient == nil {
		_, err := service.ClientRepository.Create(client)
		if err != nil {
			return "", err
		}
	}

	files, _ := service.FileRepository.GetFilesByProdUid(productUids)

	for _, file := range files {
		l := link.NewLink(true, 0)
		l.ClientUid = client.Uid
		l.FileUid = file.Uid
		l.ProductUid = file.ProductUid
		_, err := service.LinkRepository.Create(l)
		if err != nil {
			return "", nil
		}
	}

	return mail, nil
}

func (service *MailService) SendMail() error {
	fmt.Println("send mail")
	return nil
}
