import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Auth() {
    const { isLoaded, isSignedIn, user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoaded) return; // wait for Clerk to load

        // If not signed in → go to login
        if (!isSignedIn || !user) {
            navigate("/login", { replace: true });
            return;
        }

        // Get role from metadata
        const currentRole = user.unsafeMetadata?.role;

        // Case 1: User has a role
        if (currentRole === "admin") {
            navigate("/dashboard-admin", { replace: true });
            return;
        }

        if (currentRole === "user") {
            navigate("/dashboard-user", { replace: true });
            return;
        }

        // Case 2: No role set → assign "user" automatically
        const setDefaultRole = async () => {
            try {
                await user.update({
                    unsafeMetadata: {
                        ...user.unsafeMetadata,
                        role: "user"
                    }
                });
                navigate("/dashboard-user", { replace: true });
            } catch (err) {
                console.error("Failed to set default role:", err);
                navigate("/login", { replace: true });
            }
        };

        setDefaultRole();
    }, [isLoaded, isSignedIn, user, navigate]);

    return (
        <div className="text-slate-300 mt-10 text-center">
            Checking your session...
        </div>
    );
}
