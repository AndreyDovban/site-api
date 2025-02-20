package product

import (
	"net/http"
	"site-api/pkg/request"
	"site-api/pkg/response"

	"gorm.io/gorm"
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
	router.HandleFunc("GET /product/{uid}", handler.Read())
	router.HandleFunc("PATCH /product/{uid}", handler.Update())
	router.HandleFunc("DELETE /product/{uid}", handler.Delete())

	router.HandleFunc("POST /products", handler.GetProds())

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
			existedProd, _ = handler.ProductRepository.FindByUid(product.Uid)
			if existedProd == nil {
				break
			}
			product.GenerateHash()
		}

		createdProd, err := handler.ProductRepository.Create(product)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		response.Json(w, createdProd, http.StatusOK)

	}
}

func (handler *ProductHandler) Read() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		uid := r.PathValue("uid")

		existedProd, err := handler.ProductRepository.FindByUid(uid)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		response.Json(w, existedProd, http.StatusOK)
	}
}

func (handler *ProductHandler) Update() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		body, err := request.HandleBody[ProductUpdateRequest](&w, r)
		if err != nil {
			return
		}

		uid := r.PathValue("uid")

		_, err = handler.ProductRepository.FindByUid(uid)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		product, err := handler.ProductRepository.Update(uid, &Product{
			Model:       gorm.Model{},
			Name:        body.Name,
			Description: body.Description,
		})
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		response.Json(w, product, http.StatusOK)
	}
}

func (handler *ProductHandler) Delete() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		uid := r.PathValue("uid")

		_, err := handler.ProductRepository.FindByUid(uid)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		_, err = handler.ProductRepository.Delete(uid)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		response.Json(w, uid+" success deleted", http.StatusOK)
	}
}

func (handler *ProductHandler) GetProds() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		body, err := request.HandleBody[GetProductsRequest](&w, r)
		if err != nil {
			return
		}

		count, err := handler.ProductRepository.Count()
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		products, err := handler.ProductRepository.GetProds(body.Limit, body.Offset, body.Columns)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		response.Json(w, &GetProductsResponse{
			Products: products,
			Count:    count,
		}, http.StatusOK)
	}
}
