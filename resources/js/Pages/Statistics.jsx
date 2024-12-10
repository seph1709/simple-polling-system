import { useState } from "react";
import { router } from "@inertiajs/react";
export default function Statistics({ voted_data, polling_data }) {
    let adminName, adminPass;
    adminName = localStorage.getItem("adminName");
    adminPass = localStorage.getItem("adminPass");

    if (!(adminName && adminPass)) {
        router.visit("http://127.0.0.1:8000/admin/login");
    }
    const [data, setData] = useState({});
    let voted;
    console.log(voted_data);

    return (
        <div id="body-admin">
            <div id="side-bar">
                <div
                    onClick={(_) => {
                        //
                        router.visit("http://127.0.0.1:8000/admin/statistics");
                    }}
                >
                    Results
                </div>
                <div
                    onClick={(_) => {
                        router.visit("http://127.0.0.1:8000/admin/dashboard");
                    }}
                >
                    Workplace
                </div>
            </div>
            <div id="main2">
                <div id="header-text-main">
                    <div>Results</div>{" "}
                    <div
                        id="admin-logout"
                        onClick={(_) => {
                            //
                            localStorage.removeItem("adminName");
                            localStorage.removeItem("adminPass");
                            router.visit("/");
                        }}
                    >
                        logout
                    </div>
                </div>
                {/* <div id="add-item-text" onClick={(_) => {}}>
                </div> */}
                {voted_data && polling_data && (
                    <div id="dashboard-container2">
                        {JSON.parse(polling_data.pollings_data).map(
                            (val, i) => {
                                const { title, options } = val;
                                console.log(val);

                                return (
                                    <>
                                        <div id="label-resut" key={i}>
                                            {title}
                                        </div>
                                        <div id="option-wrapper">
                                            {options.map((v, i) => {
                                                let counter = 0;

                                                for (
                                                    let index = 0;
                                                    index < voted_data.length;
                                                    index++
                                                ) {
                                                    voted = JSON.parse(
                                                        voted_data[index]
                                                            .voted_data
                                                    );
                                                    // console.log(voted[title]);

                                                    if (voted[title]) {
                                                        if (
                                                            voted[title] === v
                                                        ) {
                                                            counter++;
                                                        }
                                                    }
                                                }

                                                return (
                                                    <div key={i}>
                                                        <div id="option">
                                                            {v}:
                                                        </div>

                                                        <span id="percentage">
                                                            {(counter /
                                                                voted_data.length) *
                                                            100
                                                                ? (counter /
                                                                      voted_data.length) *
                                                                  100
                                                                : 0}
                                                            % {counter} votes
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </>
                                );
                            }
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
