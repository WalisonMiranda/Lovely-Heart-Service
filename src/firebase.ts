import * as admin from "firebase-admin";
import * as dotenv from "dotenv";

dotenv.config(); // Carregar as variáveis do .env

const serviceAccountKeyBase64 = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

if (!serviceAccountKeyBase64) {
  throw new Error("Chave de conta de serviço não fornecida.");
}

try {
  // Decodificar e parsear a chave de conta de serviço
  const serviceAccountKey = Buffer.from(
    serviceAccountKeyBase64,
    "base64"
  ).toString("utf-8");
  const serviceAccount = JSON.parse(serviceAccountKey);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} catch (error) {
  console.error("Erro ao inicializar o Firebase:", error);
  throw error; // Propaga o erro para interromper a inicialização se falhar
}

export default admin;
