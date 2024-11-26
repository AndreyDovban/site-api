package product

type ProductCreateRequest struct {
	Name        string `json:"name" validate:"required"`
	Description string `json:"description" validate:"required"`
}

type ProductGetAllRequest struct {
	Products []Product `json:"products"`
	Count    int64     `json:"count"`
}
