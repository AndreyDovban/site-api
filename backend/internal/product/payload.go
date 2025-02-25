package product

import (
	"gorm.io/datatypes"
)

type ProductCreateRequest struct {
	Name        string `json:"name" validate:"required"`
	Description string `json:"description" validate:"required"`
}

type ProductUpdateRequest struct {
	Name        string `json:"name"`
	Description string `json:"description"`
}

type GetProductsRequest struct {
	Limit   int      `json:"limit"`
	Offset  int      `json:"offset"`
	Columns []string `json:"columns"`
}

type ProductResponse struct {
	Uid         string         `json:"uid"`
	Name        string         `json:"name"`
	Description string         `json:"description"`
	CreatedAt   datatypes.Date `json:"created_at"`
	UpdatedAt   datatypes.Date `json:"updated_at"`
}

type GetProductsResponse struct {
	Columns []string          `json:"columns"`
	Data    []ProductResponse `json:"data"`
	Count   int64             `json:"count"`
}
