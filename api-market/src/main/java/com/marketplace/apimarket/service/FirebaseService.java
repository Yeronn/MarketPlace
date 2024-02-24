package com.marketplace.apimarket.service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Date;
import java.util.Objects;

@Service
public class FirebaseService {
  public String uploadFile(MultipartFile multipartFile) throws IOException {
    String objectName = generateFileName(multipartFile);

    FileInputStream serviceAccount = new FileInputStream("store-image-data-firebase-adminsdk-zj6ux-32ec79dd1d.json");
    File file = convertMultiPartToFile(multipartFile);
    Path filePath = file.toPath();

    Storage storage = StorageOptions.newBuilder().setCredentials(GoogleCredentials.fromStream(serviceAccount))
        .setProjectId("store-image-data").build().getService();
    BlobId blobId = BlobId.of("store-image-data.appspot.com", objectName);
    BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType(multipartFile.getContentType()).build();

    storage.create(blobInfo, Files.readAllBytes(filePath));

    // String url = "https://storage.googleapis.com/store-image-data/" + objectName;
    file.delete();

    String publicUrl = "https://firebasestorage.googleapis.com/v0/b/store-image-data.appspot.com/o/" + objectName
        + "?alt=media";

    return publicUrl;
  }

  private File convertMultiPartToFile(MultipartFile file) throws IOException {
    File convertedFile = new File(Objects.requireNonNull(file.getOriginalFilename()));
    FileOutputStream fos = new FileOutputStream(convertedFile);
    fos.write(file.getBytes());
    fos.close();
    return convertedFile;
  }

  private String generateFileName(MultipartFile multiPart) {
    return new Date().getTime() + "-" + Objects.requireNonNull(multiPart.getOriginalFilename()).replace(" ", "_");
  }
}