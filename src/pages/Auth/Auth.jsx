import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Auth() {
    const { isLoaded, isSignedIn, user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoaded) return;

        // Not logged in → login
        if (!isSignedIn || !user) {
            navigate("/login", { replace: true });
            return;
        }

        const role = user.unsafeMetadata?.role;

        // If role exists → go home
        if (role === "admin" || role === "user") {
            navigate("/home", { replace: true });
            return;
        }

        // No role → assign default
        const setDefaultRole = async () => {
            try {
                await user.update({
                    unsafeMetadata: {
                        ...user.unsafeMetadata,
                        role: "user",
                    },
                });
                navigate("/home", { replace: true });
            } catch (err) {
                console.error(err);
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
