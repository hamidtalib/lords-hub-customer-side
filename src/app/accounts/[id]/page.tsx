import AccountDetailsClient from "./AccountDetailsClient";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/src/config/firebase";

// Generate static paths for accounts
export async function generateStaticParams() {
  try {
    const accountsRef = collection(firestore, "accounts");
    const snapshot = await getDocs(accountsRef);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function AccountDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <AccountDetailsClient id={id} />;
}
