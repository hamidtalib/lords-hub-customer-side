import AccountDetailsClient from "./AccountDetailsClient";

// Generate static paths for accounts
export async function generateStaticParams() {
  // For static export, we'll generate some common account IDs
  // In production, you'd fetch these from your database
  return [
    { id: 'fyIlrqY8k4rpMlLMPsJ9' },
    { id: 'gBQDAYd4To9Bu4Mme4F4' },
    { id: 'mwtPPHpPGlQFCBQqn4hZ' },
    { id: 'sample-account-1' },
    { id: 'sample-account-2' },
  ];
}

export default async function AccountDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <AccountDetailsClient id={id} />;
}
