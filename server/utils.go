package main

import (
	"errors"
	"strconv"
	"strings"
)

func validateSecretCode(secretCode string) (int, error) {
	validatedSecretCode, err := strconv.Atoi(secretCode)
	if err != nil {
		return 0, errors.New("That doesn't look like a secret code")
	}
	if validatedSecretCode <= 1000 || validatedSecretCode >= 9999 {
		return 0, errors.New("Range exceeded for secret code")
	}

	return validatedSecretCode, nil
}

func validateId(id string) (int, error) {
	validatedId, err := strconv.Atoi(id)
	if err != nil {
		return 0, errors.New("That doesn't look like a secret code")
	}
	return validatedId, nil
}

func validateFamilyName(familyName string) (string, error) {
	validatedFamilyName := strings.Title(strings.ToLower(familyName))
	if validatedFamilyName == "" {
		return "", errors.New("That doesn't look like a family name")
	}

	return validatedFamilyName, nil
}
