package com.marketplace.apimarket.util;

import org.mindrot.jbcrypt.BCrypt;

public class PasswordUtil {
  public static String encodePassword(String plainPassword) {
    return BCrypt.hashpw(plainPassword, BCrypt.gensalt());
  }

  public static boolean verifyPassword(String plainPassword, String hashedPassword) {
    return BCrypt.checkpw(plainPassword, hashedPassword);
  }
}
