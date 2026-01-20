import { useState } from "react";
import { useSSO } from "@clerk/clerk-expo";
import { Alert } from "react-native";
import * as WebBrowser from "expo-web-browser";

// Penting: Tambahkan ini untuk warmup browser
WebBrowser.maybeCompleteAuthSession();

function useAuthSocial() {
  const [loadingStrategy, setLoadingStrategy] = useState<string | null>(null);
  const { startSSOFlow } = useSSO();

  const handleSocialAuth = async (strategy: "oauth_google" | "oauth_apple") => {
    setLoadingStrategy(strategy);

    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy,
        // Tambahkan redirectUrl jika diperlukan
        redirectUrl: undefined, // Clerk akan handle otomatis
      });

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
      }
    } catch (error) {
      console.log("Error in social auth:", error);
      const provider = strategy === "oauth_google" ? "Google" : "Apple";
      Alert.alert(
        "Error",
        `Failed to sign in with ${provider}. Please try again.`,
      );
    } finally {
      setLoadingStrategy(null);
    }
  };

  return { handleSocialAuth, loadingStrategy };
}

export default useAuthSocial;
