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

type ProductResponse struct {
	Name        string         `json:"name"`
	Description string         `json:"description"`
	CreatedAt   datatypes.Date `json:"CreatedAt"`
	UpdatedAt   datatypes.Date `json:"UpdatedAt"`
}

type GetProductsResponse struct {
	Products []ProductResponse `json:"products"`
	Count    int64             `json:"count"`
}
