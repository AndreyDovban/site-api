package middleware

import (
	"net/http"
	"site-api/pkg/logger"
	"time"
)

func Logging(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()

		wrapper := &WrapperWriter{
			ResponseWriter: w,
			StatusCode:     http.StatusOK,
		}

		next.ServeHTTP(wrapper, r)
		logger.INFO(wrapper.StatusCode, r.Method, r.URL.Path, time.Since(start))
	})
}
