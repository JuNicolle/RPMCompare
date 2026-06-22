package com.rpmcompare.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;
import org.springframework.web.multipart.MultipartFile;

@Service
public class PlateRecognizerService {

    @Value("${platerecognizer.api-key:}")
    private String apiKey;

    private final RestClient restClient = RestClient.create();
    private final ObjectMapper mapper = new ObjectMapper();

    public boolean isConfigured() {
        return apiKey != null && !apiKey.isBlank();
    }

    public String recognize(MultipartFile image) throws Exception {
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        byte[] bytes = image.getBytes();
        body.add("upload", new ByteArrayResource(bytes) {
            @Override
            public String getFilename() { return "plate.jpg"; }
        });
        body.add("regions", "fr");

        String json = restClient.post()
                .uri("https://api.platerecognizer.com/v1/plate-reader/")
                .header("Authorization", "Token " + apiKey)
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .body(body)
                .retrieve()
                .body(String.class);

        JsonNode results = mapper.readTree(json).get("results");
        if (results == null || results.isEmpty()) {
            throw new PlateNotFoundException("Aucune plaque détectée sur l'image");
        }

        String raw = results.get(0).get("plate").asText().toUpperCase();
        return formatFrenchPlate(raw);
    }

    private String formatFrenchPlate(String raw) {
        String clean = raw.replaceAll("[^A-Z0-9]", "");
        if (clean.matches("[A-Z]{2}[0-9]{3}[A-Z]{2}")) {
            return clean.substring(0, 2) + "-" + clean.substring(2, 5) + "-" + clean.substring(5, 7);
        }
        return clean;
    }

    public static class PlateNotFoundException extends RuntimeException {
        public PlateNotFoundException(String message) { super(message); }
    }
}
