package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func (app *application) enableCORS(next *gin.Engine) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		next.ServeHTTP(w, r)
	})
}

//TODO:Middleware
