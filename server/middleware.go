package main

import (
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func (app *application) enableCORS(next *gin.Engine) gin.HandlerFunc {
	return cors.New(cors.Config{
		AllowOrigins:     []string{app.config.corsEndpoint, "https://luvandkrishi.com"},
		AllowMethods:     []string{"PUT", "GET"},
		AllowHeaders:     []string{"Origin"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		AllowWildcard:    true,
		MaxAge:           12 * time.Hour,
	})
}
