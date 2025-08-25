import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { IoShareSocialOutline } from "react-icons/io5";
const ShareButton = ({ url, title }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1500);
    };

    return (
        <div>
            {/* <FacebookShareButton url={url} quote={title}>
                Facebook
            </FacebookShareButton>
            <TwitterShareButton url={url} title={title}>
                Twitter
            </TwitterShareButton>
            <LinkedinShareButton url={url} title={title}>
                LinkedIn
            </LinkedinShareButton>
            <Instagram url={url} title={title}>
                Instagram
            </Instagram> */}
            <CopyToClipboard text={url} onCopy={handleCopy}>
                <button>{copied ? 'Copied!' : <IoShareSocialOutline
                    className="course_detail_icon"
                    style={{ cursor: "pointer", borderRadius: "50%" }}
                />}</button>
            </CopyToClipboard>
        </div>
    );
};

export default ShareButton;
