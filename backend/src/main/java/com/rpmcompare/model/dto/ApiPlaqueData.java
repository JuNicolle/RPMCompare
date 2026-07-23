package com.rpmcompare.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * DTO contenant les caractéristiques techniques du véhicule renvoyées par l'API.
 */
public class ApiPlaqueData {
    private String erreur;
    private String immat;
    private String marque;
    private String modele;
    private String version;

    @JsonProperty("debut_modele")
    private String debutModele;

    private String energieNGC;

    @JsonProperty("type_moteur")
    private String typeMoteur;

    @JsonProperty("boite_vitesse")
    private String boiteVitesse;

    @JsonProperty("type_transmission")
    private String typeTransmission;

    private String puisFiscReelCH;
    private String ccm;
    private String poids;
    private String co2;
    private String carrosserie;
    
    @JsonProperty("code_moteur")
    private String codeMoteur;

    public String getErreur() { return erreur; }
    public void setErreur(String erreur) { this.erreur = erreur; }

    public String getImmat() { return immat; }
    public void setImmat(String immat) { this.immat = immat; }

    public String getMarque() { return marque; }
    public void setMarque(String marque) { this.marque = marque; }

    public String getModele() { return modele; }
    public void setModele(String modele) { this.modele = modele; }

    public String getVersion() { return version; }
    public void setVersion(String version) { this.version = version; }

    public String getDebutModele() { return debutModele; }
    public void setDebutModele(String debutModele) { this.debutModele = debutModele; }

    public String getEnergieNGC() { return energieNGC; }
    public void setEnergieNGC(String energieNGC) { this.energieNGC = energieNGC; }

    public String getTypeMoteur() { return typeMoteur; }
    public void setTypeMoteur(String typeMoteur) { this.typeMoteur = typeMoteur; }

    public String getBoiteVitesse() { return boiteVitesse; }
    public void setBoiteVitesse(String boiteVitesse) { this.boiteVitesse = boiteVitesse; }

    public String getTypeTransmission() { return typeTransmission; }
    public void setTypeTransmission(String typeTransmission) { this.typeTransmission = typeTransmission; }

    public String getPuisFiscReelCH() { return puisFiscReelCH; }
    public void setPuisFiscReelCH(String puisFiscReelCH) { this.puisFiscReelCH = puisFiscReelCH; }

    public String getCcm() { return ccm; }
    public void setCcm(String ccm) { this.ccm = ccm; }

    public String getPoids() { return poids; }
    public void setPoids(String poids) { this.poids = poids; }

    public String getCo2() { return co2; }
    public void setCo2(String co2) { this.co2 = co2; }

    public String getCarrosserie() { return carrosserie; }
    public void setCarrosserie(String carrosserie) { this.carrosserie = carrosserie; }

    public String getCodeMoteur() { return codeMoteur; }
    public void setCodeMoteur(String codeMoteur) { this.codeMoteur = codeMoteur; }
}
