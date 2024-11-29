package mail

import (
	"fmt"
	"site-api/internal/client"
	"site-api/pkg/di"
)

type MailService struct {
	ClientRepository di.IClientRepository
}

func NewMailService(clientRepository di.IClientRepository) *MailService {
	return &MailService{
		ClientRepository: clientRepository,
	}
}

func (service *MailService) FindByData(name, telephone, mail, company string) (*client.Client, error) {
	client, err := service.ClientRepository.FindByData(name, telephone, mail, company)
	if err != nil {
		return nil, err
	}
	return client, nil
}

func (service *MailService) Create(name, telephone, mail, company string) (string, error) {
	client := &client.Client{
		Name:      name,
		Telephone: telephone,
		Mail:      mail,
		Company:   company,
	}

	_, err := service.ClientRepository.Create(client)
	if err != nil {
		return "", err
	}
	return mail, nil
}

func (service *MailService) SendMail(name, telephone, mail, company string) (string, error) {
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
