package product

type ProductCreateRequest struct {
	Name        string `json:"name"`
	Description string `json:"description"`
}

type ProductGetAllRequest struct {
	Products []Product `json:"products"`
	Count    int64     `json:"count"`
}
