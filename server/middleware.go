package main

import (
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

//enableCors is what allows us to accept traffic from the outside world
//This should be where we allow access from different places/add headers/keys
func (app *application) enableCORS(next *gin.Engine) gin.HandlerFunc {
	return cors.New(cors.Config{
		AllowOrigins:     []string{"http://luvandkrishi.com:3000"},
		AllowMethods:     []string{"PUT", "GET"},
		AllowHeaders:     []string{"Origin"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		AllowOriginFunc: func(origin string) bool {
			return origin == "https://luvandkrishi.com"
		},
		MaxAge: 12 * time.Hour,
	})
}
