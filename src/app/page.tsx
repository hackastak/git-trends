"use client";

import { useState } from "react";
import { Client, Account, ID, OAuthProvider } from "appwrite";
import type { Models } from "appwrite";

// interface User {
//   name: string;
//   email: string;
//   password: string;
// }

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6693db8b0033dfefbf88");

const account = new Account(client);

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState<Models.Preferences>();

  const githubLogin = async () => {
    account.createOAuth2Session(
      OAuthProvider.Github,
      "http://localhost:3000/welcome",
      "http://localhost:3000/",
    );
    const session = await account.getSession("current");
    console.log(session.provider);
    console.log(session.providerUid);
    console.log(session.providerAccessToken);
  };

  const handleLogin = async () => {
    try {
      await account.createEmailPasswordSession(email, password);
      // const user = await account.get();
      setCurrentUser(await account.get());
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = async () => {
    try {
      await account.create(ID.unique(), email, password);
      handleLogin();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {currentUser?.email && <p>Welcome, {currentUser.email}</p>}
      <form>
        <input
          type="email"
          placeholder="Email"
          className="text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" className="button-primary" onClick={handleLogin}>
          Login
        </button>
        <button
          type="button"
          className="button-primary"
          onClick={handleRegister}
        >
          Register
        </button>
        <button type="button" className="button-primary" onClick={githubLogin}>
          Login with Github
        </button>
      </form>
    </main>
  );
}
