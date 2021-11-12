package main

import (
	"github.com/gin-gonic/gin"
)

func (app *application) statusHandler(c *gin.Context) {
	currentStatus := AppStatus{
		Status:      "Available",
		Environment: app.config.env,
	}

	c.JSON(200, gin.H{
		"Content-Type": "application/json",
		"message":      currentStatus,
	})
}
