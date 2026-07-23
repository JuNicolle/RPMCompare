package com.rpmcompare.model.dto;

/**
 * DTO représentant la réponse globale de l'API externe de plaque d'immatriculation.
 */
public class ApiPlaqueResponse {
    private ApiPlaqueData data;
    private String api_version;
    private String message;
    private int code_erreur;

    public ApiPlaqueData getData() { return data; }
    public void setData(ApiPlaqueData data) { this.data = data; }

    public String getApi_version() { return api_version; }
    public void setApi_version(String api_version) { this.api_version = api_version; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public int getCode_erreur() { return code_erreur; }
    public void setCode_erreur(int code_erreur) { this.code_erreur = code_erreur; }
}
