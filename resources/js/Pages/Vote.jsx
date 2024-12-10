import { useState } from "react";
import { useForm } from "@inertiajs/react";
import { router } from "@inertiajs/react";
// const voteItem = [
//     {
//         title: "President",
//         options: ["james", "Anna", "Dave"],
//     },
//     {
//         title: "Vice President",
//         options: ["Manda", "Joseph", "Jenne"],
//     },
//     {
//         title: "Secretary",
//         options: ["Manda", "Joseph", "Jenne"],
//     },
// ];
export default function VotePage({ itemsData }) {
    let newData;
    if (itemsData[0]) {
        newData = JSON.parse(itemsData[0].pollings_data);
    } else {
        newData = [];
    }
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const { data, setData } = useForm();

    function handleAddVote(value) {
        let voteLabel = Object.keys(value)[0];
        let votedItem = value[voteLabel];
        console.log(voteLabel, votedItem);
        setData(voteLabel, votedItem);
    }
    console.log(data);

    return (
        <div id="vote-container">
            <div id="admin-login-wrapper">
                <div
                    id="admin-login"
                    onClick={(_) => {
                        router.visit("admin/login");
                    }}
                >
                    admin login
                </div>
            </div>
            <div id="project-title">Simple Polling System</div>
            <div className="vote-info">
                <label htmlFor="voter_name">Name</label>
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
                <label htmlFor="voter_email">Email</label>
                <input
                    type="text"
                    name="voter_email"
                    id="voter_email"
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
            </div>
            {newData.map((v, i) => (
                <Item voteItem={v} setVoted={handleAddVote} key={i}></Item>
            ))}
            <div>
                <div
                    role="button"
                    id="submit-vote"
                    onClick={(_) => {
                        //
                        if (data && name && email) {
                            fetch("http://127.0.0.1:8000/api/voted", {
                                method: "POST",
                                headers: {
                                    Accept: "application/json",
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({ ...data, name, email }),
                            }).then((response) => {
                                console.log(response);
                                router.visit("/success");
                            });

                            // console.log({ ...data, name, email });
                        }
                    }}
                >
                    submit
                </div>
            </div>
        </div>
    );
}

function Item({ voteItem, setVoted }) {
    const [selected, setSelected] = useState();

    return (
        <div id="vote-item">
            <div id="item-title">{voteItem.title}</div>

            {voteItem.options.map((v, i) => {
                return (
                    <div id="option-container" key={i}>
                        <input
                            id="item-option"
                            name="item-option"
                            value={v}
                            type="checkBox"
                            checked={selected === v ? true : false}
                            onChange={(e) => {
                                setSelected(e.target.value);
                                let title = voteItem.title;
                                setVoted({ [title]: e.target.value });
                            }}
                        ></input>
                        <label htmlFor="item-option">{v}</label>
                    </div>
                );
            })}
        </div>
    );
}
