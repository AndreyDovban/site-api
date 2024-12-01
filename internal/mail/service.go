package mail

import (
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

func (service *MailService) SendMail(name, telephone, mail, company string, productUids []string) (string, error) {
	client := client.NewClient(name, telephone, mail, company)
	existedClient, _ := service.ClientRepository.FindByData(name, telephone, mail, company)
	if existedClient == nil {
		_, err := service.ClientRepository.Create(client)
		if err != nil {
			return "", err
		}
	}

	filesUids, _ := service.FileRepository.GetUidsByProdUid(productUids)

	for _, v := range filesUids {
		l := link.NewLink(true, 0)
		l.ClientUid = client.Uid
		l.FileUid = v
		_, err := service.LinkRepository.Create(l)
		if err != nil {
			return "", nil
		}
	}

	// filesUids, err := service.FileRepository.GetUidsByProdUid(productUids)
	// if err != nil {
	// 	return "", err
	// }

	// for _, v := range filesUids {
	// 	fmt.Println(v)
	// 	link := link.NewLink(true, 0)
	// 	service.LinkRepository.Create(link)
	// }

	return mail, nil
}
