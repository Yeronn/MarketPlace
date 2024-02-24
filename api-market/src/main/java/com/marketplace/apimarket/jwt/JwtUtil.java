package com.marketplace.apimarket.jwt;

import java.util.Date;
import java.util.HashMap;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class JwtUtil {
  private static final String SECRET_KEY = "my_secret";
  private static final long EXPIRATION_TIME = 864000000; // 10 días en milisegundos

  public static String generateToken(Integer id, String email) {

    Claims claims = Jwts.claims();
    claims.put("id", id.toString());
    claims.put("email", email);

    return Jwts.builder()
        .setClaims(claims)
        .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
        .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
        .compact();
  }

  public static HashMap<String, String> extractIdAndEmail(String token) {
    Claims claims = Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();

    String id = (String) claims.get("id");
    String email = (String) claims.get("email");

    HashMap<String, String> idAndEmail = new HashMap<>();
    idAndEmail.put("id", id);
    idAndEmail.put("email", email);

    return idAndEmail;
  }

}
