import React, { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { User } from "@/types/user";
import { avatarUrls } from "../public/urls/avatars";
// import "../src/app/globals.css";
import Navbar from "../components/NavBar";
const Dashboard: React.FC = () => {
  const { data: session, status } = useSession();
  console.log("Dashboard session: " + JSON.stringify(session) + " and status " + status);
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const avatars: string[] = avatarUrls;

  const AvatarSelection = ({ onSelect }: { onSelect: any }) => {
    return (
      <div className="avatar-selection">
        <h2>Select an Avatar</h2>
        <div className="avatars">
          {avatars.map((avatar, index) => (
            <img key={index} src={avatar} alt={`Avatar ${index}`} onClick={() => onSelect(avatar)} className="cursor-pointer" />
          ))}
        </div>
      </div>
    );
  };
  const updateAvatar = async (avatar: string) => {
    const response = await fetch("/api/user?action=avatar", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: avatar }),
      credentials: "include",
    });
    if (response.ok) {
      await fetchUser();
    }
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      console.log("User not authenticated with session " + session + " and status " + status);
      router.push("/");
    } else if (status === "authenticated" && session?.user) {
      // Fetch user profile data
      fetchUser();
      console.log("User authenticated with session " + JSON.stringify(session) + " and status " + status);
    }
  }, [status, session]);

  const fetchUser = async () => {
    try {
      const res = await fetch("/api/user");
      if (res.ok) {
        const data: User = await res.json();
        setUserProfile(data);
      } else {
        console.error("Failed to fetch user profile");
      }
    } catch (error) {
      console.error("Error fetching user profile", error);
    }
  };
  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <Navbar />
      <header className="flex justify-between items-center py-4">
        <h1 className="text-3xl font-bold text-gray-700">Dashboard</h1>
        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">
          Logout
        </button>
      </header>

      <main>
        {userProfile ? (
          userProfile.image ? (
            <div className="mt-4 bg-white shadow rounded-lg p-6">
              <div className="flex items-center space-x-6 mb-4">
                <img src={userProfile.image} alt={userProfile.userName} className="h-16 w-16 rounded-full" />
                <div>
                  <p className="text-xl text-gray-700 font-semibold">{userProfile.userName}</p>
                  <p className="text-md text-gray-500">{userProfile.email}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-lg text-gray-700">
                  <strong>Coins:</strong> {userProfile.coins}
                </p>
                <p className="text-lg text-gray-700">
                  <strong>Cash:</strong> {userProfile.cash}
                </p>
                {/* Add other additional user information or actions here */}
              </div>
            </div>
          ) : (
            <AvatarSelection
              onSelect={async (avatar: string) => {
                updateAvatar(avatar);
              }}
            />
          )
        ) : (
          <p className="text-gray-600">User profile not found.</p>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
