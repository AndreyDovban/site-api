package product

import (
	"net/http"
	"site-api/pkg/request"
	"site-api/pkg/response"
)

type ProductHandlerDeps struct {
	ProductRepository *ProductRepository
}

type ProductHandler struct {
	ProductRepository *ProductRepository
}

func NewProductHandler(router *http.ServeMux, deps *ProductHandlerDeps) {
	handler := &ProductHandler{
		ProductRepository: deps.ProductRepository,
	}
	router.HandleFunc("POST /product", handler.Create())
	router.HandleFunc("PATCH /product/{hash}", handler.Update())
	router.HandleFunc("DELETE /product/{hash}", handler.Delete())
	router.HandleFunc("GET /product/{hash}", handler.Read())

	router.HandleFunc("GET /product", handler.GetAll())

}

func (handler *ProductHandler) Create() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		body, err := request.HandleBody[ProductCreateRequest](&w, r)
		if err != nil {
			return
		}

		product := NewProduct(body.Name, body.Description)

		existedProd, _ := handler.ProductRepository.FindByName(product.Name)
		if existedProd != nil {
			http.Error(w, existedProd.Name+" is already exists", http.StatusBadRequest)
			return
		}

		for {
			existedProd, _ = handler.ProductRepository.FindByName(product.Name)
			if existedProd == nil {
				break
			}
			product.GenerateHash()
		}

		createdProd, err := handler.ProductRepository.Create(product)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
		}

		response.Json(w, createdProd.Name+" success added", http.StatusOK)

	}
}

func (handler *ProductHandler) Update() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
	}
}

func (handler *ProductHandler) Delete() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
	}
}

func (handler *ProductHandler) Read() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
	}
}

func (handler *ProductHandler) GetAll() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
	}
}
