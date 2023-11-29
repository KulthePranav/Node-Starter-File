import { containerClient } from "../../config/adls.config.js";
import { AUTH_RESPONSES } from "../constants/auth.responses.js";
import { FILE_CONSTANTS } from "../constants/file.constants.js";
const {
  env: { ADLSContainer },
} = process;
const { BASE_64 } = FILE_CONSTANTS;
const { FILE_NOT_FOUND } = AUTH_RESPONSES;

export const getAdlsUrl = async (filePath, file) => {
  try {
    const { buffer, mimetype } = file;
    const blockBlobClient = containerClient.getBlockBlobClient(filePath);
    await blockBlobClient.uploadData(buffer, mimetype);
    const blobUrl = blockBlobClient.url;
    return blobUrl;
  } catch (error) {
    throw FILE_NOT_FOUND;
  }
};

export const downloadAdlsFile = async (filePath) => {
  try {
    const adlsFilePath = decodeURIComponent(filePath)
      .split(`${ADLSContainer}/`)
      .join("");
    const adlsFile = containerClient.getBlobClient(adlsFilePath);
    const buffer = await adlsFile.downloadToBuffer();
    const file = buffer.toString(BASE_64);
    return file;
  } catch (error) {
    console.log(error);
    throw FILE_NOT_FOUND;
  }
};

export const deleteAdlsFile = async (filePath) => {
  try {
    const adlsFilePath = decodeURIComponent(filePath)
      .split(`${ADLSContainer}/`)
      .join("");
    const adlsPreviousFile = containerClient.getBlobClient(adlsFilePath);
    await adlsPreviousFile.delete();
  } catch (error) {
    throw FILE_NOT_FOUND;
  }
};
