package file

import "gorm.io/datatypes"

type FileCreateRequest struct {
	Name        string `json:"name" validate:"required"`
	Description string `json:"description" validate:"required"`
	ProductName string `json:"product_name" validate:"required"`
}

type FileUpdateRequest struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	ProductName string `json:"product_name"`
}

type FileResponse struct {
	Name        string         `json:"name"`
	Description string         `json:"description"`
	ProductName string         `json:"product_name"`
	CreatedAt   datatypes.Date `json:"CreatedAt"`
	UpdatedAt   datatypes.Date `json:"UpdatedAt"`
}

type GetFilesResponse struct {
	Files []FileResponse `json:"files"`
	Count int64          `json:"count"`
}
