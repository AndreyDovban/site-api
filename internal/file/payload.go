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

type GetFilesRequest struct {
	Limit   int      `json:"limit"`
	Offset  int      `json:"offset"`
	Columns []string `json:"columns"`
}

type FileResponse struct {
	Name        string         `json:"name"`
	Description string         `json:"description"`
	ProductName string         `json:"product_name"`
	CreatedAt   datatypes.Date `json:"created_at"`
	UpdatedAt   datatypes.Date `json:"updated_at"`
}

type GetFilesResponse struct {
	Files []FileResponse `json:"files"`
	Count int64          `json:"count"`
}
