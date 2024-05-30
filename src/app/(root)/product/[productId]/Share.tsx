"use client";

import { Share2 } from "lucide-react";
import React from "react";
import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    PinterestIcon,
    PinterestShareButton,
    RedditIcon,
    RedditShareButton,
    TwitterIcon,
    TwitterShareButton,
} from "react-share";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import useLanguage from "@/hooks/useLanguage";

type Social = {
    name: string;
    button: React.ComponentType<any>;
    icon: React.ComponentType<any>;
    media?: string;
};

const socials: Social[] = [
    {
        name: "Facebook",
        button: FacebookShareButton,
        icon: FacebookIcon,
    },
    {
        name: "LinkedIn",
        button: LinkedinShareButton,
        icon: LinkedinIcon,
    },
    {
        name: "Twitter",
        button: TwitterShareButton,
        icon: TwitterIcon,
    },
    {
        name: "Reddit",
        button: RedditShareButton,
        icon: RedditIcon,
    },
    {
        name: "Pinterest",
        button: PinterestShareButton,
        icon: PinterestIcon,
        media: `${process.env.SITE_URL}/assets/images/banner-bg.jpg`,
    },
    {
        name: "Email",
        button: EmailShareButton,
        icon: EmailIcon,
    },
];

export default function Share({ productId }: { productId: string }) {
    const { strings } = useLanguage();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="secondary">
                    <Share2 className="h-4 w-4" />
                    <Separator orientation="vertical" className="mx-4" />
                    {strings.common.share}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Share</DialogTitle>
                    <DialogDescription>
                        Share this product with others.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex gap-4 py-4">
                    <SocialMediaList productId={productId} />
                </div>
            </DialogContent>
        </Dialog>
    );
}

function SocialMediaList({ productId }: { productId: string }) {
    return (
        <React.Fragment>
            {socials.map((social) => (
                <div key={social.name} title={social.name}>
                    <social.button
                        url={`${process.env.SITE_URL!}/product/${productId}`}
                        {...(social.name === "Pinterest" && {
                            media: social.media,
                        })}
                    >
                        <social.icon size={32} round={true} />
                    </social.button>
                </div>
            ))}
        </React.Fragment>
    );
}
