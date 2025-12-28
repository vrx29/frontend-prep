import { ComponentPropsWithoutRef } from "react";

type ButtonProps = {
    el: "button";
} & ComponentPropsWithoutRef<'button'>;

type AnchorProps = {
    el: "anchor";
} & ComponentPropsWithoutRef<'a'>;

export default function Button(props: ButtonProps | AnchorProps) {
    const {el} = props;
    if(el == "anchor") {
        return <a className="button" {...props} />;
    }
    return <button className="button" {...props} />;
}