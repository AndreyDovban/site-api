package services

import (
	"site-api/configs"
	"site-api/pkg/di"
)

type DownloadService struct {
	ClientRepository di.IClientRepository
	LinkRepository   di.ILinkRepository
	FileRepository   di.IFileRepository
	Config           *configs.Config
}

func NewDowbload(
	clientRepository di.IClientRepository,
	linkRepository di.ILinkRepository,
	fileRepository di.IFileRepository,
	config *configs.Config) *DownloadService {
	return &DownloadService{
		ClientRepository: clientRepository,
		LinkRepository:   linkRepository,
		FileRepository:   fileRepository,
		Config:           config,
	}

}
