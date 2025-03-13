package mail

import (
	"site-api/configs"
	"site-api/pkg/di"
	"site-api/pkg/mailer"
)

type MailService struct {
	ClientRepository  di.IClientRepository
	LinkRepository    di.ILinkRepository
	ProductRepository di.IProductRepository
	FileRepository    di.IFileRepository
	Config            *configs.Config
}

type link struct {
	Hash            string
	FileName        string
	FileDescription string
	ProductUid      string
}

type templateData struct {
	Name     string
	Protocol string
	Domain   string
	Links    []*link
	Products interface{}
}

func NewMailService(
	clientRepository di.IClientRepository,
	linkRepository di.ILinkRepository,
	productRepository di.IProductRepository,
	fileRepository di.IFileRepository,
	config *configs.Config,
) *MailService {
	return &MailService{
		ClientRepository:  clientRepository,
		LinkRepository:    linkRepository,
		ProductRepository: productRepository,
		FileRepository:    fileRepository,
		Config:            config,
	}
}

func (service *MailService) SendMail(name, telephone, mail, company string, productUids []string) (string, error) {

	var clientUid string
	existedClient, _ := service.ClientRepository.FindByData(name, telephone, mail, company)
	if existedClient == nil {
		client, err := service.ClientRepository.Create(name, telephone, mail, company)
		if err != nil {
			return "", err
		}
		clientUid = client.Uid
	} else {
		clientUid = existedClient.Uid
	}

	var data templateData

	data.Name = name
	data.Protocol = service.Config.Mail.Protocol
	data.Domain = service.Config.Mail.Domain

	files, err := service.FileRepository.GetFilesByProdUid(productUids)
	if err != nil {
		return "", err
	}

	for _, file := range files {
		l, err := service.LinkRepository.Create(1, 0, file.ProductUid, file.Uid, clientUid)
		if err != nil {
			return "", err
		}

		data.Links = append(data.Links, &link{
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

	mailer.Mailer(
		mail,
		service.Config.Mail.Login,
		service.Config.Mail.Password,
		service.Config.Mail.Domain,
		service.Config.Mail.Protocol,
		service.Config.Mail.Host,
		service.Config.Mail.Port,
		data)

	return mail, nil
}
