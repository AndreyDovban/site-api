package file

import "gorm.io/datatypes"

type FileCreateRequest struct {
	Name        string `json:"name" validate:"required"`
	Description string `json:"description" validate:"required"`
	ProductUid  string `json:"product_uid" validate:"required"`
}

type FileUpdateRequest struct {
	Name        string `json:"name"`
	Description string `json:"description"`
}

type GetFilesRequest struct {
	Limit   int      `json:"limit"`
	Offset  int      `json:"offset"`
	Columns []string `json:"columns"`
}

type FileResponse struct {
	Uid                string         `json:"uid"`
	Name               string         `json:"name"`
	Description        string         `json:"description"`
	ProductName        string         `json:"product_name"`
	ProductDescription string         `json:"product_description"`
	ProductUid         string         `json:"product_uid"`
	CreatedAt          datatypes.Date `json:"created_at"`
	UpdatedAt          datatypes.Date `json:"updated_at"`
}

type GetFilesResponse struct {
	Columns []string       `json:"columns"`
	Data    []FileResponse `json:"data"`
	Count   int64          `json:"count"`
}
