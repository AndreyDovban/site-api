package mail

import (
	"net/http"
	"site-api/pkg/request"
	"site-api/pkg/response"
)

type MailHandlerDeps struct {
	MailService *MailService
}

type MailHalndler struct {
	MailService *MailService
}

func NewMailHandler(router *http.ServeMux, deps *MailHandlerDeps) {
	mail := &MailHalndler{
		MailService: deps.MailService,
	}

	router.HandleFunc("POST /api/mail", mail.SendMail())
	router.HandleFunc("GET /api/check", mail.Check())
}

func (handler *MailHalndler) Check() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		response.Json(w, "all right", http.StatusOK)
	}
}

func (handler *MailHalndler) SendMail() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		body, err := request.HandleBody[MailRequest](&w, r)
		if err != nil {
			return
		}
		if len(body.ProductUids) == 0 {
			http.Error(w, "not choosed products", http.StatusBadRequest)
			return
		}

		mail, err := handler.MailService.SendMail(body.Name, body.Telephone, body.Mail, body.Company, body.ProductUids)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		response.Json(w, "send mail with links to "+mail, http.StatusOK)
	}
}
