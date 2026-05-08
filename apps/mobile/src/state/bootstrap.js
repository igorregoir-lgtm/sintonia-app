import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { initDb } from "../storage/db";

const USER_ID_KEY = "sintonia.userId";

export function useBootstrap() {
  const [state, setState] = useState({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        await initDb();

        const existingUserId = await SecureStore.getItemAsync(USER_ID_KEY);
        if (!existingUserId) {
          const newUserId = crypto.randomUUID();
          await SecureStore.setItemAsync(USER_ID_KEY, newUserId);
        }

        if (!cancelled) setState({ status: "ready" });
      } catch (e) {
        if (!cancelled) setState({ status: "error", error: e });
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

