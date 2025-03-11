package link

import (
	"errors"
	"time"
)

type LinkService struct {
	LinkRepository *LinkRepository
}

func NewLinkService(linkRepository *LinkRepository) *LinkService {
	return &LinkService{
		LinkRepository: linkRepository,
	}
}

func (service *LinkService) Download(hash string) (string, error) {

	link, err := service.LinkRepository.FindByHash(hash)
	if err != nil {
		return "", err
	}

	link.Count++

	if link.Valid == -1 {
		return "", errors.New("ссылка не действительна")
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
			return "", err
		}
	}

	_, err = service.LinkRepository.Update(hash, link)
	if err != nil {
		return "", err
	}

	return "ok", nil

	// w.Header().Set("File-Name", "Example")
	// w.WriteHeader(http.StatusOK)
	// w.Write([]byte("hello"))
}
