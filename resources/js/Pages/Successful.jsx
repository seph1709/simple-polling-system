import { router } from "@inertiajs/react";
export default function Succesful() {
    return (
        <div id="success-wrapper">
            <div id="success-text">Voted Successful &#10004; </div>
            <div
                id="vote-again"
                onClick={(_) => {
                    router.visit("/");
                }}
            >
                vote again &#8617;
            </div>
        </div>
    );
}
