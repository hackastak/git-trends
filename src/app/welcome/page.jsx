import { Client, Account } from "appwrite";



export default async function WelcomePage() {
  const client = new Client();

  client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("6693db8b0033dfefbf88");
  

  const account = new Account(client);

  const session = await account.getSession("current");
    console.log(session.provider);
    console.log(session.providerUid);
    console.log(session.providerAccessToken);

  return (
    <div>
      <h1>Welcome to the site!</h1>
      <p>Thanks for visiting our site!</p>
    </div>
  );
}