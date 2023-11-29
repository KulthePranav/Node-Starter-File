import { BlobServiceClient } from "@azure/storage-blob";

const {
  env: { ADLSName, StorageAccountKey, ADLSContainer },
} = process;

export const storageAccountName = ADLSName;
export const storageAccountKey = StorageAccountKey;
export const containerName = ADLSContainer;

export const blobServiceClient = BlobServiceClient.fromConnectionString(
  `DefaultEndpointsProtocol=https;AccountName=${storageAccountName};AccountKey=${storageAccountKey};EndpointSuffix=core.windows.net`
);
export const containerClient =
  blobServiceClient.getContainerClient(containerName);
