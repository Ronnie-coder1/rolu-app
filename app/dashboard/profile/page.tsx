import { UserButton, currentUser } from "@clerk/nextjs";

export default async function Profile() {
  const user = await currentUser();

  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Profile</h1>
      <p>Name: {user?.firstName} {user?.lastName}</p>
      <p>Email: {user?.emailAddresses[0].emailAddress}</p>
      <UserButton afterSignOutUrl="/" />
    </main>
  );
}