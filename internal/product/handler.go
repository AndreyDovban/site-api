package product

import (
	"fmt"
	"net/http"
)

type ProductHandlerDeps struct{}

type ProductHandler struct{}

func NewProductHandler(router *http.ServeMux, deps *ProductHandlerDeps) {
	handler := &ProductHandler{}
	router.HandleFunc("POST /product", handler.Create())
	router.HandleFunc("PATCH /product/{hash}", handler.Update())
	router.HandleFunc("DELETE /product/{hash}", handler.Delete())
	router.HandleFunc("GET /product/{hash}", handler.Read())

	router.HandleFunc("GET /product", handler.GetAll())

}

func (handler *ProductHandler) Create() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("create")
	}
}

func (handler *ProductHandler) Update() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("update")
	}
}

func (handler *ProductHandler) Delete() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("delete")
	}
}

func (handler *ProductHandler) Read() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("read")
	}
}

func (handler *ProductHandler) GetAll() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("get all")
	}
}
