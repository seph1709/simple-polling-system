import { useState } from "react";
import { router } from "@inertiajs/react";
const voteItem = [
    {
        title: "President",
        options: ["james", "Anna", "Dave"],
    },
    {
        title: "Vice President",
        options: ["Manda", "Joseph", "Jenne"],
    },
    {
        title: "Secretary",
        options: ["Manda", "Joseph", "Jenne"],
    },
];
export default function AdminDashBoard({ itemsData }) {
    let adminName, adminPass;
    adminName = localStorage.getItem("adminName");
    adminPass = localStorage.getItem("adminPass");

    if (!(adminName && adminPass)) {
        router.visit("http://127.0.0.1:8000/admin/login");
    }

    let newData;
    if (itemsData[0]) {
        newData = JSON.parse(itemsData[0].pollings_data);
    } else {
        newData = [];
    }

    const [title, setTitle] = useState();
    const [options, setOptions] = useState([]);
    const [tempoptions, setTempOptions] = useState();
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [selectedData, setSelectedData] = useState();
    const [data, setData] = useState(newData);
    const [selectedIndex, setSelectedIndex] = useState(voteItem);

    function showEditModal(value) {
        setShowModal2(value);
    }

    function handleSeletectedData(value) {
        setSelectedData(value);
    }

    function handleSelectedIndex(value) {
        console.log(value);
        setSelectedIndex(value);
    }

    function handleDelete(value) {
        setData((v) => {
            const newData = v.filter((val, i) => {
                return !(val === value);
            });

            fetch("http://127.0.0.1:8000/api/items/delete", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newData),
            }).then((response) => {
                console.log(response);
            });
            return newData;
        });
    }

    function updateDataBase(newData) {
        console.log(newData);
        fetch("http://127.0.0.1:8000/api/items/update", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newData),
        }).then((response) => {
            console.log(response);
        });
        router.reload({ preserveScroll: true });
    }

    function createDataBase(newData) {
        fetch("http://127.0.0.1:8000/api/items/", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newData),
        }).then((response) => {
            console.log(response);
        });
        router.reload({ preserveScroll: true });
    }

    return (
        <>
            {showModal2 && (
                <div>
                    <div id="modal-background">
                        <div id="modal-container">
                            <div id="modal-header">Update Item</div>
                            <div id="modal-body">
                                <div>
                                    <label
                                        htmlFor="title"
                                        style={{ display: "block" }}
                                    >
                                        Title:
                                    </label>
                                    <input
                                        id="input-title"
                                        name="title"
                                        type="text"
                                        value={selectedData.title}
                                        onChange={(e) =>
                                            setSelectedData((dat) => {
                                                let { options } = dat;
                                                return {
                                                    title: e.target.value,
                                                    options,
                                                };
                                            })
                                        }
                                    ></input>
                                    <div>Add Option:</div>
                                </div>
                                <input
                                    type="text"
                                    id="input-option"
                                    value={tempoptions}
                                    onChange={(e) =>
                                        setTempOptions(e.target.value)
                                    }
                                ></input>
                                <div
                                    id="add-option"
                                    role="button"
                                    onClick={(e) => {
                                        if (tempoptions) {
                                            const {
                                                title: titleLocal,
                                                options: optionsLocal,
                                            } = selectedData;

                                            setSelectedData({
                                                title: titleLocal,
                                                options: [
                                                    ...optionsLocal,
                                                    tempoptions,
                                                ],
                                            });
                                            // setOptions((v) => [
                                            //     ...v,
                                            //     tempoptions,
                                            // ]);
                                        }
                                    }}
                                >
                                    &#10009;
                                </div>
                                <div>Options:</div>
                                <div id="option-container2">
                                    {selectedData.options.map((v, i) => (
                                        <div id="options-name" key={i}>
                                            <span
                                                id="remove-option"
                                                onClick={(e) => {
                                                    setSelectedData((val) => {
                                                        const {
                                                            title: titleLocal,
                                                        } = val;
                                                        const optionItem =
                                                            selectedData
                                                                .options[i];
                                                        const optionsLocal =
                                                            val.options.filter(
                                                                (value) => {
                                                                    return !(
                                                                        value ===
                                                                        optionItem
                                                                    );
                                                                }
                                                            );
                                                        console.log(
                                                            titleLocal,
                                                            optionsLocal
                                                        );

                                                        return {
                                                            title: titleLocal,
                                                            options:
                                                                optionsLocal,
                                                        };
                                                    });
                                                }}
                                            >
                                                &#10006;
                                            </span>
                                            {v}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div id="modal-footer">
                                <div id="close-modal">
                                    <div
                                        role="button"
                                        id="submit-vote"
                                        onClick={(e) => setShowModal2(false)}
                                    >
                                        cancel
                                    </div>
                                </div>
                                <div
                                    role="button"
                                    id="submit-vote"
                                    onClick={(_) => {
                                        setData((val) => {
                                            console.log(selectedData);
                                            const newData = val.map((v, i) => {
                                                if (i === selectedIndex) {
                                                    return selectedData;
                                                } else {
                                                    return v;
                                                }
                                            });
                                            updateDataBase(newData);
                                            return newData;
                                        });

                                        setShowModal2(false);
                                    }}
                                >
                                    update
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showModal && (
                <div>
                    <div id="modal-background">
                        <div id="modal-container">
                            <div id="modal-header">Add Item</div>
                            <div id="modal-body">
                                <div>
                                    <label
                                        htmlFor="title"
                                        style={{ display: "block" }}
                                    >
                                        Title:
                                    </label>
                                    <input
                                        id="input-title"
                                        name="title"
                                        type="text"
                                        value={title}
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                    ></input>
                                    <div>Add Option:</div>
                                </div>
                                <input
                                    type="text"
                                    id="input-option"
                                    value={tempoptions}
                                    onChange={(e) =>
                                        setTempOptions(e.target.value)
                                    }
                                ></input>
                                <div
                                    id="add-option"
                                    role="button"
                                    onClick={(e) => {
                                        if (tempoptions) {
                                            setOptions((v) => [
                                                ...v,
                                                tempoptions,
                                            ]);
                                        }
                                    }}
                                >
                                    &#10009;
                                </div>
                                <div>Options:</div>
                                <div id="option-container2">
                                    {options.map((v, i) => (
                                        <div id="options-name" key={i}>
                                            <span
                                                id="remove-option"
                                                onClick={(e) =>
                                                    setOptions((val) => {
                                                        const optionItem =
                                                            options[i];
                                                        const newOption =
                                                            val.filter(
                                                                (value) => {
                                                                    return !(
                                                                        value ===
                                                                        optionItem
                                                                    );
                                                                }
                                                            );
                                                        console.log(
                                                            optionItem,
                                                            newOption
                                                        );

                                                        return newOption;
                                                    })
                                                }
                                            >
                                                &#10006;
                                            </span>
                                            {v}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div id="modal-footer">
                                <div id="close-modal">
                                    <div
                                        role="button"
                                        id="submit-vote"
                                        onClick={(e) => setShowModal(false)}
                                    >
                                        cancel
                                    </div>
                                </div>
                                <div
                                    role="button"
                                    id="submit-vote"
                                    onClick={(_) => {
                                        setData((vs) => {
                                            createDataBase([
                                                ...vs,
                                                { title, options },
                                            ]);

                                            return [...vs, { title, options }];
                                        });
                                        console.log(title, options);
                                        setShowModal(false);

                                        // setTitle("");
                                        // setOptions([]);
                                    }}
                                >
                                    Add
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div id="body-admin">
                <div id="side-bar">
                    <div
                        onClick={(_) => {
                            //
                            router.visit(
                                "http://127.0.0.1:8000/admin/statistics"
                            );
                        }}
                    >
                        Results
                    </div>
                    <div
                        onClick={(_) => {
                            router.visit(
                                "http://127.0.0.1:8000/admin/dashboard"
                            );
                        }}
                    >
                        Workplace
                    </div>
                </div>
                <div id="main">
                    <div id="header-text-main">
                        <div>Editor</div>{" "}
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
                    <div
                        id="add-item-text"
                        onClick={(_) => {
                            setTempOptions(null);
                            setTitle(null);
                            setShowModal(true);
                        }}
                    >
                        add item{" "}
                    </div>
                    <div id="dashboard-container">
                        {data.map((v, i) => (
                            <Item
                                voteItem={v}
                                showEditModal={showEditModal}
                                handleSeletectedData={handleSeletectedData}
                                key={i}
                                handleSelectedIndex={handleSelectedIndex}
                                index={i}
                                handleDelete={handleDelete}
                            ></Item>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

function Item({
    voteItem,
    setVoted,
    showEditModal,
    handleSeletectedData,
    handleSelectedIndex,
    index,
    handleDelete,
}) {
    const [selected, setSelected] = useState();

    return (
        <div id="dashboard-item-container">
            <div id="dashboard-item-title">{voteItem.title}</div>

            {voteItem.options.map((v, i) => {
                return (
                    <div id="dashboard-item-option" key={i}>
                        <span>- </span>
                        <label htmlFor="item-option">{v}</label>
                    </div>
                );
            })}
            <div
                id="edit-item"
                onClick={(_) => {
                    handleSeletectedData(voteItem);
                    showEditModal(true);
                    handleSelectedIndex(index);
                }}
            >
                Edit
            </div>
            <div
                id="edit-item"
                onClick={(_) => {
                    handleDelete(voteItem);
                }}
            >
                Delete
            </div>
        </div>
    );
}
