import { useEffect } from "react";
import { useAuth } from "@/auth/AuthContext";
import { useContextGraph } from "@/hooks/useContextGraph";

/**
 * Wire Context Graph for Sakhi: runs only when user is authenticated.
 * Calls useContextGraph(), logs context when available, renders nothing.
 */
const ContextGraphBridgeInner = () => {
  const context = useContextGraph();

  useEffect(() => {
    if (context) {
      console.log("Context Graph:", context);
    }
  }, [context]);

  return null;
};

/**
 * Renders the bridge only when user is authenticated so the hook runs in a safe context.
 */
export const ContextGraphBridge = () => {
  const { user } = useAuth();

  if (!user) return null;

  return <ContextGraphBridgeInner />;
};
