package file

import "gorm.io/datatypes"

type FileCreateRequest struct {
	Name        string `json:"name" validate:"required"`
	Description string `json:"description" validate:"required"`
}

type FileUpdateRequest struct {
	Name        string `json:"name"`
	Description string `json:"description"`
}

type FileResponse struct {
	Name        string         `json:"name"`
	Description string         `json:"description"`
	CreatedAt   datatypes.Date `json:"CreatedAt"`
	UpdatedAt   datatypes.Date `json:"UpdatedAt"`
}

type GetFilesResponse struct {
	Files []FileResponse `json:"files"`
	Count int64          `json:"count"`
}
