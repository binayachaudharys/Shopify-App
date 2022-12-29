import { useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import { useNavigate } from "@shopify/app-bridge-react";
import { mainurl } from "../url";

import {
    ClipboardMinor
} from '@shopify/polaris-icons';
import { Button, Card, Icon, Modal, Stack, TextField } from "@shopify/polaris";
import { useRef } from "react";
import { useCallback } from "react";
const Faqs = () => {
    const navigate = useNavigate();
    const [faqs, setFaqs] = useState([]);
    const [links, setLinks] = useState([]);
    const [url, setUrl] = useState(mainurl + "/faq/nerd.store");
    const [refetch, setRefetch] = useState(true);
    //for modal
    const [active, setActive] = useState(false);
    const [activeView, setActiveView] = useState(false);//ShortCode
    const [tempactive, setTempactive] = useState(false)//temp active
    const [delId, setDelId] = useState(0);
    const [viewCode, setViewCode] = useState();
    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setFaqs(data.data.data);
                setLinks(data.data.links);
            });
    }, [refetch, url]);
    const handleDelete = () => {
        const requestOptions = {
            method: "DELETE",
        };
        fetch(mainurl + "/faq/delete/" + delId, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setActive(false);

                setRefetch(!refetch);
            });
    };

    const node = useRef(null);

    const handleClick = useCallback(() => {
        node.current && node.current.input.focus();
    }, []);

    const handleFocus = useCallback(() => {
        if (node.current == null) {
            return;
        }
        node.current.input.select();
        document.execCommand('copy');
    }, []);

    const toggleModal = useCallback(() => setActiveView((active) => !active), []);

    const copyCode = (slug) => {
        // Copy the text inside the text field
        navigator.clipboard.writeText(slug);

    }
    return (
        <>
            {/* modal for delete confirmation */}
            <Modal
                open={active}
                title="Are you want to delete this FAQ ?"
                onClose={() => {
                    setActive(false);
                }}
                primaryAction={{
                    content: "Yes",
                    onAction: () => handleDelete(),
                }}
                secondaryActions={{
                    content: "No",
                    onAction: () => setActive(false),
                }}
            ></Modal>




            <Modal

                open={activeView}
                onClose={toggleModal}
                title="Please Copy shortcut code"
                primaryAction={{
                    content: 'Close',
                    onAction: toggleModal,
                }}
            >
                <Modal.Section>
                    <Stack vertical>

                        <Stack.Item fill>
                            <TextField
                                ref={node}
                                label="Code"
                                onFocus={handleFocus}
                                value={viewCode}
                                onChange={() => { }}
                                autoComplete="off"

                            />
                        </Stack.Item>
                    </Stack>
                </Modal.Section>

            </Modal>
            <Modal
                open={tempactive}
                title="The FAQ have been deleted successfully"
                onClose={() => {
                    setTempactive(false);
                }}
                primaryAction={{
                    content: "Yes",
                    onAction: () => setTempactive(false),
                }}


            >
            </Modal>

            <button
                className="btn btn-outline-secondary ms-3 mt-3"
                onClick={() => {
                    navigate("/createfaq");
                }}
            >
                Create new faq
            </button>
            {/* </Link> */}

            <Card>


                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Content Title</th>
                            <th scope="col">Lastest Update on</th>
                            <th scope="col">ShortCode</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {faqs.map((item, index) => {
                            return (
                                <>
                                    <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.content_title}</td>

                                        <td>
                                            {new Date(
                                                Date.parse(item.updated_at)
                                            ).toLocaleDateString("en-us", {
                                                weekday: "long",
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </td>
                                        <td>
                                            <Stack>

                                                < button className="btn btn-outline-success pd-5" onClick={() => { setViewCode(item.slug); toggleModal() }}>ShortCode View</button>
                                                < button className="btn btn-outline-secondary pd-5" onClick={() => { copyCode(item.slug) }}><Icon
                                                    source={ClipboardMinor}
                                                    color="primary"
                                                /></button>
                                            </Stack>
                                        </td>
                                        <td>
                                            {/* eye icon */}
                                            {/* temp navigation */}
                                            <Stack>
                                                <a
                                                    onClick={() => {
                                                        navigate(
                                                            `/faqdetail/${item.id}`
                                                        );
                                                    }}
                                                    className="me-2"
                                                >
                                                    < button className="btn btn-outline-success pd-5"> View</button>
                                                </a>
                                                {/* bin icon */}
                                                <span
                                                    onClick={() => {
                                                        setDelId(item.id);
                                                        setActive(true);
                                                    }}
                                                    className="text-danger"
                                                >
                                                    <button className="btn btn-outline-danger pd-5"> Delete</button>
                                                </span>
                                            </Stack>
                                        </td>
                                    </tr>
                                    {/* <h4>
              <Link to={`/faqdetail/${item.id}`}>{item.content_title}</Link>
              <button
                onClick={() => {
                  handleDelete(item.id);
                }}
              >
                Delete
              </button>
            </h4> */}
                                </>
                            );
                        })}
                    </tbody>
                </table>

            </Card>
            {/* start of pagination */}
            <nav aria-label="...">
                <ul class="pagination ">
                    {links.map((item) => {
                        return (
                            <li
                                class={
                                    item.active
                                        ? "active page-item"
                                        : "page-item"
                                }
                            >
                                <button
                                    class="page-link btn btn-outline-success"
                                    onClick={() => {
                                        setUrl(item.url);
                                    }}
                                >
                                    {ReactHtmlParser(item.label)}
                                </button>
                            </li>
                        );
                    })}
                    {/* <li class="page-item disabled">
            <button class="page-link btn btn-link" href="#" tabindex="-1">
              Previous
            </button>
          </li>
          <li class="page-item">
            <button class="page-link" href="#">
              1
            </button>
          </li>
          <li class="page-item">
            <button class="page-link" href="#">
              Next
            </button>
          </li> */}
                </ul>
            </nav>
            {/* end of pagination */}
        </>
    );
};

export default Faqs;
