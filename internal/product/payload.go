package product

import "gorm.io/datatypes"

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
	Name        string         `json:"name"`
	Description string         `json:"description"`
	Uid         string         `json:"uid"`
	CreatedAt   datatypes.Date `json:"created_at"`
	UpdatedAt   datatypes.Date `json:"updated_at"`
}

type GetProductsResponse struct {
	Products any   `json:"products"`
	Count    int64 `json:"count"`
}
