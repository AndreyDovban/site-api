package link

import (
	"errors"
	"site-api/configs"
	"site-api/internal/file"
	"time"
)

type LinkService struct {
	LinkRepository *LinkRepository
	FileRepository *file.FileRepository
	Config         *configs.Config
}

func NewLinkService(linkRepository *LinkRepository, fileRepository *file.FileRepository, config *configs.Config) *LinkService {
	return &LinkService{
		LinkRepository: linkRepository,
		FileRepository: fileRepository,
		Config:         config,
	}
}

func (service *LinkService) Download(hash string) (string, string, error) {

	link, err := service.LinkRepository.FindByHash(hash)
	if err != nil {
		return "", "", err
	}

	link.Count++

	if link.Valid == -1 {
		return "", "", errors.New("ссылка не действительна")
	}

	if link.Count > 9 {
		link.Valid = -1
	}

	created := link.CreatedAt
	n := time.Now()
	def := int(n.Sub(created) / time.Minute)

	if def > 2880 {
		link.Valid = -1
		_, err = service.LinkRepository.Update(hash, link)
		if err != nil {
			return "", "", err
		}
	}

	_, err = service.LinkRepository.Update(hash, link)
	if err != nil {
		return "", "", err
	}

	file, err := service.FileRepository.FindByUid(link.FileUid)
	if err != nil {
		return "", "", err
	}

	return service.Config.Db.FilesFolder + "/" + file.Name, file.Name, nil

}
