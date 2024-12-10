import { router } from "@inertiajs/react";
import { useState } from "react";

export default function AdminLogin() {
    const [name, setName] = useState();
    const [password, setPassword] = useState();

    return (
        <div id="admin-wrapper-login">
            {" "}
            <div id="project-title">Login Admin</div>
            <div className="vote-info">
                <label htmlFor="voter_name">user name</label>
                <input
                    type="text"
                    name="voter_name"
                    id="voter_name"
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
            </div>
            <div className="vote-info">
                <label htmlFor="voter_email">password</label>
                <input
                    type="text"
                    name="voter_email"
                    id="voter_email"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
            </div>
            <div
                role="button"
                id="submit-vote"
                onClick={(_) => {
                    if (
                        name &&
                        password &&
                        name === "admin" &&
                        password === "admin"
                    ) {
                        localStorage.setItem("adminName", name);
                        localStorage.setItem("adminPass", password);
                        router.visit("dashboard");
                    }
                }}
            >
                submit
            </div>
        </div>
    );
}
