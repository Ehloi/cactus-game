import React, { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { UserType } from "@/types/userType";

const Dashboard: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<UserType | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn();
    } else if (status === "authenticated" && session?.user) {
      // Fetch user profile data
      fetchUser();
    }
  }, [status, session]);

  const fetchUser = async () => {
    try {
      const res = await fetch("/api/user");
      if (res.ok) {
        const data: UserType = await res.json();
        setUserProfile(data);
      } else {
        console.error("Failed to fetch user profile");
      }
    } catch (error) {
      console.error("Error fetching user profile", error);
    }
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      {userProfile && (
        <div>
          <p>Name: {userProfile.userName}</p>
          <p>Email: {userProfile.email}</p>
          {userProfile.image && <img src={userProfile.image} alt={userProfile.userName} />}
        </div>
      )}
      <p>This is a protected page only accessible after logging in.</p>
    </div>
  );
};

export default Dashboard;
